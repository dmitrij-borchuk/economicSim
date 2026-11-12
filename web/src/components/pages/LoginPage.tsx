import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Divider,
  Alert,
  CircularProgress,
  Tabs,
  Tab,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import TerminalIcon from '@mui/icons-material/Terminal';
import GoogleIcon from '@mui/icons-material/Google';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { useAuth } from '../../libs/auth/useAuth';
import { Form, FormTextField } from '@/organisms/form';
import { DarkPageBackground } from '@/atoms';
import { useNotification } from '@/libs/shared/useNotification';

interface AuthFormValues {
  email: string;
  password: string;
  confirmPassword?: string;
}

export const LoginPage: React.FC = () => {
  const { signInEmail, signUpEmail, signInGoogle, isLoading, error } = useAuth();
  const { showError, showSuccess } = useNotification()

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);

  const form = useForm<AuthFormValues>({
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
    mode: 'onTouched',
  });

  const handleTabChange = (_: React.SyntheticEvent, newIndex: number) => {
    setTabIndex(newIndex);
    form.reset();
  };

  const onSubmit = async (values: AuthFormValues) => {

    try {
      if (tabIndex === 0) {
        await signInEmail(values.email, values.password);
      } else {
        await signUpEmail(values.email, values.password);
        showSuccess('Operator identifier registered successfully.');
      }
    } catch (err: unknown) {
      const errorMsg = (err as Error)?.message || 'Authentication sequence failed.';
      showError(errorMsg);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleLoading(true);
    try {
      await signInGoogle();
      showSuccess('Google OAuth identity linked successfully.');
    } catch (err: unknown) {
      const errorMsg = (err as Error)?.message || 'Federated OAuth link failed.';
      showError(errorMsg);
    } finally {
      setIsGoogleLoading(false);
    }
  };

  const isSubmitting = isLoading || isGoogleLoading;

  return (
    <DarkPageBackground>
      <LoginCard>
        {/* Terminal Header */}
        <TerminalHeader>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <TerminalIcon sx={{ color: '#06b6d4', fontSize: 24 }} />
            <Typography variant="subtitle2" sx={{ letterSpacing: 1.5, fontWeight: 700, color: '#f8fafc' }}>
              PLANETARY ECONOMIC SIMULATOR
            </Typography>
          </Box>
        </TerminalHeader>

        <CardContent sx={{ p: 3.5 }}>
          <Box sx={{ mb: 3, textAlign: 'center' }}>
            <Typography variant="h5" sx={{ fontWeight: 800, letterSpacing: 2, color: '#38bdf8' }}>
              TACTICAL ACCESS GATE
            </Typography>
            <Typography variant="caption" sx={{ color: '#94a3b8', display: 'block', mt: 0.5 }}>
              AUTHENTICATE PILOT CREDENTIALS TO ENTER COMMAND STATE
            </Typography>
          </Box>

          <TerminalTabs
            value={tabIndex}
            onChange={handleTabChange}
            variant="fullWidth"
          >
            <Tab icon={<VpnKeyIcon fontSize="small" />} iconPosition="start" label="SIGN IN" />
            <Tab icon={<PersonAddAltIcon fontSize="small" />} iconPosition="start" label="ENLIST" />
          </TerminalTabs>

          {(error) && (
            <Alert
              severity="error"
              sx={{
                mb: 2.5,
                bgcolor: 'rgba(239, 68, 68, 0.15)',
                color: '#fca5a5',
                border: '1px solid #dc2626',
              }}
            >
              {error}
            </Alert>
          )}

          <Form form={form} onSubmit={onSubmit}>
            <FormFieldsContainer>
              <FormTextField
                name="email"
                fullWidth
                size="small"
                label="Communication Address (Email)"
                type="email"
                autoComplete="email"
                options={{
                  required: 'Email address is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address format',
                  },
                }}
              />

              <FormTextField
                name="password"
                fullWidth
                size="small"
                label="Security Key (Password)"
                type="password"
                autoComplete={tabIndex === 0 ? 'current-password' : 'new-password'}
                options={{
                  required: 'Security key is required',
                  minLength: {
                    value: 6,
                    message: 'Security key must contain at least 6 characters',
                  },
                }}
              />

              {tabIndex === 1 && (
                <FormTextField
                  name="confirmPassword"
                  fullWidth
                  size="small"
                  label="VERIFY SECURITY KEY"
                  type="password"
                  autoComplete="new-password"
                  options={{
                    required: 'Please confirm your security key',
                    validate: (val) =>
                      val === form.getValues('password') || 'Security credentials do not match',
                  }}
                />
              )}

              <TacticalSubmitButton
                type="submit"
                fullWidth
                variant="contained"
                disabled={isSubmitting}
                startIcon={
                  isLoading ? <CircularProgress size={18} color="inherit" /> : <LockOutlinedIcon />
                }
              >
                {isLoading
                  ? 'TRANSMITTING...'
                  : tabIndex === 0
                    ? 'AUTHORIZE COMMAND SESSION'
                    : 'REGISTER OPERATOR IDENT'}
              </TacticalSubmitButton>
            </FormFieldsContainer>
          </Form>

          <Divider sx={{ my: 3, borderColor: '#1e293b' }}>
            <Typography variant="caption" sx={{ color: '#64748b', px: 1 }}>
              FEDERATED IDENT GATEWAY
            </Typography>
          </Divider>

          <TacticalGoogleButton
            fullWidth
            variant="outlined"
            onClick={handleGoogleSignIn}
            disabled={isSubmitting}
            startIcon={
              isGoogleLoading ? (
                <CircularProgress size={18} color="inherit" />
              ) : (
                <GoogleIcon />
              )
            }
          >
            {isGoogleLoading ? 'AUTHORIZING GOOGLE LINK...' : 'AUTHORIZE WITH GOOGLE'}
          </TacticalGoogleButton>
        </CardContent>
      </LoginCard>
    </DarkPageBackground>
  );
};

