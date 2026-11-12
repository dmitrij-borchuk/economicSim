import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@/atoms/layout';
import { Typography } from '@/atoms/dataDisplay';

export interface FooterInfoBarProps {
  currentDirectory: string;
  ipAddress?: string;
  terminalId?: string;
}

const InfoBarContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '8px 12px',
  backgroundColor: '#090b10',
  borderTop: '1px solid #161a24',
  marginTop: '12px',
  flexWrap: 'wrap',
  gap: '8px',
}));

const DirectoryCluster = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}));

const SystemTag = styled(Box)(() => ({
  padding: '0 4px',
  backgroundColor: '#ea580c',
  color: '#ffffff',
  fontSize: '0.6rem',
  fontFamily: 'monospace',
  fontWeight: 700,
}));

const InfoText = styled(Typography)(() => ({
  color: '#6b7280',
  fontFamily: 'monospace',
  fontSize: '0.65rem',
}));

const RightCluster = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
}));

const TerminalIdBox = styled(Box)(() => ({
  borderLeft: '1px solid #1f242e',
  paddingLeft: '8px',
}));

export const FooterInfoBar: React.FC<FooterInfoBarProps> = ({
  currentDirectory,
  ipAddress = '192.168.23.36',
  terminalId = 'TRML - 004',
}) => {
  return (
    <InfoBarContainer>
      <DirectoryCluster>
        <SystemTag>S</SystemTag>
        <InfoText variant="caption">{currentDirectory}</InfoText>
      </DirectoryCluster>

      <RightCluster>
        <InfoText variant="caption">IP: ADDRESSS -- {ipAddress}</InfoText>
        <TerminalIdBox>
          <Typography variant="caption" sx={{ color: '#9ca3af', fontFamily: 'monospace', fontSize: '0.65rem' }}>
            {terminalId}
          </Typography>
        </TerminalIdBox>
      </RightCluster>
    </InfoBarContainer>
  );
};
