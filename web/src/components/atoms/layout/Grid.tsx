import MuiGrid, { type GridProps as MuiGridProps } from '@mui/material/Grid';
import { forwardRef } from 'react';

export type GridProps = MuiGridProps;

export const Grid = forwardRef<HTMLDivElement, GridProps>(function Grid(props: GridProps, ref) {
  return <MuiGrid ref={ref} {...props} />;
});
