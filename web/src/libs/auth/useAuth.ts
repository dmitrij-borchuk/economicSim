import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  loginUser,
  registerUser,
  loginGoogleUser,
  submitCompanyOnboarding,
  signOutAction,
  clearAuthError,
  type OnboardCompanyPayload,
} from '../store/authSlice';
import { getStoredToken } from '../api/apiClient';
import { loginWithGoogle as fbLoginGoogle } from '../firebase/firebase';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, idToken, company, isLoading, isSessionChecking, error } = useAppSelector(
    (state) => state.auth
  );

  const signInEmail = useCallback(
    async (email: string, password: string) => {
      dispatch(clearAuthError());
      return await dispatch(loginUser({ email, password })).unwrap();
    },
    [dispatch]
  );

  const signUpEmail = useCallback(
    async (email: string, password: string) => {
      dispatch(clearAuthError());
      return await dispatch(registerUser({ email, password })).unwrap();
    },
    [dispatch]
  );

  const signInGoogle = useCallback(async () => {
    dispatch(clearAuthError());
    const cred = await fbLoginGoogle();
    const token = await cred.user.getIdToken();
    return await dispatch(loginGoogleUser(token)).unwrap();
  }, [dispatch]);

  const signOut = useCallback(async () => {
    await dispatch(signOutAction()).unwrap();
  }, [dispatch]);

  const onboardCompany = useCallback(
    async (payload: OnboardCompanyPayload) => {
      return await dispatch(submitCompanyOnboarding(payload)).unwrap();
    },
    [dispatch]
  );

  const getIdToken = useCallback(async () => {
    return getStoredToken();
  }, []);

  return {
    user,
    company,
    idToken,
    isLoading,
    isSessionChecking,
    error,
    isAuthenticated: Boolean(user),
    hasCompany: Boolean(company),
    signInEmail,
    signUpEmail,
    signInGoogle,
    signOut,
    onboardCompany,
    getIdToken,
  };
}

export default useAuth;
