import React from 'react';
import { styled, keyframes } from '@mui/material/styles';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { Box } from '@/atoms/layout';
import { Typography } from '@/atoms/dataDisplay';

const blink = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.2; }
`;

const PromptContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#11141c',
  border: '1px solid #1f2533',
  padding: '6px',
  gap: '16px',
  marginTop: '8px',
}));

const QueryBadge = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  backgroundColor: '#1f2430',
  padding: '3px 12px',
  border: '1px solid #334155',
}));

const QueryLabel = styled(Typography)(() => ({
  fontFamily: 'monospace',
  fontWeight: 800,
  color: '#9ca3af',
}));

const BlinkingSearchingText = styled(Typography)(() => ({
  fontFamily: 'monospace',
  color: '#9ca3af',
  fontSize: '0.72rem',
  letterSpacing: '0.1em',
  animation: `${blink} 1.5s infinite`,
}));

const GhostSearchingText = styled(Typography)(({ theme }) => ({
  fontFamily: 'monospace',
  color: '#6b7280',
  fontSize: '0.72rem',
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

export const QueryPromptBar: React.FC = () => {
  return (
    <PromptContainer>
      <QueryBadge>
        <QueryLabel variant="caption">QUERY</QueryLabel>
        <PlayArrowIcon sx={{ fontSize: 14, color: '#22c55e' }} />
      </QueryBadge>

      <BlinkingSearchingText variant="caption">SEARCHING...</BlinkingSearchingText>
      <GhostSearchingText variant="caption" sx={{ ml: 'auto' }}>
        SEARCHING...
      </GhostSearchingText>
      <GhostSearchingText variant="caption">SEARCHING...</GhostSearchingText>
    </PromptContainer>
  );
};
