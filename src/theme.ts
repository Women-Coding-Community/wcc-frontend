// use client
import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    customBannerHeights: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
  }

  interface ThemeOptions {
    customBannerHeights?: {
      mobile?: string;
      tablet?: string;
      desktop?: string;
    };
  }
}

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1536,
    },
  },
  customBannerHeights: {
    mobile: '100vw',
    tablet: '80vw', // change
    desktop: '617.14px',
  },

  typography: {
    button: {
      textTransform: 'none',
      fontSize: '0.875rem',
      color: "rgba(34, 100, 136, 1)",
    },
    body1: {
      fontSize: '20px',
    },
    body2: {
      fontSize: '16px',
    },

    fontWeightBold: 600,
    fontWeightMedium: 400,
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
