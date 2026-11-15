import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PublicRoute } from './components/auth/PublicRoute';
import { OnboardingRoute } from './components/auth/OnboardingRoute';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { AppLayout } from './components/layout/AppLayout';
import {
  LoginPage,
  OnboardingPage,
  DashboardPage,
  FacilitiesPage,
  FacilityDetailPage,
} from '@/pages';

export const App: React.FC = () => {
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
          <Route path="/facilities" element={<FacilitiesPage />} />
          <Route
            path="/facilities/:facilityId"
            element={<FacilityDetailPage />}
          />
        </Route>
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
