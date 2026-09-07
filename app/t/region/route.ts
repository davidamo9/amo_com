import { NextRequest, NextResponse } from "next/server";
import { CONSENT_REGIONS } from "@/lib/analytics";

export const dynamic = "force-dynamic";

const REGIONS: ReadonlySet<string> = new Set(CONSENT_REGIONS);

/**
 * Tells the consent notice whether the visitor is in a region that needs
 * one. Vercel sets x-vercel-ip-country on every request; an unknown country
 * is treated as needing the notice, which is the privacy-safe default.
 */
export function GET(request: NextRequest) {
  const country = request.headers.get("x-vercel-ip-country")?.toUpperCase() ?? null;
  const needsConsent = country === null || REGIONS.has(country);
  return NextResponse.json(
    { needsConsent },
    { headers: { "Cache-Control": "no-store" } },
  );
}
