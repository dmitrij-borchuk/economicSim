import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useAuth } from '../../libs/auth/useAuth';

export const ProtectedRoute: React.FC = () => {
  const { isAuthenticated, hasCompany, isSessionChecking } = useAuth();

  if (isSessionChecking) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#070b14',
          color: '#38bdf8',
        }}
      >
        <CircularProgress size={48} sx={{ color: '#06b6d4', mb: 3 }} />
        <Typography variant="h6" sx={{ letterSpacing: 2, fontWeight: 700 }}>
          SYNCHRONIZING TACTICAL LINK...
        </Typography>
        <Typography variant="caption" sx={{ color: '#64748b', mt: 1 }}>
          VERIFYING OPERATOR SIGNATURE WITH CENTRAL SIMULATION ENGINE
        </Typography>
      </Box>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!hasCompany) {
    return <Navigate to="/onboarding" replace />;
  }

  return <Outlet />;
};
