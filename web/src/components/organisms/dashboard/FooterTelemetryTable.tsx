import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@/atoms/layout';
import { FooterTableRow, type FooterTableRowProps } from '@/molecules/terminal';
import { QueryPromptBar } from '@/molecules/hud';

export interface FooterTelemetryTableProps {
  rows?: FooterTableRowProps[];
}

const TableContainer = styled(Box)(() => ({
  marginTop: '20px',
  backgroundColor: '#0b0d12',
  border: '1px solid #1a202c',
  padding: '8px',
}));

const TableHeader = styled(Box)(() => ({
  display: 'flex',
  padding: '6px 12px',
  backgroundColor: '#131822',
  fontFamily: 'monospace',
  fontSize: '0.68rem',
  fontWeight: 800,
  letterSpacing: '0.05em',
  borderBottom: '1px solid #1f2635',
}));

const ColOrange = styled(Box)(() => ({
  flex: 1.2,
  color: '#f97316',
}));

const ColWhite = styled(Box)(() => ({
  flex: 1,
  color: '#e5e7eb',
}));

const ColMuted = styled(Box)(() => ({
  flex: 1,
  color: '#9ca3af',
}));

const RowsWrapper = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '2px',
  marginTop: '4px',
  marginBottom: '4px',
}));

const DEFAULT_ROWS: FooterTableRowProps[] = [
  {
    id: '1',
    lic: 'LIC.NYNY INC: ALL LIC',
    time: '04/02/26 18:36',
    tabA: 'TAB 1 - 7',
    tabB: 'TAB 1 - 7',
    vin: 'VIN ID: -ACTIVE',
  },
  {
    id: '2',
    lic: 'LIC.LACA INC: ALL LIC INC: SSN',
    time: '04/02/26 14:42',
    tabA: 'TAB 8 - 11',
    tabB: 'TAB 8 - 11',
    vin: 'VIN ID: -SEARCH',
  },
  {
    id: '3',
    lic: 'LOC.TS OSSET.ALL VARS.UN',
    time: '04/02/26 12:50',
    tabA: 'TAB 20 - 30',
    tabB: 'TAB 20 - 30',
    vin: 'VIN ID: -ACTIVE',
  },
  {
    id: '4',
    lic: 'TRML5.AUDIO.030217',
    time: '03/02/26 19:29',
    tabA: 'CONNECTION : STABLE...',
    tabB: 'CONNECTION : STABLE...',
    vin: 'VIN ID: -SEARCH',
  },
];

export const FooterTelemetryTable: React.FC<FooterTelemetryTableProps> = ({ rows = DEFAULT_ROWS }) => {
  return (
    <TableContainer>
      <TableHeader>
        <ColOrange>INC: SSN PLANEJET LOC</ColOrange>
        <ColWhite>SEARCHING...</ColWhite>
        <ColMuted>LOCATION ▶</ColMuted>
        <ColMuted>LOCATION ▶</ColMuted>
        <ColMuted>STATUS ▶</ColMuted>
      </TableHeader>

      <RowsWrapper>
        {rows.map((row) => (
          <FooterTableRow
            key={row.id}
            id={row.id}
            lic={row.lic}
            time={row.time}
            tabA={row.tabA}
            tabB={row.tabB}
            vin={row.vin}
          />
        ))}
      </RowsWrapper>

      <QueryPromptBar />
    </TableContainer>
  );
};
