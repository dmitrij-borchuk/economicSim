import { styled } from '@mui/material/styles';
import { Box } from '@/atoms/layout';

export type HudTagVariant = 'header' | 'orange' | 'darkGreen' | 'darkGrey' | 'button';

export interface HudTagProps {
  variant?: HudTagVariant;
}

export const HudTag = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'variant',
})<HudTagProps>(({ variant = 'orange' }) => {
  const baseStyles = {
    fontFamily: 'monospace',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    letterSpacing: '0.05em',
  };

  switch (variant) {
    case 'header':
      return {
        ...baseStyles,
        padding: '2px 6px',
        backgroundColor: '#161922',
        border: '1px solid #283040',
        color: '#f97316',
        fontSize: '0.72rem',
        fontWeight: 800,
      };
    case 'orange':
      return {
        ...baseStyles,
        padding: '2px 8px',
        backgroundColor: '#f97316',
        color: '#000',
        fontSize: '0.68rem',
        fontWeight: 900,
      };
    case 'darkGreen':
      return {
        ...baseStyles,
        padding: '3px 8px',
        backgroundColor: '#14532d',
        color: '#4ade80',
        fontSize: '0.65rem',
        fontWeight: 700,
      };
    case 'darkGrey':
      return {
        ...baseStyles,
        padding: '3px 8px',
        backgroundColor: '#1e2430',
        color: '#9ca3af',
        fontSize: '0.65rem',
        fontWeight: 700,
      };
    case 'button':
      return {
        ...baseStyles,
        padding: '2px 6px',
        backgroundColor: '#181e28',
        border: '1px solid #2a3442',
        color: '#9ca3af',
        fontSize: '0.6rem',
        cursor: 'pointer',
      };
  }
});
