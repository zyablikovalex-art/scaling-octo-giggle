"use client";

import { useEffect, useRef, useState } from "react";

const fireworkColors = ["#fbbf24", "#f87171", "#34d399", "#60a5fa", "#f472b6", "#fde68a"];
const fireworkCount = 16;

export function TreeScroll() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;

    const update = () => {
      const el = sectionRef.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      if (total <= 0) {
        setProgress(0);
        return;
      }
      const scrolled = Math.min(Math.max(-rect.top, 0), total);
      setProgress(scrolled / total);
    };

    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  const rotation = progress * 720;
  const fireworksOpacity = Math.max(0, 1 - progress * 3.5);
  const treeScale = 0.85 + progress * 0.25;

  return (
    <section
      ref={sectionRef}
      className="relative"
      style={{ minHeight: "240vh" }}
    >
      <div className="sticky top-0 flex h-screen flex-col items-center justify-center overflow-hidden">
        <div
          className="pointer-events-none absolute inset-0 flex items-center justify-center"
          style={{ opacity: fireworksOpacity, transition: "opacity 200ms linear" }}
        >
          <div className="relative h-2 w-2">
            {Array.from({ length: fireworkCount }).map((_, i) => (
              <span
                key={i}
                className="firework"
                style={
                  {
                    "--fw-angle": `${(360 / fireworkCount) * i}deg`,
                    "--fw-delay": `${(i % 6) * 0.18}s`,
                    "--fw-color": fireworkColors[i % fireworkColors.length],
                  } as React.CSSProperties
                }
              />
            ))}
          </div>
        </div>

        <div
          className="relative"
          style={{ perspective: 1000 }}
        >
          <div
            aria-hidden
            className="absolute inset-0 -z-10 rounded-full bg-emerald-500/20 blur-3xl"
          />
          <div
            className="select-none text-[180px] leading-none drop-shadow-[0_0_60px_rgba(34,197,94,0.45)] sm:text-[240px] md:text-[280px]"
            style={{
              transform: `rotateY(${rotation}deg) scale(${treeScale})`,
              transformStyle: "preserve-3d",
              transition: "transform 80ms linear",
            }}
          >
            🎄
          </div>
        </div>

        <p className="mt-10 text-xs uppercase tracking-[0.4em] text-muted-foreground">
          Скролль — ёлка крутится
        </p>
      </div>
    </section>
  );
}
