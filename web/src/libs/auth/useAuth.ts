import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../store';
import {
  setFirebaseUser,
  fetchCurrentUserSession,
  submitCompanyOnboarding,
  signOutAction,
  clearAuthError,
  type OnboardCompanyPayload,
} from '../store/authSlice';
import {
  loginWithEmail as fbLoginEmail,
  registerWithEmail as fbRegisterEmail,
  loginWithGoogle as fbLoginGoogle,
  getCurrentIdToken,
} from '../firebase/firebase';

export function useAuth() {
  const dispatch = useAppDispatch();
  const { user, idToken, company, isLoading, isSessionChecking, error } = useAppSelector(
    (state) => state.auth
  );

  const signInEmail = useCallback(
    async (email: string, pass: string) => {
      dispatch(clearAuthError());
      const cred = await fbLoginEmail(email, pass);
      const token = await cred.user.getIdToken();
      dispatch(
        setFirebaseUser({
          user: {
            uid: cred.user.uid,
            email: cred.user.email,
            displayName: cred.user.displayName,
            photoURL: cred.user.photoURL,
          },
          idToken: token,
        })
      );
      return dispatch(fetchCurrentUserSession()).unwrap();
    },
    [dispatch]
  );

  const signUpEmail = useCallback(
    async (email: string, pass: string) => {
      dispatch(clearAuthError());
      const cred = await fbRegisterEmail(email, pass);
      const token = await cred.user.getIdToken();
      dispatch(
        setFirebaseUser({
          user: {
            uid: cred.user.uid,
            email: cred.user.email,
            displayName: cred.user.displayName,
            photoURL: cred.user.photoURL,
          },
          idToken: token,
        })
      );
      return dispatch(fetchCurrentUserSession()).unwrap();
    },
    [dispatch]
  );

  const signInGoogle = useCallback(async () => {
    dispatch(clearAuthError());
    const cred = await fbLoginGoogle();
    const token = await cred.user.getIdToken();
    dispatch(
      setFirebaseUser({
        user: {
          uid: cred.user.uid,
          email: cred.user.email,
          displayName: cred.user.displayName,
          photoURL: cred.user.photoURL,
        },
        idToken: token,
      })
    );
    return dispatch(fetchCurrentUserSession()).unwrap();
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
    getIdToken: getCurrentIdToken,
  };
}

export default useAuth;
