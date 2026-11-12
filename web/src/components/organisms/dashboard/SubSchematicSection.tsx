import React from 'react';
import { styled } from '@mui/material/styles';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked';
import { Box } from '@/atoms/layout';
import { Typography } from '@/atoms/dataDisplay';
import { HudTag, SectorPill, SectorMetricTag, SecondarySwitch } from '@/atoms/hud';
import { DiagnosticActionRow, FaderGroup, LogicBypassControls } from '@/molecules/telemetry';
import { SubmarineSchematicCanvas } from './SubmarineSchematicCanvas';

export interface SubSchematicSectionProps {
  selectedSec: number;
  onSelectSec: (sec: number) => void;
  codeConsoleActive: Record<string, boolean>;
  onToggleConsole: (key: string) => void;
}

const HeaderStrip = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  padding: '6px 12px',
  backgroundColor: '#11141c',
  border: '1px solid #1f2533',
  marginTop: '20px',
}));

const HeaderLeft = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '30%',
  },
}));

const HeaderRight = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '70%',
  },
}));

const SchematicContainer = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  backgroundColor: '#0b0d12',
  border: '1px solid #1a202c',
  borderTop: 'none',
  padding: '16px',
}));

const LeftColumn = styled(Box)(({ theme }) => ({
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  [theme.breakpoints.up('md')]: {
    width: '28%',
    paddingRight: '16px',
    borderRight: '1px solid #1f232b',
  },
}));

const RightColumn = styled(Box)(({ theme }) => ({
  width: '100%',
  [theme.breakpoints.up('md')]: {
    width: '72%',
    paddingLeft: '16px',
  },
}));

const SectorPillsContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  marginTop: '8px',
  paddingLeft: '16px',
  paddingRight: '16px',
}));

const LowerTelemetryRow = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '16px',
  marginTop: '24px',
  paddingTop: '16px',
  borderTop: '1px solid #1a202c',
}));

const ScanProtocolBox = styled(Box)(() => ({
  flex: 1,
  minWidth: '180px',
}));

const ProtocolHeader = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
  marginBottom: '8px',
}));

const SectorTagsContainer = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
  marginTop: '16px',
}));

const SecondarySwitchesContainer = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: '12px',
  marginTop: '8px',
}));

