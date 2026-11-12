import React from 'react';
import { styled } from '@mui/material/styles';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { Box } from '@/atoms/layout';
import { Typography } from '@/atoms/dataDisplay';
import { IconButton } from '@/atoms/inputs';
import { HudConsoleButton } from '@/atoms/hud';
import { TelemetrySensorBlock } from '@/molecules/telemetry';

export interface TreasuryTelemetryCardProps {
  cashBalance: number | string;
  companyName: string;
  franchise: string;
  reputation?: number;
  ledgerId?: string;
  ip?: string;
  consoleActive: boolean;
  onToggleConsole: () => void;
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

export const TreasuryTelemetryCard: React.FC<TreasuryTelemetryCardProps> = ({
  cashBalance,
  companyName,
  franchise,
  reputation = 100,
  ledgerId = '3500',
  ip = '227.61.222.135',
  consoleActive,
  onToggleConsole,
}) => {
  return (
    <CardContainer>
      <CardHeaderStrip>
        <HeaderCaption variant="caption">| FINANCIAL STATUS</HeaderCaption>
        <HeaderCaption variant="caption">| SPEC DETAILS</HeaderCaption>
        <HeaderCaption variant="caption">| LIQUIDITY MONITOR</HeaderCaption>
      </CardHeaderStrip>

      <CardBodyGrid>
        {/* Left Column: ID & Major Callout */}
        <LeftColumn>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
            <Box>
              <Typography variant="caption" sx={{ color: '#6b7280', fontFamily: 'monospace', fontSize: '0.62rem' }}>
                LEDGER ID NO.
              </Typography>
              <Typography variant="body1" sx={{ color: '#9ca3af', fontFamily: 'monospace', fontWeight: 800 }}>
                {ledgerId}
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
              color: '#34d399',
              letterSpacing: '0.05em',
              lineHeight: 1.1,
            }}
          >
            ${Number(cashBalance).toLocaleString('en-US', { minimumFractionDigits: 2 })}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontFamily: '"Roboto Mono", monospace',
              fontWeight: 700,
              color: '#9ca3af',
              mb: 1.5,
            }}
          >
            CORP: {companyName.toUpperCase()}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mt: 'auto' }}>
            <Typography variant="caption" sx={{ color: '#4b5563', fontFamily: 'monospace', fontSize: '0.65rem' }}>
              IP: {ip}
            </Typography>
            <Box sx={{ borderLeft: '1px solid #2a2e39', pl: 1 }}>
              <Typography
                variant="caption"
                sx={{
                  color: '#38bdf8',
                  fontFamily: 'monospace',
                  fontWeight: 700,
                  fontSize: '0.68rem',
                  display: 'block',
                }}
              >
                FRANCHISE: {franchise}
              </Typography>
              <Typography variant="caption" sx={{ color: '#6b7280', fontFamily: 'monospace', fontSize: '0.62rem' }}>
                REPUTATION: {reputation} PTS
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
                color: '#22c55e',
                fontFamily: 'monospace',
                fontWeight: 900,
                letterSpacing: '0.1em',
                display: 'block',
                fontSize: '0.72rem',
              }}
            >
              RESERVES
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: '#22c55e',
                fontFamily: '"Roboto Mono", monospace',
                fontWeight: 900,
                letterSpacing: '0.08em',
              }}
            >
              OPTIMAL
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#10b981',
                fontFamily: '"Roboto Mono", monospace',
                fontWeight: 800,
                letterSpacing: '0.12em',
                lineHeight: 1,
              }}
            >
              SOLVENT
            </Typography>
          </Box>

          <Box sx={{ my: 1 }}>
            <Box sx={{ mb: 0.5 }}>
              <HudConsoleButton active={consoleActive} onClick={onToggleConsole}>
                CODE CONSOLE {consoleActive ? '[ON]' : '[OFF]'}
              </HudConsoleButton>
            </Box>
            <Typography variant="caption" sx={{ color: '#6b7280', fontFamily: 'monospace', display: 'block', fontSize: '0.65rem' }}>
              RESERVE RATIO: <strong>99.4%</strong>
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <IndicatorRect />
            <Typography variant="caption" sx={{ color: '#9ca3af', fontFamily: 'monospace', fontSize: '0.7rem' }}>
              FEEDS: 1-4 [ACTIVE]
            </Typography>
          </Box>
        </MiddleColumn>

        {/* Right Column: Signal Alert Segmented Equalizer */}
        <TelemetrySensorBlock
          primaryLabel="FLOW RATE: +12.4 CR/TICK"
          secondaryLabel="VOLATILITY: 0.04%"
          channelLabel="RESERVES"
          topBars={[18, 16, 20, 22, 19, 17, 14, 12, 16, 18, 15, 12]}
          bottomBars={[12, 15, 18, 16, 14, 11, 9, 14, 16, 13, 10, 8]}
        />
      </CardBodyGrid>
    </CardContainer>
  );
};
