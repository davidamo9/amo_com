import { NextRequest, NextResponse } from "next/server";
import { COOKIE_DOMAIN, GA_COLLECT_URL, GA_ID } from "@/lib/analytics";

export const dynamic = "force-dynamic";

/** 400 days, the longest lifetime Chrome and Safari accept for a cookie. */
const COOKIE_MAX_AGE_SECONDS = 400 * 24 * 60 * 60;

/** GA4 batches at most a few events per request; anything larger is not gtag. */
const MAX_BODY_BYTES = 64 * 1024;

/** Only the shapes gtag produces: "GA1.1.123.456", "GS2.1.s123$o1$g0$t123$j0$l0$h0". */
const COOKIE_NAME = /^_ga(_[A-Z0-9]{4,20})?$/;
const COOKIE_VALUE = /^[A-Za-z0-9.$-]{1,200}$/;

/** Request headers GA4 reads to classify browser, device, and language. */
const FORWARDED_HEADERS = [
  "user-agent",
  "accept-language",
  "sec-ch-ua",
  "sec-ch-ua-mobile",
  "sec-ch-ua-platform",
  "sec-ch-ua-platform-version",
  "sec-ch-ua-model",
  "sec-ch-ua-full-version-list",
  "sec-ch-ua-arch",
  "sec-ch-ua-bitness",
  "sec-ch-ua-wow64",
];

/** Vercel sets x-real-ip from the connection; x-forwarded-for is the fallback. */
function clientIp(request: NextRequest): string | null {
  const realIp = request.headers.get("x-real-ip")?.trim();
  if (realIp) return realIp;
  const first = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim();
  return first || null;
}

/** Raw cookie pairs; GA4 cookie values contain "$" and must not be re-encoded. */
function analyticsCookies(request: NextRequest): Array<[string, string]> {
  const header = request.headers.get("cookie");
  if (!header) return [];

  const pairs: Array<[string, string]> = [];
  for (const part of header.split(";")) {
    const separator = part.indexOf("=");
    if (separator === -1) continue;
    const name = part.slice(0, separator).trim();
    const value = part.slice(separator + 1).trim();
    if (COOKIE_NAME.test(name) && COOKIE_VALUE.test(value)) pairs.push([name, value]);
  }
  return pairs;
}

function cookieDomainFor(host: string | null): string | null {
  if (!host) return null;
  const bare = host.split(":")[0];
  if (bare === COOKIE_DOMAIN || bare.endsWith(`.${COOKIE_DOMAIN}`)) return COOKIE_DOMAIN;
  return null;
}

function reject(status: number): NextResponse {
  return new NextResponse(null, { status, headers: { "Cache-Control": "no-store" } });
}

/**
 * Forwards a gtag hit to GA4 with the visitor's IP and browser headers, then
 * re-emits the _ga cookies over HTTP. Safari caps JavaScript-set cookies at
 * 7 days; a Set-Cookie from the same host and IP as the page is honoured for
 * the full 400 days.
 */
async function forward(request: NextRequest): Promise<NextResponse> {
  // Only relay hits for this site's property, so the route is not an open proxy.
  if (request.nextUrl.searchParams.get("tid") !== GA_ID) return reject(400);

  let body: string | undefined;
  if (request.method === "POST") {
    const declared = Number(request.headers.get("content-length") ?? 0);
    if (declared > MAX_BODY_BYTES) return reject(413);
    body = await request.text();
    if (body.length > MAX_BODY_BYTES) return reject(413);
  }

  const upstreamUrl = new URL(GA_COLLECT_URL);
  upstreamUrl.search = request.nextUrl.search;

  const ip = clientIp(request);
  if (ip) upstreamUrl.searchParams.set("_uip", ip);

  const headers = new Headers();
  for (const name of FORWARDED_HEADERS) {
    const value = request.headers.get(name);
    if (value) headers.set(name, value);
  }
  if (body !== undefined) headers.set("Content-Type", "text/plain;charset=UTF-8");

  let upstreamStatus: number;
  try {
    const upstream = await fetch(upstreamUrl, {
      method: request.method,
      headers,
      body,
      cache: "no-store",
    });
    upstreamStatus = upstream.ok ? 204 : upstream.status;
  } catch {
    return reject(502);
  }

  const response = new NextResponse(null, { status: upstreamStatus });
  response.headers.set("Cache-Control", "no-store");

  const domain = cookieDomainFor(request.headers.get("host"));
  for (const [name, value] of analyticsCookies(request)) {
    const attributes = [
      `${name}=${value}`,
      `Max-Age=${COOKIE_MAX_AGE_SECONDS}`,
      "Path=/",
      "Secure",
      "SameSite=Lax",
    ];
    if (domain) attributes.push(`Domain=${domain}`);
    response.headers.append("Set-Cookie", attributes.join("; "));
  }

  return response;
}

export async function GET(request: NextRequest) {
  return forward(request);
}

export async function POST(request: NextRequest) {
  return forward(request);
}
