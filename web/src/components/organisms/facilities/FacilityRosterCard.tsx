import React from 'react';
import {
  formatRecipeSummary,
  getFacilitySpec,
  type FacilityCategory,
} from '@/libs/facilities';
import type { FacilitySummary } from '@/libs/store/authSlice';
import { styled } from '@/libs/styled';
import { TelemetryFieldBlock } from '@/molecules/telemetry';
import { Card, CardHeader, CardContent } from '@/atoms/surfaces';
import {
  HudConsoleButton,
  HudTag,
  MetaChip,
  StatusPip,
  type HudTagVariant,
} from '@/atoms/hud';
import { Typography } from '@/atoms/dataDisplay';
import { Flex, HeaderRow } from '@/atoms/layout';

export type FacilityRosterCardProps = {
  facility: FacilitySummary;
  onInspect: (facilityId: string) => void;
};

export const FacilityRosterCard: React.FC<FacilityRosterCardProps> = ({
  facility,
  onInspect,
}) => {
  const spec = getFacilitySpec(facility.facilityType);
  const recipeSummary = formatRecipeSummary(spec);

  const handleInspectClick = () => {
    onInspect(facility.id);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onInspect(facility.id);
    }
  };

  return (
    <InteractiveRosterCard
      component="article"
      aria-label={facility.name}
      onClick={handleInspectClick}
    >
      <CardHeader
        title={
          <HeaderRow alignCenter>
            <Flex alignCenter gap={1.25}>
              <HudTag variant={CATEGORY_TAG_VARIANT[spec.category]}>
                [{spec.category}]
              </HudTag>
              <Typography variant="subtitle2" color="textPrimary">
                {facility.name}
              </Typography>
              <MetaChip>ID: {facility.id}</MetaChip>
            </Flex>

            <Flex alignCenter gap={1.5}>
              <Flex alignCenter gap={0.75}>
                <StatusPip />
                <Typography variant="caption" color="secondary.light">
                  OPERATING
                </Typography>
              </Flex>
              <HudConsoleButton
                role="button"
                tabIndex={0}
                aria-label={`Inspect ${facility.name}`}
                onClick={(event) => {
                  event.stopPropagation();
                  handleInspectClick();
                }}
                onKeyDown={(event) => {
                  event.stopPropagation();
                  handleKeyDown(event);
                }}
              >
                [ INSPECT → ]
              </HudConsoleButton>
            </Flex>
          </HeaderRow>
        }
      />

      <RosterBodyGrid>
        <RosterColumn column gap={1}>
          <TelemetryFieldBlock
            label="INSTALLATION TYPE"
            value={`${spec.label} (${facility.facilityType})`}
            tone="primary"
          />
        </RosterColumn>

        <RosterColumn column gap={1}>
          <TelemetryFieldBlock
            label="SECTOR & NODE LOCATION"
            value={`${spec.sector} // ${facility.nodeId.toUpperCase()}`}
            tone="accent"
          />
        </RosterColumn>

        <RosterColumn column gap={1}>
          <TelemetryFieldBlock
            label="PRODUCTION RECIPE (PER BATCH)"
            value={recipeSummary}
          />
        </RosterColumn>
      </RosterBodyGrid>
    </InteractiveRosterCard>
  );
};

const CATEGORY_TAG_VARIANT: Record<FacilityCategory, HudTagVariant> = {
  EXTRACTOR: 'darkGreen',
  PROCESSOR: 'orange',
  MANUFACTURER: 'header',
  GENERAL: 'darkGrey',
};

const InteractiveRosterCard = styled(Card)(({ theme }) => ({
  cursor: 'pointer',
  transition: 'border-color 0.15s ease',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
}));

const RosterBodyGrid = styled(CardContent)(({ theme }) => ({
  display: 'grid',
  gridTemplateColumns: 'repeat(3, 1fr)',
  gap: theme.spacing(2.5),
  [theme.breakpoints.down('lg')]: {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  [theme.breakpoints.down('sm')]: {
    gridTemplateColumns: '1fr',
  },
}));

const RosterColumn = styled(Flex)(({ theme }) => ({
  [theme.breakpoints.up('lg')]: {
    '&:not(:first-of-type)': {
      borderLeft: `1px solid ${theme.palette.divider}`,
      paddingLeft: theme.spacing(2.5),
    },
  },
}));
