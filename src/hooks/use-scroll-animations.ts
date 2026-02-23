import { useEffect, useRef, useState } from "react";

const PREMIUM_EASING = "cubic-bezier(0.16, 1, 0.3, 1)";

const OBSERVER_OPTIONS: IntersectionObserverInit = {
  root: null,
  rootMargin: "0px 0px -100px 0px",
  threshold: 0.1,
};

/**
 * Hook for staggered scroll-reveal animations.
 * Triggers once when container is 100px into viewport.
 * Staggers children by 150ms each.
 */
export const useStaggerReveal = (count: number, staggerMs = 150) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visibleItems, setVisibleItems] = useState<boolean[]>(new Array(count).fill(false));
  const hasTriggered = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered.current) {
          hasTriggered.current = true;
          observer.disconnect();
          for (let i = 0; i < count; i++) {
            setTimeout(() => {
              setVisibleItems((prev) => {
                const next = [...prev];
                next[i] = true;
                return next;
              });
            }, i * staggerMs);
          }
        }
      },
      OBSERVER_OPTIONS
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [count, staggerMs]);

  return { ref, visibleItems };
};

/**
 * Hook for single element scroll-reveal.
 * Triggers once when element is 100px into viewport.
 */
export const useFadeUp = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      OBSERVER_OPTIONS
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return { ref, visible };
};

/**
 * Hook for navbar scroll state using rAF for smooth detection.
 */
export const useNavbarScroll = (scrollThreshold = 50) => {
  const [scrolled, setScrolled] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!ticking.current) {
        requestAnimationFrame(() => {
          setScrolled(window.scrollY > scrollThreshold);
          ticking.current = false;
        });
        ticking.current = true;
      }
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrollThreshold]);

  return scrolled;
};

/**
 * Hook for image fade-in on load.
 */
export const useImageFadeIn = () => {
  const imgRef = useRef<HTMLImageElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete) {
      setLoaded(true);
    }
  }, []);

  const onLoad = () => setLoaded(true);

  return { imgRef, loaded, onLoad };
};
