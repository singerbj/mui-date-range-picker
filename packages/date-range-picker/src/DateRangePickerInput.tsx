import React, { useState, useRef } from "react";
import { TextField, Popover, SvgIcon } from "@mui/material";

function CalendarIcon(props: React.ComponentProps<typeof SvgIcon>) {
  return (
    <SvgIcon {...props}>
      <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM9 10H7v2h2v-2zm4 0h-2v2h2v-2zm4 0h-2v2h2v-2z" />
    </SvgIcon>
  );
}
import { DateRangePicker, DateRange, DateRangePickerProps } from "./DateRangePicker";

export interface DateRangePickerInputProps extends Omit<
  DateRangePickerProps,
  "showActions" | "onApply" | "onClear"
> {
  /** Placeholder text for the input */
  placeholder?: string;
  /** Format string for displaying dates */
  displayFormat?: string;
  /** If true, the input is disabled */
  disabled?: boolean;
  /** If true, the input takes full width */
  fullWidth?: boolean;
  /** Input size */
  size?: "small" | "medium";
  /** Input label */
  label?: string;
}

export function DateRangePickerInput({
  value,
  onChange,
  placeholder = "Select date range",
  displayFormat = "MMM D, YYYY",
  disabled = false,
  fullWidth = false,
  size = "medium",
  label,
  ...pickerProps
}: DateRangePickerInputProps) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [internalRange, setInternalRange] = useState<DateRange>({
    startDate: null,
    endDate: null,
  });
  const inputRef = useRef<HTMLDivElement>(null);

  const range = value ?? internalRange;

  const displayValue =
    range.startDate && range.endDate
      ? `${range.startDate.format(displayFormat)} — ${range.endDate.format(displayFormat)}`
      : range.startDate
        ? `${range.startDate.format(displayFormat)} — ...`
        : "";

  const handleChange = (newRange: DateRange) => {
    if (value === undefined) {
      setInternalRange(newRange);
    }
    onChange?.(newRange);

    if (newRange.startDate && newRange.endDate) {
      setTimeout(() => setAnchorEl(null), 300);
    }
  };

  return (
    <>
      <TextField
        ref={inputRef}
        value={displayValue}
        placeholder={placeholder}
        onClick={(e) => !disabled && setAnchorEl(e.currentTarget)}
        slotProps={{
          input: {
            readOnly: true,
            endAdornment: <CalendarIcon color="action" />,
            sx: { cursor: disabled ? "default" : "pointer" },
          },
          inputLabel: {
            shrink: true,
          },
        }}
        disabled={disabled}
        fullWidth={fullWidth}
        size={size}
        label={label}
      />
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={() => setAnchorEl(null)}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "left" }}
      >
        <DateRangePicker {...pickerProps} value={range} onChange={handleChange} />
      </Popover>
    </>
  );
}
