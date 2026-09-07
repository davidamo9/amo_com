"use client";

import { useEffect, useState } from "react";
import { CONSENT_STORAGE_KEY, TRACKING_PATH } from "@/lib/analytics";

type Choice = "granted" | "denied";

interface WindowWithDataLayer extends Window {
  dataLayer?: unknown[];
}

function readChoice(): Choice | null {
  try {
    const stored = localStorage.getItem(CONSENT_STORAGE_KEY);
    return stored === "granted" || stored === "denied" ? stored : null;
  } catch {
    return null;
  }
}

/**
 * Same as calling gtag(): push the arguments object onto the data layer.
 * Going through the data layer instead of window.gtag means the update is
 * queued even if it arrives before the inline bootstrap or gtag.js has run.
 */
function gtag(..._args: unknown[]): void {
  const target = window as WindowWithDataLayer;
  target.dataLayer = target.dataLayer ?? [];
  // eslint-disable-next-line prefer-rest-params
  target.dataLayer.push(arguments);
}

function grantAnalytics() {
  gtag("consent", "update", { analytics_storage: "granted" });
}

/**
 * Resolves the Consent Mode default that GoogleTag left at "denied".
 * /t/region decides server-side whether the visitor is in CONSENT_REGIONS:
 * outside them analytics is granted at once and nothing renders; inside them
 * this notice appears until the visitor chooses. Accepting grants analytics so
 * GA4 can set its cookies; declining keeps the cookieless default. A choice is
 * remembered in localStorage and replayed by GoogleTag on later visits.
 */
export function ConsentNotice() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (readChoice() !== null) return;
    const controller = new AbortController();
    fetch(`${TRACKING_PATH}/region`, { signal: controller.signal })
      .then((response) => (response.ok ? response.json() : { needsConsent: false }))
      .then((data: { needsConsent?: boolean }) => {
        if (data.needsConsent) setVisible(true);
        else grantAnalytics();
      })
      .catch(() => undefined);
    return () => controller.abort();
  }, []);

  const choose = (choice: Choice) => {
    try {
      localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    } catch {
      // Storage unavailable: the choice still applies for this page view
    }
    if (choice === "granted") grantAnalytics();
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="region"
      aria-label="Analytics notice"
      className="fixed inset-x-4 bottom-4 z-50 mx-auto max-w-xl rounded-2xl border border-border bg-card p-5 shadow-2xl"
    >
      <p className="font-body text-sm text-muted-foreground">
        This site uses Google Analytics to count visits, served through this domain. No ads, no
        data sold. Allow analytics cookies?
      </p>
      <div className="mt-4 flex flex-wrap gap-3">
        <button
          type="button"
          onClick={() => choose("granted")}
          className="rounded-full bg-orange-500 px-5 py-2 text-sm font-semibold text-background transition-colors hover:bg-orange-400"
        >
          Allow
        </button>
        <button
          type="button"
          onClick={() => choose("denied")}
          className="rounded-full border border-border px-5 py-2 text-sm font-semibold text-muted-foreground transition-colors hover:border-orange-500/50 hover:text-orange-500"
        >
          No thanks
        </button>
      </div>
    </div>
  );
}
