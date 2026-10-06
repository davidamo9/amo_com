/**
 * First-touch attribution for the session: where the visitor came from and
 * which page they landed on. Kept in sessionStorage only, and sent to the
 * server only when the visitor submits the contact form.
 */
export interface FirstTouch {
  referrer: string;
  landing: string;
  utm_source?: string;
  utm_medium?: string;
  utm_campaign?: string;
}

const STORAGE_KEY = "amo_first_touch";
const UTM_KEYS = ["utm_source", "utm_medium", "utm_campaign"] as const;
const MAX_FIELD_LENGTH = 200;

/** Referrer hosts that mean the visitor came from an AI assistant. */
const AI_REFERRERS: Record<string, string> = {
  "chatgpt.com": "chatgpt",
  "chat.openai.com": "chatgpt",
  "perplexity.ai": "perplexity",
  "www.perplexity.ai": "perplexity",
  "claude.ai": "claude",
  "gemini.google.com": "gemini",
  "copilot.microsoft.com": "copilot",
  "chat.deepseek.com": "deepseek",
};

function referrerHost(): string {
  if (!document.referrer) return "";
  try {
    const host = new URL(document.referrer).hostname;
    return host === window.location.hostname ? "" : host;
  } catch {
    return "";
  }
}

/**
 * Record the first touch of this session if none is stored yet.
 * Returns the AI assistant name when the visitor arrived from one.
 */
export function captureFirstTouch(): string | undefined {
  try {
    if (sessionStorage.getItem(STORAGE_KEY)) return undefined;
    const params = new URLSearchParams(window.location.search);
    const touch: FirstTouch = {
      referrer: referrerHost() || "direct",
      landing: window.location.pathname,
    };
    for (const key of UTM_KEYS) {
      const value = params.get(key);
      if (value) touch[key] = value.slice(0, MAX_FIELD_LENGTH);
    }
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(touch));
    return AI_REFERRERS[touch.referrer] ?? (touch.utm_source === "chatgpt.com" ? "chatgpt" : undefined);
  } catch {
    return undefined;
  }
}

/** The stored first touch, or undefined when storage is unavailable. */
export function getFirstTouch(): FirstTouch | undefined {
  try {
    const raw = sessionStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as FirstTouch) : undefined;
  } catch {
    return undefined;
  }
}
