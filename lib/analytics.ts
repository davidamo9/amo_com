type EventParams = Record<string, string | number | boolean>;

interface WindowWithGtag extends Window {
  gtag?: (...args: unknown[]) => void;
}

/**
 * Fire a GA4 event. Safe to call anywhere: no-ops on the server and when
 * analytics is not configured (NEXT_PUBLIC_GA_ID unset or blocked).
 */
export function track(event: string, params?: EventParams): void {
  if (typeof window === "undefined") return;
  const gtag = (window as WindowWithGtag).gtag;
  if (!gtag) return;
  gtag("event", event, params);
}

/**
 * First-party transport. Hits and the gtag script are served under
 * TRACKING_PATH by two route handlers (app/t/lib.js and app/t/g/collect)
 * instead of going straight to Google. That keeps analytics working behind
 * ad blockers, and lets the collect proxy refresh the _ga cookies over HTTP
 * so Safari ITP does not cap them at 7 days.
 */
export const GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? "G-EK3N131XRB";

/** First-party path prefix; gtag appends /g/collect to it for every hit. */
export const TRACKING_PATH = "/t";

export const GTAG_SCRIPT_URL = `https://www.googletagmanager.com/gtag/js?id=${GA_ID}&l=dataLayer`;
export const GA_COLLECT_URL = "https://www.google-analytics.com/g/collect";

/** Hosts whose _ga cookies are refreshed with the apex domain attribute. */
export const COOKIE_DOMAIN = "aungmyintoo.com";
