import { NextResponse } from "next/server";
import { GTAG_SCRIPT_URL } from "@/lib/analytics";

export const runtime = "edge";

function unavailable(): NextResponse {
  return new NextResponse("", { status: 502, headers: { "Cache-Control": "no-store" } });
}

/**
 * Serves gtag.js from this origin so ad blockers that match the Google
 * hostname or the /gtag/js path do not stop analytics from loading.
 * Google's copy is fetched at most once an hour per region.
 */
export async function GET() {
  let script: string;
  try {
    const upstream = await fetch(GTAG_SCRIPT_URL, { next: { revalidate: 3600 } });
    if (!upstream.ok) return unavailable();
    script = await upstream.text();
  } catch {
    return unavailable();
  }

  return new NextResponse(script, {
    status: 200,
    headers: {
      "Content-Type": "application/javascript; charset=utf-8",
      "Cache-Control": "public, max-age=3600, stale-while-revalidate=86400",
    },
  });
}
