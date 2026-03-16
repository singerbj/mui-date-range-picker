import { verifyLicenseKey, type LicenseStatus } from "./verifier";

let licenseKey = "";
let cachedStatus: LicenseStatus | null = null;

export class LicenseInfo {
  static setLicenseKey(key: string): void {
    licenseKey = key;
    cachedStatus = null; // Reset cache when key changes
  }

  static getLicenseKey(): string {
    return licenseKey;
  }

  static getStatus(): LicenseStatus {
    if (cachedStatus === null) {
      cachedStatus = verifyLicenseKey(licenseKey).status;
    }
    return cachedStatus;
  }
}
