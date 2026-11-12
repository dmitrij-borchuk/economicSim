import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@/atoms/layout';
import { Typography } from '@/atoms/dataDisplay';

export interface FooterTableRowProps {
  id: string;
  lic: string;
  time: string;
  tabA: string;
  tabB: string;
  vin: string;
}

const RowContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '4px 8px',
  fontSize: '0.65rem',
  fontFamily: 'monospace',
  backgroundColor: '#0c0f16',
  borderBottom: '1px solid #161b24',
  color: '#9ca3af',
}));

const LicColumn = styled(Box)(() => ({
  flex: 1.2,
  display: 'flex',
  gap: '8px',
}));

const ColMuted = styled(Box)(() => ({
  flex: 1,
  color: '#6b7280',
}));

const VinCol = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<{ isActive?: boolean }>(({ isActive }) => ({
  flex: 1,
  color: isActive ? '#22c55e' : '#9ca3af',
}));

export const FooterTableRow: React.FC<FooterTableRowProps> = ({ id, lic, time, tabA, tabB, vin }) => {
  return (
    <RowContainer>
      <LicColumn>
        <Typography variant="caption" sx={{ color: '#6b7280', fontFamily: 'monospace', fontSize: 'inherit' }}>
          {id}
        </Typography>
        <Typography variant="caption" sx={{ color: '#9ca3af', fontFamily: 'monospace', fontSize: 'inherit' }}>
          {lic}
        </Typography>
      </LicColumn>
      <ColMuted>{time}</ColMuted>
      <ColMuted>{tabA}</ColMuted>
      <ColMuted>{tabB}</ColMuted>
      <VinCol isActive={vin.includes('ACTIVE')}>{vin}</VinCol>
    </RowContainer>
  );
};
