import React from 'react';
import { styled } from '@mui/material/styles';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import { Box } from '@/atoms/layout';
import { Typography } from '@/atoms/dataDisplay';
import { HudTag } from '@/atoms/hud';
import { TerminalLogRow, CompileLogRow, type TerminalBadgeType, type CompileBadgeType } from '@/molecules/terminal';

export interface CommandLogItem {
  command: string;
  time: string;
  badge?: TerminalBadgeType;
}

export interface CompileLogItem {
  id: string;
  name: string;
  time: string;
  status: string;
  badge?: CompileBadgeType;
}

export interface TerminalStreamSectionProps {
  startingNodeId: string;
  licenseName?: string;
}

const HeaderStrip = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '6px 12px',
  backgroundColor: '#11141c',
  border: '1px solid #1f2533',
  marginTop: '16px',
}));

const HeaderLeft = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
}));

const HeaderRight = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '12px',
}));

const StreamContainer = styled(Box)(() => ({
  display: 'flex',
  flexWrap: 'wrap',
  backgroundColor: '#0b0d12',
  border: '1px solid #1a202c',
  borderTop: 'none',
  padding: '8px',
  gap: '8px',
}));

const TableHeader = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  padding: '4px 8px',
  backgroundColor: '#131720',
  borderBottom: '1px solid #1e2430',
}));

const LeftTableContainer = styled(Box)(({ theme }) => ({
  flex: 1,
  minWidth: '100%',
  [theme.breakpoints.up('md')]: {
    minWidth: '45%',
    paddingRight: '8px',
  },
}));

const RightTableContainer = styled(Box)(({ theme }) => ({
  flex: 1.2,
  minWidth: '100%',
  [theme.breakpoints.up('md')]: {
    minWidth: '55%',
    borderLeft: '1px solid #1f232b',
    paddingLeft: '8px',
  },
}));

const TableHeaderCaption = styled(Typography)(() => ({
  fontFamily: 'monospace',
  fontWeight: 700,
  color: '#9ca3af',
}));

const DEFAULT_COMMANDS: CommandLogItem[] = [
  { command: '1 MARKET TICK SYNC', time: '18:36' },
  { command: '2 AUTH REFRESH TOKEN', time: '18:36', badge: 'orange' },
  { command: '3 LEDGER RECONCILE', time: '18:36' },
  { command: '4 NODE TELEMETRY POLLING', time: '18:36', badge: 'orange' },
  { command: '! ORDERBOOK SPREAD ALERT', time: '18:36', badge: 'red' },
  { command: '1 AUTO SYS COMMENCE', time: '18:36' },
  { command: '1 AUTO SYS VALIDATE', time: '18:36' },
  { command: '1 AUTO SYS VERIFY HASH', time: '18:36' },
  { command: '1 AUTO SYS COMMS OPEN', time: '18:36' },
  { command: '1 AUTO SYS SYNC TICK', time: '18:36' },
  { command: '1 AUTO SYS WRITE LOG', time: '18:36' },
  { command: '1 AUTO SYS DUMP MEM', time: '18:36' },
  { command: '1 MAN AOU READOUT', time: '18:36' },
  { command: '2 ENTER MATE LOGISTICS', time: '18:36', badge: 'orange' },
  { command: '3 ENTER SYS REGISTRY', time: '18:36' },
  { command: '4 SAC PROTOCOL 9', time: '18:36' },
  { command: '1 AUTO SYS REST', time: '18:36' },
];

