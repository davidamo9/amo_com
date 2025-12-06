"use client";

import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

interface TextRevealProps {
  children: string;
  className?: string;
  delay?: number;
  stagger?: number;
  trigger?: boolean;
  as?: "h1" | "h2" | "h3" | "p" | "span" | "div";
}

export function TextReveal({
  children,
  className = "",
  delay = 0,
  stagger = 0.03,
  trigger = false,
  as: Component = "span",
}: TextRevealProps) {
  const textRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = textRef.current;
    if (!element) return;

    // Split text into characters
    const text = children;
    element.innerHTML = text
      .split("")
      .map((char) =>
        char === " "
          ? "<span class='inline-block'>&nbsp;</span>"
          : `<span class='inline-block opacity-0' style='transform: translateY(50px)'>${char}</span>`
      )
      .join("");

    const chars = element.querySelectorAll("span");

    const animation = {
      opacity: 1,
      y: 0,
      duration: 0.6,
      stagger: stagger,
      ease: "power3.out",
      delay: delay,
    };

    if (trigger) {
      gsap.to(chars, {
        ...animation,
        scrollTrigger: {
          trigger: element,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
    } else {
      gsap.to(chars, animation);
    }

    return () => {
      ScrollTrigger.getAll().forEach((t) => {
        if (t.vars.trigger === element) {
          t.kill();
        }
      });
    };
  }, [children, delay, stagger, trigger]);

  return (
    <Component
      ref={textRef as React.RefObject<HTMLHeadingElement & HTMLSpanElement & HTMLParagraphElement & HTMLDivElement>}
      className={className}
    >
      {children}
    </Component>
  );
}
