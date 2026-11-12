import MuiAppBar, { type AppBarProps as MuiAppBarProps } from '@mui/material/AppBar';
import { forwardRef } from 'react';

export type AppBarProps = MuiAppBarProps;

export const AppBar = forwardRef<HTMLDivElement, AppBarProps>(function AppBar(props: AppBarProps, ref) {
  return <MuiAppBar ref={ref} {...props} />;
});
