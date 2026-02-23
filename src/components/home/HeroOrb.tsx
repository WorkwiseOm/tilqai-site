import { useEffect, useRef } from "react";

const HeroOrb = () => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const { clientX, clientY } = e;
            // Calculate mouse position relative to center of screen for a subtle 3D parallax
            const x = (clientX / window.innerWidth - 0.5) * 40;
            const y = (clientY / window.innerHeight - 0.5) * 40;
            containerRef.current.style.transform = `translate(${x}px, ${y}px)`;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    return (
        <div className="absolute inset-0 flex items-center justify-center overflow-visible pointer-events-none z-0">
            <div
                ref={containerRef}
                className="relative w-full h-full max-w-[650px] max-h-[650px] flex items-center justify-center transition-transform duration-1000 ease-out"
                style={{ perspective: "1000px" }}
            >
                {/* Core Vibrant Backglow (Purple/Pink Base) */}
                <div className="absolute w-[85%] h-[85%] bg-gradient-to-tr from-[#7000FF] to-[#00d4ff] rounded-full blur-[80px] opacity-60 animate-pulse duration-[3s]" />

                {/* Orbiting Layer 1 (Electric Blue/Cyan) */}
                <div className="absolute w-[100%] h-[100%] rounded-full opacity-90 mix-blend-screen orb-spin-slow">
                    <div className="absolute top-[5%] left-[10%] w-[55%] h-[55%] bg-[#00f5d4] rounded-full blur-[70px]" />
                    <div className="absolute bottom-[10%] right-[10%] w-[65%] h-[65%] bg-[#00bbf9] rounded-full blur-[80px]" />
                </div>

                {/* Orbiting Layer 2 (Neon Pink / Deep Violet) */}
                <div className="absolute w-[95%] h-[95%] rounded-full opacity-80 mix-blend-screen orb-spin-reverse">
                    <div className="absolute top-[20%] right-[5%] w-[60%] h-[60%] bg-[#f15bb5] rounded-full blur-[80px]" />
                    <div className="absolute bottom-[20%] left-[5%] w-[55%] h-[55%] bg-[#9b5de5] rounded-full blur-[80px]" />
                </div>

                {/* Orbiting Layer 3 (White/Cyan Hotspot Highlight for 'Light' explosion) */}
                <div className="absolute w-[75%] h-[75%] rounded-full opacity-100 mix-blend-screen orb-spin-medium">
                    <div className="absolute top-[25%] left-[25%] w-[50%] h-[50%] bg-[#ffffff] rounded-full blur-[50px]" />
                </div>

                {/* 3D Glass Sphere Overlay to contain the chaos into an Orb */}
                <div className="absolute w-[60%] h-[60%] rounded-full border border-white/30 bg-gradient-to-tr from-white/10 via-transparent to-black/20 backdrop-blur-[24px] shadow-[inset_0_4px_40px_rgba(255,255,255,0.4),0_20px_60px_rgba(0,0,0,0.6)] orb-float">
                    {/* Glass top reflection */}
                    <div className="absolute inset-x-[15%] top-[5%] h-[25%] bg-gradient-to-b from-white/40 to-transparent rounded-full blur-[8px] mix-blend-overlay" />
                </div>
            </div>

            <style>{`
        @keyframes orbSpin {
          from { transform: rotate(0deg) scale(1); }
          50% { transform: rotate(180deg) scale(1.02); }
          to { transform: rotate(360deg) scale(1); }
        }
        @keyframes orbSpinReverse {
          from { transform: rotate(360deg) scale(1.05); }
          50% { transform: rotate(180deg) scale(0.98); }
          to { transform: rotate(0deg) scale(1.05); }
        }
        @keyframes orbFloat {
          0% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
          50% { transform: translateY(-30px) rotateX(15deg) rotateY(-10deg); }
          100% { transform: translateY(0px) rotateX(0deg) rotateY(0deg); }
        }
        .orb-spin-slow {
          animation: orbSpin 25s linear infinite;
        }
        .orb-spin-reverse {
          animation: orbSpinReverse 30s linear infinite;
        }
        .orb-spin-medium {
          animation: orbSpin 15s linear infinite;
        }
        .orb-float {
          animation: orbFloat 6s ease-in-out infinite;
        }
      `}</style>
        </div>
    );
};

export default HeroOrb;
