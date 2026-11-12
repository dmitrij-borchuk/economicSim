import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CompanyOnboardingModal } from '../auth/CompanyOnboardingModal';
import { useAuth } from '../../libs/auth/useAuth';

export const OnboardingPage: React.FC = () => {
  const { hasCompany } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (hasCompany) {
      navigate('/', { replace: true });
    }
  }, [hasCompany, navigate]);

  return (
    <OnboardingBackground>
      <CompanyOnboardingModal open={true} />
    </OnboardingBackground>
  );
};

const OnboardingBackground = styled(Box)(() => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '24px 16px',
  backgroundColor: '#070b14',
  backgroundImage:
    'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(6, 182, 212, 0.15), rgba(7, 11, 20, 0.95))',
}));
