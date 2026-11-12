import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { styled } from '@mui/material/styles';
import BusinessIcon from '@mui/icons-material/Business';
import AgricultureIcon from '@mui/icons-material/Agriculture';
import ForestIcon from '@mui/icons-material/Forest';
import PrecisionManufacturingIcon from '@mui/icons-material/PrecisionManufacturing';
import { useAuth } from '../../libs/auth/useAuth';
import { useSnackbar } from 'notistack';
import { Form, FormTextField } from '@/organisms/form';
import {
  Box,
  Typography,
  Paper,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Grid,
  Card,
  CardActionArea,
  Alert,
  CircularProgress,
  Chip,
} from '@/atoms';

interface FranchiseOption {
  id: string;
  name: string;
  badge: string;
  icon: React.ReactNode;
  facility: string;
  defaultNodeId: string;
  nodeName: string;
  starterCargo: string;
  description: string;
  color: string;
}

const FRANCHISE_OPTIONS: FranchiseOption[] = [
  {
    id: 'AGRONOMIST',
    name: 'Agronomist Franchise',
    badge: 'FOOD & CONSUMER SINK',
    icon: <AgricultureIcon sx={{ fontSize: 36, color: '#10b981' }} />,
    facility: 'Level 1 Grain Farm',
    defaultNodeId: 'node_millbrook',
    nodeName: 'Millbrook / Verdant Fields',
    starterCargo: '50 Units Grain (Q55)',
    description:
      'Steady, recession-proof cash flow selling harvested grain and milled foodstuffs to civilian consumers in Port Oakhaven.',
    color: '#10b981',
  },
  {
    id: 'FORESTER',
    name: 'Forester Franchise',
    badge: 'TIMBER & CONSTRUCTION',
    icon: <ForestIcon sx={{ fontSize: 36, color: '#f59e0b' }} />,
    facility: 'Level 1 Lumber Camp',
    defaultNodeId: 'node_pinewood',
    nodeName: 'Pinewood / Whispering Pines',
    starterCargo: '40 Units Timber (Q50)',
    description:
      'Harvest heavy timber and supply structural planks to capital builders and furniture crafting workshops.',
    color: '#f59e0b',
  },
  {
    id: 'INDUSTRIALIST',
    name: 'Industrialist Franchise',
    badge: 'METALLURGY & TOOLS',
    icon: <PrecisionManufacturingIcon sx={{ fontSize: 36, color: '#38bdf8' }} />,
    facility: 'Level 1 Iron Mine',
    defaultNodeId: 'node_ironridge',
    nodeName: 'Ironridge / Red Rock Crag',
    starterCargo: '30 Units Iron Ore (Q60)',
    description:
      'High-margin extractor of raw metal ore and building blocks essential for planetary facility upgrades and tools.',
    color: '#38bdf8',
  },
];

interface OnboardingFormValues {
  companyName: string;
  companyId: string;
}

interface CompanyOnboardingModalProps {
  open?: boolean;
}

