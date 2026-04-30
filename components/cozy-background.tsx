const blobs = [
  { className: "top-[-10%] left-[-10%] h-[420px] w-[420px] bg-amber-500/25" },
  { className: "top-[20%] right-[-15%] h-[500px] w-[500px] bg-rose-600/20" },
  { className: "bottom-[-15%] left-[20%] h-[480px] w-[480px] bg-emerald-700/20" },
  { className: "bottom-[10%] right-[10%] h-[280px] w-[280px] bg-orange-500/15" },
];

const stars = Array.from({ length: 24 }).map((_, i) => ({
  top: `${(i * 37) % 100}%`,
  left: `${(i * 53) % 100}%`,
  size: 2 + (i % 3),
  delay: `${(i * 0.31) % 4}s`,
}));

export function CozyBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {blobs.map((b, i) => (
        <div
          key={i}
          className={`absolute rounded-full blur-3xl ${b.className}`}
        />
      ))}
      {stars.map((s, i) => (
        <span
          key={i}
          className="twinkle"
          style={{
            top: s.top,
            left: s.left,
            width: `${s.size}px`,
            height: `${s.size}px`,
            animationDelay: s.delay,
          }}
        />
      ))}
    </div>
  );
}
