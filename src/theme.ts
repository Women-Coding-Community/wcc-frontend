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
    custom: {
      containerBox: {
        display: string;
        flexDirection: string;
        alignItems: string;
        justifyContent: string;
        width: string;
        padding: string;
      };
      innerBox: {
        width: string;
        maxWidth: string;
        margin: string;
        display: string;
        flexDirection: string;
        alignItems: string;
      };
    };
  }

  interface ThemeOptions {
    customBannerHeights?: {
      mobile?: string;
      tablet?: string;
      desktop?: string;
    };
    containerBox?: {
      display?: string;
      flexDirection?: string;
      alignItems?: string;
      justifyContent?: string;
      width?: string;
      backgroundColor?: string;
      padding?: string;
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
        lineHeight: '24px',
      },
    },
    body2: {
      fontSize: '12px',
      lineHeight: 1.3,
      '@media (min-width:600px)': {
        fontSize: '14px',
      },
    },
    h1: {
      fontSize: '6rem',
    },
    h2: {
      fontSize: '2.25rem',
      fontWeight: 600,
      lineHeight: 1.2,
    },
    h3: {
      fontSize: '3rem',
      fontWeight: 600,
      lineHeight: 1.2,
      paddingBottom: '1rem',
      paddingTop: '1rem',
    },
    h4: {
      fontSize: '2.125rem',
    },
    h5: {
      fontSize: '1.5rem',
      fontWeight: 500,
      lineHeight: '1.5',
      paddingBottom: '1rem',
      paddingTop: '1rem',
    },
    fontWeightBold: 600,
    fontWeightMedium: 400,
  },
  palette: {
    primary: {
      main: '#226488',
      dark: '#1b1919',
      light: '#F6FAFE',
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

theme.components = {
  ...theme.components,
  MuiTypography: {
    styleOverrides: {
      root: {
        color: theme.palette.primary.dark,
      },
    },
  },
};

theme.custom = {
  containerBox: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    padding: '3rem 1.5rem',
  },
  innerBox: {
    width: '100%',
    maxWidth: '1127px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
};

export default theme;
