import React from 'react';
import { styled } from '@mui/material/styles';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box } from '@/atoms/layout';
import { Typography } from '@/atoms/dataDisplay';
import { IconButton } from '@/atoms/inputs';
import { TelemetrySensorBlock } from '@/molecules/telemetry';

export interface NodeTelemetryCardProps {
  nodeId: string;
  feedId?: string;
  sector?: string;
  ip?: string;
}

const CardContainer = styled(Box)(() => ({
  backgroundColor: '#0c0e14',
  border: '1px solid #1a202c',
  position: 'relative',
}));

const CardHeaderStrip = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '4px 16px',
  backgroundColor: '#10131b',
  borderBottom: '1px solid #1a202c',
}));

const CardBodyGrid = styled(Box)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: '1.2fr 1fr 1.2fr',
  padding: '16px',
  gap: '20px',
  [theme.breakpoints.down('md')]: {
    gridTemplateColumns: '1fr',
  },
}));

const LeftColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  [theme.breakpoints.up('md')]: {
    minWidth: '300px',
  },
}));

const MiddleColumn = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  paddingTop: '8px',
  paddingBottom: '8px',
  [theme.breakpoints.up('md')]: {
    borderLeft: '1px solid #1f232b',
    borderRight: '1px solid #1f232b',
    paddingLeft: '24px',
    paddingRight: '24px',
  },
}));

const HeaderCaption = styled(Typography)(() => ({
  color: '#9ca3af',
  fontFamily: 'monospace',
  fontSize: '0.75rem',
}));

const IndicatorRect = styled(Box)(() => ({
  width: 10,
  height: 6,
  backgroundColor: '#22c55e',
}));

export const NodeTelemetryCard: React.FC<NodeTelemetryCardProps> = ({
  nodeId,
  feedId = '360',
  sector = 'SECTOR-560',
  ip = '227.61.222.135',
}) => {
  return (
    <CardContainer>
      <CardHeaderStrip>
        <HeaderCaption variant="caption">| FEED STATUS</HeaderCaption>
        <HeaderCaption variant="caption">| SPEC DETAILS</HeaderCaption>
        <HeaderCaption variant="caption">| SIGNAL ALERT</HeaderCaption>
      </CardHeaderStrip>

      <CardBodyGrid>
        {/* Left Column: ID & Major Callout */}
        <LeftColumn>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Box>
              <Typography variant="caption" sx={{ color: '#6b7280', fontFamily: 'monospace', fontSize: '0.62rem' }}>
                FEED ID NO.
              </Typography>
              <Typography variant="body1" sx={{ color: '#9ca3af', fontFamily: 'monospace', fontWeight: 800 }}>
                {feedId}
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <IconButton size="small" sx={{ p: 0, color: '#6b7280' }}>
                <ArrowDropUpIcon fontSize="small" />
              </IconButton>
              <IconButton size="small" sx={{ p: 0, color: '#6b7280' }}>
                <ArrowDropDownIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Typography
            variant="h4"
            sx={{
              fontFamily: '"Roboto Mono", monospace',
              fontWeight: 900,
              color: '#e5e7eb',
              letterSpacing: '0.05em',
              lineHeight: 1.1,
            }}
          >
            NODE {nodeId}
          </Typography>
          <Typography
            variant="h5"
            sx={{
              fontFamily: '"Roboto Mono", monospace',
              fontWeight: 700,
              color: '#9ca3af',
              mb: 1.5,
            }}
          >
            {sector}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 'auto' }}>
            <Typography variant="caption" sx={{ color: '#4b5563', fontFamily: 'monospace', fontSize: '0.65rem' }}>
              IP: {ip}
            </Typography>
            <Box sx={{ borderLeft: '1px solid #2a2e39', pl: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  color: '#22c55e',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  fontSize: '0.68rem',
                  display: 'block',
                }}
              >
                ENABLED
              </Typography>
              <Typography variant="caption" sx={{ color: '#6b7280', fontFamily: 'monospace', fontSize: '0.62rem' }}>
                LINK CONNECTION
              </Typography>
            </Box>
          </Box>
        </LeftColumn>

        {/* Middle Column: Status & Spec Details */}
        <MiddleColumn>
          <Box>
            <Typography
              variant="caption"
              sx={{
                color: '#ef4444',
                fontFamily: 'monospace',
                fontWeight: 900,
                letterSpacing: '0.1em',
                display: 'block',
                fontSize: '0.72rem',
              }}
            >
              STATUS
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#ef4444',
                fontFamily: '"Roboto Mono", monospace',
                fontWeight: 900,
                letterSpacing: '0.08em',
              }}
            >
              ALERT
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#dc2626',
                fontFamily: '"Roboto Mono", monospace',
                fontWeight: 800,
                letterSpacing: '0.12em',
                lineHeight: 1,
              }}
            >
              BREACH
            </Typography>
          </Box>

          <Box sx={{ my: 1 }}>
            <Typography variant="caption" sx={{ color: '#6b7280', fontFamily: 'monospace', display: 'block', fontSize: '0.65rem' }}>
              DISTANCE: <strong>0.0M</strong>
            </Typography>
            <Typography variant="caption" sx={{ color: '#6b7280', fontFamily: 'monospace', display: 'block', fontSize: '0.65rem' }}>
              RESET CODE: <strong>ALPHA-99</strong>
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IndicatorRect />
            <Typography variant="caption" sx={{ color: '#9ca3af', fontFamily: 'monospace', fontSize: '0.7rem' }}>
              FEEDS: 5-6 [ON]
            </Typography>
          </Box>
        </MiddleColumn>

        {/* Right Column: Signal Alert Segmented Equalizer */}
        <TelemetrySensorBlock
          primaryLabel="UPLOAD: 24 Bit / 26"
          secondaryLabel="DOWNLOAD: 48 / 45"
          channelLabel="SENSOR"
          topBars={[14, 18, 12, 16, 20, 15, 10, 8, 19, 14, 11, 7]}
          bottomBars={[8, 11, 15, 19, 14, 10, 6, 12, 17, 13, 9, 5]}
        />
      </CardBodyGrid>
    </CardContainer>
  );
};
