import MuiBox, { type BoxProps as MuiBoxProps } from "@mui/material/Box";
import { forwardRef } from "react";

export type FlexProps = MuiBoxProps & {
  justifyCenter?: boolean;
  alignCenter?: boolean;
  column?: boolean;
  gap?: number | string;
};
export const Flex = forwardRef<HTMLDivElement, FlexProps>(function Flex(
  { justifyCenter, alignCenter, column, gap, sx, ...props },
  ref,
) {
  return (
    <MuiBox
      ref={ref}
      sx={[
        {
          display: "flex",
          boxSizing: "border-box",
          justifyContent: justifyCenter ? "center" : undefined,
          alignItems: alignCenter ? "center" : undefined,
          flexDirection: column ? "column" : undefined,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
        {
          gap: gap
            ? typeof gap === "number"
              ? (theme) => theme.spacing(gap)
              : gap
            : undefined,
        },
      ]}
      {...props}
    />
  );
});
