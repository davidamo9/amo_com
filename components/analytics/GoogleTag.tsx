import Script from "next/script";
import { CONSENT_STORAGE_KEY, GA_ID, TRACKING_PATH } from "@/lib/analytics";

/**
 * Loads gtag.js from the first-party script proxy and points every hit at the
 * first-party collect proxy via transport_url. See lib/analytics.ts.
 *
 * Consent Mode v2: everything starts denied and gtag holds hits for up to
 * wait_for_update ms. ConsentNotice then grants analytics right away for
 * visitors outside CONSENT_REGIONS, or shows the notice inside them. gtag's
 * own region matching cannot be used here: Google geolocates the script at
 * fetch time, and the proxy fetches it from Vercel's server, not the visitor.
 * A stored acceptance is replayed inline so returning visitors are counted
 * from the first hit.
 */
export function GoogleTag() {
  const consentDefault = {
    ad_storage: "denied",
    ad_user_data: "denied",
    ad_personalization: "denied",
    analytics_storage: "denied",
    wait_for_update: 1000,
  };
  const bootstrap = [
    "window.dataLayer=window.dataLayer||[];",
    "function gtag(){dataLayer.push(arguments);}",
    `gtag('consent','default',${JSON.stringify(consentDefault)});`,
    `try{if(localStorage.getItem('${CONSENT_STORAGE_KEY}')==='granted'){gtag('consent','update',{analytics_storage:'granted'});}}catch(e){}`,
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
