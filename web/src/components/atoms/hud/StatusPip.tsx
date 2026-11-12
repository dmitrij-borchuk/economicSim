import { styled } from '@mui/material/styles';
import { Box } from '@/atoms/layout';

export interface StatusPipProps {
  color?: string;
}

export const StatusPip = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'color',
})<StatusPipProps>(({ color = '#22c55e' }) => ({
  width: 8,
  height: 8,
  borderRadius: '50%',
  backgroundColor: color,
  flexShrink: 0,
}));
