import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../../libs/auth/useAuth';
import { styled } from '@mui/material/styles';

export const PublicRoute: React.FC = () => {
  const { isAuthenticated, hasCompany, isSessionChecking } = useAuth();

  if (isSessionChecking) {
    return (
      <LoaderWrapper>
        <CircularProgress size={48} sx={{ color: '#06b6d4', mb: 3 }} />
        <Typography variant="h6" sx={{ letterSpacing: 2, fontWeight: 700 }}>
          SYNCHRONIZING TACTICAL LINK...
        </Typography>
      </LoaderWrapper>
    );
  }

  if (isAuthenticated) {
    if (!hasCompany) {
      return <Navigate to="/onboarding" replace />;
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

const LoaderWrapper = styled(Box)(() => ({
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  bgcolor: '#070b14',
  color: '#38bdf8',
}));
