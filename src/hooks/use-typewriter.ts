import { useState, useEffect, useRef } from "react";

export const useTypewriter = (text: string, speed = 90, delay = 400) => {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [showCursor, setShowCursor] = useState(true);
  const [done, setDone] = useState(false);
  const hasStarted = useRef(false);
  const cleanupRef = useRef<(() => void) | null>(null);

  useEffect(() => {
    setDisplayedCount(0);
    setDone(false);
    setShowCursor(true);
    hasStarted.current = false;

    const delayTimer = setTimeout(() => {
      hasStarted.current = true;
      let i = 0;
      const interval = setInterval(() => {
        i++;
        setDisplayedCount(i);
        if (i >= text.length) {
          clearInterval(interval);
          // Blink cursor 3 more times then hide
          let blinks = 0;
          const blinkInterval = setInterval(() => {
            blinks++;
            if (blinks >= 6) {
              clearInterval(blinkInterval);
              setShowCursor(false);
              setDone(true);
            }
          }, 400);
          cleanupRef.current = () => clearInterval(blinkInterval);
        }
      }, speed);
      cleanupRef.current = () => clearInterval(interval);
    }, delay);

    return () => {
      clearTimeout(delayTimer);
      cleanupRef.current?.();
    };
  }, [text, speed, delay]);

  return {
    displayedText: text.slice(0, displayedCount),
    showCursor: showCursor && hasStarted.current,
    done,
    fullText: text,
  };
};
