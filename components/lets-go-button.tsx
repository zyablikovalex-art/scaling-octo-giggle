"use client";

import { useState, type CSSProperties, type MouseEvent } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

const HUES = [25, 350, 130, 200, 45, 280, 165];

type Burst = {
  id: number;
  x: number;
  y: number;
  hue: number;
  delay: number;
};

const PARTICLES_PER_BURST = 14;

export function LetsGoButton() {
  const [bursts, setBursts] = useState<Burst[]>([]);

  const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const now = Date.now();
    const next: Burst[] = Array.from({ length: 14 }, (_, i) => ({
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
      <Button asChild className="whitespace-nowrap px-6">
        <a href="#assistant" onClick={handleClick}>
          Поехали
          <ArrowRight className="ml-1 h-4 w-4" strokeWidth={1.75} />
        </a>
      </Button>
      {bursts.length > 0 && (
        <div className="pointer-events-none fixed inset-0 z-50 overflow-hidden">
          {bursts.map((b) => (
            <div
              key={b.id}
              className="firework-burst"
              style={
                {
                  left: `${b.x}vw`,
                  top: `${b.y}vh`,
                  "--hue": b.hue,
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
