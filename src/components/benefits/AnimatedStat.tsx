import { useEffect, useRef, useState } from 'react';

interface AnimatedStatProps {
  value: string;
}

export function AnimatedStat({ value }: AnimatedStatProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const [displayed, setDisplayed] = useState(value);
  const [hasAnimated, setHasAnimated] = useState(false);

  useEffect(() => {
    if (hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setHasAnimated(true);

        const numMatch = value.match(/[\d.]+/);
        if (!numMatch) {
          setDisplayed(value);
          return;
        }
        const target = parseFloat(numMatch[0]);
        const prefix = value.slice(0, value.indexOf(numMatch[0]));
        const suffix = value.slice(value.indexOf(numMatch[0]) + numMatch[0].length);
        const duration = 1600;
        const start = performance.now();

        const tick = (now: number) => {
          const elapsed = now - start;
          const progress = Math.min(elapsed / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const current = Math.round(target * eased);
          setDisplayed(`${prefix}${current}${suffix}`);
          if (progress < 1) requestAnimationFrame(tick);
          else setDisplayed(value);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.5 },
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [value, hasAnimated]);

  return <span ref={ref}>{displayed}</span>;
}
