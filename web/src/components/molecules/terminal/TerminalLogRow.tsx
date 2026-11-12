import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@/atoms/layout';
import { Typography } from '@/atoms/dataDisplay';

export type TerminalBadgeType = 'orange' | 'red';

export interface TerminalLogRowProps {
  command: string;
  time: string;
  badge?: TerminalBadgeType;
}

const RowContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '4px 8px',
  fontSize: '0.68rem',
  fontFamily: 'monospace',
  backgroundColor: '#0e1117',
  borderBottom: '1px solid #161a22',
}));

const CommandText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'badge',
})<{ badge?: TerminalBadgeType }>(({ badge }) => {
  let bg = 'transparent';
  let textColor = '#9ca3af';

  if (badge === 'orange') {
    bg = '#f97316';
    textColor = '#000';
  } else if (badge === 'red') {
    bg = '#ef4444';
    textColor = '#fff';
  }

  return {
    fontFamily: 'monospace',
    fontSize: 'inherit',
    color: badge ? textColor : '#9ca3af',
    backgroundColor: bg,
    padding: badge ? '1px 6px' : 0,
    fontWeight: badge ? 800 : 400,
  };
});

const TimeText = styled(Typography)(() => ({
  fontFamily: 'monospace',
  fontSize: 'inherit',
  color: '#6b7280',
}));

export const TerminalLogRow: React.FC<TerminalLogRowProps> = ({ command, time, badge }) => {
  return (
    <RowContainer>
      <CommandText variant="caption" badge={badge}>
        {command}
      </CommandText>
      <TimeText variant="caption">{time}</TimeText>
    </RowContainer>
  );
};
