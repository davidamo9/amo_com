"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";
import { captureFirstTouch } from "@/lib/attribution";

const GTAG_POLL_MS = 250;
const GTAG_POLL_LIMIT = 40;

/**
 * Stores the session's first touch for the contact form and fires
 * ai_referral when the visitor arrived from an AI assistant. gtag is
 * bootstrapped afterInteractive, so the event waits for it to exist.
 */
export function Attribution() {
  useEffect(() => {
    const assistant = captureFirstTouch();
    if (!assistant) return;
    let attempts = 0;
    const timer = window.setInterval(() => {
      attempts += 1;
      const ready = typeof (window as Window & { gtag?: unknown }).gtag === "function";
      if (ready) track("ai_referral", { assistant });
      if (ready || attempts >= GTAG_POLL_LIMIT) window.clearInterval(timer);
    }, GTAG_POLL_MS);
    return () => window.clearInterval(timer);
  }, []);

  return null;
}
