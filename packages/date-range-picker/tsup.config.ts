import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs", "esm"],
  dts: true,
  sourcemap: true,
  clean: true,
  external: [
    "react",
    "react-dom",
    "@mui/material",
    "@mui/x-date-pickers",
    "@emotion/react",
    "@emotion/styled",
    "dayjs",
  ],
});
