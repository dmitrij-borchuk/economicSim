import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@/atoms/layout';
import { Typography } from '@/atoms/dataDisplay';
import { HudTag, StatusPip } from '@/atoms/hud';
import { SubHeaderBar } from '@/molecules/hud';

export interface HudHeaderProps {
  title?: string;
  tag?: string;
  threatLevel?: string;
  linkStatus?: string;
}

const HeaderStrip = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingBottom: '8px',
  borderBottom: '1px solid #1a202c',
}));

const TitleGroup = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
}));

const TitleText = styled(Typography)(() => ({
  fontFamily: '"Roboto Mono", monospace',
  fontWeight: 900,
  letterSpacing: '0.15em',
  color: '#d1d5db',
  fontSize: '1.05rem',
}));

const RightControls = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '24px',
}));

const StatusPipsCluster = styled(Box)(({ theme }) => ({
  display: 'none',
  alignItems: 'center',
  gap: '16px',
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const PipCounter = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
}));

const ActiveFeedsBox = styled(Box)(() => ({
  textAlign: 'right',
}));

export const HudHeader: React.FC<HudHeaderProps> = ({
  title = 'REMOTE LINK MONITOR',
  tag = '[ 01 ]',
  threatLevel,
  linkStatus,
}) => {
  return (
    <Box component="header">
      <HeaderStrip>
        <TitleGroup>
          <HudTag variant="header">{tag}</HudTag>
          <TitleText variant="h6">{title}</TitleText>
        </TitleGroup>

        <RightControls>
          <StatusPipsCluster>
            <PipCounter>
              <StatusPip color="#22c55e" />
              <Typography variant="caption" sx={{ color: '#9ca3af', fontFamily: 'monospace' }}>
                924
              </Typography>
            </PipCounter>
            <PipCounter>
              <StatusPip color="#f97316" />
              <Typography variant="caption" sx={{ color: '#9ca3af', fontFamily: 'monospace' }}>
                975
              </Typography>
            </PipCounter>
            <PipCounter>
              <StatusPip color="#ef4444" />
              <Typography variant="caption" sx={{ color: '#9ca3af', fontFamily: 'monospace' }}>
                370
              </Typography>
            </PipCounter>
          </StatusPipsCluster>

          <ActiveFeedsBox>
            <Typography
              variant="caption"
              sx={{
                fontFamily: 'monospace',
                fontWeight: 700,
                color: '#e5e7eb',
                letterSpacing: '0.12em',
                display: 'block',
              }}
            >
              ACTIVE FEEDS
            </Typography>
            <Typography
              variant="caption"
              sx={{
                fontFamily: 'monospace',
                color: '#6b7280',
                letterSpacing: '0.08em',
                display: 'block',
                fontSize: '0.68rem',
              }}
            >
              STANDBY STATUS
            </Typography>
          </ActiveFeedsBox>
        </RightControls>
      </HeaderStrip>

      <SubHeaderBar threatLevel={threatLevel} linkStatus={linkStatus} />
    </Box>
  );
};
