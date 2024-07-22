import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import type { AppProps } from 'next/app';
import * as React from 'react';

// import { NavBar } from '@components';

import theme from '../theme';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {/* <NavBar />       */}
      <Component {...pageProps} />
    </ThemeProvider>
  );
}
