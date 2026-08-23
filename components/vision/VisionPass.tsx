"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Scan, X } from "lucide-react";

/**
 * The site inspects itself the way my robots used to inspect mobile apps:
 * a scanline sweeps the viewport and vision-style bounding boxes snap onto
 * the real UI elements, each with a detected class and a confidence score,
 * ending in an inspection report.
 *
 * Elements can opt into a curated label via data-vision="LABEL"; everything
 * else is classified by a tag heuristic. Boxes are plain absolutely
 * positioned divs over a fixed overlay, so the pass costs nothing until it
 * is invoked and nothing after it is dismissed.
 */

interface Detection {
  left: number;
  top: number;
  width: number;
  height: number;
  label: string;
  confidence: string;
  delayMs: number;
}

const SCAN_DURATION_MS = 1400;
const REPORT_DELAY_MS = 1800;
const AUTO_DISMISS_MS = 9000;
const MAX_DETECTIONS = 16;
const MIN_WIDTH_PX = 48;
const MIN_HEIGHT_PX = 32;

function classify(element: Element): string {
  const curated = element.getAttribute("data-vision");
  if (curated) return curated;
  const tag = element.tagName.toLowerCase();
  if (tag === "h1") return "HEADLINE";
  if (tag === "h2" || tag === "h3") return "SECTION_HEADING";
  if (tag === "canvas") return "WEBGL_SURFACE";
  if (tag === "img") return "IMAGE";
  if (tag === "input" || tag === "textarea") return "INPUT_FIELD";
  if (tag === "button") return "BUTTON";
  if (tag === "a") {
    const href = element.getAttribute("href") ?? "";
    if (href.startsWith("mailto:")) return "EMAIL_LINK";
    if (href.startsWith("http")) return "EXTERNAL_LINK";
    return "NAV_LINK";
  }
  if (tag === "p") return "TEXT_BLOCK";
  return "ELEMENT";
}

function collectDetections(): Detection[] {
  const viewportHeight = window.innerHeight;
  const viewportWidth = window.innerWidth;
  const candidates = document.querySelectorAll(
    "[data-vision], h1, h2, h3, a[href], button, p, input, textarea, img"
  );
  const detections: Detection[] = [];
  const seen: DOMRect[] = [];

  for (const element of candidates) {
    if (detections.length >= MAX_DETECTIONS) break;
    if (element.closest("[data-vision-skip]")) continue;
    const rect = element.getBoundingClientRect();
    if (rect.width < MIN_WIDTH_PX || rect.height < MIN_HEIGHT_PX) continue;
    if (rect.bottom < 0 || rect.top > viewportHeight) continue;
    if (rect.right < 0 || rect.left > viewportWidth) continue;
    if (rect.width > viewportWidth * 0.98 && rect.height > viewportHeight * 0.98) continue;
    // Skip near-duplicates (a link wrapping the only element inside it)
    const duplicate = seen.some(
      (other) =>
        Math.abs(other.left - rect.left) < 8 &&
        Math.abs(other.top - rect.top) < 8 &&
        Math.abs(other.width - rect.width) < 16
    );
    if (duplicate) continue;
    seen.push(rect);

    const index = detections.length;
    // Deterministic pseudo-confidence in the 0.87 to 0.99 band
    const confidence = (0.87 + ((index * 731) % 121) / 1000).toFixed(2);
    detections.push({
      left: rect.left,
      top: rect.top,
      width: rect.width,
      height: rect.height,
      label: classify(element),
      confidence,
      delayMs: Math.round((rect.top / viewportHeight) * SCAN_DURATION_MS),
    });
  }
  return detections;
}

export function VisionPass() {
  const [running, setRunning] = useState(false);
  const [detections, setDetections] = useState<Detection[]>([]);
  const [showReport, setShowReport] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const timersRef = useRef<number[]>([]);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(query.matches);
    const handleChange = (event: MediaQueryListEvent) => setReducedMotion(event.matches);
    query.addEventListener("change", handleChange);
    return () => query.removeEventListener("change", handleChange);
  }, []);

  const dismiss = useCallback(() => {
    timersRef.current.forEach((timer) => window.clearTimeout(timer));
    timersRef.current = [];
    setRunning(false);
    setShowReport(false);
    setDetections([]);
  }, []);

  const run = useCallback(() => {
    if (running) return;
    setDetections(collectDetections());
    setRunning(true);
    timersRef.current.push(
      window.setTimeout(() => setShowReport(true), reducedMotion ? 200 : REPORT_DELAY_MS),
      window.setTimeout(dismiss, AUTO_DISMISS_MS)
    );
  }, [running, reducedMotion, dismiss]);

  useEffect(() => {
    if (!running) return;
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") dismiss();
    };
    window.addEventListener("keydown", handleKey);
    window.addEventListener("scroll", dismiss, { passive: true });
    return () => {
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("scroll", dismiss);
    };
  }, [running, dismiss]);

  useEffect(() => () => timersRef.current.forEach((timer) => window.clearTimeout(timer)), []);

  return (
    <>
      {/* Trigger */}
      {!running && (
        <button
          type="button"
          onClick={run}
          data-vision-skip
          title="My robots used to inspect mobile apps like this. Try it on the page."
          className="fixed bottom-6 right-6 z-40 inline-flex items-center gap-2 px-4 py-2.5 rounded-full border border-orange-500/40 bg-background/80 backdrop-blur-sm text-orange-500 text-xs font-mono uppercase tracking-[0.15em] hover:bg-orange-500/10 hover:border-orange-500/70 transition-all duration-300"
        >
          <Scan className="h-3.5 w-3.5" />
          Run Vision Pass
        </button>
      )}

      {/* Overlay */}
      {running && (
        <div className="fixed inset-0 z-[60]" aria-hidden="true">
          {/* Scanline */}
          {!reducedMotion && (
            <div className="vision-scanline absolute left-0 right-0 h-24 pointer-events-none" />
          )}

          {/* Detections */}
          {detections.map((detection, index) => (
            <div
              key={index}
              className="vision-box absolute pointer-events-none"
              style={{
                left: detection.left - 4,
                top: detection.top - 4,
                width: detection.width + 8,
                height: detection.height + 8,
                animationDelay: reducedMotion ? "0ms" : `${detection.delayMs}ms`,
              }}
            >
              <span className={`vision-label${detection.top < 48 ? " vision-label-below" : ""}`}>
                {detection.label} <span className="vision-confidence">{detection.confidence}</span>
              </span>
            </div>
          ))}

          {/* Report */}
          <div
            className={`absolute bottom-6 left-1/2 -translate-x-1/2 transition-all duration-500 ${
              showReport ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"
            }`}
          >
            <div className="pointer-events-auto flex items-center gap-4 px-5 py-3 rounded-xl border border-orange-500/40 bg-background/90 backdrop-blur-md font-mono text-xs">
              <span className="text-orange-500 uppercase tracking-wider">
                Inspection complete
              </span>
              <span className="text-foreground">
                {detections.length} elements · 0 defects
              </span>
              <span className="text-muted-foreground hidden sm:inline">
                My robots did this to mobile apps in 4 countries.
              </span>
              <button
                type="button"
                onClick={dismiss}
                aria-label="Dismiss vision pass"
                className="text-muted-foreground hover:text-orange-500 transition-colors"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
