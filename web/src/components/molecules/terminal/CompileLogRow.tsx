import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@/atoms/layout';
import { Typography } from '@/atoms/dataDisplay';

export type CompileBadgeType = 'orange' | 'red';

export interface CompileLogRowProps {
  id: string;
  name: string;
  time: string;
  status: string;
  badge?: CompileBadgeType;
}

const RowContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'badge',
})<{ badge?: CompileBadgeType }>(({ badge }) => {
  let bg = '#0e1117';
  if (badge === 'orange') {
    bg = 'rgba(249, 115, 22, 0.2)';
  } else if (badge === 'red') {
    bg = 'rgba(239, 68, 68, 0.25)';
  }

  return {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '3px 8px',
    fontSize: '0.67rem',
    fontFamily: 'monospace',
    backgroundColor: bg,
    borderBottom: '1px solid #161a22',
  };
});

const LeftSection = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  overflow: 'hidden',
}));

const RightSection = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
  flexShrink: 0,
}));

const NameText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'badge',
})<{ badge?: CompileBadgeType }>(({ badge }) => ({
  fontFamily: 'monospace',
  fontSize: 'inherit',
  color: badge === 'orange' ? '#f97316' : badge === 'red' ? '#ef4444' : '#9ca3af',
  fontWeight: badge ? 700 : 400,
}));

export const CompileLogRow: React.FC<CompileLogRowProps> = ({ id, name, time, status, badge }) => {
  return (
    <RowContainer badge={badge}>
      <LeftSection>
        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#6b7280', fontSize: 'inherit' }}>
          {id}
        </Typography>
        <NameText variant="caption" noWrap badge={badge}>
          {name}
        </NameText>
      </LeftSection>

      <RightSection>
        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#6b7280', fontSize: 'inherit' }}>
          {time}
        </Typography>
        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#4b5563', fontSize: 'inherit' }}>
          {status}
        </Typography>
      </RightSection>
    </RowContainer>
  );
};