export const CompanyOnboardingModal: React.FC<CompanyOnboardingModalProps> = ({ open = true }) => {
  const { onboardCompany, isLoading, signOut } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [selectedFranchiseId, setSelectedFranchiseId] = useState<string>('AGRONOMIST');
  const [localError, setLocalError] = useState<string | null>(null);

  const form = useForm<OnboardingFormValues>({
    defaultValues: {
      companyName: '',
      companyId: '',
    },
    mode: 'onTouched',
  });

  const selectedFranchise =
    FRANCHISE_OPTIONS.find((f) => f.id === selectedFranchiseId) || FRANCHISE_OPTIONS[0];

  const onSubmit = async (values: OnboardingFormValues) => {
    setLocalError(null);

    try {
      await onboardCompany({
        companyName: values.companyName.trim(),
        companyId: values.companyId.trim(),
        starterLicenseId: selectedFranchise.id,
        startingNodeId: selectedFranchise.defaultNodeId,
      });
      enqueueSnackbar(`Corporate charter commissioned for ${values.companyName}!`, {
        variant: 'success',
      });
    } catch (err: unknown) {
      const msg = (err as Error)?.message || 'Failed to establish corporation.';
      setLocalError(msg);
      enqueueSnackbar(msg, { variant: 'error' });
    }
  };

  if (!open) {
    return null;
  }

  return (
    <OnboardingPaper>
      <Form form={form} onSubmit={onSubmit}>
        <ModalTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <BusinessIcon sx={{ color: '#06b6d4', fontSize: 28 }} />
            <Box>
              <Typography variant="h6" sx={{ fontWeight: 800, letterSpacing: 1.5, color: '#f8fafc' }}>
                CORPORATE CHARTER COMMISSION
              </Typography>
              <Typography variant="caption" sx={{ color: '#94a3b8' }}>
                STEP 2/2: FOUND YOUR COMMERCIAL ENTERPRISE IN OAKHAVEN BASIN
              </Typography>
            </Box>
          </Box>
        </ModalTitle>

        <DialogContent sx={{ p: 3.5 }}>
          <Box sx={{ pt: 3.5 }}>

            {localError && (
              <Alert
                severity="error"
                sx={{
                  mb: 3,
                  bgcolor: 'rgba(239, 68, 68, 0.15)',
                  color: '#fca5a5',
                  border: '1px solid #dc2626',
                }}
              >
                {localError}
              </Alert>
            )}

            {/* Company Identifiers */}
            <Typography variant="subtitle2" sx={{ color: '#38bdf8', letterSpacing: 1, mb: 1.5 }}>
              1. ENTERPRISE IDENTIFICATION
            </Typography>

            <IdentifierRow>
              <FormTextField
                name="companyName"
                fullWidth
                size="small"
                label="Enterprise Name"
                placeholder="e.g. Apex Industrial Dynamics"
                options={{
                  required: 'Please designate an Enterprise Name',
                  minLength: {
                    value: 3,
                    message: 'Enterprise Name must be at least 3 characters',
                  },
                }}
              />

              <FormTextField
                name="companyId"
                fullWidth
                size="small"
                label="Company ID (Handle)"
                placeholder="e.g. APEX-IND-99"
                options={{
                  required: 'Please designate a Company ID',
                  pattern: {
                    value: /^[A-Z0-9_-]+$/i,
                    message: 'Only alphanumeric characters, hyphens, and underscores are allowed',
                  },
                }}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  const upper = e.target.value.toUpperCase().replace(/[^A-Z0-9_-]/g, '');
                  form.setValue('companyId', upper, { shouldValidate: true });
                }}
                helperText="Unique corporate identifier. Alphanumeric, hyphens, and underscores."
                sx={{
                  '& .MuiInputBase-input': {
                    fontFamily: 'monospace',
                    letterSpacing: '1.5px',
                    fontWeight: 600,
                  },
                }}
              />
            </IdentifierRow>

            {/* Franchise License Selection */}
            <Typography variant="subtitle2" sx={{ color: '#38bdf8', letterSpacing: 1, mb: 1.5 }}>
              2. SELECT STARTER FRANCHISE LICENSE
            </Typography>

            <Grid container spacing={2}>
              {FRANCHISE_OPTIONS.map((franchise) => {
                const isSelected = selectedFranchiseId === franchise.id;
                return (
                  <Grid size={{ xs: 12, md: 4 }} key={franchise.id}>
                    <FranchiseCard
                      selected={isSelected}
                      color={franchise.color}
                    >
                      <CardActionArea
                        onClick={() => setSelectedFranchiseId(franchise.id)}
                        sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}
                      >
                        <Box sx={{ mb: 1.5 }}>{franchise.icon}</Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800, color: '#f8fafc', mb: 0.5 }}>
                          {franchise.name}
                        </Typography>
                        <Chip
                          size="small"
                          label={franchise.badge}
                          sx={{
                            bgcolor: `${franchise.color}20`,
                            color: franchise.color,
                            border: `1px solid ${franchise.color}50`,
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            mb: 1.5,
                          }}
                        />
                        <Typography variant="body2" sx={{ color: '#94a3b8', fontSize: '0.8rem', mb: 2 }}>
                          {franchise.description}
                        </Typography>

                        <Box
                          sx={{
                            mt: 'auto',
                            width: '100%',
                            p: 1.2,
                            bgcolor: 'rgba(15, 23, 42, 0.6)',
                            borderRadius: 1,
                            border: '1px solid #1e293b',
                          }}
                        >
                          <Typography variant="caption" sx={{ color: '#64748b', display: 'block' }}>
                            ASSETS GRANTED:
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#e2e8f0', display: 'block', fontWeight: 600 }}>
                            • {franchise.facility}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#e2e8f0', display: 'block', fontWeight: 600 }}>
                            • {franchise.starterCargo}
                          </Typography>
                          <Typography variant="caption" sx={{ color: '#38bdf8', display: 'block', fontWeight: 600 }}>
                            • Sector: {franchise.nodeName}
                          </Typography>
                        </Box>
                      </CardActionArea>
                    </FranchiseCard>
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        </DialogContent>

        <ModalActions>
          <Button
            variant="text"
            onClick={signOut}
            sx={{ color: '#64748b', '&:hover': { color: '#ef4444' } }}
          >
            DISCONNECT SESSION
          </Button>

          <CommissionButton
            type="submit"
            variant="contained"
            disabled={isLoading}
            startIcon={isLoading ? <CircularProgress size={18} color="inherit" /> : <BusinessIcon />}
          >
            {isLoading ? 'COMMISSIONING...' : 'ESTABLISH CORPORATION'}
          </CommissionButton>
        </ModalActions>
      </Form>
    </OnboardingPaper>
  );
};

