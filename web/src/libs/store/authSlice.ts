import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import apiClient, { getStoredToken, setStoredToken } from '../api/apiClient';
import { logoutFirebase } from '../firebase/firebase';

export interface UserProfile {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

export interface FacilitySummary {
  id: string;
  name: string;
  facilityType: string;
  nodeId: string;
  level: number;
}

export interface InventoryItemSummary {
  itemType: string;
  quantity: number;
  quality: number;
}

export interface CompanyProfile {
  id: string;
  name: string;
  companyId: string;
  cashBalance: number;
  reputation: number;
  userId: string;
  starterLicenseId?: string;
  startingNodeId: string;
  facilities?: FacilitySummary[];
  inventory?: InventoryItemSummary[];
  createdAt: string;
}

export interface OnboardCompanyPayload {
  companyName: string;
  companyId: string;
  starterLicenseId: string;
  startingNodeId: string;
}

export interface AuthCredentialsPayload {
  email: string;
  password: string;
}

export interface AuthState {
  user: UserProfile | null;
  idToken: string | null;
  company: CompanyProfile | null;
  isLoading: boolean;
  isSessionChecking: boolean;
  error: string | null;
}

const initialState: AuthState = {
  user: null,
  idToken: getStoredToken(),
  company: null,
  isLoading: false,
  isSessionChecking: true,
  error: null,
};

interface ServerUserRecord {
  id?: string;
  uid?: string;
  email?: string | null;
  displayName?: string | null;
  photoURL?: string | null;
}

function normalizeUser(user: ServerUserRecord | null | undefined): UserProfile | null {
  if (!user) return null;
  return {
    uid: user.uid || user.id || '',
    email: user.email ?? null,
    displayName: user.displayName ?? null,
    photoURL: user.photoURL ?? null,
  };
}

export const fetchCurrentUserSession = createAsyncThunk(
  'auth/fetchCurrentUserSession',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/api/auth/me');
      return response.data; // { success: boolean, data: { user: UserRecord, company: CompanyProfile | null } }
    } catch (err: unknown) {
      setStoredToken(null);
      const error = err as { response?: { data?: { error?: string; message?: string } }; message?: string };
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Failed to fetch user session';
      return rejectWithValue(message);
    }
  }
);

export const initAuthListener = createAsyncThunk(
  'auth/initAuthListener',
  async (_, { dispatch }) => {
    const token = getStoredToken();
    if (!token) {
      dispatch(setSessionChecking(false));
      return;
    }
    dispatch(setSessionChecking(true));
    await dispatch(fetchCurrentUserSession());
  }
);

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (payload: AuthCredentialsPayload, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/api/auth/login', payload);
      const result = response.data?.data ?? response.data;
      const token = result?.token;
      if (token) {
        setStoredToken(token);
      }
      return result;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string; message?: string } }; message?: string };
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Authentication failed';
      return rejectWithValue(message);
    }
  }
);

export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (payload: AuthCredentialsPayload, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/api/auth/register', payload);
      const result = response.data?.data ?? response.data;
      const token = result?.token;
      if (token) {
        setStoredToken(token);
      }
      return result;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string; message?: string } }; message?: string };
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Registration failed';
      return rejectWithValue(message);
    }
  }
);

export const loginGoogleUser = createAsyncThunk(
  'auth/loginGoogleUser',
  async (idToken: string, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/api/auth/google', { idToken });
      const result = response.data?.data ?? response.data;
      const token = result?.token || idToken;
      setStoredToken(token);
      return result;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string; message?: string } }; message?: string };
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Google authentication failed';
      return rejectWithValue(message);
    }
  }
);

export const submitCompanyOnboarding = createAsyncThunk(
  'auth/submitCompanyOnboarding',
  async (payload: OnboardCompanyPayload, { rejectWithValue }) => {
    try {
      const response = await apiClient.post('/api/company/onboard', payload);
      return response.data; // { success: boolean, data: CompanyProfile }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string; message?: string } }; message?: string };
      const message =
        error.response?.data?.message ||
        error.response?.data?.error ||
        error.message ||
        'Failed to onboard company';
      return rejectWithValue(message);
    }
  }
);

export const signOutAction = createAsyncThunk(
  'auth/signOutAction',
  async () => {
    try {
      await Promise.allSettled([
        apiClient.post('/api/auth/logout'),
        logoutFirebase(),
      ]);
    } finally {
      setStoredToken(null);
    }
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthUser: (
      state,
      action: PayloadAction<{ user: UserProfile | null; idToken: string | null }>
    ) => {
      state.user = action.payload.user;
      state.idToken = action.payload.idToken;
      if (!action.payload.user) {
        state.company = null;
        state.isSessionChecking = false;
      }
    },
    setSessionChecking: (state, action: PayloadAction<boolean>) => {
      state.isSessionChecking = action.payload;
    },
    clearAuthError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Session check
    builder.addCase(fetchCurrentUserSession.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchCurrentUserSession.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSessionChecking = false;
      state.user = normalizeUser(action.payload?.data?.user);
      state.company = action.payload?.data?.company || null;
    });
    builder.addCase(fetchCurrentUserSession.rejected, (state) => {
      state.isLoading = false;
      state.isSessionChecking = false;
      state.user = null;
      state.idToken = null;
      state.company = null;
    });

    // Login
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSessionChecking = false;
      state.user = normalizeUser(action.payload?.user);
      state.company = action.payload?.company || null;
      state.idToken = action.payload?.token || null;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Register
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSessionChecking = false;
      state.user = normalizeUser(action.payload?.user);
      state.company = action.payload?.company || null;
      state.idToken = action.payload?.token || null;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Google Login
    builder.addCase(loginGoogleUser.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginGoogleUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isSessionChecking = false;
      state.user = normalizeUser(action.payload?.user);
      state.company = action.payload?.company || null;
      state.idToken = action.payload?.token || null;
    });
    builder.addCase(loginGoogleUser.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Company Onboarding
    builder.addCase(submitCompanyOnboarding.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(submitCompanyOnboarding.fulfilled, (state, action) => {
      state.isLoading = false;
      state.company = action.payload?.data || null;
    });
    builder.addCase(submitCompanyOnboarding.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Sign out
    builder.addCase(signOutAction.fulfilled, (state) => {
      state.user = null;
      state.idToken = null;
      state.company = null;
      state.isLoading = false;
      state.isSessionChecking = false;
      state.error = null;
    });
  },
});

export const { setAuthUser, setSessionChecking, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
