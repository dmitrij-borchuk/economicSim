import React from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@/atoms/layout';
import { Typography } from '@/atoms/dataDisplay';
import { MetaChip } from '@/atoms/hud';

export interface SubHeaderBarProps {
  threatLevel?: string;
  linkStatus?: string;
  ports?: string;
  region?: string;
}

const BarContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingTop: '8px',
  paddingBottom: '8px',
  flexWrap: 'wrap',
  gap: '12px',
}));

const LeftCluster = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
}));

const ThreatSection = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '4px',
  color: '#9ca3af',
}));

const RightCluster = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  gap: '16px',
}));

const SearchBox = styled(Box)(() => ({
  display: 'flex',
  alignItems: 'center',
  backgroundColor: '#111317',
  border: '1px solid #232730',
  padding: '2px 8px',
}));

export const SubHeaderBar: React.FC<SubHeaderBarProps> = ({
  threatLevel = 'LOW',
  linkStatus = 'VERIFIED',
  ports = '8080/WS',
  region = 'GLOBAL',
}) => {
  return (
    <BarContainer>
      <LeftCluster>
        <ThreatSection>
          <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#6b7280' }}>
            ◀ ▶
          </Typography>
          <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#9ca3af' }}>
            THREAT LEVEL: {threatLevel}
          </Typography>
        </ThreatSection>
        <Typography variant="caption" sx={{ color: '#4b5563' }}>
          |
        </Typography>
        <Typography variant="caption" sx={{ fontFamily: 'monospace', color: '#9ca3af' }}>
          LINK CONNECTION: {linkStatus}
        </Typography>
      </LeftCluster>

      <RightCluster>
        <MetaChip>PORTS: {ports}</MetaChip>
        <MetaChip>GRP-REG: {region}</MetaChip>
        <SearchBox>
          <Typography
            variant="caption"
            sx={{ fontFamily: 'monospace', color: '#4b5563', fontSize: '0.65rem' }}
          >
            SEARCH QUERY...
          </Typography>
        </SearchBox>
      </RightCluster>
    </BarContainer>
  );
};
