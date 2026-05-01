const videoSrc =
  process.env.NEXT_PUBLIC_HERO_VIDEO_URL || "/hero-bg.mp4";

export function HeroVideo() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="h-full w-full scale-105 object-cover"
      >
        <source src={videoSrc} type="video/mp4" />
      </video>
      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/40 to-background" />
    </div>
  );
}
