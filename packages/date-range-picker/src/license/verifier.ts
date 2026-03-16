const SIGNING_KEY = "mui-drp-2024-commercial";

export type LicenseStatus = "valid" | "expired" | "invalid" | "missing";

export interface LicenseMeta {
  orderNumber: string;
  expiryTimestamp: number;
  plan: "commercial" | "enterprise";
}

/**
 * Simple hash function for offline license key verification.
 * This is a deterrent, not cryptographic security — the code is open source.
 */
function simpleHash(input: string): string {
  let hash = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charCodeAt(i);
    hash = ((hash << 5) - hash + char) | 0;
  }
  // Convert to unsigned 32-bit and then to base36
  return (hash >>> 0).toString(36);
}

function sign(data: string): string {
  return simpleHash(data + SIGNING_KEY);
}

/**
 * Generate a license key (for internal/admin use).
 */
export function generateLicenseKey(meta: LicenseMeta): string {
  const payload = btoa(
    JSON.stringify({
      o: meta.orderNumber,
      e: meta.expiryTimestamp,
      p: meta.plan,
    }),
  );
  const signature = sign(payload);
  return `${payload}.${signature}`;
}

/**
 * Verify a license key and return its status.
 */
export function verifyLicenseKey(key: string): {
  status: LicenseStatus;
  meta?: LicenseMeta;
} {
  if (!key) {
    return { status: "missing" };
  }

  try {
    const [payload, signature] = key.split(".");
    if (!payload || !signature) {
      return { status: "invalid" };
    }

    const expectedSignature = sign(payload);
    if (signature !== expectedSignature) {
      return { status: "invalid" };
    }

    const decoded = JSON.parse(atob(payload));
    const meta: LicenseMeta = {
      orderNumber: decoded.o,
      expiryTimestamp: decoded.e,
      plan: decoded.p,
    };

    if (!meta.orderNumber || !meta.expiryTimestamp || !meta.plan) {
      return { status: "invalid" };
    }

    if (Date.now() > meta.expiryTimestamp) {
      return { status: "expired", meta };
    }

    return { status: "valid", meta };
  } catch {
    return { status: "invalid" };
  }
}
