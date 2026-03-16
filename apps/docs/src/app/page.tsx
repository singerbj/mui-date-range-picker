"use client";

import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Stack,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Divider,
} from "@mui/material";
import {
  DateRangePicker,
  DateRangePickerInput,
  DateRange,
} from "@mui-date-range-picker/react";
import dayjs from "dayjs";

const dateRangePickerProps = [
  { name: "value", type: "DateRange", default: "undefined", description: "Controlled date range value" },
  { name: "onChange", type: "(range: DateRange) => void", default: "undefined", description: "Callback when range changes" },
  { name: "minDate", type: "Dayjs", default: "undefined", description: "Minimum selectable date" },
  { name: "maxDate", type: "Dayjs", default: "undefined", description: "Maximum selectable date" },
  { name: "disableFuture", type: "boolean", default: "false", description: "Disable future dates" },
  { name: "disablePast", type: "boolean", default: "false", description: "Disable past dates" },
  { name: "startLabel", type: "string", default: '"Start Date"', description: "Label for start date" },
  { name: "endLabel", type: "string", default: '"End Date"', description: "Label for end date" },
  { name: "showActions", type: "boolean", default: "false", description: "Show Apply/Clear buttons" },
  { name: "onApply", type: "(range: DateRange) => void", default: "undefined", description: "Callback for Apply button" },
  { name: "onClear", type: "() => void", default: "undefined", description: "Callback for Clear button" },
];

const inputProps = [
  { name: "placeholder", type: "string", default: '"Select date range"', description: "Input placeholder text" },
  { name: "displayFormat", type: "string", default: '"MMM D, YYYY"', description: "Date display format" },
  { name: "disabled", type: "boolean", default: "false", description: "Disable the input" },
  { name: "fullWidth", type: "boolean", default: "false", description: "Full width input" },
  { name: "size", type: '"small" | "medium"', default: '"medium"', description: "Input size" },
  { name: "label", type: "string", default: "undefined", description: "Input label" },
];

function PropsTable({ rows }: { rows: typeof dateRangePickerProps }) {
  return (
    <TableContainer component={Paper} variant="outlined">
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell><strong>Prop</strong></TableCell>
            <TableCell><strong>Type</strong></TableCell>
            <TableCell><strong>Default</strong></TableCell>
            <TableCell><strong>Description</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell><code>{row.name}</code></TableCell>
              <TableCell><code>{row.type}</code></TableCell>
              <TableCell><code>{row.default}</code></TableCell>
              <TableCell>{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default function DocsPage() {
  const [basicRange, setBasicRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const [constrainedRange, setConstrainedRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const [inputRange, setInputRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Typography variant="h3" gutterBottom>
        Documentation
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        <code>@mui-date-range-picker/react</code> provides two components for
        selecting date ranges using Material UI.
      </Typography>

      <Stack spacing={6}>
        {/* Installation */}
        <Box>
          <Typography variant="h4" gutterBottom>
            Installation
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, bgcolor: "grey.50" }}>
            <code>npm install @mui-date-range-picker/react @mui/material @mui/x-date-pickers @emotion/react @emotion/styled dayjs</code>
          </Paper>
        </Box>

        <Divider />

        {/* DateRangePicker */}
        <Box>
          <Typography variant="h4" gutterBottom>
            DateRangePicker
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            An inline dual-calendar date range picker with optional action buttons.
          </Typography>

          <Typography variant="h6" gutterBottom>
            Basic Usage
          </Typography>
          <DateRangePicker value={basicRange} onChange={setBasicRange} showActions />

          <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
            With Date Constraints
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Restrict selection to past dates only:
          </Typography>
          <DateRangePicker
            value={constrainedRange}
            onChange={setConstrainedRange}
            disableFuture
            startLabel="Check-in"
            endLabel="Check-out"
          />

          <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
            Props
          </Typography>
          <PropsTable rows={dateRangePickerProps} />
        </Box>

        <Divider />

        {/* DateRangePickerInput */}
        <Box>
          <Typography variant="h4" gutterBottom>
            DateRangePickerInput
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            A text field that opens a DateRangePicker in a popover on click.
          </Typography>

          <Box sx={{ maxWidth: 400, mb: 3 }}>
            <DateRangePickerInput
              value={inputRange}
              onChange={setInputRange}
              label="Select Dates"
              fullWidth
              size="small"
            />
          </Box>

          <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
            Props
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            Inherits all DateRangePicker props except <code>showActions</code>, <code>onApply</code>, and <code>onClear</code>. Additional props:
          </Typography>
          <PropsTable rows={inputProps} />
        </Box>

        <Divider />

        {/* Theme Support */}
        <Box>
          <Typography variant="h4" gutterBottom>
            Theme Support
          </Typography>
          <Typography variant="body1">
            Both components fully inherit styles from the MUI theme. Wrap your app
            in a <code>ThemeProvider</code> with a custom theme, and the date range
            picker will automatically use your palette, typography, and other theme
            settings.
          </Typography>
          <Paper variant="outlined" sx={{ p: 2, mt: 2, bgcolor: "grey.50" }}>
            <pre style={{ margin: 0, fontSize: 14 }}>{`import { createTheme, ThemeProvider } from "@mui/material";
import { DateRangePicker } from "@mui-date-range-picker/react";

const theme = createTheme({
  palette: {
    primary: { main: "#2e7d32" },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <DateRangePicker />
    </ThemeProvider>
  );
}`}</pre>
          </Paper>
        </Box>
      </Stack>
    </Container>
  );
}
