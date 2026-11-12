import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@/atoms';

export interface CorporateEntityBadgeProps {
  name: string;
  companyId: string;
}

const CaptionTypography = styled(Typography)(() => ({
  color: '#64748b',
  display: 'block',
}));

const EntityNameTypography = styled(Typography)(() => ({
  fontWeight: 700,
  color: '#f8fafc',
}));

export const CorporateEntityBadge: React.FC<CorporateEntityBadgeProps> = ({ name, companyId }) => {
  return (
    <Box sx={{ textAlign: 'right' }}>
      <CaptionTypography variant="caption">
        CORPORATE ENTITY
      </CaptionTypography>
      <EntityNameTypography variant="subtitle2">
        {name} ({companyId})
      </EntityNameTypography>
    </Box>
  );
};
