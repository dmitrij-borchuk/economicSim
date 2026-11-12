import MuiChip, { type ChipProps as MuiChipProps } from '@mui/material/Chip';
import { forwardRef } from 'react';

export type ChipProps = MuiChipProps;

export const Chip = forwardRef<HTMLDivElement, ChipProps>(function Chip(props: ChipProps, ref) {
  return <MuiChip ref={ref} {...props} />;
});
