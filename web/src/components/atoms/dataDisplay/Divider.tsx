import MuiDivider, { type DividerProps as MuiDividerProps } from '@mui/material/Divider';
import { forwardRef } from 'react';

export type DividerProps = MuiDividerProps;

export const Divider = forwardRef<HTMLHRElement, DividerProps>(function Divider(props: DividerProps, ref) {
  return <MuiDivider ref={ref} {...props} />;
});
