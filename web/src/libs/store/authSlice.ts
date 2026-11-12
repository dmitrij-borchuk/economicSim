import { createSlice, createAsyncThunk, type PayloadAction } from '@reduxjs/toolkit';
import apiClient from '../api/apiClient';
import { logoutFirebase, subscribeToAuthChanges } from '../firebase/firebase';

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

export interface CompanyProfile {
  id: string;
  name: string;
  companyId: string;
  cashBalance: number;
  reputation: number;
  userId: string;
  starterLicenseId: string;
  startingNodeId: string;
  facilities?: FacilitySummary[];
  createdAt: string;
}

export interface OnboardCompanyPayload {
  companyName: string;
  companyId: string;
  starterLicenseId: string;
  startingNodeId: string;
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
  idToken: null,
  company: null,
  isLoading: false,
  isSessionChecking: true,
  error: null,
};

let unsubscribeAuth: (() => void) | null = null;

export const fetchCurrentUserSession = createAsyncThunk(
  'auth/fetchCurrentUserSession',
  async (_, { rejectWithValue }) => {
    try {
      const response = await apiClient.get('/api/auth/me');
      return response.data; // { success: boolean, data: { user: UserProfile, company: CompanyProfile | null } }
    } catch (err: unknown) {
      const error = err as { response?: { data?: { error?: string; message?: string } }; message?: string };
      const message = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to fetch user session';
      return rejectWithValue(message);
    }
  }
);

export const initAuthListener = createAsyncThunk(
  'auth/initAuthListener',
  async (_, { dispatch }) => {
    if (unsubscribeAuth) {
      return;
    }
    dispatch(setSessionChecking(true));
    unsubscribeAuth = subscribeToAuthChanges(async (fbUser) => {
      if (fbUser) {
        try {
          const token = await fbUser.getIdToken();
          dispatch(
            setFirebaseUser({
              user: {
                uid: fbUser.uid,
                email: fbUser.email,
                displayName: fbUser.displayName,
                photoURL: fbUser.photoURL,
              },
              idToken: token,
            })
          );
          dispatch(fetchCurrentUserSession());
        } catch (err) {
          console.error('Error handling auth state change:', err);
          dispatch(setSessionChecking(false));
        }
      } else {
        dispatch(setFirebaseUser({ user: null, idToken: null }));
      }
    });
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
      const message = error.response?.data?.message || error.response?.data?.error || error.message || 'Failed to onboard company';
      return rejectWithValue(message);
    }
  }
);

export const signOutAction = createAsyncThunk(
  'auth/signOutAction',
  async () => {
    await logoutFirebase();
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setFirebaseUser: (
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
      if (action.payload?.data?.company) {
        state.company = action.payload.data.company;
      } else {
        state.company = null;
      }
    });
    builder.addCase(fetchCurrentUserSession.rejected, (state, action) => {
      state.isLoading = false;
      state.isSessionChecking = false;
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

export const { setFirebaseUser, setSessionChecking, clearAuthError } = authSlice.actions;
export default authSlice.reducer;
