"use client";

import { useEffect, useRef } from "react";

const videoSrc =
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "/hero-bg.mp4";

const TRIM_START_SEC = 4.5;
const TRIM_END_SEC = 2;
const FORWARD_EASE_SEC = 0.4;
const REVERSE_DURATION_SEC = 1.5;
const MIN_SPEED = 0.12;

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    let raf = 0;
    let dir: 1 | -1 = 1;
    let reverseStartTs = 0;
    let reverseFromSec = 0;

    const bounds = () => {
      const start = TRIM_START_SEC;
      const end = Math.max((v.duration || 0) - TRIM_END_SEC, start + 0.5);
      return { start, end };
    };

    const goForward = () => {
      dir = 1;
      v.playbackRate = 1;
      v.play().catch(() => {});
    };

    const goReverse = (fromSec: number) => {
      dir = -1;
      try {
        v.pause();
      } catch {}
      reverseStartTs = performance.now();
      reverseFromSec = fromSec;
    };

    const tick = (t: number) => {
      const { start, end } = bounds();
      if (dir > 0) {
        const distEdge = end - v.currentTime;
        const target =
          distEdge < FORWARD_EASE_SEC
            ? Math.max(MIN_SPEED, distEdge / FORWARD_EASE_SEC)
            : 1;
        if (Math.abs(v.playbackRate - target) > 0.01) v.playbackRate = target;
        if (v.currentTime >= end - 0.01) {
          v.currentTime = end;
          goReverse(end);
        }
      } else {
        const elapsed = (t - reverseStartTs) / 1000;
        const progress = Math.min(1, elapsed / REVERSE_DURATION_SEC);
        const eased = 0.5 - 0.5 * Math.cos(Math.PI * progress);
        const next = reverseFromSec - (reverseFromSec - start) * eased;
        v.currentTime = next;
        if (progress >= 1) {
          v.currentTime = start;
          goForward();
        }
      }
      raf = requestAnimationFrame(tick);
    };

    const init = () => {
      cancelAnimationFrame(raf);
      const { start } = bounds();
      v.currentTime = start;
      goForward();
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
