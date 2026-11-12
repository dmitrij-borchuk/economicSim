import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@/atoms/layout';
import { Typography } from '@/atoms/dataDisplay';
import { HudTag, HudConsoleButton, type HudTagVariant } from '@/atoms/hud';

export interface DiagnosticActionRowProps {
  title: string;
  variant?: Extract<HudTagVariant, 'darkGreen' | 'darkGrey'>;
  consoleActive: boolean;
  onToggleConsole: () => void;
  statusText?: string;
  badgeText?: string;
  feedsText?: string;
}

const RowContainer = styled(Box)(() => ({
  padding: '8px',
  backgroundColor: '#0e1117',
  border: '1px solid #1f242e',
}));

const HeaderLine = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: '8px',
}));

const BottomLine = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const StatusText = styled(Typography)(() => ({
  color: '#6b7280',
  fontFamily: 'monospace',
  fontSize: '0.65rem',
}));

const BadgeBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
}));

const EecTag = styled(Box)(() => ({
  padding: '0 4px',
  backgroundColor: '#166534',
  color: '#86efac',
  fontSize: '0.6rem',
  fontFamily: 'monospace',
}));

export const DiagnosticActionRow: React.FC<DiagnosticActionRowProps> = ({
  title,
  variant = 'darkGrey',
  consoleActive,
  onToggleConsole,
  statusText = 'LOADING...',
  badgeText = 'EEC',
  feedsText = 'FEEDS 5-6',
}) => {
  return (
    <RowContainer>
      <HeaderLine>
        <HudTag variant={variant}>{title}</HudTag>
        <HudConsoleButton active={consoleActive} onClick={onToggleConsole}>
          CODE CONSOLE {consoleActive ? '[ON]' : '[OFF]'}
        </HudConsoleButton>
      </HeaderLine>

      <BottomLine>
        <StatusText variant="caption">{statusText}</StatusText>
        <BadgeBox>
          <EecTag>{badgeText}</EecTag>
          <Typography variant="caption" sx={{ color: '#9ca3af', fontFamily: 'monospace', fontSize: '0.65rem' }}>
            {feedsText}
          </Typography>
        </BadgeBox>
      </BottomLine>
    </RowContainer>
  );
};
