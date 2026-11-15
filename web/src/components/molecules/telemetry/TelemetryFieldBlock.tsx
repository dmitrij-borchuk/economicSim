import React from "react";
import { Box, Flex } from "@/atoms/layout";
import { Typography, type TypographyProps } from "@/atoms/dataDisplay";

export type TelemetryFieldTone = "default" | "primary" | "balance" | "accent";

export type TelemetryFieldBlockProps = {
  label: string;
  value?: React.ReactNode;
  tone?: TelemetryFieldTone;
  children?: React.ReactNode;
};

const TONE_CONFIG: Record<
  TelemetryFieldTone,
  { color: string; variant: TypographyProps["variant"] }
> = {
  default: { color: "textPrimary", variant: "subtitle2" },
  primary: { color: "textPrimary", variant: "h6" },
  balance: { color: "secondary.light", variant: "h5" },
  accent: { color: "primary.light", variant: "subtitle2" },
};

export const TelemetryFieldBlock: React.FC<TelemetryFieldBlockProps> = ({
  label,
  value,
  tone = "default",
  children,
}) => {
  const { color, variant } = TONE_CONFIG[tone];

  return (
    <Flex column gap={0.25}>
      <Typography variant="overline" color="textSecondary">
        {label}
      </Typography>
      {children ? (
        <Box>{children}</Box>
      ) : (
        <Typography variant={variant} color={color}>
          {value}
        </Typography>
      )}
    </Flex>
  );
};
