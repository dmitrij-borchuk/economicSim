import MuiDialog, { type DialogProps as MuiDialogProps } from '@mui/material/Dialog';
import { forwardRef } from 'react';

export type DialogProps = MuiDialogProps;

export const Dialog = forwardRef<HTMLDivElement, DialogProps>(function Dialog(props: DialogProps, ref) {
  return <MuiDialog ref={ref} {...props} />;
});
