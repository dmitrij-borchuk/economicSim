import { styled } from '@mui/material/styles';
import { Box } from '@/atoms/layout';

export interface HudConsoleButtonProps {
  active?: boolean;
}

export const HudConsoleButton = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active',
})<HudConsoleButtonProps>(({ active }) => ({
  cursor: 'pointer',
  display: 'inline-block',
  padding: '2px 8px',
  fontFamily: 'monospace',
  fontSize: '0.65rem',
  fontWeight: 800,
  border: '1px solid #2a3442',
  transition: 'all 0.15s ease',
  backgroundColor: active ? '#22c55e' : '#1b2029',
  color: active ? '#000' : '#9ca3af',
  userSelect: 'none',
  '&:hover': {
    borderColor: '#f97316',
  },
}));
