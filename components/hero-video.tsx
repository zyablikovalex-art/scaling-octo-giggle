"use client";

import { useEffect, useRef } from "react";

const videoSrc =
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "/hero-bg.mp4";

const TRIM_END_SEC = 2;
const EASE_WINDOW_SEC = 0.9;
const MIN_SPEED = 0.06;

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    let raf = 0;
    let dir: 1 | -1 = 1;
    let last = 0;

    const tick = (t: number) => {
      const dt = Math.min(0.05, (t - last) / 1000);
      last = t;

      const end = Math.max((v.duration || 0) - TRIM_END_SEC, 0.1);
      const distEdge = dir > 0 ? end - v.currentTime : v.currentTime;
      const speed = Math.max(MIN_SPEED, Math.min(1, distEdge / EASE_WINDOW_SEC));

      let next = v.currentTime + dir * dt * speed;
      if (next >= end) {
        next = end;
        dir = -1;
      } else if (next <= 0) {
        next = 0;
        dir = 1;
      }
      v.currentTime = next;

      raf = requestAnimationFrame(tick);
    };

    const start = () => {
      try {
        v.pause();
      } catch {}
      v.currentTime = 0;
      cancelAnimationFrame(raf);
      last = performance.now();
      raf = requestAnimationFrame(tick);
    };

    if (v.readyState >= 1 && Number.isFinite(v.duration)) start();
    else v.addEventListener("loadedmetadata", start, { once: true });

    return () => {
      v.removeEventListener("loadedmetadata", start);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <video
        ref={ref}
        muted
        playsInline
        preload="auto"
        className="h-full w-full scale-105 object-cover blur-[2px] saturate-[0.95]"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background" />
    </div>
  );
}
