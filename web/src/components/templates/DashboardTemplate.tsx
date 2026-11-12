import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@/atoms/layout';

export interface DashboardTemplateProps {
  header: React.ReactNode;
  telemetry: React.ReactNode;
  terminalStream: React.ReactNode;
  schematic: React.ReactNode;
  footer: React.ReactNode;
  footerInfo: React.ReactNode;
}

const HUDContainer = styled(Box)(() => ({
  backgroundColor: '#090a0f',
  color: '#e2e8f0',
  minHeight: '100vh',
  padding: '16px 24px',
  fontFamily: '"Roboto Mono", monospace',
}));

const TelemetrySection = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '16px',
  marginTop: '16px',
  marginBottom: '16px',
}));

export const DashboardTemplate: React.FC<DashboardTemplateProps> = ({
  header,
  telemetry,
  terminalStream,
  schematic,
  footer,
  footerInfo,
}) => {
  return (
    <HUDContainer>
      {/* 1. Header Strip & Sub-header */}
      {header}

      {/* 2. Sensor & Treasury Telemetry Modules */}
      <TelemetrySection>{telemetry}</TelemetrySection>

      {/* 3. Directory Finder & Split Terminal Stream */}
      {terminalStream}

      {/* 4. Schematic Blueprint & Diagnostics */}
      {schematic}

      {/* 5. Footer Telemetry & Prompt */}
      {footer}

      {/* 6. Footer System Information */}
      {footerInfo}
    </HUDContainer>
  );
};
