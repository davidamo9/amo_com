"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { gsap } from "gsap";

interface CountUpProps {
  end: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  className?: string;
}

export function CountUp({
  end,
  duration = 2,
  suffix = "",
  prefix = "",
  className = "",
}: CountUpProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    const obj = { value: 0 };
    gsap.to(obj, {
      value: end,
      duration: duration,
      ease: "power2.out",
      onUpdate: () => setCount(Math.floor(obj.value)),
    });
  }, [isInView, end, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {count}
      {suffix}
    </span>
  );
}