const LoginCard = styled(Card)(() => ({
  maxWidth: 480,
  width: '100%',
  backgroundColor: '#0d1322',
  color: '#e2e8f0',
  border: '1px solid #1e293b',
  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.7), 0 0 30px rgba(6, 182, 212, 0.1)',
  borderRadius: '8px',
  overflow: 'hidden',
}));

const TerminalHeader = styled(Box)(() => ({
  padding: '16px 24px',
  backgroundColor: '#111827',
  borderBottom: '1px solid #1f2937',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const TerminalTabs = styled(Tabs)(() => ({
  marginBottom: '24px',
  backgroundColor: '#070b14',
  borderRadius: '4px',
  '& .MuiTabs-indicator': { backgroundColor: '#06b6d4' },
  '& .MuiTab-root': {
    color: '#64748b',
    fontWeight: 600,
    letterSpacing: '1px',
    '&.Mui-selected': { color: '#38bdf8' },
  },
}));

const FormFieldsContainer = styled(Box)(() => ({
  display: 'flex',
  flexDirection: 'column',
  gap: '20px',
}));

const TacticalSubmitButton = styled(Button)(() => ({
  backgroundColor: '#0891b2',
  color: '#ffffff',
  fontWeight: 700,
  letterSpacing: '1.5px',
  paddingTop: '10px',
  paddingBottom: '10px',
  '&:hover': { backgroundColor: '#06b6d4' },
}));

const TacticalGoogleButton = styled(Button)(() => ({
  borderColor: '#334155',
  color: '#e2e8f0',
  paddingTop: '9px',
  paddingBottom: '9px',
  fontWeight: 600,
  letterSpacing: '1px',
  backgroundColor: 'rgba(15, 23, 42, 0.6)',
  '&:hover': {
    borderColor: '#06b6d4',
    backgroundColor: 'rgba(6, 182, 212, 0.1)',
  },
}));
