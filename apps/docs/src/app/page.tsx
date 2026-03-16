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
import { DateRangePicker, DateRangePickerInput, DateRange } from "@indexlabs/mui-date-range-picker";

const dateRangePickerProps = [
  {
    name: "value",
    type: "DateRange",
    default: "undefined",
    description: "Controlled date range value",
  },
  {
    name: "onChange",
    type: "(range: DateRange) => void",
    default: "undefined",
    description: "Callback when range changes",
  },
  { name: "minDate", type: "Dayjs", default: "undefined", description: "Minimum selectable date" },
  { name: "maxDate", type: "Dayjs", default: "undefined", description: "Maximum selectable date" },
  { name: "disableFuture", type: "boolean", default: "false", description: "Disable future dates" },
  { name: "disablePast", type: "boolean", default: "false", description: "Disable past dates" },
  {
    name: "startLabel",
    type: "string",
    default: '"Start Date"',
    description: "Label for start date",
  },
  { name: "endLabel", type: "string", default: '"End Date"', description: "Label for end date" },
  {
    name: "showActions",
    type: "boolean",
    default: "false",
    description: "Show Apply/Clear buttons",
  },
  {
    name: "onApply",
    type: "(range: DateRange) => void",
    default: "undefined",
    description: "Callback for Apply button",
  },
  {
    name: "onClear",
    type: "() => void",
    default: "undefined",
    description: "Callback for Clear button",
  },
  {
    name: "presets",
    type: "boolean | PresetRange[]",
    default: "undefined",
    description:
      "Show preset range options. Pass true for defaults (7, 15, 30, 90 days) or a custom array.",
  },
];

const inputProps = [
  {
    name: "placeholder",
    type: "string",
    default: '"Select date range"',
    description: "Input placeholder text",
  },
  {
    name: "displayFormat",
    type: "string",
    default: '"MMM D, YYYY"',
    description: "Date display format",
  },
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
            <TableCell>
              <strong>Prop</strong>
            </TableCell>
            <TableCell>
              <strong>Type</strong>
            </TableCell>
            <TableCell>
              <strong>Default</strong>
            </TableCell>
            <TableCell>
              <strong>Description</strong>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.name}>
              <TableCell>
                <code>{row.name}</code>
              </TableCell>
              <TableCell>
                <code>{row.type}</code>
              </TableCell>
              <TableCell>
                <code>{row.default}</code>
              </TableCell>
              <TableCell>{row.description}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function CodeBlock({ code }: { code: string }) {
  return (
    <Paper
      variant="outlined"
      sx={{
        p: 2,
        bgcolor: "#1e1e1e",
        borderRadius: 2,
        overflow: "auto",
        mb: 3,
      }}
    >
      <pre
        style={{
          margin: 0,
          fontSize: 13,
          lineHeight: 1.6,
          color: "#d4d4d4",
          fontFamily: "'Fira Code', 'Cascadia Code', Consolas, monospace",
        }}
      >
        {code}
      </pre>
    </Paper>
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

  const [presetRange, setPresetRange] = useState<DateRange>({
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
        <code>@indexlabs/mui-date-range-picker</code> provides two components for selecting date
        ranges using Material UI.
      </Typography>

      <Stack spacing={6}>
        {/* Installation */}
        <Box>
          <Typography variant="h4" gutterBottom>
            Installation
          </Typography>
          <CodeBlock
            code={`npm install @indexlabs/mui-date-range-picker @mui/material @mui/x-date-pickers @emotion/react @emotion/styled dayjs`}
          />
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

          {/* Basic Usage */}
          <Typography variant="h6" gutterBottom>
            Basic Usage
          </Typography>
          <CodeBlock
            code={`import { useState } from "react";
import { DateRangePicker, DateRange } from "@indexlabs/mui-date-range-picker";

function BasicExample() {
  const [range, setRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  return (
    <DateRangePicker
      value={range}
      onChange={setRange}
      showActions
    />
  );
}`}
          />
          <DateRangePicker value={basicRange} onChange={setBasicRange} showActions />

          {/* With Date Constraints */}
          <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
            With Date Constraints
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Restrict selection to past dates only with custom labels:
          </Typography>
          <CodeBlock
            code={`<DateRangePicker
  value={range}
  onChange={setRange}
  disableFuture
  startLabel="Check-in"
  endLabel="Check-out"
/>`}
          />
          <DateRangePicker
            value={constrainedRange}
            onChange={setConstrainedRange}
            disableFuture
            startLabel="Check-in"
            endLabel="Check-out"
          />

          {/* With Preset Ranges */}
          <Typography variant="h6" sx={{ mt: 4, mb: 1 }}>
            With Preset Ranges
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enable quick-select preset ranges with <code>presets=&#123;true&#125;</code> for
            defaults, or pass a custom array:
          </Typography>
          <CodeBlock
            code={`// Use default presets (Last 7, 15, 30, 90 days)
<DateRangePicker
  value={range}
  onChange={setRange}
  presets
/>

// Or use custom presets
<DateRangePicker
  value={range}
  onChange={setRange}
  presets={[
    { label: "Last week", days: 7 },
    { label: "Last month", days: 30 },
    { label: "Last quarter", days: 90 },
    { label: "Last year", days: 365 },
  ]}
/>`}
          />
          <DateRangePicker value={presetRange} onChange={setPresetRange} presets />

          {/* Props Table */}
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

          <CodeBlock
            code={`import { useState } from "react";
import { DateRangePickerInput, DateRange } from "@indexlabs/mui-date-range-picker";

function InputExample() {
  const [range, setRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  return (
    <DateRangePickerInput
      value={range}
      onChange={setRange}
      label="Select Dates"
      fullWidth
      size="small"
    />
  );
}`}
          />

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
            Inherits all DateRangePicker props except <code>showActions</code>, <code>onApply</code>
            , and <code>onClear</code>. Additional props:
          </Typography>
          <PropsTable rows={inputProps} />
        </Box>

        <Divider />

        {/* Types */}
        <Box>
          <Typography variant="h4" gutterBottom>
            Types
          </Typography>
          <CodeBlock
            code={`import { Dayjs } from "dayjs";

interface DateRange {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

interface PresetRange {
  label: string;
  days: number;
}`}
          />
        </Box>

        <Divider />

        {/* Theme Support */}
        <Box>
          <Typography variant="h4" gutterBottom>
            Theme Support
          </Typography>
          <Typography variant="body1" sx={{ mb: 2 }}>
            Both components fully inherit styles from the MUI theme. Wrap your app in a{" "}
            <code>ThemeProvider</code> with a custom theme, and the date range picker will
            automatically use your palette, typography, and other theme settings.
          </Typography>
          <CodeBlock
            code={`import { createTheme, ThemeProvider } from "@mui/material";
import { DateRangePicker } from "@indexlabs/mui-date-range-picker";

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
}`}
          />
        </Box>
      </Stack>
    </Container>
  );
}
