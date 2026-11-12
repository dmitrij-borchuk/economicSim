import MuiToolbar, { type ToolbarProps as MuiToolbarProps } from '@mui/material/Toolbar';
import { forwardRef } from 'react';

export type ToolbarProps = MuiToolbarProps;

export const Toolbar = forwardRef<HTMLDivElement, ToolbarProps>(function Toolbar(props: ToolbarProps, ref) {
  return <MuiToolbar ref={ref} {...props} />;
});
