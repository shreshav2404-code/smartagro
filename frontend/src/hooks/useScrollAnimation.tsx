import { useEffect, useRef, useState } from 'react';

export function useScrollAnimation(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

export function ScrollReveal({
  children,
  className = 'animate-on-scroll',
  threshold = 0.15,
}: {
  children: React.ReactNode;
  className?: string;
  threshold?: number;
}) {
  const { ref, isVisible } = useScrollAnimation(threshold);

  return (
    <div ref={ref} className={`${className} ${isVisible ? 'visible' : ''}`}>
      {children}
    </div>
  );
}
