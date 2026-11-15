import { forwardRef } from "react";
import MuiPaper, {
  type PaperProps as MuiPaperProps,
} from "@mui/material/Paper";

export type PaperProps = MuiPaperProps;

export const Paper = forwardRef<HTMLDivElement, PaperProps>(function Paper(
  props: PaperProps,
  ref,
) {
  return <MuiPaper ref={ref} {...props} />;
});
