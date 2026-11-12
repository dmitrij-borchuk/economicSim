import MuiIconButton, { type IconButtonProps as MuiIconButtonProps } from '@mui/material/IconButton';
import { forwardRef } from 'react';

export type IconButtonProps = MuiIconButtonProps;

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(function IconButton(
  props: IconButtonProps,
  ref,
) {
  return <MuiIconButton ref={ref} {...props} />;
});
