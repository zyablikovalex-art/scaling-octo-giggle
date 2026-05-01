"use client";

import { useEffect, useRef } from "react";

const videoSrc =
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "/hero-pingpong.mp4";

const EASE_DURATION_SEC = 1.5;
const MIN_RATE = 0.0625;

const EASE_CLIP_WINDOW =
  (EASE_DURATION_SEC * (1 - MIN_RATE)) / Math.log(1 / MIN_RATE);

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    let raf = 0;

    const tick = () => {
      const dur = v.duration;
      if (Number.isFinite(dur) && dur > 0) {
        const t = v.currentTime;
        const mid = dur / 2;
        const d = Math.min(t, dur - t, Math.abs(t - mid));
        const rate =
          d < EASE_CLIP_WINDOW
            ? MIN_RATE + (1 - MIN_RATE) * (d / EASE_CLIP_WINDOW)
            : 1;
        if (Math.abs(v.playbackRate - rate) > 0.005) {
          v.playbackRate = rate;
        }
      }
      raf = requestAnimationFrame(tick);
    };

    v.play().catch(() => {});
    raf = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <video
        ref={ref}
        autoPlay
        loop
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
