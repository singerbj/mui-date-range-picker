import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import dayjs from "dayjs";
import { DateRangePicker, DateRange } from "../DateRangePicker";

function renderPicker(props: Partial<React.ComponentProps<typeof DateRangePicker>> = {}) {
  return render(<DateRangePicker {...props} />);
}

describe("DateRangePicker", () => {
  it("renders without crashing", () => {
    renderPicker();
    expect(screen.getByText("Start Date")).toBeInTheDocument();
    expect(screen.getByText("End Date")).toBeInTheDocument();
  });

  it("renders custom labels", () => {
    renderPicker({ startLabel: "Check-in", endLabel: "Check-out" });
    expect(screen.getByText("Check-in")).toBeInTheDocument();
    expect(screen.getByText("Check-out")).toBeInTheDocument();
  });

  it("displays placeholder dashes when no dates selected", () => {
    renderPicker();
    const dashes = screen.getAllByText("—");
    expect(dashes.length).toBe(2);
  });

  it("displays the controlled value", () => {
    const value: DateRange = {
      startDate: dayjs("2025-03-01"),
      endDate: dayjs("2025-03-15"),
    };
    renderPicker({ value });
    expect(screen.getByText("Mar 1, 2025")).toBeInTheDocument();
    expect(screen.getByText("Mar 15, 2025")).toBeInTheDocument();
  });

  it("renders action buttons when showActions is true", () => {
    renderPicker({ showActions: true });
    expect(screen.getByText("Clear")).toBeInTheDocument();
    expect(screen.getByText("Apply")).toBeInTheDocument();
  });

  it("does not render action buttons when showActions is false", () => {
    renderPicker({ showActions: false });
    expect(screen.queryByText("Clear")).not.toBeInTheDocument();
    expect(screen.queryByText("Apply")).not.toBeInTheDocument();
  });

  it("Apply button is disabled when no range is selected", () => {
    renderPicker({ showActions: true });
    expect(screen.getByText("Apply").closest("button")).toBeDisabled();
  });

  it("Apply button is enabled when range is fully selected", () => {
    const value: DateRange = {
      startDate: dayjs("2025-03-01"),
      endDate: dayjs("2025-03-15"),
    };
    renderPicker({ showActions: true, value });
    expect(screen.getByText("Apply").closest("button")).toBeEnabled();
  });

  it("calls onClear when Clear is clicked", () => {
    const onClear = vi.fn();
    const onChange = vi.fn();
    renderPicker({ showActions: true, onClear, onChange });
    fireEvent.click(screen.getByText("Clear"));
    expect(onClear).toHaveBeenCalledOnce();
    expect(onChange).toHaveBeenCalledWith({ startDate: null, endDate: null });
  });

  it("calls onApply when Apply is clicked", () => {
    const onApply = vi.fn();
    const value: DateRange = {
      startDate: dayjs("2025-03-01"),
      endDate: dayjs("2025-03-15"),
    };
    renderPicker({ showActions: true, onApply, value });
    fireEvent.click(screen.getByText("Apply"));
    expect(onApply).toHaveBeenCalledOnce();
    expect(onApply).toHaveBeenCalledWith(value);
  });

  it("renders two calendars side by side", () => {
    const { container } = renderPicker();
    const calendars = container.querySelectorAll(".MuiDateCalendar-root");
    expect(calendars.length).toBe(2);
  });

  it("works as uncontrolled component", () => {
    const onChange = vi.fn();
    renderPicker({ onChange });
    // Component renders without value prop - uncontrolled mode
    expect(screen.getAllByText("—").length).toBe(2);
  });
});