export const SubSchematicSection: React.FC<SubSchematicSectionProps> = ({
  selectedSec,
  onSelectSec,
  codeConsoleActive,
  onToggleConsole,
}) => {
  return (
    <Box>
      <HeaderStrip>
        <HeaderLeft>
          <HudTag variant="orange">CONSOLE SELECT ▼</HudTag>
        </HeaderLeft>
        <HeaderRight>
          <HudTag variant="orange">SUB SCHEMATIC ▼</HudTag>
          <Typography
            variant="caption"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 800,
              color: '#d1d5db',
              letterSpacing: '0.1em',
            }}
          >
            VIEW: TOP
          </Typography>
        </HeaderRight>
      </HeaderStrip>

      <SchematicContainer>
        {/* Left Side: Diagnostics Controls */}
        <LeftColumn>
          <DiagnosticActionRow
            title="DIAGNOSTICS"
            variant="darkGreen"
            consoleActive={Boolean(codeConsoleActive['diag'])}
            onToggleConsole={() => onToggleConsole('diag')}
          />

          <DiagnosticActionRow
            title="METRICS"
            variant="darkGrey"
            consoleActive={Boolean(codeConsoleActive['metrics'])}
            onToggleConsole={() => onToggleConsole('metrics')}
          />

          <DiagnosticActionRow
            title="CHART"
            variant="darkGrey"
            consoleActive={Boolean(codeConsoleActive['chart'])}
            onToggleConsole={() => onToggleConsole('chart')}
          />

          {/* Bottom Diagnostics Readout */}
          <Box sx={{ mt: 'auto', pt: 2 }}>
            <Typography
              variant="caption"
              sx={{ color: '#9ca3af', fontFamily: 'monospace', fontWeight: 800, display: 'block', fontSize: '0.75rem' }}
            >
              STATUS
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
              ACTIVE
            </Typography>
            <Typography
              variant="caption"
              sx={{ color: '#9ca3af', fontFamily: 'monospace', fontWeight: 800, mt: 1, display: 'block', fontSize: '0.75rem' }}
            >
              SCHED
            </Typography>
            <Typography
              variant="h6"
              sx={{
                color: '#e5e7eb',
                fontFamily: '"Roboto Mono", monospace',
                fontWeight: 800,
                letterSpacing: '0.08em',
              }}
            >
              READY
            </Typography>

            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
              <Box sx={{ px: 0.75, py: 0.25, bgcolor: '#14532d', color: '#4ade80', fontSize: '0.65rem', fontFamily: 'monospace' }}>
                EEC
              </Box>
              <Typography variant="caption" sx={{ color: '#e5e7eb', fontFamily: 'monospace', fontWeight: 700 }}>
                FEEDS 5-6
              </Typography>
              <Typography variant="caption" sx={{ color: '#6b7280', fontFamily: 'monospace', ml: 'auto' }}>
                DN
              </Typography>
            </Box>

            <Box sx={{ mt: 1 }}>
              <Typography variant="caption" sx={{ color: '#6b7280', fontFamily: 'monospace', display: 'block', fontSize: '0.65rem' }}>
                UPLOAD 24 Bit / 26
              </Typography>
              <Typography variant="caption" sx={{ color: '#6b7280', fontFamily: 'monospace', display: 'block', fontSize: '0.65rem' }}>
                ■ DOWNLOAD 48 / 45
              </Typography>
            </Box>
          </Box>
        </LeftColumn>

        {/* Right Side: High-Tech Wireframe Schematic & Faders */}
        <RightColumn>
          <SubmarineSchematicCanvas />

          {/* Sector Labels Under Schematic */}
          <SectorPillsContainer>
            <SectorPill active={selectedSec === 1} onClick={() => onSelectSec(1)}>
              SEC 1
            </SectorPill>
            <SectorPill active={selectedSec === 2} onClick={() => onSelectSec(2)}>
              SEC 2
            </SectorPill>
            <SectorPill active={selectedSec === 3} onClick={() => onSelectSec(3)}>
              SEC 3
            </SectorPill>
            <SectorPill active={selectedSec === 4} isAlert onClick={() => onSelectSec(4)}>
              SEC 4
              <Typography
                component="span"
                sx={{
                  display: 'block',
                  color: '#ef4444',
                  fontSize: '0.55rem',
                  fontFamily: 'monospace',
                }}
              >
                SECURITY BREACH ALERT
              </Typography>
            </SectorPill>
            <SectorPill active={selectedSec === 5} onClick={() => onSelectSec(5)}>
              SEC 5
            </SectorPill>
          </SectorPillsContainer>

          {/* Lower Diagnostic Telemetry & Channel Sliders */}
          <LowerTelemetryRow>
            {/* Scan Protocols & Status */}
            <ScanProtocolBox>
              <ProtocolHeader>
                <Typography variant="caption" sx={{ color: '#9ca3af', fontFamily: 'monospace' }}>
                  &lt; &gt;
                </Typography>
                <CropSquareIcon sx={{ fontSize: 12, color: '#f97316' }} />
                <Typography variant="caption" sx={{ color: '#f97316', fontFamily: 'monospace', fontWeight: 700 }}>
                  ACTIVE - SEQ 021
                </Typography>
                <Typography variant="caption" sx={{ color: '#6b7280', fontFamily: 'monospace', ml: 'auto' }}>
                  DATA_FIELD
                </Typography>
              </ProtocolHeader>

              <Typography variant="caption" sx={{ color: '#6b7280', fontFamily: 'monospace', display: 'block', fontSize: '0.65rem' }}>
                SCAN PROTOCOLS
              </Typography>
              <Typography variant="caption" sx={{ color: '#4b5563', fontFamily: 'monospace', display: 'block', fontSize: '0.62rem' }}>
                OVR002
              </Typography>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 1 }}>
                <Typography variant="caption" sx={{ color: '#9ca3af', fontFamily: 'monospace' }}>
                  AN/ALR 45
                </Typography>
                <RadioButtonCheckedIcon sx={{ fontSize: 14, color: '#f97316' }} />
                <Typography variant="caption" sx={{ color: '#f97316', fontFamily: 'monospace' }}>
                  NORMAL
                </Typography>
              </Box>

              {/* Redundant protocol entry */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 2, mb: 1 }}>
                <Typography variant="caption" sx={{ color: '#9ca3af', fontFamily: 'monospace' }}>
                  &lt; &gt;
                </Typography>
                <CropSquareIcon sx={{ fontSize: 12, color: '#f97316' }} />
                <Typography variant="caption" sx={{ color: '#f97316', fontFamily: 'monospace', fontWeight: 700 }}>
                  ACTIVE - SEQ 021
                </Typography>
                <Typography variant="caption" sx={{ color: '#6b7280', fontFamily: 'monospace', ml: 'auto' }}>
                  DATA_FIELD
                </Typography>
              </Box>
            </ScanProtocolBox>

            {/* Fader Sliders */}
            <FaderGroup />

            {/* Right Logic Bypass & Frequencies */}
            <LogicBypassControls />
          </LowerTelemetryRow>

          {/* Sector Diagnostic Value Tags */}
          <SectorTagsContainer>
            <SectorMetricTag code="< > SEC 1" value="7.1" />
            <SectorMetricTag code="< > SEC 2" value="7.1" />
            <SectorMetricTag code="SEC 3" value="7.1" />
            <SectorMetricTag code="< > SEC 4" value="10.0" isAlert />
            <SectorMetricTag code="< > SEC 5" value="7.1" />
          </SectorTagsContainer>

          {/* Secondary Switches */}
          <SecondarySwitchesContainer>
            <SecondarySwitch label="< > TRAILS" status="6.0 OFF" />
            <SecondarySwitch label="< > TRAILS" status="6.0 OFF" />
            <SecondarySwitch label="< > TRAILS" status="6.0 OFF" />
            <SecondarySwitch label="< > RESET" status="READY" active />
            <SecondarySwitch label="< > RESET" status="READY" active />
          </SecondarySwitchesContainer>
        </RightColumn>
      </SchematicContainer>
    </Box>
  );
};
