import MuiPaper, { type PaperProps as MuiPaperProps } from '@mui/material/Paper';
import { forwardRef } from 'react';

export type PaperProps = MuiPaperProps;

export const Paper = forwardRef<HTMLDivElement, PaperProps>(function Paper(props: PaperProps, ref) {
  return <MuiPaper ref={ref} {...props} />;
});
