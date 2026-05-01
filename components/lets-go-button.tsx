"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";

import { Button } from "@/components/ui/button";

const PARTICLES_PER_BURST = 14;
const BURST_COUNT = 24;

type Particle = {
  angle: number;
  distance: number;
  hue: number;
  lightness: number;
};

type Burst = {
  id: number;
  x: number;
  y: number;
  delay: number;
  particles: Particle[];
};

function makeBursts(): Burst[] {
  const now = Date.now();
  return Array.from({ length: BURST_COUNT }, (_, i) => ({
    id: now + i,
    x: 4 + Math.random() * 92,
    y: 6 + Math.random() * 84,
    delay: Math.floor(Math.random() * 750),
    particles: Array.from({ length: PARTICLES_PER_BURST }, (_, p) => ({
      angle:
        (p * 360) / PARTICLES_PER_BURST + (Math.random() * 18 - 9),
      distance: 130 + Math.random() * 130,
      hue: 38 + Math.random() * 18,
      lightness: 72 + Math.random() * 18,
    })),
  }));
}

export function LetsGoButton() {
  const [bursts, setBursts] = useState<Burst[]>([]);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleClick = () => {
    setBursts(makeBursts());
    document.getElementById("assistant")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
    window.setTimeout(() => setBursts([]), 2600);
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
      {mounted &&
        bursts.length > 0 &&
        createPortal(
          <div className="pointer-events-none fixed inset-0 z-[100] overflow-hidden">
            {bursts.map((b) => (
              <div
                key={b.id}
                className="firework-burst"
                style={
                  {
                    left: `${b.x}vw`,
                    top: `${b.y}vh`,
                    "--burst-delay": `${b.delay}ms`,
                  } as CSSProperties
                }
              >
                {b.particles.map((p, i) => (
                  <span
                    key={i}
                    className="firework-particle"
                    style={
                      {
                        "--a": `${p.angle}deg`,
                        "--d": `${p.distance}px`,
                        "--h": String(p.hue),
                        "--l": `${p.lightness}%`,
                      } as CSSProperties
                    }
                  />
                ))}
              </div>
            ))}
          </div>,
          document.body,
        )}
    </>
  );
}
