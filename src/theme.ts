/* eslint-disable no-unused-vars */
/* eslint-disable unused-imports/no-unused-vars */
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
  interface Palette {
    custom: {
      softGray: string;
    };
  }
  interface PaletteOptions {
    custom?: {
      softGray?: string;
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
      color: 'rgba(34, 100, 136, 1)',
    },
    body1: {
      fontSize: '14px',
      '@media (min-width:600px)': {
        fontSize: '16px',
      },
    },
    body2: {
      fontSize: '12px',
      '@media (min-width:600px)': {
        fontSize: '14px',
      },
    },
    h1: {
      fontSize: '6rem',
    },
    h2: {
      fontSize: '3.75rem',
    },
    h3: {
      fontSize: '3rem',
    },
    h4: {
      fontSize: '2.125rem',
    },
    h5: {
      fontSize: '1.5rem',
    },

    fontWeightBold: 600,
    fontWeightMedium: 400,
  },
  palette: {
    primary: {
      main: '#1976d2', // to be defined per design
      dark: '#1b1919',
    },
    secondary: {
      main: '#dc004e',
      light: '#FFDBD0',
    },
    custom: {
      softGray: '#F4F0EF',
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
