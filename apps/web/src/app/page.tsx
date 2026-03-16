"use client";

import { useState } from "react";
import { Container, Typography, Box, Stack } from "@mui/material";
import {
  DateRangePicker,
  DateRangePickerInput,
  DateRange,
} from "@mui-date-range-picker/react";

export default function Home() {
  const [range, setRange] = useState<DateRange>({
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
        MUI Date Range Picker
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        A React date range picker component built with Material UI.
      </Typography>

      <Stack spacing={6}>
        <Box>
          <Typography variant="h5" gutterBottom>
            Inline Calendar
          </Typography>
          <DateRangePicker
            value={range}
            onChange={setRange}
            showActions
            onApply={(r) => console.log("Applied:", r)}
            onClear={() => console.log("Cleared")}
          />
          {range.startDate && range.endDate && (
            <Typography sx={{ mt: 2 }}>
              Selected: {range.startDate.format("YYYY-MM-DD")} to{" "}
              {range.endDate.format("YYYY-MM-DD")}
            </Typography>
          )}
        </Box>

        <Box>
          <Typography variant="h5" gutterBottom>
            Input with Popover
          </Typography>
          <DateRangePickerInput
            value={inputRange}
            onChange={setInputRange}
            label="Date Range"
            fullWidth
          />
        </Box>
      </Stack>
    </Container>
  );
}
