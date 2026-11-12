import MuiCardActionArea, { type CardActionAreaProps as MuiCardActionAreaProps } from '@mui/material/CardActionArea';
import { forwardRef } from 'react';

export type CardActionAreaProps = MuiCardActionAreaProps;

export const CardActionArea = forwardRef<HTMLButtonElement, CardActionAreaProps>(function CardActionArea(
  props: CardActionAreaProps,
  ref
) {
  return <MuiCardActionArea ref={ref} {...props} />;
});
