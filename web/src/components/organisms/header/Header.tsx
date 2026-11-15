import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';
import { useSnackbar } from 'notistack';
import { alpha } from '@mui/material/styles';
import { styled } from '@/libs/styled';
import {
  AppBar,
  Toolbar,
  Box,
  Flex,
  Typography,
  Button,
  Divider,
  SectorPill,
} from '@/atoms';
import {
  OperatingCapitalBadge,
  CorporateEntityBadge,
  OperatorBadge,
} from '@/molecules';
import { useAuth } from '@/libs/auth/useAuth';
import type { CompanyProfile, UserProfile } from '@/libs/store/authSlice';

export type HeaderProps = {
  company?: CompanyProfile | null;
  user?: UserProfile | null;
  onDisconnect?: () => void | Promise<void>;
};

export const Header: React.FC<HeaderProps> = ({
  company: propCompany,
  user: propUser,
  onDisconnect: propOnDisconnect,
}) => {
  const auth = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const location = useLocation();
  const navigate = useNavigate();

  const company = propCompany !== undefined ? propCompany : auth.company;
  const user = propUser !== undefined ? propUser : auth.user;

  const isDashboardActive = location.pathname === '/';
  const isFacilitiesActive =
    location.pathname === '/facilities' ||
    location.pathname.startsWith('/facilities/');

  const handleNavigate = (path: string) => {
    navigate(path);
  };

  const handleNavKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    path: string
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigate(path);
    }
  };

  const handleDisconnect = async () => {
    if (propOnDisconnect) {
      await propOnDisconnect();
      return;
    }
    await auth.signOut();
    enqueueSnackbar('Command session terminated. Operator logged out.', {
      variant: 'info',
    });
  };

  const operatorIdentifier = user?.email || user?.uid || 'Unknown';

  return (
    <StyledAppBar position="static">
      <StyledToolbar>
        <Flex alignCenter gap={2.5}>
          <BrandLogo
            variant="subtitle1"
            onClick={() => handleNavigate('/')}
          >
            PES
          </BrandLogo>

          {company && (
            <NavContainer component="nav" aria-label="Primary">
              <NavPill
                role="link"
                tabIndex={0}
                active={isDashboardActive}
                aria-current={isDashboardActive ? 'page' : undefined}
                onClick={() => handleNavigate('/')}
                onKeyDown={(event) => handleNavKeyDown(event, '/')}
              >
                DASHBOARD
              </NavPill>
              <NavPill
                role="link"
                tabIndex={0}
                active={isFacilitiesActive}
                aria-current={isFacilitiesActive ? 'page' : undefined}
                onClick={() => handleNavigate('/facilities')}
                onKeyDown={(event) => handleNavKeyDown(event, '/facilities')}
              >
                FACILITIES
              </NavPill>
            </NavContainer>
          )}
        </Flex>

        {company && (
          <Flex alignCenter gap={3}>
            <OperatingCapitalBadge cashBalance={company.cashBalance} />
            <VerticalDivider orientation="vertical" flexItem />
            <CorporateEntityBadge
              name={company.name}
              companyId={company.companyId}
            />
            <VerticalDivider orientation="vertical" flexItem />
          </Flex>
        )}

        <Flex alignCenter gap={1.5}>
          <OperatorBadge identifier={operatorIdentifier} />

          <DisconnectButton
            variant="outlined"
            size="small"
            onClick={handleDisconnect}
            startIcon={<LogoutIcon />}
          >
            DISCONNECT
          </DisconnectButton>
        </Flex>
      </StyledToolbar>
    </StyledAppBar>
  );
};

export { Header as AppHeader };

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  borderBottom: `1px solid ${theme.palette.divider}`,
  boxShadow: 'none',
}));

const StyledToolbar = styled(Toolbar)(() => ({
  justifyContent: 'space-between',
}));

const BrandLogo = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  letterSpacing: 2,
  color: theme.palette.primary.light,
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
  cursor: 'pointer',
  userSelect: 'none',
}));

const NavContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(1),
}));

const NavPill = styled(SectorPill)(({ theme }) => ({
  '&[aria-current="page"]': {
    color: theme.palette.secondary.light,
    borderTop: `2px solid ${theme.palette.secondary.main}`,
    backgroundColor: alpha(theme.palette.secondary.main, 0.08),
  },
}));

const VerticalDivider = styled(Divider)(({ theme }) => ({
  borderColor: theme.palette.divider,
}));

const DisconnectButton = styled(Button)(({ theme }) => ({
  borderColor: theme.palette.divider,
  color: theme.palette.text.secondary,
  '&:hover': {
    borderColor: theme.palette.error.main,
    color: theme.palette.error.light,
  },
}));
