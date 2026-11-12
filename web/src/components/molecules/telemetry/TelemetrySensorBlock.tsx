import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@/atoms/layout';
import { Typography } from '@/atoms/dataDisplay';
import { SegmentedBarDisplay } from '@/atoms/hud';

export interface TelemetrySensorBlockProps {
  primaryLabel: string;
  secondaryLabel: string;
  channelLabel: string;
  channelNumbers?: string[];
  topBars: number[];
  bottomBars: number[];
  topColor?: string;
  bottomColor?: string;
}

const SensorBlockContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
}));

const HeaderMetricsRow = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
}));

const MetricCaption = styled(Typography)(() => ({
  color: '#6b7280',
  fontFamily: 'monospace',
  fontSize: '0.65rem',
}));

const ChannelLabelsRow = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  color: '#6b7280',
  fontFamily: 'monospace',
  fontSize: '0.65rem',
  marginBottom: '4px',
}));

const UpperBarBox = styled(Box)(() => ({
  marginTop: '12px',
  marginBottom: '12px',
}));

export const TelemetrySensorBlock: React.FC<TelemetrySensorBlockProps> = ({
  primaryLabel,
  secondaryLabel,
  channelLabel,
  channelNumbers = ['61', '62', '63', '93'],
  topBars,
  bottomBars,
  topColor = '#f97316',
  bottomColor = '#ea580c',
}) => {
  return (
    <SensorBlockContainer>
      <HeaderMetricsRow>
        <MetricCaption variant="caption">{primaryLabel}</MetricCaption>
        <MetricCaption variant="caption">{secondaryLabel}</MetricCaption>
      </HeaderMetricsRow>

      <UpperBarBox>
        <ChannelLabelsRow>
          <span>{channelLabel}</span>
          {channelNumbers.map((num) => (
            <span key={num}>{num}</span>
          ))}
        </ChannelLabelsRow>
        <SegmentedBarDisplay color={topColor} bars={topBars} />
      </UpperBarBox>

      <Box>
        <SegmentedBarDisplay color={bottomColor} bars={bottomBars} />
      </Box>
    </SensorBlockContainer>
  );
};
