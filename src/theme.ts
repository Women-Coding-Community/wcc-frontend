// use client
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    button: {
      textTransform: 'none',
      fontSize: '0.875rem',
    },
    body1: {
      fontSize: '20px',
    },
    body2: {
      fontSize: '16px',
    },
  },
  palette: {
    primary: {
      main: '#1976d2', // to be defined per design
      dark: '#343a40',
    },
    secondary: {
      main: '#dc004e',
    },
  },
  components: {
    MuiIcon: {
      defaultProps: {
        baseClassName: 'material-symbols-outlined',
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
});

export default theme;
