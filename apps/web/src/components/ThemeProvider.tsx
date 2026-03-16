"use client";

import { ThemeProvider as MuiThemeProvider, createTheme, CssBaseline } from "@mui/material";
import { ReactNode, createContext, useContext, useState, useMemo } from "react";
import { LicenseInfo } from "@indexlabs/mui-date-range-picker";

LicenseInfo.setLicenseKey(
  "eyJvIjoiU0lURS0wMDEiLCJlIjo0MTAyNDQ0ODAwMDAwLCJwIjoiZW50ZXJwcmlzZSJ9.1hgwrud",
);

const ColorModeContext = createContext({
  mode: "dark" as "light" | "dark",
  toggleColorMode: () => {},
});

export function useColorMode() {
  return useContext(ColorModeContext);
}

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<"light" | "dark">("dark");

  const colorMode = useMemo(
    () => ({
      mode,
      toggleColorMode: () => setMode((prev) => (prev === "light" ? "dark" : "light")),
    }),
    [mode],
  );

  const theme = useMemo(
    () =>
      createTheme({
        typography: {
          fontFamily: "'Roboto', sans-serif",
        },
        palette: {
          mode,
          primary: {
            main: "#1976d2",
          },
          secondary: {
            main: "#9c27b0",
          },
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ColorModeContext.Provider>
  );
}
