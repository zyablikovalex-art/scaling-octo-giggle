"use client";

import { useState, type CSSProperties } from "react";

import { Button } from "@/components/ui/button";

const HUES = [25, 350, 130, 200, 45, 280, 165];
const PARTICLES_PER_BURST = 14;
const BURST_COUNT = 14;

type Burst = {
  id: number;
  x: number;
  y: number;
  hue: number;
  delay: number;
};

export function LetsGoButton() {
  const [bursts, setBursts] = useState<Burst[]>([]);

  const handleClick = () => {
    const now = Date.now();
    const next: Burst[] = Array.from({ length: BURST_COUNT }, (_, i) => ({
      id: now + i,
      x: 8 + Math.random() * 84,
      y: 12 + Math.random() * 70,
      hue: HUES[Math.floor(Math.random() * HUES.length)],
      delay: Math.floor(Math.random() * 500),
    }));
    setBursts(next);
    document.getElementById("assistant")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    window.setTimeout(() => setBursts([]), 2300);
  };

  return (
    <>
      <Button
        type="button"
        onClick={handleClick}
        size="lg"
        className="px-10 text-base font-semibold"
      >
        Поехали
      </Button>
      {bursts.length > 0 && (
        <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
          {bursts.map((b) => (
            <div
              key={b.id}
              className="firework-burst"
              style={
                {
                  left: `${b.x}vw`,
                  top: `${b.y}vh`,
                  "--hue": String(b.hue),
                  "--burst-delay": `${b.delay}ms`,
                } as CSSProperties
              }
            >
              {Array.from({ length: PARTICLES_PER_BURST }).map((_, p) => (
                <span
                  key={p}
                  className="firework-particle"
                  style={
                    {
                      "--a": `${(p * 360) / PARTICLES_PER_BURST}deg`,
                    } as CSSProperties
                  }
                />
              ))}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
