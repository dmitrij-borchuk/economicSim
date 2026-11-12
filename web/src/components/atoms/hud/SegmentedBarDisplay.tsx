import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@/atoms/layout';

export interface SegmentedBarDisplayProps {
  color: string;
  bars: number[];
}

const BarGraphContainer = styled(Box)(() => ({
  display: 'flex',
  gap: '3px',
  alignItems: 'flex-end',
  height: 28,
}));

const SegmentBar = styled(Box, {
  shouldForwardProp: (prop) => prop !== 'barHeight' && prop !== 'barColor',
})<{ barHeight: number; barColor: string }>(({ barHeight, barColor }) => ({
  flex: 1,
  height: `${barHeight * 1.2}px`,
  backgroundColor: barColor,
  borderRadius: '1px',
  opacity: 0.85,
  transition: 'height 0.3s ease',
  '&:hover': {
    opacity: 1,
  },
}));

export const SegmentedBarDisplay: React.FC<SegmentedBarDisplayProps> = ({ color, bars }) => {
  return (
    <BarGraphContainer>
      {bars.map((height, i) => (
        <SegmentBar key={i} barHeight={height} barColor={color} />
      ))}
    </BarGraphContainer>
  );
};
