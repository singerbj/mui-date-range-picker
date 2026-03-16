"use client";

import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { ReactNode } from "react";
import { LicenseInfo } from "@mui-date-range-picker/react";

LicenseInfo.setLicenseKey(
  "eyJvIjoiU0lURS0wMDEiLCJlIjo0MTAyNDQ0ODAwMDAwLCJwIjoiZW50ZXJwcmlzZSJ9.1hgwrud",
);

const theme = createTheme({
  typography: {
    fontFamily: "'Roboto', sans-serif",
  },
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#9c27b0",
    },
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
