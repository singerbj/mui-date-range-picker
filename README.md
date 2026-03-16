# mui-date-range-picker

A React date range picker component built with Material UI 6 and MUI X Date Pickers.

> **This software requires a paid commercial license.** See [LICENSE](./LICENSE) for details.

## Structure

This is a [Turborepo](https://turbo.build/) monorepo with pnpm workspaces:

```
apps/
  web/          → Next.js demo site (port 3000)
  docs/         → Next.js documentation site (port 3001)
packages/
  date-range-picker/ → @mui-date-range-picker/react
```

## Package: `@mui-date-range-picker/react`

### Components

- **`DateRangePicker`** — Inline dual-calendar date range picker with optional Apply/Clear action buttons.
- **`DateRangePickerInput`** — Text field that opens the date range picker in a popover.

### Features

- Built on MUI 6 `DateCalendar` and `@mui/x-date-pickers` v7
- Full MUI theme support — inherits your palette, typography, and component overrides
- Controlled and uncontrolled usage
- Date constraints: `minDate`, `maxDate`, `disableFuture`, `disablePast`
- Customizable labels, display format, and input props

### Usage

```tsx
import { createTheme, ThemeProvider } from "@mui/material";
import { DateRangePicker, DateRangePickerInput } from "@mui-date-range-picker/react";

const theme = createTheme({
  palette: { primary: { main: "#1976d2" } },
});

function App() {
  const [range, setRange] = useState({ startDate: null, endDate: null });

  return (
    <ThemeProvider theme={theme}>
      {/* Inline calendar */}
      <DateRangePicker value={range} onChange={setRange} showActions />

      {/* Input with popover */}
      <DateRangePickerInput value={range} onChange={setRange} label="Dates" />
    </ThemeProvider>
  );
}
```

## Development

### Prerequisites

- Node.js >= 18
- pnpm >= 10

### Getting started

```bash
pnpm install
pnpm dev       # Start all apps in development mode
pnpm build     # Build all packages and apps
```

### Commands

| Command      | Description                  |
| ------------ | ---------------------------- |
| `pnpm dev`   | Start all apps in dev mode   |
| `pnpm build` | Build all packages and apps  |
| `pnpm lint`  | Lint all packages and apps   |
| `pnpm clean` | Clean build artifacts        |

## License

**Proprietary — All rights reserved.** A paid commercial license is required for any use. See [LICENSE](./LICENSE).
