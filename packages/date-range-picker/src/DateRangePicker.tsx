import React, { useState, useCallback } from "react";
import {
  Box,
  Paper,
  Divider,
  Button,
  Typography,
  List,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { PickersDay, PickersDayProps } from "@mui/x-date-pickers/PickersDay";
import dayjs, { Dayjs } from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { useLicense } from "./license/useLicense";
import { LicenseWatermark } from "./license/Watermark";

dayjs.extend(isBetween);

export interface DateRange {
  startDate: Dayjs | null;
  endDate: Dayjs | null;
}

export interface PresetRange {
  label: string;
  days: number;
}

export const defaultPresets: PresetRange[] = [
  { label: "Last 7 days", days: 7 },
  { label: "Last 15 days", days: 15 },
  { label: "Last 30 days", days: 30 },
  { label: "Last 90 days", days: 90 },
];

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
  /** Preset range options to display. Pass true for defaults, or an array of custom presets. */
  presets?: boolean | PresetRange[];
}

function RangeDay(
  props: PickersDayProps<Dayjs> & {
    startDate: Dayjs | null;
    endDate: Dayjs | null;
  },
) {
  const { day, startDate, endDate, outsideCurrentMonth, ...other } = props;

  const isStart = startDate && day.isSame(startDate, "day");
  const isEnd = endDate && day.isSame(endDate, "day");
  const isBetweenDates = startDate && endDate && day.isBetween(startDate, endDate, "day", "()");
  const isInRange = isStart || isEnd || isBetweenDates;

  return (
    <Box
      sx={{
        position: "relative",
        ...(isInRange &&
          !outsideCurrentMonth && {
            "&::before": {
              content: '""',
              position: "absolute",
              top: 2,
              bottom: 2,
              left: isStart ? "50%" : 0,
              right: isEnd ? "50%" : 0,
              bgcolor: "primary.main",
              opacity: 0.12,
            },
          }),
      }}
    >
      <PickersDay
        {...other}
        day={day}
        outsideCurrentMonth={outsideCurrentMonth}
        disableMargin
        sx={{
          position: "relative",
          zIndex: 1,
          ...((isStart || isEnd) &&
            !outsideCurrentMonth && {
              bgcolor: "primary.main",
              color: "primary.contrastText",
              "&:hover": {
                bgcolor: "primary.dark",
              },
              "&:focus": {
                bgcolor: "primary.main",
              },
            }),
          ...(isBetweenDates &&
            !outsideCurrentMonth && {
              bgcolor: "transparent",
              "&:hover": {
                bgcolor: "primary.light",
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
  presets,
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
    [value, onChange],
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
    [selecting, range, setRange],
  );

  const handleClear = () => {
    setRange({ startDate: null, endDate: null });
    setSelecting("start");
    onClear?.();
  };

  const handleApply = () => {
    onApply?.(range);
  };

  const presetList = presets === true ? defaultPresets : presets || null;

  const handlePreset = (days: number) => {
    const end = dayjs();
    const start = end.subtract(days, "day");
    setRange({ startDate: start, endDate: end });
    setSelecting("start");
    setLeftMonth(start);
    setRightMonth(start.add(1, "month"));
  };

  const calendarProps = {
    minDate,
    maxDate,
    disableFuture,
    disablePast,
  };

  const { isLicensed } = useLicense();

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Paper
        elevation={3}
        sx={{ display: "inline-block", p: 2, position: "relative" }}
        {...(!isLicensed && {
          "data-mui-drp-license": "unlicensed",
          className: "mui-drp-unlicensed",
        })}
      >
        {!isLicensed && <LicenseWatermark />}
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

        <Box sx={{ display: "flex", gap: 0 }}>
          {presetList && (
            <Box sx={{ borderRight: 1, borderColor: "divider", pr: 1, mr: 1, minWidth: 140 }}>
              <List dense disablePadding>
                {presetList.map((preset) => {
                  const presetStart = dayjs().subtract(preset.days, "day");
                  const presetEnd = dayjs();
                  const isActive =
                    range.startDate?.isSame(presetStart, "day") &&
                    range.endDate?.isSame(presetEnd, "day");
                  return (
                    <ListItemButton
                      key={preset.days}
                      selected={isActive}
                      onClick={() => handlePreset(preset.days)}
                      sx={{ borderRadius: 1, py: 0.5 }}
                    >
                      <ListItemText
                        primary={preset.label}
                        primaryTypographyProps={{ variant: "body2" }}
                      />
                    </ListItemButton>
                  );
                })}
              </List>
            </Box>
          )}
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
