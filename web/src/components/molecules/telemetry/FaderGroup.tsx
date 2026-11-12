import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@/atoms/layout';
import { FaderTrack, type FaderTrackProps } from '@/atoms/hud';

export interface FaderGroupProps {
  tracks?: FaderTrackProps[];
}

const GroupContainer = styled(Box)(() => ({
  display: 'flex',
  gap: '16px',
  alignItems: 'flex-end',
  paddingLeft: '16px',
  paddingRight: '16px',
}));

const DEFAULT_TRACKS: FaderTrackProps[] = [
  { label: 'TRT-26', value: 72 },
  { label: 'TRT-27', value: 45 },
  { label: 'TRT-28', value: 88, isWarning: true },
  { label: 'TRT-26', value: 60 },
  { label: 'TRT-27', value: 50 },
  { label: 'TRT-28', value: 65 },
];

export const FaderGroup: React.FC<FaderGroupProps> = ({ tracks = DEFAULT_TRACKS }) => {
  return (
    <GroupContainer>
      {tracks.map((track, i) => (
        <FaderTrack key={i} label={track.label} value={track.value} isWarning={track.isWarning} />
      ))}
    </GroupContainer>
  );
};
