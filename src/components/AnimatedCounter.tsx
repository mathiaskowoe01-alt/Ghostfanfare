"use client";

import React, { useEffect, useRef, useState } from "react";

interface AnimatedCounterProps {
  value: number;
  suffix?: string;
  prefix?: string;
  durationMs?: number;
}

export function AnimatedCounter({
  value,
  suffix = "",
  prefix = "",
  durationMs = 1200,
}: AnimatedCounterProps) {
  const [display, setDisplay] = useState(value);
  const hasAnimated = useRef(false);
  const ref = useRef<HTMLSpanElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const start = performance.now();
          const tick = (now: number) => {
            const elapsed = now - start;
            const progress = Math.min(1, elapsed / durationMs);
            // Ease out cubic
            const eased = 1 - Math.pow(1 - progress, 3);
            setDisplay(Math.round(eased * value));
            if (progress < 1) {
              requestAnimationFrame(tick);
            }
          };
          setDisplay(0);
          requestAnimationFrame(tick);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [value, durationMs]);

  return (
    <span ref={ref} className="font-mono-data">
      {prefix}
      {display.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}
      {suffix}
    </span>
  );
}
