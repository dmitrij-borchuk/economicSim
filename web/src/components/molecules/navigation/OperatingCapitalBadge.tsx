import React from 'react';
import { styled } from '@mui/material/styles';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import { Box, Typography } from '@/atoms';

export interface OperatingCapitalBadgeProps {
  cashBalance: number | string;
}

const CaptionTypography = styled(Typography)(() => ({
  color: '#64748b',
  display: 'block',
}));

const BalanceTypography = styled(Typography)(() => ({
  fontFamily: 'monospace',
  fontWeight: 700,
  color: '#34d399',
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
}));

export const OperatingCapitalBadge: React.FC<OperatingCapitalBadgeProps> = ({ cashBalance }) => {
  const formattedBalance = Number(cashBalance).toLocaleString('en-US', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Box sx={{ textAlign: 'right' }}>
      <CaptionTypography variant="caption">
        OPERATING CAPITAL
      </CaptionTypography>
      <BalanceTypography variant="subtitle2">
        <AccountBalanceWalletIcon fontSize="inherit" />${formattedBalance} CR
      </BalanceTypography>
    </Box>
  );
};
