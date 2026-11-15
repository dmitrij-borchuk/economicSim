import React from 'react';
import { formatCurrency } from '@/libs/math';
import type { FacilityPortfolioSummary } from '@/libs/facilities';
import { styled } from '@/libs/styled';
import { TelemetryFieldBlock } from '@/molecules/telemetry';
import { Card, CardHeader, CardContent } from '@/atoms/surfaces';
import { HudTag, MetaChip, StatusPip } from '@/atoms/hud';
import { Typography } from '@/atoms/dataDisplay';
import { Flex, HeaderRow } from '@/atoms/layout';

export type FacilitiesSummaryBannerProps = {
  companyName: string;
  companyId: string;
  startingNodeId: string;
  summary: FacilityPortfolioSummary;
};

export const FacilitiesSummaryBanner: React.FC<
  FacilitiesSummaryBannerProps
> = ({ companyName, companyId, startingNodeId, summary }) => {
  const formattedUpkeep = formatCurrency(summary.totalBaseMaintenance);
  const categoryBreakdown = `EXT: ${summary.byCategory.EXTRACTOR} | PROC: ${summary.byCategory.PROCESSOR} | MFG: ${summary.byCategory.MANUFACTURER}`;

  return (
    <Card component="section" aria-label="Facilities Portfolio Summary">
      <CardHeader
        title={
          <HeaderRow alignCenter>
            <Flex alignCenter gap={1.5}>
              <HudTag variant="header">[ FACILITIES ]</HudTag>
              <Typography variant="caption" color="textPrimary">
                CORPORATE INSTALLATION DIRECTORY &amp; TELEMETRY — {companyName}
              </Typography>
            </Flex>

            <Flex alignCenter gap={1.5}>
              <MetaChip>CORP ID: {companyId}</MetaChip>
              <MetaChip>HQ NODE: {startingNodeId.toUpperCase()}</MetaChip>
              <Flex alignCenter gap={0.75}>
                <StatusPip />
                <Typography variant="caption" color="secondary.light">
                  {summary.activeFacilities} ONLINE
                </Typography>
              </Flex>
            </Flex>
          </HeaderRow>
        }
      />

      <SummaryGrid>
        <SummaryColumn column gap={1}>
          <TelemetryFieldBlock
            label="TOTAL INSTALLATIONS"
            value={`${summary.totalFacilities} REGISTERED`}
            tone="primary"
          />
        </SummaryColumn>

        <SummaryColumn column gap={1}>
          <TelemetryFieldBlock
            label="OPERATIONAL STATUS"
            value={`${summary.activeFacilities} OPERATING`}
            tone="accent"
          />
        </SummaryColumn>

        <SummaryColumn column gap={1}>
          <TelemetryFieldBlock
            label="EST. BASE UPKEEP / TICK"
            value={`$${formattedUpkeep} CR`}
            tone="balance"
          />
        </SummaryColumn>

        <SummaryColumn column gap={1}>
          <TelemetryFieldBlock
            label="CATEGORY DISTRIBUTION"
            value={categoryBreakdown}
          />
        </SummaryColumn>
      </SummaryGrid>
    </Card>
  );
};

const SummaryGrid = styled(CardContent)(({ theme }) => ({
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

const SummaryColumn = styled(Flex)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    '&:not(:first-of-type)': {
      borderLeft: `1px solid ${theme.palette.divider}`,
      paddingLeft: theme.spacing(2.5),
    },
  },
}));
