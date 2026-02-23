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
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        // Pause auto-scroll when hovered for easier interaction
        if (!startAnimation || isHovered) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % keywords.length);
        }, 2500);

        return () => clearInterval(interval);
    }, [startAnimation, keywords.length, isHovered]);

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
        <div className={`transition-all duration-1000 ease-out ${startAnimation ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"} mt-12 lg:mt-0 flex w-full relative z-10 justify-center lg:justify-end items-center h-[280px] overflow-hidden`}>

            {/* Desktop Wrapper: Stacked Ticker */}
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onWheel={handleWheel}
                className={`hidden md:block relative h-full w-full max-w-[600px] cursor-ns-resize before:absolute before:top-0 before:left-0 before:w-full before:h-12 before:bg-gradient-to-b before:from-[#0a1628] before:to-transparent before:z-10 before:pointer-events-none after:absolute after:bottom-0 after:left-0 after:w-full after:h-12 after:bg-gradient-to-t after:from-[#0a1628] after:to-transparent after:z-10 after:pointer-events-none`}
            >
                <div className={`absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-[#00b4d8]/10 via-[#00b4d8] to-[#00b4d8]/10 ${isRtl ? 'right-0' : 'left-0'}`} />

                <div
                    className="absolute w-full px-8 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{
                        // Align active index perfectly
                        transform: `translateY(calc(${140 - 28}px - ${currentIndex * 56}px))`
                    }}
                >
                    {keywords.map((keyword, index) => {
                        const isActive = index === currentIndex;
                        const opacity = isActive ? 1 : 0.15;

                        return (
                            <div
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-[56px] flex items-center w-full transition-all duration-600 hover:opacity-100 cursor-pointer ${isRtl ? 'justify-end' : 'justify-start'}`}
                                style={{ opacity }}
                            >
                                <h2
                                    style={{
                                        textShadow: isActive ? "0 0 25px rgba(0, 180, 216, 0.6)" : "none"
                                    }}
                                    className={`text-[20px] lg:text-[28px] text-white whitespace-nowrap leading-none transition-all duration-500 ${isRtl ? "font-['Tajawal',sans-serif] font-black text-right" : "font-bold text-left"
                                        } ${isActive ? "scale-100" : "scale-[0.98]"}`}
                                >
                                    {keyword}
                                </h2>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Mobile Wrapper: Single active message */}
            <div
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                onWheel={handleWheel}
                className="md:hidden w-full h-[60px] relative flex justify-center items-center overflow-hidden cursor-ns-resize"
            >
                <div className={`absolute w-[2px] h-full bg-[#00b4d8] ${isRtl ? 'right-0' : 'left-0'}`} />

                <div
                    className="absolute w-full px-5 transition-transform duration-[600ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
                    style={{ transform: `translateY(calc(${30 - 20}px - ${currentIndex * 40}px))` }}
                >
                    {keywords.map((keyword, index) => {
                        const isActive = index === currentIndex;

                        return (
                            <div
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-[40px] flex items-center w-full transition-opacity duration-600 cursor-pointer ${isRtl ? 'justify-end' : 'justify-start'}`}
                                style={{ opacity: isActive ? 1 : 0 }}
                            >
                                <h2
                                    style={{ textShadow: isActive ? "0 0 25px rgba(0, 180, 216, 0.6)" : "none" }}
                                    className={`text-[20px] text-white whitespace-nowrap leading-none ${isRtl ? "font-['Tajawal',sans-serif] font-black text-right" : "font-bold text-left"
                                        }`}
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
