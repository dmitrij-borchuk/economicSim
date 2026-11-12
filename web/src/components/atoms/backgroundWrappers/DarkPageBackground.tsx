import { styled } from "@mui/material/styles";
import { Box } from "@/atoms/layout";

export const DarkPageBackground = styled(Box)(() => ({
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: '#070b14',
  backgroundImage:
    'radial-gradient(ellipse 80% 80% at 50% -20%, rgba(6, 182, 212, 0.15), rgba(7, 11, 20, 0.95))',
  padding: '16px',
  fontFamily: 'monospace',
}))
