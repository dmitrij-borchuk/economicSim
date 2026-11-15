import React, { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/libs/auth/useAuth';
import { calculatePortfolioSummary } from '@/libs/facilities';
import { styled } from '@/libs/styled';
import { PageTemplate } from '@/templates';
import { FacilitiesSummaryBanner, FacilityRosterCard } from '@/organisms';
import { FooterInfoBar } from '@/molecules';
import { Card, CardContent, Paper } from '@/atoms/surfaces';
import { Typography } from '@/atoms/dataDisplay';
import { Flex } from '@/atoms/layout';

export type FacilitiesPageProps = Record<string, never>;

export const FacilitiesPage: React.FC<FacilitiesPageProps> = () => {
  const { company } = useAuth();
  const navigate = useNavigate();

  const facilities = useMemo(
    () => company?.facilities ?? [],
    [company?.facilities]
  );

  const summary = useMemo(
    () => calculatePortfolioSummary(facilities),
    [facilities]
  );

  if (!company) {
    return null;
  }

  const handleInspectFacility = (facilityId: string) => {
    navigate(`/facilities/${facilityId}`);
  };

  const currentDirectory = `//SYSTEM/USERS/${company.companyId}/NODE_${company.startingNodeId}/FACILITIES.DIR`;

  return (
    <PageTemplate>
      <Flex column gap={2}>
        <FacilitiesSummaryBanner
          companyName={company.name}
          companyId={company.companyId}
          startingNodeId={company.startingNodeId}
          summary={summary}
        />

        {facilities.length > 0 ? (
          <Flex column gap={1.5}>
            {facilities.map((facility) => (
              <FacilityRosterCard
                key={facility.id}
                facility={facility}
                onInspect={handleInspectFacility}
              />
            ))}
          </Flex>
        ) : (
          <Card component="section" aria-label="Empty Facilities State">
            <CardContent>
              <EmptyStateBox>
                <Typography variant="caption" color="textSecondary">
                  NO ACTIVE FACILITIES REGISTERED IN CORPORATE MANIFEST
                </Typography>
              </EmptyStateBox>
            </CardContent>
          </Card>
        )}

        <FooterInfoBar currentDirectory={currentDirectory} />
      </Flex>
    </PageTemplate>
  );
};

const EmptyStateBox = styled(Paper)(({ theme }) => ({
  border: `1px dashed ${theme.palette.divider}`,
  padding: theme.spacing(3),
  textAlign: 'center',
}));