const OnboardingPaper = styled(Paper)(({ theme }) => ({
  backgroundColor: '#0c1220',
  color: '#e2e8f0',
  border: '1px solid #1e293b',
  boxShadow: '0 25px 50px rgba(0, 0, 0, 0.9), 0 0 40px rgba(6, 182, 212, 0.15)',
  borderRadius: '8px',
  maxWidth: theme.breakpoints.values.md,
  width: '100%',
  overflow: 'hidden',
  margin: '0 auto',
}));

const ModalTitle = styled(DialogTitle)(() => ({
  padding: '20px 24px',
  backgroundColor: '#111827',
  borderBottom: '1px solid #1f2937',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const IdentifierRow = styled(Box)(({ theme }) => ({
  display: 'flex',
  gap: '20px',
  marginBottom: '32px',
  [theme.breakpoints.down('sm')]: {
    flexDirection: 'column',
  },
}));

const FranchiseCard = styled(Card, {
  shouldForwardProp: (prop) => prop !== 'selected' && prop !== 'color',
})<{ selected?: boolean; color?: string }>(({ selected, color }) => ({
  height: '100%',
  backgroundColor: selected ? 'rgba(6, 182, 212, 0.08)' : '#070b14',
  border: `1.5px solid ${selected ? color : '#1e293b'}`,
  boxShadow: selected ? `0 0 20px ${color}25` : 'none',
  transition: 'all 0.2s ease',
  borderRadius: '12px',
}));

const ModalActions = styled(DialogActions)(() => ({
  padding: '20px 28px',
  backgroundColor: '#0a0f1c',
  borderTop: '1px solid #1f2937',
  justifyContent: 'space-between',
}));

const CommissionButton = styled(Button)(() => ({
  backgroundColor: '#0891b2',
  color: '#ffffff',
  fontWeight: 700,
  letterSpacing: '1.5px',
  padding: '10px 24px',
  '&:hover': { backgroundColor: '#06b6d4' },
}));
