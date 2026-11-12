import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@/atoms/layout';
import { Typography } from '@/atoms/dataDisplay';
import { StatusPip, HudTag } from '@/atoms/hud';

const Container = styled(Box)(() => ({
  minWidth: '120px',
  marginLeft: 'auto',
  display: 'flex',
  flexDirection: 'column',
  gap: '8px',
}));

const FreqRow = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
}));

const FreqCaption = styled(Typography)(() => ({
  color: '#9ca3af',
  fontFamily: 'monospace',
  fontSize: '0.65rem',
}));

const DotsRow = styled(Box)(() => ({
  display: 'flex',
  gap: '8px',
}));

const SectionLabel = styled(Typography)(() => ({
  color: '#6b7280',
  fontFamily: 'monospace',
  fontSize: '0.65rem',
  marginTop: '8px',
}));

const ChannelsRow = styled(Box)(() => ({
  display: 'flex',
  gap: '8px',
  color: '#6b7280',
  fontSize: '0.62rem',
  fontFamily: 'monospace',
}));

export const LogicBypassControls: React.FC = () => {
  return (
    <Container>
      <FreqRow>
        <FreqCaption variant="caption">24GHz</FreqCaption>
        <FreqCaption variant="caption">32GHz</FreqCaption>
      </FreqRow>

      <DotsRow>
        <StatusPip color="#22c55e" />
        <StatusPip color="#22c55e" />
      </DotsRow>

      <SectionLabel variant="caption">LOGIC BYPASS</SectionLabel>

      <Box sx={{ display: 'flex', gap: 1 }}>
        <HudTag variant="button">DISABLE</HudTag>
      </Box>

      <ChannelsRow>
        <span>ECS</span>
        <span>AMP</span>
        <span>SAC</span>
        <span>MDE</span>
      </ChannelsRow>
    </Container>
  );
};
