import React from 'react';
import {
  formatRecipeIOList,
  formatRecipeSummary,
  getAssociatedInventoryForFacility,
  getFacilitySpec,
  type FacilityCategory,
} from '@/libs/facilities';
import type {
  FacilitySummary,
  InventoryItemSummary,
} from '@/libs/store/authSlice';
import { styled } from '@/libs/styled';
import { TelemetryAssetCard, TelemetryFieldBlock } from '@/molecules/telemetry';
import { Card, CardHeader, CardContent, Paper } from '@/atoms/surfaces';
import {
  HudConsoleButton,
  HudTag,
  MetaChip,
  StatusPip,
  type HudTagVariant,
} from '@/atoms/hud';
import { Typography } from '@/atoms/dataDisplay';
import { Flex, HeaderRow } from '@/atoms/layout';

export type FacilityInspectorCardProps = {
  facility: FacilitySummary;
  companyName: string;
  companyId: string;
  inventory: InventoryItemSummary[];
  onBackToDirectory: () => void;
};

export const FacilityInspectorCard: React.FC<FacilityInspectorCardProps> = ({
  facility,
  companyName,
  companyId,
  inventory,
  onBackToDirectory,
}) => {
  const spec = getFacilitySpec(facility.facilityType);
  const recipeSummary = formatRecipeSummary(spec);
  const inputSummary = formatRecipeIOList(spec.inputs);
  const outputSummary = formatRecipeIOList(spec.outputs);
  const matchingStock = getAssociatedInventoryForFacility(spec, inventory);

  const handleBackKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onBackToDirectory();
    }
  };

  return (
    <Card
      component="section"
      aria-label={`Facility Inspector: ${facility.name}`}
    >
      <CardHeader
        title={
          <HeaderRow alignCenter>
            <Flex alignCenter gap={1.5}>
              <HudConsoleButton
                role="button"
                tabIndex={0}
                aria-label="Return to Facilities Directory"
                onClick={onBackToDirectory}
                onKeyDown={handleBackKeyDown}
              >
                [ ← DIRECTORY ]
              </HudConsoleButton>
              <HudTag variant="header">[ INSPECTOR ]</HudTag>
              <Typography variant="caption" color="textPrimary">
                INSTALLATION TELEMETRY &amp; RECIPE MANIFEST — {facility.name}
              </Typography>
            </Flex>

            <Flex alignCenter gap={1.5}>
              <MetaChip>FAC ID: {facility.id}</MetaChip>
              <MetaChip>CORP: {companyId}</MetaChip>
              <Flex alignCenter gap={0.75}>
                <StatusPip />
                <Typography variant="caption" color="secondary.light">
                  OPERATING
                </Typography>
              </Flex>
            </Flex>
          </HeaderRow>
        }
      />

      <InspectorGrid>
        {/* 01. Installation Telemetry */}
        <InspectorColumn column gap={1.5}>
          <SectionHeader variant="overline" color="textSecondary">
            | 01. INSTALLATION TELEMETRY
          </SectionHeader>

          <TelemetryFieldBlock
            label="INSTALLATION DESIGNATION"
            value={facility.name}
            tone="primary"
          />

          <TelemetryFieldBlock label="INSTALLATION CATEGORY & CLASS">
            <Flex alignCenter gap={1}>
              <HudTag variant={CATEGORY_TAG_VARIANT[spec.category]}>
                {spec.category}
              </HudTag>
              <Typography variant="subtitle2" color="textPrimary">
                {spec.label} ({facility.facilityType})
              </Typography>
            </Flex>
          </TelemetryFieldBlock>

          <TelemetryFieldBlock
            label="SECTOR & ANCHOR NODE"
            value={`${spec.sector} // ${facility.nodeId.toUpperCase()}`}
            tone="accent"
          />

          <TelemetryFieldBlock
            label="OPERATING ENTERPRISE"
            value={`${companyName} (${companyId})`}
          />

          <TelemetryFieldBlock
            label="OPERATIONAL PROFILE"
            value={spec.description}
          />
        </InspectorColumn>

        {/* 02. Production & Recipe */}
        <InspectorColumn column gap={1.5}>
          <SectionHeader variant="overline" color="textSecondary">
            | 02. PRODUCTION &amp; RECIPE
          </SectionHeader>

          <TelemetryFieldBlock
            label="ACTIVE BATCH CYCLE"
            value={recipeSummary}
            tone="accent"
          />

          <TelemetryFieldBlock
            label="INPUT MATERIALS PER BATCH"
            value={inputSummary}
          />

          <TelemetryFieldBlock
            label="OUTPUT YIELD PER BATCH"
            value={outputSummary}
            tone="primary"
          />
        </InspectorColumn>

        {/* 03. Associated Warehouse Stock */}
        <InspectorColumn column gap={1.5}>
          <SectionHeader variant="overline" color="textSecondary">
            | 03. ASSOCIATED WAREHOUSE STOCK ({matchingStock.length})
          </SectionHeader>

          <TelemetryFieldBlock
            label="CORPORATE STORAGE CONTEXT"
            value="COMPANY WAREHOUSE LOTS MATCHING RECIPE INPUTS & OUTPUTS"
          />

          {matchingStock.length > 0 ? (
            matchingStock.map((lot, idx) => (
              <TelemetryAssetCard
                key={`${lot.itemType}-${idx}`}
                title={lot.itemType}
                tagText={`Q${lot.quality}`}
                tagVariant="darkGreen"
                leftMeta={`QUANTITY: ${lot.quantity} UNITS`}
                rightMeta={`GRADE: ${lot.quality}/100`}
              />
            ))
          ) : (
            <EmptyStateBox>
              <Typography variant="caption" color="textSecondary">
                NO MATCHING INPUT OR OUTPUT COMMODITY LOTS IN WAREHOUSE
              </Typography>
            </EmptyStateBox>
          )}
        </InspectorColumn>
      </InspectorGrid>
    </Card>
  );
};

const CATEGORY_TAG_VARIANT: Record<FacilityCategory, HudTagVariant> = {
  EXTRACTOR: 'darkGreen',
  PROCESSOR: 'orange',
  MANUFACTURER: 'header',
  GENERAL: 'darkGrey',
};

const InspectorGrid = styled(CardContent)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing(2.5),
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: '1fr',
  },
}));

const InspectorColumn = styled(Flex)(({ theme }) => ({
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

const EmptyStateBox = styled(Paper)(({ theme }) => ({
  border: `1px dashed ${theme.palette.divider}`,
  padding: theme.spacing(1.5),
  textAlign: 'center',
}));
