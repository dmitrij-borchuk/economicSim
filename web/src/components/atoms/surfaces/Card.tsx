import MuiCard, { type CardProps as MuiCardProps } from '@mui/material/Card';
import { forwardRef } from 'react';

export type CardProps = MuiCardProps;

export const Card = forwardRef<HTMLDivElement, CardProps>(function Card(props: CardProps, ref) {
  return <MuiCard ref={ref} {...props} />;
});
