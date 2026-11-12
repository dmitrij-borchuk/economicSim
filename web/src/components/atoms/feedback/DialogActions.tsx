import MuiDialogActions, { type DialogActionsProps as MuiDialogActionsProps } from '@mui/material/DialogActions';
import { forwardRef } from 'react';

export type DialogActionsProps = MuiDialogActionsProps;

export const DialogActions = forwardRef<HTMLDivElement, DialogActionsProps>(function DialogActions(
  props: DialogActionsProps,
  ref
) {
  return <MuiDialogActions ref={ref} {...props} />;
});
