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
