import MuiButton, { type ButtonProps as MuiButtonProps } from '@mui/material/Button';
import { forwardRef } from 'react';

export type ButtonProps = MuiButtonProps;

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(props: ButtonProps, ref) {
  return <MuiButton ref={ref} {...props} />;
});
