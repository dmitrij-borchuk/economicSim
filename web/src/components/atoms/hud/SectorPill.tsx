import { styled } from '@mui/material/styles';
import { Box } from '@/atoms/layout';

export interface SectorPillProps {
  active?: boolean;
  isAlert?: boolean;
}

export const SectorPill = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'active' && prop !== 'isAlert',
})<SectorPillProps>(({ active, isAlert }) => ({
  cursor: 'pointer',
  padding: '6px 12px',
  fontFamily: 'monospace',
  fontSize: '0.72rem',
  fontWeight: 800,
  letterSpacing: '0.08em',
  color: isAlert ? '#ef4444' : active ? '#22c55e' : '#6b7280',
  borderTop: `2px solid ${isAlert ? '#ef4444' : active ? '#22c55e' : '#1e2430'}`,
  backgroundColor: isAlert ? 'rgba(239, 68, 68, 0.05)' : active ? 'rgba(34, 197, 94, 0.05)' : '#0d1017',
  transition: 'all 0.2s ease',
  userSelect: 'none',
  '&:hover': {
    color: '#e5e7eb',
    backgroundColor: '#161b26',
  },
}));
