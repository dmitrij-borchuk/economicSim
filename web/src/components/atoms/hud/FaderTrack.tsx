import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@/atoms/layout';
import { Typography } from '@/atoms/dataDisplay';

export interface FaderTrackProps {
  label: string;
  value: number;
  isWarning?: boolean;
}

const TrackWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '4px',
}));

const TrackLabel = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isWarning',
})<{ isWarning?: boolean }>(({ isWarning }) => ({
  fontFamily: 'monospace',
  fontSize: '0.6rem',
  color: isWarning ? '#ef4444' : '#6b7280',
}));

const TrackWell = styled(Box)(() => ({
  width: 14,
  height: 54,
  backgroundColor: '#11141c',
  border: '1px solid #1e2430',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-end',
  padding: '2px',
}));

const TrackFill = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'heightPercent' && prop !== 'isWarning',
})<{ heightPercent: number; isWarning?: boolean }>(({ heightPercent, isWarning }) => ({
  width: '100%',
  height: `${heightPercent}%`,
  backgroundColor: isWarning ? '#ef4444' : '#22c55e',
  transition: 'height 0.3s ease',
}));

const TrackFooter = styled(Typography)(() => ({
  fontFamily: 'monospace',
  fontSize: '0.55rem',
  color: '#4b5563',
}));

export const FaderTrack: React.FC<FaderTrackProps> = ({ label, value, isWarning }) => {
  return (
    <TrackWrapper>
      <TrackLabel variant="caption" isWarning={isWarning}>
        {label}
      </TrackLabel>
      <TrackWell>
        <TrackFill heightPercent={value} isWarning={isWarning} />
      </TrackWell>
      <TrackFooter variant="caption">ACTNT</TrackFooter>
    </TrackWrapper>
  );
};
