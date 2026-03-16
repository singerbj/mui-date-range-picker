import React from "react";
import { Box, Typography } from "@mui/material";

export function LicenseWatermark() {
  return (
    <Box
      className="mui-drp-unlicensed"
      data-mui-drp-license="unlicensed"
      sx={{
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <Typography
        sx={{
          color: "error.main",
          fontWeight: 700,
          fontSize: "0.75rem",
          opacity: 0.8,
          transform: "rotate(-20deg)",
          textTransform: "uppercase",
          letterSpacing: 2,
          userSelect: "none",
          textAlign: "center",
          lineHeight: 1.2,
        }}
      >
        MUI Date Range Picker — Unlicensed
      </Typography>
    </Box>
  );
}
