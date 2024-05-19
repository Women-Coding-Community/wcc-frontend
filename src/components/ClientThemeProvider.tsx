// components/ClientThemeProvider.tsx
"use client";

import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import * as React from "react";

import { NavBar } from "@components";

import theme from "../theme";

const ClientThemeProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NavBar />
      {children}
    </ThemeProvider>
  );
};

export default ClientThemeProvider;
