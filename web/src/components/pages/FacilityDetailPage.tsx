import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '@/libs/auth/useAuth';
import { styled } from '@/libs/styled';
import { PageTemplate } from '@/templates';
import { FacilityInspectorCard } from '@/organisms';
import { FooterInfoBar } from '@/molecules';
import { Card, CardHeader, CardContent, Paper } from '@/atoms/surfaces';
import { HudConsoleButton, HudTag, StatusPip } from '@/atoms/hud';
import { Typography } from '@/atoms/dataDisplay';
import { Flex, HeaderRow } from '@/atoms/layout';

export type FacilityDetailPageProps = Record<string, never>;

export const FacilityDetailPage: React.FC<FacilityDetailPageProps> = () => {
  const { company } = useAuth();
  const { facilityId } = useParams<{ facilityId: string }>();
  const navigate = useNavigate();

  if (!company) {
    return null;
  }

  const facilities = company.facilities ?? [];
  const inventory = company.inventory ?? [];
  const facility = facilities.find((item) => item.id === facilityId);

  const handleBackToDirectory = () => {
    navigate('/facilities');
  };

  const handleBackKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      handleBackToDirectory();
    }
  };

  const currentDirectory = `//SYSTEM/USERS/${company.companyId}/FACILITIES/${facilityId ?? 'UNKNOWN'}`;

  return (
    <PageTemplate>
      <Flex column gap={2}>
        {facility ? (
          <FacilityInspectorCard
            facility={facility}
            companyName={company.name}
            companyId={company.companyId}
            inventory={inventory}
            onBackToDirectory={handleBackToDirectory}
          />
        ) : (
          <Card component="section" aria-label="Facility Not Found">
            <CardHeader
              title={
                <HeaderRow alignCenter>
                  <Flex alignCenter gap={1.5}>
                    <HudTag variant="orange">[ TELEMETRY FAULT // 404 ]</HudTag>
                    <Typography variant="caption" color="textPrimary">
                      INSTALLATION RECORD NOT FOUND IN CORPORATE REGISTRY
                    </Typography>
                  </Flex>

                  <Flex alignCenter gap={0.75}>
                    <ErrorStatusPip />
                    <Typography variant="caption" color="error">
                      UNRESOLVED ID
                    </Typography>
                  </Flex>
                </HeaderRow>
              }
            />
            <CardContent>
              <NotFoundBox>
                <Typography variant="subtitle2" color="textPrimary">
                  NO REGISTERED FACILITY MATCHES ID: &quot;
                  {facilityId ?? 'UNKNOWN'}&quot;
                </Typography>
                <Typography variant="caption" color="textSecondary">
                  THE REQUESTED INSTALLATION DOES NOT EXIST OR IS NOT ASSIGNED
                  TO {company.name.toUpperCase()} ({company.companyId}).
                </Typography>
                <HudConsoleButton
                  role="button"
                  tabIndex={0}
                  aria-label="Return to Facilities Directory"
                  onClick={handleBackToDirectory}
                  onKeyDown={handleBackKeyDown}
                >
                  [ ← RETURN TO FACILITIES DIRECTORY ]
                </HudConsoleButton>
              </NotFoundBox>
            </CardContent>
          </Card>
        )}

        <FooterInfoBar currentDirectory={currentDirectory} />
      </Flex>
    </PageTemplate>
  );
};

const ErrorStatusPip = styled(StatusPip)(({ theme }) => ({
  backgroundColor: theme.palette.error.main,
}));

const NotFoundBox = styled(Paper)(({ theme }) => ({
  border: `1px dashed ${theme.palette.divider}`,
  padding: theme.spacing(3),
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  gap: theme.spacing(1.5),
}));
