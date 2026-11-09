import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import { HR_FLOW_COPY } from "./content";
import { mountHrFlow, type HrFlowController } from "./scene";
import "./hr-flow.css";

export type HrFlowHandle = { setTurbo: (on: boolean) => void };

type Props = {
  /** Start the animation (the hero waits until its intro text has finished). */
  active: boolean;
  locale: "en" | "ar";
  className?: string;
};

/**
 * Hero animation: HR activities send documents through the Tilqai engine
 * into business-result cards. Decorative, so it is hidden from screen readers.
 */
const HrFlowScene = forwardRef<HrFlowHandle, Props>(({ active, locale, className = "" }, ref) => {
  const hostRef = useRef<HTMLDivElement>(null);
  const ctrl = useRef<HrFlowController | null>(null);

  useImperativeHandle(ref, () => ({ setTurbo: on => ctrl.current?.setTurbo(on) }), []);

  useEffect(() => {
    const host = hostRef.current;
    if (!active || !host) return;
    ctrl.current = mountHrFlow(host, HR_FLOW_COPY[locale], locale === "ar");
    return () => {
      ctrl.current?.destroy();
      ctrl.current = null;
    };
  }, [active, locale]);

  return <div ref={hostRef} className={`hrf ${className}`} aria-hidden="true" />;
});
HrFlowScene.displayName = "HrFlowScene";

export default HrFlowScene;
