import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@/atoms/layout';
import { Typography } from '@/atoms/dataDisplay';

export interface SectorMetricTagProps {
  code: string;
  value: string;
  isAlert?: boolean;
}

const TagContainer = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  backgroundColor: '#0e1117',
  border: '1px solid #1e2430',
  padding: '4px 12px',
}));

const MetricCodeText = styled(Typography)(() => ({
  color: '#6b7280',
  fontFamily: 'monospace',
  fontSize: '0.65rem',
}));

const MetricValueText = styled(Typography, {
  shouldForwardProp: (prop) => prop !== 'isAlert',
})<{ isAlert?: boolean }>(({ isAlert }) => ({
  fontFamily: 'monospace',
  fontWeight: 800,
  color: isAlert ? '#ef4444' : '#f97316',
  fontSize: '0.72rem',
}));

export const SectorMetricTag: React.FC<SectorMetricTagProps> = ({ code, value, isAlert }) => {
  return (
    <TagContainer>
      <MetricCodeText variant="caption">{code}</MetricCodeText>
      <MetricValueText variant="caption" isAlert={isAlert}>
        {value}
      </MetricValueText>
    </TagContainer>
  );
};
