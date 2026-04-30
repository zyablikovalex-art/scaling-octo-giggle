const fireworkColors = ["#fbbf24", "#f87171", "#34d399", "#60a5fa", "#f472b6", "#fde68a"];
const fireworkCount = 18;

export function TreeShowcase() {
  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden py-12">
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="relative h-2 w-2">
          {Array.from({ length: fireworkCount }).map((_, i) => (
            <span
              key={i}
              className="firework"
              style={
                {
                  "--fw-angle": `${(360 / fireworkCount) * i}deg`,
                  "--fw-delay": `${(i % 6) * 0.22}s`,
                  "--fw-color": fireworkColors[i % fireworkColors.length],
                } as React.CSSProperties
              }
            />
          ))}
        </div>
      </div>

      <div className="relative" style={{ perspective: 1200 }}>
        <div
          aria-hidden
          className="absolute inset-0 -z-10 rounded-full bg-emerald-500/20 blur-3xl"
        />
        <div
          className="select-none leading-none drop-shadow-[0_0_80px_rgba(34,197,94,0.55)]"
          style={{
            fontSize: "min(78vh, 78vw)",
            animation: "tree-spin 14s linear infinite",
            transformStyle: "preserve-3d",
          }}
        >
          🎄
        </div>
      </div>
    </section>
  );
}
