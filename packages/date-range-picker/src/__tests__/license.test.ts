import { describe, it, expect, beforeEach } from "vitest";
import { generateLicenseKey, verifyLicenseKey } from "../license/verifier";
import { LicenseInfo } from "../license/LicenseInfo";

describe("License key verification", () => {
  it("generates and verifies a valid key", () => {
    const key = generateLicenseKey({
      orderNumber: "ORD-001",
      expiryTimestamp: Date.now() + 365 * 24 * 60 * 60 * 1000,
      plan: "commercial",
    });
    const result = verifyLicenseKey(key);
    expect(result.status).toBe("valid");
    expect(result.meta?.orderNumber).toBe("ORD-001");
    expect(result.meta?.plan).toBe("commercial");
  });

  it("detects expired keys", () => {
    const key = generateLicenseKey({
      orderNumber: "ORD-002",
      expiryTimestamp: Date.now() - 1000,
      plan: "commercial",
    });
    const result = verifyLicenseKey(key);
    expect(result.status).toBe("expired");
    expect(result.meta?.orderNumber).toBe("ORD-002");
  });

  it("rejects invalid keys", () => {
    expect(verifyLicenseKey("garbage.data").status).toBe("invalid");
    expect(verifyLicenseKey("no-dot-separator").status).toBe("invalid");
    expect(verifyLicenseKey("").status).toBe("missing");
  });

  it("rejects tampered keys", () => {
    const key = generateLicenseKey({
      orderNumber: "ORD-003",
      expiryTimestamp: Date.now() + 365 * 24 * 60 * 60 * 1000,
      plan: "commercial",
    });
    // Tamper with the signature
    const tampered = key.slice(0, -1) + "x";
    expect(verifyLicenseKey(tampered).status).toBe("invalid");
  });
});

describe("LicenseInfo", () => {
  beforeEach(() => {
    LicenseInfo.setLicenseKey("");
  });

  it("returns missing when no key is set", () => {
    expect(LicenseInfo.getStatus()).toBe("missing");
  });

  it("returns valid when a valid key is set", () => {
    const key = generateLicenseKey({
      orderNumber: "ORD-100",
      expiryTimestamp: Date.now() + 365 * 24 * 60 * 60 * 1000,
      plan: "enterprise",
    });
    LicenseInfo.setLicenseKey(key);
    expect(LicenseInfo.getStatus()).toBe("valid");
  });

  it("caches status until key changes", () => {
    LicenseInfo.setLicenseKey("bad-key");
    expect(LicenseInfo.getStatus()).toBe("invalid");

    const key = generateLicenseKey({
      orderNumber: "ORD-101",
      expiryTimestamp: Date.now() + 365 * 24 * 60 * 60 * 1000,
      plan: "commercial",
    });
    LicenseInfo.setLicenseKey(key);
    expect(LicenseInfo.getStatus()).toBe("valid");
  });
});
