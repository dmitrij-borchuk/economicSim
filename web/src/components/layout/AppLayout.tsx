import React from 'react';
import { Outlet } from 'react-router-dom';
import { Box } from '@/atoms';
import { Header } from '@/organisms';

export const AppLayout: React.FC = () => {
  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#070b14', color: '#f1f5f9' }}>
      {/* Top Telemetry Command Bar */}
      <Header />

      {/* Child Route View */}
      <Outlet />
    </Box>
  );
};

