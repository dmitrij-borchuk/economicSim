import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#06b6d4',
      light: '#38bdf8',
      dark: '#0891b2',
    },
    secondary: {
      main: '#10b981',
      light: '#34d399',
      dark: '#059669',
    },
    background: {
      default: '#070b14',
      paper: '#0d1322',
    },
    text: {
      primary: '#f8fafc',
      secondary: '#94a3b8',
    },
    divider: '#1a202c',
  },
  typography: {
    fontFamily: [
      'monospace',
      'Inter',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h5: {
      fontSize: '1.35rem',
      fontWeight: 900,
      letterSpacing: '0.04em',
      lineHeight: 1.1,
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 900,
      letterSpacing: '0.04em',
    },
    subtitle2: {
      fontSize: '0.85rem',
      fontWeight: 700,
      letterSpacing: '0.04em',
    },
    caption: {
      fontSize: '0.7rem',
      letterSpacing: '0.06em',
    },
    overline: {
      fontSize: '0.62rem',
      fontWeight: 700,
      letterSpacing: '0.08em',
      lineHeight: 1.4,
    },
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          backgroundImage: 'none',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
          border: '1px solid #1a202c',
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: ({ theme }) => ({
          padding: theme.spacing(0.75, 2),
          backgroundColor: theme.palette.background.paper,
          borderBottom: '1px solid #1a202c',
        }),
      },
    },
  },
});
