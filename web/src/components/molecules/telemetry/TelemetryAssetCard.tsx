import React from 'react';
import { styled } from '@/libs/styled';
import { Flex } from '@/atoms/layout';
import { Paper } from '@/atoms/surfaces';
import { Typography } from '@/atoms/dataDisplay';
import { HudTag, type HudTagVariant } from '@/atoms/hud';

export type TelemetryAssetCardProps = {
  title: string;
  tagText: string;
  tagVariant?: HudTagVariant;
  leftMeta: string;
  rightMeta: string;
  onClick?: () => void;
  ariaLabel?: string;
};

export const TelemetryAssetCard: React.FC<TelemetryAssetCardProps> = ({
  title,
  tagText,
  tagVariant = 'darkGreen',
  leftMeta,
  rightMeta,
  onClick,
  ariaLabel,
}) => {
  const isInteractive = Boolean(onClick);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (!onClick) return;
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      onClick();
    }
  };

  return (
    <ItemCardContainer
      interactive={isInteractive}
      role={isInteractive ? 'button' : undefined}
      tabIndex={isInteractive ? 0 : undefined}
      aria-label={ariaLabel ?? (isInteractive ? title : undefined)}
      onClick={onClick}
      onKeyDown={isInteractive ? handleKeyDown : undefined}
    >
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

const ItemCardContainer = styled(Paper, {
  shouldForwardProp: (prop) => prop !== 'interactive',
})<{ interactive?: boolean }>(({ theme, interactive }) => ({
  border: `1px solid ${theme.palette.divider}`,
  padding: theme.spacing(1, 1.25),
  display: 'flex',
  flexDirection: 'column',
  gap: theme.spacing(0.5),
  ...(interactive
    ? {
        cursor: 'pointer',
        transition: 'border-color 0.15s ease',
        '&:hover': {
          borderColor: theme.palette.primary.main,
        },
      }
    : {}),
}));

const ItemCardRow = styled(Flex)(() => ({
  justifyContent: 'space-between',
}));
