import { useState, useEffect, useRef } from "react";
import { useLanguage } from "@/i18n/LanguageContext";

const enKeywords = [
    "Faster service, every time",
    "Sales that don't stall on process",
    "Zero compliance gaps",
    "Consistent quality, always",
    "Unmatched customer experience",
    "Lower operational cost"
];

const arKeywords = [
    "خدمة سريعة في كل مرة",
    "نمو بلا حدود تشغيلية",
    "امتثال دائم",
    "جودة مستمرة في كل وقت",
    "تجربة عملاء مميزة",
    "تكاليف تشغيلية أقل"
];

export const HeroKeywords = ({ startAnimation }: { startAnimation: boolean }) => {
    const { isRtl } = useLanguage();
    const keywords = isRtl ? arKeywords : enKeywords;

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isHovered, setIsHovered] = useState(false);
    const [trackDrawn, setTrackDrawn] = useState(false);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Initial line draw effect
    useEffect(() => {
        if (!startAnimation) return;
        const t1 = setTimeout(() => {
            setTrackDrawn(true);
        }, 1200); // Trigger drawing the vertical line slightly after base container appears
        return () => clearTimeout(t1);
    }, [startAnimation]);

    useEffect(() => {
        // Pause auto-scroll when hovered for easier interaction, and WAIT until line is drawn
        if (!startAnimation || !trackDrawn || isHovered) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % keywords.length);
        }, 3500);

        return () => clearInterval(interval);
    }, [startAnimation, trackDrawn, keywords.length, isHovered]);

    const handleWheel = (e: React.WheelEvent) => {
        // Throttle wheel scroll to prevent wild spinning
        if (scrollTimeoutRef.current) return;

        // Ignore small rest movements
        if (Math.abs(e.deltaY) < 15) return;

        if (e.deltaY > 0) {
            setCurrentIndex((prev) => (prev + 1) % keywords.length);
        } else {
            setCurrentIndex((prev) => (prev - 1 + keywords.length) % keywords.length);
        }

        // Lock scrolling for 500ms while it transitions
        scrollTimeoutRef.current = setTimeout(() => {
            scrollTimeoutRef.current = null;
        }, 500);
    };

    return (
        <div className={`transition-opacity duration-[1000ms] ease-in-out ${startAnimation ? "opacity-100" : "opacity-0"} mt-12 lg:mt-0 flex w-full relative z-10 justify-center lg:justify-end items-center h-[280px]`}>

            {/* Unified Desktop/Mobile Static Cross-fade Wrapper */}
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="relative h-[60px] w-full max-w-[500px] flex items-center"
            >
                {/* Static indicator track line — ANIMATING DRAWN */}
                <div
                    className={`absolute top-0 w-[2px] bg-primary/20 ${isRtl ? 'right-0' : 'left-0'} transition-all duration-[900ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${trackDrawn ? "h-full bg-primary/40" : "h-0 bg-primary/0"}`}
                />

                {/* Overlapping text container */}
                <div className="relative w-full h-full px-6">
                    {keywords.map((keyword, index) => {
                        const isActive = index === currentIndex;

                        return (
                            <div
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`absolute inset-0 flex items-center transition-opacity duration-[800ms] ease-in-out cursor-pointer ${isRtl ? 'justify-end pr-6' : 'justify-start pl-6'}`}
                                style={{ opacity: isActive ? 1 : 0, pointerEvents: isActive ? 'auto' : 'none' }}
                            >
                                {/* Active subtle border glow dot indicator perfectly overlapping the track */}
                                <div
                                    className={`absolute top-1/2 -translate-y-[50%] w-[2px] h-[30px] bg-primary transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${isRtl ? '-right-[24px]' : '-left-[24px]'} ${isActive && trackDrawn ? "opacity-100 shadow-[0_0_15px_#00b4d8]" : "opacity-0 shadow-none"}`}
                                />

                                <h2
                                    style={{ textShadow: isActive ? "0 0 25px rgba(0, 180, 216, 0.6)" : "none" }}
                                    className={`text-[20px] lg:text-[28px] text-white whitespace-nowrap leading-none ${isRtl ? "font-['Tajawal',sans-serif] font-black text-right" : "font-bold text-left"}`}
                                >
                                    {keyword}
                                </h2>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
};