export const TerminalStreamSection: React.FC<TerminalStreamSectionProps> = ({
  startingNodeId,
  licenseName = 'GENERAL',
}) => {
  const compileLogs: CompileLogItem[] = [
    { id: '1', name: `LIC.NYNY INC: ALL LIC (${licenseName})`, time: '04/02/26 18:36', status: '18:36' },
    { id: '2', name: 'LIC.LACA INC: ALL LIC INC: SSN', time: '04/02/26 14:42', status: '18:36', badge: 'orange' },
    { id: '3', name: 'LOC.TS OSSET.ALL VARS.UN', time: '04/02/26 12:50', status: '18:36' },
    { id: '4', name: 'TRML5.AUDIO.030217', time: '03/02/26 19:29', status: '18:36', badge: 'red' },
    { id: '1', name: 'LIC.NYNY INC: ALL LIC', time: '04/02/26 18:36', status: '18:36' },
    { id: '2', name: 'LIC.LACA INC: ALL LIC INC: SSN', time: '04/02/26 14:42', status: '18:36', badge: 'orange' },
    { id: '3', name: 'LOC.TS OSSET.ALL VARS.UN', time: '04/02/26 12:50', status: '18:36' },
    { id: '4', name: 'TRML5.AUDIO.030217', time: '03/02/26 19:29', status: '18:36', badge: 'red' },
    { id: '1', name: 'LIC.NYNY INC: ALL LIC', time: '04/02/26 18:36', status: '18:36' },
    { id: '2', name: 'LIC.LACA INC: ALL LIC INC: SSN', time: '04/02/26 14:42', status: '18:36' },
    { id: '3', name: 'LOC.TS OSSET.ALL VARS.UN', time: '04/02/26 12:50', status: '18:36' },
    { id: '4', name: 'TRML5.AUDIO.030217', time: '03/02/26 19:29', status: '18:36' },
    { id: '2', name: 'LIC.LACA INC: ALL LIC INC: SSN', time: '04/02/26 14:42', status: '18:36' },
    { id: '1', name: 'LIC.NYNY INC: ALL LIC', time: '04/02/26 18:36', status: '18:36' },
    { id: '2', name: 'LIC.LACA INC: ALL LIC INC: SSN', time: '04/02/26 14:42', status: '18:36' },
    { id: '4', name: 'TRML5.AUDIO.030217', time: '03/02/26 19:29', status: '18:36' },
    { id: '1', name: 'LIC.NYNY INC: ALL LIC', time: '04/02/26 18:36', status: '18:36' },
  ];

  return (
    <Box>
      <HeaderStrip>
        <HeaderLeft>
          <Typography
            variant="caption"
            sx={{
              fontFamily: 'monospace',
              fontWeight: 800,
              color: '#d1d5db',
              letterSpacing: '0.1em',
            }}
          >
            DIRECTORY FINDER
          </Typography>
          <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#6b7280', fontSize: '0.68rem' }}>
            //SYS/ECONOMIC_SIM/NODES/{startingNodeId}/ENGINE_DIAG/PKG/ES
          </Typography>
        </HeaderLeft>

        <HeaderRight>
          <HudTag variant="orange">SENSOR FEEDS ▼</HudTag>
          <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#9ca3af', fontSize: '0.7rem' }}>
            TRK PNT
          </Typography>
          <CropSquareIcon sx={{ fontSize: 14, color: '#9ca3af' }} />
        </HeaderRight>
      </HeaderStrip>

      <StreamContainer>
        {/* Left Table: Commands & Log */}
        <LeftTableContainer>
          <TableHeader>
            <TableHeaderCaption variant="caption">COMMANDS</TableHeaderCaption>
            <TableHeaderCaption variant="caption">LOG</TableHeaderCaption>
          </TableHeader>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px', mt: 0.5 }}>
            {DEFAULT_COMMANDS.map((item, idx) => (
              <TerminalLogRow key={idx} command={item.command} time={item.time} badge={item.badge} />
            ))}
          </Box>
        </LeftTableContainer>

        {/* Right Table: Compile & Module Status */}
        <RightTableContainer>
          <TableHeader>
            <TableHeaderCaption variant="caption">COMPILE</TableHeaderCaption>
            <TableHeaderCaption variant="caption">INC: LIC DOM TORRETO S_USER</TableHeaderCaption>
            <TableHeaderCaption variant="caption">LOG ▼</TableHeaderCaption>
          </TableHeader>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: '2px', mt: 0.5 }}>
            {compileLogs.map((item, idx) => (
              <CompileLogRow
                key={idx}
                id={item.id}
                name={item.name}
                time={item.time}
                status={item.status}
                badge={item.badge}
              />
            ))}
          </Box>
        </RightTableContainer>
      </StreamContainer>
    </Box>
  );
};
