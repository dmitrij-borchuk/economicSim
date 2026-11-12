import React, { useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { isFirebaseConfigured } from './libs/firebase/firebase';
import { PublicRoute } from './components/auth/PublicRoute';
import { OnboardingRoute } from './components/auth/OnboardingRoute';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AppLayout } from './components/layout/AppLayout';
import { LoginPage, OnboardingPage, DashboardPage } from '@/pages';

export const App: React.FC = () => {
  useEffect(() => {
    if (!isFirebaseConfigured()) {
      console.warn(
        'Firebase is not configured. Please supply valid VITE_FIREBASE_* environment variables in .env.'
      );
    }
  }, []);

  return (
    <Routes>
      {/* Public routes (accessible when unauthenticated) */}
      <Route element={<PublicRoute />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      {/* Onboarding route (accessible when authenticated but company not yet established) */}
      <Route element={<OnboardingRoute />}>
        <Route path="/onboarding" element={<OnboardingPage />} />
      </Route>

      {/* Protected routes (accessible only with active user & company) */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/" element={<DashboardPage />} />
        </Route>
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
