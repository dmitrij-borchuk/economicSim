import type { PropsWithChildren } from "react";
import { styled } from "@/libs/styled";
import { Box } from "../atoms";

export function PageTemplate({ children }: PropsWithChildren) {
  return (<PageContainer>{children}</PageContainer>)
}

const PageContainer = styled(Box)(() => ({
  minHeight: '100vh',
  padding: '16px 24px',
}));
