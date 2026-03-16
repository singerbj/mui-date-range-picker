import { useRef } from "react";
import { LicenseInfo } from "./LicenseInfo";
import type { LicenseStatus } from "./verifier";

const CONSOLE_MESSAGES: Record<Exclude<LicenseStatus, "valid">, string> = {
  missing:
    "MUI Date Range Picker: Missing license key. " +
    "This component requires a commercial license. " +
    "Visit https://github.com/singerbj/mui-date-range-picker for details.",
  invalid:
    "MUI Date Range Picker: Invalid license key. " + "Please verify your license key is correct.",
  expired: "MUI Date Range Picker: License key has expired. " + "Please renew your license.",
};

export function useLicense(): { isLicensed: boolean } {
  const warnedRef = useRef(false);
  const status = LicenseInfo.getStatus();
  const isLicensed = status === "valid";

  if (!isLicensed && !warnedRef.current) {
    warnedRef.current = true;
    console.warn(CONSOLE_MESSAGES[status]);
  }

  return { isLicensed };
}
