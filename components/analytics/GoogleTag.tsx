import Script from "next/script";
import { GA_ID, TRACKING_PATH } from "@/lib/analytics";

/**
 * Loads gtag.js from the first-party script proxy and points every hit at the
 * first-party collect proxy via transport_url. See lib/analytics.ts.
 */
export function GoogleTag() {
  const bootstrap = [
    "window.dataLayer=window.dataLayer||[];",
    "function gtag(){dataLayer.push(arguments);}",
    "gtag('js',new Date());",
    `gtag('config','${GA_ID}',{transport_url:window.location.origin+'${TRACKING_PATH}'});`,
  ].join("");

  return (
    <>
      <Script src={`${TRACKING_PATH}/lib.js`} strategy="afterInteractive" />
      <Script id="ga4-bootstrap" strategy="afterInteractive">
        {bootstrap}
      </Script>
    </>
  );
}
