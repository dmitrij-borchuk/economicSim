import React from 'react';
import { styled } from '@mui/material/styles';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSnackbar } from 'notistack';
import { AppBar, Toolbar, Box, Typography, Button, Divider } from '@/atoms';
import {
  OperatingCapitalBadge,
  CorporateEntityBadge,
  OperatorBadge,
} from '@/molecules';
import { useAuth } from '@/libs/auth/useAuth';
import type { CompanyProfile, UserProfile } from '@/libs/store/authSlice';

export interface HeaderProps {
  company?: CompanyProfile | null;
  user?: UserProfile | null;
  onDisconnect?: () => void | Promise<void>;
}

const StyledAppBar = styled(AppBar)(() => ({
  backgroundColor: '#0c1220',
  borderBottom: '1px solid #1e293b',
  boxShadow: 'none',
}));

const BrandLogo = styled(Typography)(() => ({
  fontWeight: 900,
  letterSpacing: 2,
  color: '#38bdf8',
  display: 'flex',
  alignItems: 'center',
  gap: '8px',
}));

const DisconnectButton = styled(Button)(() => ({
  borderColor: '#334155',
  color: '#94a3b8',
  '&:hover': {
    borderColor: '#ef4444',
    color: '#fca5a5',
  },
}));

export const Header: React.FC<HeaderProps> = ({
  company: propCompany,
  user: propUser,
  onDisconnect: propOnDisconnect,
}) => {
  const auth = useAuth();
  const { enqueueSnackbar } = useSnackbar();

  const company = propCompany !== undefined ? propCompany : auth.company;
  const user = propUser !== undefined ? propUser : auth.user;

  const handleDisconnect = async () => {
    if (propOnDisconnect) {
      await propOnDisconnect();
      return;
    }
    await auth.signOut();
    enqueueSnackbar('Command session terminated. Operator logged out.', { variant: 'info' });
  };

  const operatorIdentifier = user?.email || user?.uid || 'Unknown';

  return (
    <StyledAppBar position="static">
      <Toolbar sx={{ justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <BrandLogo variant="subtitle1">
            PES
          </BrandLogo>
        </Box>

        {company && (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 3 }}>
            <OperatingCapitalBadge cashBalance={company.cashBalance} />
            <Divider orientation="vertical" flexItem sx={{ borderColor: '#1e293b' }} />
            <CorporateEntityBadge name={company.name} companyId={company.companyId} />
            <Divider orientation="vertical" flexItem sx={{ borderColor: '#1e293b' }} />
          </Box>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <OperatorBadge identifier={operatorIdentifier} />

          <DisconnectButton
            variant="outlined"
            size="small"
            onClick={handleDisconnect}
            startIcon={<LogoutIcon />}
          >
            DISCONNECT
          </DisconnectButton>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export { Header as AppHeader };
