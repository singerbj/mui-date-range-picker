import { describe, it, expect } from "vitest";
import { DateRangePicker, DateRangePickerInput } from "../index";

describe("Package exports", () => {
  it("exports DateRangePicker", () => {
    expect(DateRangePicker).toBeDefined();
    expect(typeof DateRangePicker).toBe("function");
  });

  it("exports DateRangePickerInput", () => {
    expect(DateRangePickerInput).toBeDefined();
    expect(typeof DateRangePickerInput).toBe("function");
  });
});
