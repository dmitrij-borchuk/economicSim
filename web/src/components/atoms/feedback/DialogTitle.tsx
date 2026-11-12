import MuiDialogTitle, { type DialogTitleProps as MuiDialogTitleProps } from '@mui/material/DialogTitle';
import { forwardRef } from 'react';

export type DialogTitleProps = MuiDialogTitleProps;

export const DialogTitle = forwardRef<HTMLHeadingElement, DialogTitleProps>(function DialogTitle(
  props: DialogTitleProps,
  ref
) {
  return <MuiDialogTitle ref={ref} {...props} />;
});
