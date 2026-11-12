import MuiDialogContent, { type DialogContentProps as MuiDialogContentProps } from '@mui/material/DialogContent';
import { forwardRef } from 'react';

export type DialogContentProps = MuiDialogContentProps;

export const DialogContent = forwardRef<HTMLDivElement, DialogContentProps>(function DialogContent(
  props: DialogContentProps,
  ref
) {
  return <MuiDialogContent ref={ref} {...props} />;
});
