# Analytics

Google Analytics 4 (property `G-EK3N131XRB`), served first-party. No tag manager, no
third-party tracking vendor, no extra dependencies beyond `@vercel/speed-insights`.

## Request path

```
browser
  GET  /t/lib.js          gtag.js proxied from googletagmanager.com, cached 1 hour
  GET  /t/region          { needsConsent } from the x-vercel-ip-country header
  POST /t/g/collect       every GA4 hit, via gtag's transport_url
        -> https://www.google-analytics.com/g/collect  with _uip and browser headers
        <- 204 + Set-Cookie refreshing _ga and _ga_* for 400 days
```

All three routes live under `app/t/` and run on the Edge runtime. Robots are told to
stay out of `/t/`.

## Files

| File | Role |
|---|---|
| `lib/analytics.ts` | `GA_ID`, `TRACKING_PATH`, upstream URLs, `COOKIE_DOMAIN`, `CONSENT_REGIONS`, `CONSENT_STORAGE_KEY`, and the `track()` helper for custom events |
| `components/analytics/GoogleTag.tsx` | Inline bootstrap: consent default, replay of a stored choice, `config` with `transport_url` |
| `components/analytics/ConsentNotice.tsx` | Resolves consent from `/t/region`; shows the notice inside the consent regions |
| `app/t/lib.js/route.ts` | Script proxy |
| `app/t/g/collect/route.ts` | Hit proxy and cookie refresh |
| `app/t/region/route.ts` | Country lookup for consent |
| `lib/attribution.ts` | First-touch capture (referrer host, landing path, UTM tags) and the AI assistant referrer list |
| `components/analytics/Attribution.tsx` | Captures the first touch on load and fires `ai_referral` |
| `app/layout.tsx` | Mounts `GoogleTag`, `ConsentNotice`, `Attribution`, and `SpeedInsights` |

## Why first-party

The Stape tracking audit on 2026-09-07 scored the site 45/100: GA4 loaded straight from
Google, so ad blockers dropped it and Safari ITP capped the `_ga` cookies at 7 days.

- Ad blockers match Google's hostnames and the `/gtag/js` path. `/t/lib.js` and
  `/t/g/collect` on this domain match no rule in EasyPrivacy.
- Safari caps JavaScript-set cookies at 7 days but honours an HTTP `Set-Cookie` from the
  same host and IP as the page. The collect route re-emits `_ga` and `_ga_*` unchanged
  with a 400-day `Max-Age`.
- The visitor IP is forwarded as `_uip` so GA4 geography stays correct, and the
  user-agent and client-hint headers are forwarded for device reports.

## Consent Mode v2

Everything starts denied and gtag holds hits for up to one second. `ConsentNotice`
asks `/t/region`; outside the EEA, UK, and Switzerland it grants analytics at once and
renders nothing. Inside them it shows a small notice. Allow grants analytics, No thanks
keeps the cookieless default, and either choice is stored in `localStorage` under
`amo_consent` and replayed inline by `GoogleTag` on later visits.

gtag's own `region` list is not used. Google geolocates `gtag.js` when it is fetched,
and the proxy fetches it from Vercel's server, so every visitor would look like they are
wherever that server is.

## Attribution

GA4 cannot say how one particular person found the site, so the contact form says it
instead. On the first page of a session, `Attribution` stores the referrer host (or
`direct`), the landing path, and any `utm_source`, `utm_medium`, and `utm_campaign` in
`sessionStorage` under `amo_first_touch`. Nothing leaves the browser until the visitor
submits the contact form, which sends it as `source`; the email then shows a "How they
found the site" list. It is not stored in the database.

When the referrer is an AI assistant (ChatGPT, Perplexity, Claude, Gemini, Copilot,
DeepSeek), or ChatGPT's `utm_source=chatgpt.com` tag is present, `Attribution` fires
`ai_referral` with an `assistant` parameter once gtag has loaded.

Tag links you post elsewhere so they show up by name, for example
`https://aungmyintoo.com/?utm_source=linkedin&utm_medium=profile`.

## Environment

| Variable | Where | Purpose |
|---|---|---|
| `NEXT_PUBLIC_GA_ID` | Vercel project and `.env.local` | Measurement ID. Falls back to the production ID when unset. |

Speed Insights must be enabled once in the Vercel project dashboard for the injected
script to report.

## Guardrails on the collect route

- Only hits whose `tid` matches `GA_ID` are relayed (400 otherwise).
- POST bodies over 64 KB get 413.
- Only cookies matching `_ga` or `_ga_<ID>` with gtag-shaped values are re-emitted.
- Upstream failure returns 502 rather than throwing.

## Debugging

- Open the site with the Network tab filtered to `/t/`. You should see `lib.js`,
  `region`, and `g/collect`, and nothing to a Google host.
- The `gcs` query parameter on a hit shows consent state: `G101` means analytics
  granted, `G100` means denied (cookieless ping).
- GA4 DebugView: add `?debug_mode=1` is not needed; enable the GA debugger extension or
  send `_dbg=1` on a hit through the proxy.
- Cookie lifetime: in Safari, Storage tab, `_ga` should show an expiry about 400 days
  out after any hit.
- Local: `npx next dev` then `curl "http://localhost:3000/t/g/collect?v=2&tid=G-EK3N131XRB&cid=1.2"`
  should return 204. Add a `Cookie: _ga=GA1.1.1.2` header to see the refresh.

## Turning it off

Remove `<GoogleTag />` and `<ConsentNotice />` from `app/layout.tsx`. The routes can stay;
they only act on requests gtag makes.

## History

- 2026-09-08: first-party proxy, cookie refresh, Consent Mode v2, Edge runtime, page
  speed pass (home mobile Lighthouse 62 to 95). amoOS sprint 122.
- 2026-10-06: first-touch attribution on contact emails and the `ai_referral` event.
