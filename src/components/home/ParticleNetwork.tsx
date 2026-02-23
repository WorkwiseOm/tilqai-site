import { useEffect, useRef } from "react";

interface Particle {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    baseX: number;
    baseY: number;
}

const ParticleNetwork = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let particles: Particle[] = [];
        let animationFrameId: number;
        let mouse = { x: -1000, y: -1000 };

        const resize = () => {
            const parent = canvas.parentElement;
            if (parent) {
                canvas.width = parent.clientWidth;
                canvas.height = parent.clientHeight;
                initParticles();
            }
        };

        const initParticles = () => {
            particles = [];
            const density = Math.floor((canvas.width * canvas.height) / 8000);
            const particleCount = Math.min(Math.max(density, 50), 150);

            for (let i = 0; i < particleCount; i++) {
                const x = Math.random() * canvas.width;
                const y = Math.random() * canvas.height;
                particles.push({
                    x,
                    y,
                    baseX: x,
                    baseY: y,
                    vx: (Math.random() - 0.5) * 1.5,
                    vy: (Math.random() - 0.5) * 1.5,
                    size: Math.random() * 2 + 1,
                });
            }
        };

        const draw = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Update and draw particles
            particles.forEach((p, index) => {
                // Move
                p.x += p.vx;
                p.y += p.vy;

                // Bounce off walls
                if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
                if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

                // Mouse interaction
                const dx = mouse.x - p.x;
                const dy = mouse.y - p.y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 150) {
                    const force = (150 - distance) / 150;
                    p.x -= (dx * force * 0.05);
                    p.y -= (dy * force * 0.05);
                }

                // Return to base slowly
                p.x += (p.baseX - p.x) * 0.005;
                p.y += (p.baseY - p.y) * 0.005;
                p.baseX += p.vx * 0.5;
                p.baseY += p.vy * 0.5;

                if (p.baseX < 0 || p.baseX > canvas.width) p.vx *= -1;
                if (p.baseY < 0 || p.baseY > canvas.height) p.vy *= -1;

                // Draw particle
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = "rgba(0, 212, 255, 0.8)";
                ctx.fill();

                // Connect nearby particles
                for (let j = index + 1; j < particles.length; j++) {
                    const p2 = particles[j];
                    const dx2 = p.x - p2.x;
                    const dy2 = p.y - p2.y;
                    const dist2 = Math.sqrt(dx2 * dx2 + dy2 * dy2);

                    if (dist2 < 120) {
                        ctx.beginPath();
                        ctx.moveTo(p.x, p.y);
                        ctx.lineTo(p2.x, p2.y);
                        const opacity = 1 - (dist2 / 120);
                        ctx.strokeStyle = `rgba(0, 212, 255, ${opacity * 0.4})`;
                        ctx.lineWidth = 1;
                        ctx.stroke();
                    }
                }
            });

            animationFrameId = requestAnimationFrame(draw);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.x = e.clientX - rect.left;
            mouse.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.x = -1000;
            mouse.y = -1000;
        };

        window.addEventListener("resize", resize);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        resize();
        draw();

        return () => {
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <div className="absolute inset-0 w-full h-full" style={{ zIndex: 0 }}>
            {/* Ambient glow behind the network */}
            <div className="absolute inset-0 bg-primary/10 blur-[100px] rounded-full pointer-events-none" />
            <canvas
                ref={canvasRef}
                className="w-full h-full pointer-events-auto cursor-crosshair"
                style={{ mixBlendMode: "screen", opacity: 0.8 }}
            />
        </div>
    );
};

export default ParticleNetwork;
