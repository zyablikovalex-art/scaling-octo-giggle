"use client";

import { useEffect, useRef } from "react";

const videoSrc =
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "/hero-bg.mp4";

const TRIM_START_SEC = 4.5;
const TRIM_END_SEC = 2;
const EASE_DURATION_SEC = 1.5;
const MIN_RATE = 0.0625;

type Phase =
  | "F_CRUISE"
  | "F_DECEL"
  | "R_ACCEL"
  | "R_CRUISE"
  | "R_DECEL"
  | "F_ACCEL";

export function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const v = ref.current;
    if (!v) return;

    let raf = 0;
    let phase: Phase = "F_CRUISE";
    let phaseEnteredAt = 0;
    let phaseEnteredClip = 0;

    const bounds = () => {
      const start = TRIM_START_SEC;
      const end = Math.max(
        (v.duration || 0) - TRIM_END_SEC,
        start + EASE_DURATION_SEC * 2 + 0.5,
      );
      return { start, end };
    };

    const setPhase = (p: Phase) => {
      phase = p;
      phaseEnteredAt = performance.now();
      phaseEnteredClip = v.currentTime;
      if (p === "F_CRUISE") {
        v.playbackRate = 1;
        v.play().catch(() => {});
      } else if (p === "F_DECEL" || p === "F_ACCEL") {
        v.play().catch(() => {});
      } else {
        try {
          v.pause();
        } catch {}
      }
    };

    const tick = (t: number) => {
      const { start, end } = bounds();
      const elapsed = (t - phaseEnteredAt) / 1000;
      const u = Math.min(1, elapsed / EASE_DURATION_SEC);
      const cruiseHalf = EASE_DURATION_SEC / 2;

      switch (phase) {
        case "F_CRUISE": {
          if (v.currentTime >= end - cruiseHalf) setPhase("F_DECEL");
          break;
        }
        case "F_DECEL": {
          const rate = Math.max(MIN_RATE, 1 - u);
          if (Math.abs(v.playbackRate - rate) > 0.005) v.playbackRate = rate;
          if (u >= 1) {
            v.currentTime = end;
            setPhase("R_ACCEL");
          }
          break;
        }
        case "R_ACCEL": {
          const dist = (elapsed * elapsed) / (2 * EASE_DURATION_SEC);
          v.currentTime = Math.max(start, phaseEnteredClip - dist);
          if (u >= 1) setPhase("R_CRUISE");
          break;
        }
        case "R_CRUISE": {
          v.currentTime = Math.max(start, phaseEnteredClip - elapsed);
          if (v.currentTime <= start + cruiseHalf) setPhase("R_DECEL");
          break;
        }
        case "R_DECEL": {
          const dist =
            elapsed - (elapsed * elapsed) / (2 * EASE_DURATION_SEC);
          v.currentTime = Math.max(start, phaseEnteredClip - dist);
          if (u >= 1) {
            v.currentTime = start;
            setPhase("F_ACCEL");
          }
          break;
        }
        case "F_ACCEL": {
          const rate = Math.max(MIN_RATE, u);
          if (Math.abs(v.playbackRate - rate) > 0.005) v.playbackRate = rate;
          if (u >= 1) {
            v.playbackRate = 1;
            setPhase("F_CRUISE");
          }
          break;
        }
      }

      raf = requestAnimationFrame(tick);
    };

    const init = () => {
      cancelAnimationFrame(raf);
      const { start } = bounds();
      v.currentTime = start;
      setPhase("F_CRUISE");
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
