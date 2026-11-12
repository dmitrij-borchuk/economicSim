import MuiCircularProgress, {
  type CircularProgressProps as MuiCircularProgressProps,
} from '@mui/material/CircularProgress';
import { forwardRef } from 'react';

export type CircularProgressProps = MuiCircularProgressProps;

export const CircularProgress = forwardRef<HTMLSpanElement, CircularProgressProps>(function CircularProgress(
  props: CircularProgressProps,
  ref
) {
  return <MuiCircularProgress ref={ref} {...props} />;
});
