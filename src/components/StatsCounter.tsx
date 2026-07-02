import { useEffect, useRef, useState } from 'react';

interface StatsCounterProps {
  target: number;
  suffix?: string;
  prefix?: string;
  duration?: number; // duration in ms
}

export default function StatsCounter({
  target,
  suffix = '',
  prefix = '',
  duration = 1500
}: StatsCounterProps) {
  const [count, setCount] = useState(0);
  const elementRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          
          let startTimestamp: number | null = null;
          const step = (timestamp: number) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            setCount(Math.floor(progress * target));
            if (progress < 1) {
              window.requestAnimationFrame(step);
            } else {
              setCount(target);
            }
          };
          window.requestAnimationFrame(step);
        }
      },
      { threshold: 0.1 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, [target, duration]);

  return (
    <div ref={elementRef} className="font-mono text-4xl md:text-5xl font-semibold text-emerald-600 tracking-tight">
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </div>
  );
}
