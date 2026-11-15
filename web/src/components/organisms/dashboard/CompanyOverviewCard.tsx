import React from 'react';
import { useNavigate } from 'react-router-dom';
import { formatCurrency } from '@/libs/math';
import { formatDate } from '@/libs/date';
import type { CompanyProfile } from '@/libs/store/authSlice';
import { styled } from '@/libs/styled';
import { TelemetryFieldBlock, TelemetryAssetCard } from '@/molecules/telemetry';
import { Card, CardHeader, CardContent, Paper } from '@/atoms/surfaces';
import { HudConsoleButton, HudTag, MetaChip, StatusPip } from '@/atoms/hud';
import { Typography } from '@/atoms/dataDisplay';
import { Flex, HeaderRow } from '@/atoms/layout';

export type CompanyOverviewCardProps = {
  company: CompanyProfile;
  franchise: string;
};

export const CompanyOverviewCard: React.FC<CompanyOverviewCardProps> = ({
  company,
  franchise,
}) => {
  const navigate = useNavigate();
  const formattedBalance = formatCurrency(company.cashBalance);
  const formattedDate = formatDate(company.createdAt);

  const facilities = company.facilities ?? [];
  const inventory = company.inventory ?? [];

  const handleNavigateToFacilities = () => {
    navigate('/facilities');
  };

  const handleFacilitiesKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>
  ) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      navigate('/facilities');
    }
  };

  return (
    <Card component="section" aria-label="Company Overview">
      <CardHeader
        title={
          <HeaderRow>
            <Flex alignCenter gap={1.5}>
              <HudTag variant="header">[ CHARTER ]</HudTag>
              <Typography variant="caption" color="textPrimary">
                CORPORATE REGISTRY &amp; STATIC ASSET MANIFEST
              </Typography>
            </Flex>

            <Flex alignCenter gap={1.5}>
              <MetaChip>REG ID: {company.id}</MetaChip>
              <Flex alignCenter gap={0.75}>
                <StatusPip />
                <Typography variant="caption" color="secondary.light">
                  CHARTER ACTIVE
                </Typography>
              </Flex>
            </Flex>
          </HeaderRow>
        }
      />

      <CardBodyGrid>
        {/* 1. Corporate Identity */}
        <SectionColumn column gap={1.25}>
          <SectionHeader variant="overline" color="textSecondary">
            | 01. CORPORATE IDENTITY
          </SectionHeader>

          <TelemetryFieldBlock
            label="ENTERPRISE DESIGNATION"
            value={company.name}
            tone="primary"
          />

          <TelemetryFieldBlock
            label="CORPORATE HANDLE (ID)"
            value={company.companyId}
            tone="accent"
          />

          <TelemetryFieldBlock label="COMMISSION DATE" value={formattedDate} />
        </SectionColumn>

        {/* 2. Financial & Reputation Summary */}
        <SectionColumn column gap={1.25}>
          <SectionHeader variant="overline" color="textSecondary">
            | 02. TREASURY &amp; STANDING
          </SectionHeader>

          <TelemetryFieldBlock
            label="LIQUID OPERATING CAPITAL"
            value={`$${formattedBalance} CR`}
            tone="balance"
          />

          <TelemetryFieldBlock label="FRANCHISE LICENSE">
            <HudTag variant="orange">{franchise}</HudTag>
          </TelemetryFieldBlock>

          <TelemetryFieldBlock
            label="CORPORATE REPUTATION"
            value={`${company.reputation ?? 100} PTS`}
          />
        </SectionColumn>

        {/* 3. Starting Node & Facilities */}
        <SectionColumn column gap={1.25}>
          <SectionHeaderRow alignCenter>
            <InteractiveSectionHeader
              variant="overline"
              color="textSecondary"
              onClick={handleNavigateToFacilities}
            >
              | 03. SECTOR &amp; FACILITIES ({facilities.length})
            </InteractiveSectionHeader>
            <HudConsoleButton
              role="button"
              tabIndex={0}
              aria-label="Open Facilities Directory"
              onClick={handleNavigateToFacilities}
              onKeyDown={handleFacilitiesKeyDown}
            >
              [ DIRECTORY → ]
            </HudConsoleButton>
          </SectionHeaderRow>

          <TelemetryFieldBlock
            label="HEADQUARTERS NODE"
            value={company.startingNodeId.toUpperCase()}
            tone="accent"
          />

          {facilities.length > 0 ? (
            facilities.map((fac) => (
              <TelemetryAssetCard
                key={fac.id}
                title={fac.name}
                tagText={`LVL ${fac.level}`}
                tagVariant="darkGreen"
                leftMeta={`TYPE: ${fac.facilityType}`}
                rightMeta={`NODE: ${fac.nodeId}`}
                ariaLabel={`Inspect facility ${fac.name}`}
                onClick={() => navigate(`/facilities/${fac.id}`)}
              />
            ))
          ) : (
            <EmptyStateBox>
              <Typography variant="caption" color="textSecondary">
                NO ACTIVE FACILITIES REGISTERED
              </Typography>
            </EmptyStateBox>
          )}
        </SectionColumn>

        {/* 4. Initial Cargo / Inventory */}
        <SectionColumn column gap={1.25}>
          <SectionHeader variant="overline" color="textSecondary">
            | 04. WAREHOUSE INVENTORY ({inventory.length})
          </SectionHeader>

          {inventory.length > 0 ? (
            inventory.map((item, idx) => (
              <TelemetryAssetCard
                key={`${item.itemType}-${idx}`}
                title={item.itemType}
                tagText={`Q${item.quality}`}
                tagVariant="darkGrey"
                leftMeta={`QUANTITY: ${item.quantity} UNITS`}
                rightMeta={`GRADE: ${item.quality}/100`}
              />
            ))
          ) : (
            <EmptyStateBox>
              <Typography variant="caption" color="textSecondary">
                WAREHOUSE STORAGE EMPTY
              </Typography>
            </EmptyStateBox>
          )}
        </SectionColumn>
      </CardBodyGrid>
    </Card>
  );
};

const CardBodyGrid = styled(CardContent)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: theme.spacing(2.5),
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

const SectionColumn = styled(Flex)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    '&:not(:first-of-type)': {
      borderLeft: `1px solid ${theme.palette.divider}`,
      paddingLeft: theme.spacing(2.5),
    },
  },
}));

const SectionHeader = styled(Typography)(({ theme }) => ({
  borderBottom: `1px solid ${theme.palette.divider}`,
  paddingBottom: theme.spacing(0.5),
}));

const SectionHeaderRow = styled(Flex)(({ theme }) => ({
  justifyContent: 'space-between',
  borderBottom: `1px solid ${theme.palette.divider}`,
  paddingBottom: theme.spacing(0.5),
  gap: theme.spacing(1),
}));

const InteractiveSectionHeader = styled(Typography)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'color 0.15s ease',
  '&:hover': {
    color: theme.palette.primary.light,
  },
}));

const EmptyStateBox = styled(Paper)(({ theme }) => ({
  border: `1px dashed ${theme.palette.divider}`,
  padding: theme.spacing(1.5),
  textAlign: 'center',
}));
