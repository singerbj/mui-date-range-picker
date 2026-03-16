"use client";

import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { ReactNode } from "react";
import { LicenseInfo } from "@indexlabs/mui-date-range-picker";

LicenseInfo.setLicenseKey(
  "eyJvIjoiU0lURS0wMDEiLCJlIjo0MTAyNDQ0ODAwMDAwLCJwIjoiZW50ZXJwcmlzZSJ9.1hgwrud",
);

const theme = createTheme({
  palette: {
    primary: {
      main: "#2e7d32",
    },
    secondary: {
      main: "#ed6c02",
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}
