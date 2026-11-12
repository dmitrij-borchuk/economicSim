import { styled } from '@mui/material/styles';
import { Box } from '@/atoms/layout';

export const MetaChip = styled(Box)(() => ({
  padding: '2px 8px',
  backgroundColor: '#111317',
  border: '1px solid #232730',
  color: '#9ca3af',
  fontFamily: 'monospace',
  fontSize: '0.65rem',
  fontWeight: 600,
  letterSpacing: '0.05em',
  display: 'inline-flex',
  alignItems: 'center',
}));
