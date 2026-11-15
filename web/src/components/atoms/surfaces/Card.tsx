import MuiCard, { type CardProps as MuiCardProps } from "@mui/material/Card";
export { default as CardHeader } from "@mui/material/CardHeader";
export { default as CardContent } from "@mui/material/CardContent";
import { forwardRef } from "react";

export type CardProps = MuiCardProps;

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(
  props: CardProps,
  ref,
) {
  return <MuiCard ref={ref} {...props} />;
});
