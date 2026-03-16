import React, { useState, useCallback } from "react";
import { Box, Paper, Divider, Button, Typography } from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";

dayjs.extend(isBetween);

export interface DateRange {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

export interface DateRangePickerProps {
  /** The current date range value */
  value?: DateRange;
  /** Callback fired when the date range changes */
  onChange?: (range: DateRange) => void;
  /** Minimum selectable date */
  minDate?: Dayjs;
  /** Maximum selectable date */
  maxDate?: Dayjs;
  /** If true, disables future dates */
  disableFuture?: boolean;
  /** If true, disables past dates */
  disablePast?: boolean;
  /** Label for the start date */
  startLabel?: string;
  /** Label for the end date */
  endLabel?: string;
  /** If true, shows action buttons (Apply/Clear) */
  showActions?: boolean;
  /** Callback fired when the Apply button is clicked */
  onApply?: (range: DateRange) => void;
  /** Callback fired when the Clear button is clicked */
  onClear?: () => void;
}

function RangeDay(
  props: PickersDayProps<Dayjs> & {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  }
) {
  const { day, startDate, endDate, outsideCurrentMonth, ...other } = props;

  const isStart = startDate && day.isSame(startDate, "day");
  const isEnd = endDate && day.isSame(endDate, "day");
  const isBetweenDates =
    startDate &&
    endDate &&
    day.isBetween(startDate, endDate, "day", "()");
  const isInRange = isStart || isEnd || isBetweenDates;

  return (
    <Box
      sx={{
        ...(isInRange && {
          bgcolor: "primary.light",
          opacity: 0.3,
          borderRadius:
            isStart ? "50% 0 0 50%" : isEnd ? "0 50% 50% 0" : 0,
        }),
      }}
    >
      <PickersDay
        {...other}
        day={day}
        outsideCurrentMonth={outsideCurrentMonth}
        disableMargin
        sx={{
          ...((isStart || isEnd) && {
            bgcolor: "primary.main",
            color: "primary.contrastText",
            "&:hover": {
              bgcolor: "primary.dark",
            },
            "&:focus": {
              bgcolor: "primary.main",
            },
          }),
        }}
      />
    </Box>
  );
}

export function DateRangePicker({
  value,
  onChange,
  minDate,
  maxDate,
  disableFuture = false,
  disablePast = false,
  startLabel = "Start Date",
  endLabel = "End Date",
  showActions = false,
  onApply,
  onClear,
}: DateRangePickerProps) {
  const [internalRange, setInternalRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });

  const range = value ?? internalRange;
  const setRange = useCallback(
    (newRange: DateRange) => {
      if (value === undefined) {
        setInternalRange(newRange);
      }
      onChange?.(newRange);
    },
    [value, onChange]
  );

  const [selecting, setSelecting] = useState<"start" | "end">("start");
  const [leftMonth, setLeftMonth] = useState<Dayjs>(dayjs());
  const [rightMonth, setRightMonth] = useState<Dayjs>(dayjs().add(1, "month"));

  const handleDayClick = useCallback(
    (day: Dayjs) => {
      if (selecting === "start") {
        setRange({ startDate: day, endDate: null });
        setSelecting("end");
      } else {
        if (range.startDate && day.isBefore(range.startDate)) {
          setRange({ startDate: day, endDate: null });
          setSelecting("end");
        } else {
          setRange({ ...range, endDate: day });
          setSelecting("start");
        }
      }
    },
    [selecting, range, setRange]
  );

  const handleClear = () => {
    setRange({ startDate: null, endDate: null });
    setSelecting("start");
    onClear?.();
  };

  const handleApply = () => {
    onApply?.(range);
  };

  const calendarProps = {
    minDate,
    maxDate,
    disableFuture,
    disablePast,
  };

  const renderDay = useCallback(
    (day: Dayjs, _selectedDays: Dayjs[], pickersDayProps: PickersDayProps<Dayjs>) => (
      <RangeDay
        {...pickersDayProps}
        startDate={range.startDate}
        endDate={range.endDate}
      />
    ),
    [range.startDate, range.endDate]
  );

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper elevation={3} sx={{ display: "inline-block", p: 2 }}>
        <Box sx={{ display: "flex", gap: 1, mb: 2 }}>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {startLabel}
            </Typography>
            <Typography variant="body2" fontWeight={selecting === "start" ? 700 : 400}>
              {range.startDate ? range.startDate.format("MMM D, YYYY") : "—"}
            </Typography>
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography variant="caption" color="text.secondary">
              {endLabel}
            </Typography>
            <Typography variant="body2" fontWeight={selecting === "end" ? 700 : 400}>
              {range.endDate ? range.endDate.format("MMM D, YYYY") : "—"}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ mb: 1 }} />

        <Box sx={{ display: "flex", gap: 2 }}>
          <DateCalendar
            {...calendarProps}
            value={leftMonth}
            onChange={(day) => day && handleDayClick(day)}
            onMonthChange={(month) => {
              setLeftMonth(month);
              if (month.isSame(rightMonth, "month") || month.isAfter(rightMonth, "month")) {
                setRightMonth(month.add(1, "month"));
              }
            }}
            slots={{ day: RangeDay as any }}
            slotProps={{
              day: {
                startDate: range.startDate,
                endDate: range.endDate,
              } as any,
            }}
          />
          <DateCalendar
            {...calendarProps}
            value={rightMonth}
            onChange={(day) => day && handleDayClick(day)}
            onMonthChange={(month) => {
              setRightMonth(month);
              if (month.isSame(leftMonth, "month") || month.isBefore(leftMonth, "month")) {
                setLeftMonth(month.subtract(1, "month"));
              }
            }}
            slots={{ day: RangeDay as any }}
            slotProps={{
              day: {
                startDate: range.startDate,
                endDate: range.endDate,
              } as any,
            }}
          />
        </Box>

        {showActions && (
          <>
            <Divider sx={{ mt: 1 }} />
            <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 1, mt: 2 }}>
              <Button size="small" onClick={handleClear}>
                Clear
              </Button>
              <Button
                size="small"
                variant="contained"
                onClick={handleApply}
                disabled={!range.startDate || !range.endDate}
              >
                Apply
              </Button>
            </Box>
          </>
        )}
      </Paper>
    </LocalizationProvider>
  );
}
