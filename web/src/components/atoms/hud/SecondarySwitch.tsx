import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@/atoms/layout';
import { Typography } from '@/atoms/dataDisplay';

export interface SecondarySwitchProps {
  label: string;
  status: string;
  active?: boolean;
}

const SwitchContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: '#0d1017',
  border: '1px solid #1a202c',
  padding: '2px 8px',
}));

const SwitchLabel = styled(Typography)(() => ({
  color: '#6b7280',
  fontFamily: 'monospace',
  fontSize: '0.62rem',
}));

const SwitchBadge = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<{ active?: boolean }>(({ active }) => ({
  padding: '1px 6px',
  backgroundColor: active ? 'rgba(34, 197, 94, 0.15)' : '#1a202c',
  color: active ? '#22c55e' : '#f97316',
  fontFamily: 'monospace',
  fontSize: '0.62rem',
  fontWeight: 700,
}));

export const SecondarySwitch: React.FC<SecondarySwitchProps> = ({ label, status, active }) => {
  return (
    <SwitchContainer>
      <SwitchLabel variant="caption">{label}</SwitchLabel>
      <SwitchBadge active={active}>{status}</SwitchBadge>
    </SwitchContainer>
  );
};
