"use client";

import { useEffect, useRef } from "react";

const videoSrc =
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "/hero-bg.mp4";

const TRIM_START_SEC = 4.5;
const TRIM_END_SEC = 2;
const EASE_WINDOW_SEC = 0.9;
const MIN_SPEED = 0.0625;

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    let raf = 0;
    let dir: 1 | -1 = 1;
    let lastTs = 0;

    const bounds = () => {
      const start = TRIM_START_SEC;
      const end = Math.max((v.duration || 0) - TRIM_END_SEC, start + 0.5);
      return { start, end };
    };

    const speedFor = (current: number, d: 1 | -1, start: number, end: number) => {
      const distEdge = d > 0 ? end - current : current - start;
      return Math.max(MIN_SPEED, Math.min(1, distEdge / EASE_WINDOW_SEC));
    };

    const goForward = () => {
      dir = 1;
      v.playbackRate = 1;
      v.play().catch(() => {});
    };

    const goReverse = () => {
      dir = -1;
      try {
        v.pause();
      } catch {}
      lastTs = performance.now();
    };

    const tick = (t: number) => {
      const { start, end } = bounds();
      if (dir > 0) {
        if (v.currentTime >= end - 0.01) {
          v.currentTime = end;
          goReverse();
        } else {
          const target = speedFor(v.currentTime, 1, start, end);
          if (Math.abs(v.playbackRate - target) > 0.01) v.playbackRate = target;
        }
      } else {
        const dt = Math.min(0.05, (t - lastTs) / 1000);
        lastTs = t;
        const s = speedFor(v.currentTime, -1, start, end);
        let next = v.currentTime - dt * s;
        if (next <= start) {
          v.currentTime = start;
          goForward();
        } else {
          v.currentTime = next;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const init = () => {
      cancelAnimationFrame(raf);
      const { start } = bounds();
      v.currentTime = start;
      goForward();
      lastTs = performance.now();
      raf = requestAnimationFrame(tick);
    };

    if (v.readyState >= 1 && Number.isFinite(v.duration)) init();
    else v.addEventListener("loadedmetadata", init, { once: true });

    return () => {
      v.removeEventListener("loadedmetadata", init);
      cancelAnimationFrame(raf);
      try {
        v.pause();
      } catch {}
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
