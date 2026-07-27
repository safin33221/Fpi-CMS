"use client";

import { useEffect, useState } from "react";

interface CountUpProps {
  target: number;
  active: boolean;
  duration?: number;
}

export default function CountUp({
  target,
  active,
  duration = 1400,
}: CountUpProps) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;

    let animationFrame: number;

    const start = performance.now();

    const animate = (time: number) => {
      const progress = Math.min((time - start) / duration, 1);

      // easeOutCubic
      const eased = 1 - Math.pow(1 - progress, 3);

      setCount(Math.round(target * eased));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, [target, active, duration]);

  return <>{count.toLocaleString("en-US")}</>;
}