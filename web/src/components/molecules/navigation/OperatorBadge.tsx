import React from 'react';
import { styled } from '@mui/material/styles';
import { Box, Typography } from '@/atoms';

export interface OperatorBadgeProps {
  identifier: string;
}

const OperatorBox = styled(Box)(({ theme }) => ({
  textAlign: 'right',
  display: 'none',
  [theme.breakpoints.up('md')]: {
    display: 'block',
  },
}));

const CaptionTypography = styled(Typography)(() => ({
  color: '#94a3b8',
  display: 'block',
}));

const IdentifierTypography = styled(Typography)(() => ({
  color: '#e2e8f0',
  fontWeight: 600,
}));

export const OperatorBadge: React.FC<OperatorBadgeProps> = ({ identifier }) => {
  return (
    <OperatorBox>
      <CaptionTypography variant="caption">
        OPERATOR
      </CaptionTypography>
      <IdentifierTypography variant="caption">
        {identifier}
      </IdentifierTypography>
    </OperatorBox>
  );
};
