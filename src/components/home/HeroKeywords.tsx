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

    // Stages: 
    // 0 = Init
    // 1 = Initial line fade (0.0ms -> 400ms)
    // 2 = Words begin revealing (400ms -> 1000ms)
    // 3 = Glow expansion (1000ms -> 1500ms)
    const [introStage, setIntroStage] = useState(0);
    const scrollTimeoutRef = useRef<NodeJS.Timeout | null>(null);

    // Initial load sequence
    useEffect(() => {
        if (!startAnimation) return;

        setIntroStage(1);

        const t2 = setTimeout(() => {
            setIntroStage(2);
        }, 400);

        const t3 = setTimeout(() => {
            setIntroStage(3);
        }, 1000);

        return () => { clearTimeout(t2); clearTimeout(t3); };
    }, [startAnimation]);

    useEffect(() => {
        // Only begin the rotation sequence AFTER intro sequence has finished (Stage 3+)
        if (introStage < 3 || isHovered) return;

        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % keywords.length);
        }, 3500);

        return () => clearInterval(interval);
    }, [introStage, keywords.length, isHovered]);

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
                {/* Indicator Track Background Line */}
                <div
                    className={`absolute top-0 bottom-0 w-[2px] ${isRtl ? 'right-0' : 'left-0'} transition-all duration-1000 ease-in-out ${introStage >= 1 ? 'bg-primary/20 opacity-100 shadow-[0_0_8px_rgba(0,180,216,0.3)]' : 'bg-primary/0 opacity-0 shadow-none'}`}
                />

                {/* Overlapping text container */}
                <div className="relative w-full h-full px-6 flex items-center">
                    {keywords.map((keyword, sentenceIndex) => {
                        const isActive = sentenceIndex === currentIndex;
                        // Split specific target keywords into arrays
                        const words = keyword.split(" ");

                        return (
                            <div
                                key={sentenceIndex}
                                onClick={() => setCurrentIndex(sentenceIndex)}
                                className={`absolute inset-0 flex items-center transition-opacity duration-[800ms] ease-in-out cursor-pointer ${isRtl ? 'justify-end pr-6' : 'justify-start pl-6'}`}
                                style={{
                                    opacity: isActive && introStage >= 2 ? 1 : 0,
                                    pointerEvents: isActive ? 'auto' : 'none',
                                    zIndex: isActive ? 10 : 0
                                }}
                            >
                                {/* Active subtle border line — expands dynamically */}
                                <div
                                    className={`absolute top-1/2 -translate-y-[50%] w-[2px] transition-all duration-[600ms] ease-[cubic-bezier(0.25,0.1,0.25,1)] ${isRtl ? '-right-[24px]' : '-left-[24px]'}`}
                                    style={{
                                        height: isActive && introStage >= 3 ? "32px" : isActive && introStage >= 2 ? "12px" : "0px",
                                        backgroundColor: isActive ? "#00b4d8" : "transparent",
                                        boxShadow: isActive && introStage >= 3 ? "0 0 20px rgba(0, 180, 216, 0.8)" : "none",
                                        opacity: isActive ? 1 : 0
                                    }}
                                />

                                <h2
                                    style={{ textShadow: isActive && introStage >= 3 ? "0 0 15px rgba(0, 180, 216, 0.4)" : "none" }}
                                    className={`text-[20px] lg:text-[28px] text-white whitespace-nowrap leading-[1.2] flex gap-2 ${isRtl ? "font-['Tajawal',sans-serif] font-black" : "font-bold"}`}
                                >
                                    {words.map((word, wordIndex) => {
                                        // Specific stagger delay scaling up by word
                                        const delay = 100 * wordIndex;

                                        return (
                                            <span
                                                key={wordIndex}
                                                className="inline-block transition-all duration-[800ms] ease-[cubic-bezier(0.25,0.1,0.25,1)]"
                                                style={{
                                                    transitionDelay: isActive && introStage === 2 ? `${delay}ms` : "0ms",
                                                    opacity: isActive && introStage >= 2 ? 1 : 0,
                                                    transform: isActive && introStage >= 2 ? 'translateY(0) scale(1)' : 'translateY(10px) scale(0.98)'
                                                }}
                                            >
                                                {word}
                                            </span>
                                        )
                                    })}
                                </h2>
                            </div>
                        );
                    })}
                </div>
            </div>

        </div>
    );
};
