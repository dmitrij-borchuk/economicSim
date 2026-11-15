import React from "react";
import { styled } from "@/libs/styled";
import { Flex } from "@/atoms/layout";
import { Paper } from "@/atoms/surfaces";
import { Typography } from "@/atoms/dataDisplay";
import { HudTag, type HudTagVariant } from "@/atoms/hud";

export type TelemetryAssetCardProps = {
  title: string;
  tagText: string;
  tagVariant?: HudTagVariant;
  leftMeta: string;
  rightMeta: string;
};

export const TelemetryAssetCard: React.FC<TelemetryAssetCardProps> = ({
  title,
  tagText,
  tagVariant = "darkGreen",
  leftMeta,
  rightMeta,
}) => {
  return (
    <ItemCardContainer>
      <ItemCardRow alignCenter gap={1}>
        <Typography variant="subtitle2" color="textPrimary">
          {title}
        </Typography>
        <HudTag variant={tagVariant}>{tagText}</HudTag>
      </ItemCardRow>
      <ItemCardRow alignCenter gap={1}>
        <Typography variant="caption" color="textSecondary">
          {leftMeta}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          {rightMeta}
        </Typography>
      </ItemCardRow>
    </ItemCardContainer>
  );
};

const ItemCardContainer = styled(Paper)(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1, 1.25),
  display: "flex",
  flexDirection: "column",
  gap: theme.spacing(0.5),
}));

const ItemCardRow = styled(Flex)(() => ({
  justifyContent: "space-between",
}));
