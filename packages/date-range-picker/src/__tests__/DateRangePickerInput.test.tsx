import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import dayjs from "dayjs";
import { DateRangePickerInput } from "../DateRangePickerInput";
import { DateRange } from "../DateRangePicker";

function renderInput(props: Partial<React.ComponentProps<typeof DateRangePickerInput>> = {}) {
  return render(<DateRangePickerInput {...props} />);
}

describe("DateRangePickerInput", () => {
  it("renders with default placeholder", () => {
    renderInput();
    expect(screen.getByPlaceholderText("Select date range")).toBeInTheDocument();
  });

  it("renders with custom placeholder", () => {
    renderInput({ placeholder: "Pick dates" });
    expect(screen.getByPlaceholderText("Pick dates")).toBeInTheDocument();
  });

  it("renders with a label", () => {
    renderInput({ label: "Date Range" });
    expect(screen.getByLabelText("Date Range")).toBeInTheDocument();
  });

  it("displays formatted date range when value is provided", () => {
    const value: DateRange = {
      startDate: dayjs("2025-06-01"),
      endDate: dayjs("2025-06-15"),
    };
    renderInput({ value });
    expect(screen.getByDisplayValue("Jun 1, 2025 — Jun 15, 2025")).toBeInTheDocument();
  });

  it("displays partial range when only start date is set", () => {
    const value: DateRange = {
      startDate: dayjs("2025-06-01"),
      endDate: null,
    };
    renderInput({ value });
    expect(screen.getByDisplayValue("Jun 1, 2025 — ...")).toBeInTheDocument();
  });

  it("opens popover when clicked", () => {
    renderInput();
    const input = screen.getByPlaceholderText("Select date range");
    fireEvent.click(input);
    // Popover should now contain the DateRangePicker with start/end labels
    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("End Date")).toBeInTheDocument();
  });

  it("does not open popover when disabled", () => {
    renderInput({ disabled: true });
    const input = screen.getByPlaceholderText("Select date range");
    fireEvent.click(input);
    expect(screen.queryByText("Start Date")).not.toBeInTheDocument();
  });

  it("supports custom display format", () => {
    const value: DateRange = {
      startDate: dayjs("2025-06-01"),
      endDate: dayjs("2025-06-15"),
    };
    renderInput({ value, displayFormat: "YYYY/MM/DD" });
    expect(screen.getByDisplayValue("2025/06/01 — 2025/06/15")).toBeInTheDocument();
  });

  it("renders as full width when fullWidth prop is true", () => {
    const { container } = renderInput({ fullWidth: true });
    const textField = container.querySelector(".MuiTextField-root");
    expect(textField).toHaveClass("MuiFormControl-fullWidth");
  });
});
