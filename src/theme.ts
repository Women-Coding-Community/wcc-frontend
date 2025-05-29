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
      },
    },
    body2: {
      fontSize: '12px',
      lineHeight: 1.2,
      fontWeight: 400,
      '@media (min-width:600px)': {
        fontSize: '14px',
      },
    },
    h1: {
      fontSize: '6rem',
      '@media (min-width:600px)': {
        fontSize: '6rem',
      },
    },
    h2: {
      fontSize: '3rem',
      lineHeight: 1.2,
      fontWeight: 600,
      '@media (min-width:600px)': {
        fontSize: '3.5rem',
      },
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 600,
      lineHeight: 1.2,
      '@media (min-width:600px)': {
        fontSize: '2.8rem',
      },
    },
    h4: {
      fontSize: '2rem',
      lineHeight: 1.2,
      '@media (min-width:600px)': {
        fontSize: '2.125rem',
      },
    },
    h5: {
      fontSize: '1.5rem',
      lineHeight: 1.5,
      fontWeight: 400,
    },
    h6: {
      fontSize: '1.1rem',
      lineHeight: 1.5,
      fontWeight: 600,
      '@media (min-width:600px)': {
        fontSize: '1.1rem',
      },
    },
    subtitle1: {
      fontSize: '1rem',
      fontWeight: 600,
      lineHeight: 1.5,
      '@media (min-width:600px)': {
        fontSize: '16px',
      },
    },
    subtitle2: {
      fontSize: '0.875rem',
      fontWeight: 600,
      lineHeight: 1.5,
      '@media (min-width:600px)': {
        fontSize: '16px',
      },
    },
    overline: {
      fontSize: '0.75rem',
      fontWeight: 600,
      textTransform: 'uppercase',
      lineHeight: 1.2,
    },
    caption: {
      fontSize: '0.75rem',
      fontWeight: 400,
      textTransform: 'none',
      lineHeight: 1.2,
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
      main: '#a23e19',
      dark: '#ffdbd0',
      light: '#390C00',
    },
    text: {
      primary: '#1b1919',
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
