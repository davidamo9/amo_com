"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    // Only show cursor on non-touch devices
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const cursor = cursorRef.current;
    const dot = cursorDotRef.current;

    if (!cursor || !dot) return;

    // Add class to html for hiding default cursor
    document.documentElement.classList.add('has-custom-cursor');

    const moveCursor = (e: MouseEvent) => {
      setIsVisible(true);

      gsap.to(cursor, {
        x: e.clientX - 20,
        y: e.clientY - 20,
        duration: 0.5,
        ease: "power3.out",
      });
      gsap.to(dot, {
        x: e.clientX - 4,
        y: e.clientY - 4,
        duration: 0.1,
      });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => setIsHovering(false);

    const handleMouseLeaveWindow = () => setIsVisible(false);
    const handleMouseEnterWindow = () => setIsVisible(true);

    // Track interactive elements
    const updateInteractiveElements = () => {
      const interactiveElements = document.querySelectorAll(
        "a, button, [data-cursor-hover], input, textarea, select"
      );

      interactiveElements.forEach((el) => {
        el.addEventListener("mouseenter", handleMouseEnter);
        el.addEventListener("mouseleave", handleMouseLeave);
      });

      return interactiveElements;
    };

    let interactiveElements = updateInteractiveElements();

    // Re-check for interactive elements periodically (for dynamic content)
    const observer = new MutationObserver(() => {
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
      interactiveElements = updateInteractiveElements();
    });

    observer.observe(document.body, { childList: true, subtree: true });

    window.addEventListener("mousemove", moveCursor);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      window.removeEventListener("mousemove", moveCursor);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      observer.disconnect();
      interactiveElements.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, []);

  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;

    gsap.to(cursor, {
      scale: isHovering ? 1.5 : 1,
      opacity: isHovering ? 0.8 : 0.5,
      duration: 0.3,
      ease: "power2.out",
    });
  }, [isHovering]);

  // Don't render on touch devices
  if (typeof window !== 'undefined') {
    const isTouchDevice = 'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return null;
  }

  return (
    <>
      {/* Outer ring */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 w-10 h-10 rounded-full border border-gold-500/50 pointer-events-none z-[9998] mix-blend-difference hidden md:block transition-opacity duration-300"
        style={{
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 0.5 : 0,
        }}
      />
      {/* Inner dot */}
      <div
        ref={cursorDotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-gold-500 pointer-events-none z-[9998] hidden md:block transition-opacity duration-300"
        style={{
          transform: "translate(-50%, -50%)",
          opacity: isVisible ? 1 : 0,
        }}
      />
    </>
  );
}
