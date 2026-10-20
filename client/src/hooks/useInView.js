import { useEffect, useRef, useState } from 'react';

export default function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    if (typeof IntersectionObserver === 'undefined') {
      setInView(true);
      return;
    }

    let observer = null;
    let timer = null;
    let cancelled = false;
    let tries = 0;

    const attach = () => {
      if (cancelled) return;
      const el = ref.current;
      if (!el) {
        if (tries < 50) {
          tries += 1;
          timer = setTimeout(attach, 100);
        } else {
          setInView(true);
        }
        return;
      }
      observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setInView(true);
            observer.unobserve(el);
          }
        },
        { threshold: options.threshold ?? 0.15, rootMargin: options.rootMargin ?? '0px 0px -40px 0px' }
      );
      observer.observe(el);
    };

    attach();

    return () => {
      cancelled = true;
      if (timer) clearTimeout(timer);
      if (observer) observer.disconnect();
    };
  }, []);

  return [ref, inView];
}
