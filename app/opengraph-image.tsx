import { ImageResponse } from "next/og";

export const runtime = "nodejs";
export const alt = "Ёлки.Shop — деревья, которые помнят запах детства";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: 36,
          background: "#0d0907",
          backgroundImage:
            "radial-gradient(ellipse at top, #3a1f0f 0%, transparent 60%), radial-gradient(ellipse at bottom right, #2a1015 0%, transparent 55%), radial-gradient(ellipse at bottom left, #0f2a18 0%, transparent 60%)",
          color: "#f5e8c8",
          fontFamily: "system-ui, -apple-system, sans-serif",
          padding: "60px 80px",
        }}
      >
        <svg
          width={240}
          height={280}
          viewBox="0 0 240 280"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="tree-grad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#7ee07c" />
              <stop offset="100%" stopColor="#1f5d2c" />
            </linearGradient>
          </defs>
          <polygon points="120,16 56,108 184,108" fill="url(#tree-grad)" />
          <polygon points="120,72 46,170 194,170" fill="url(#tree-grad)" />
          <polygon points="120,134 36,228 204,228" fill="url(#tree-grad)" />
          <rect x="104" y="228" width="32" height="42" fill="#5b3a1d" />
          <circle cx="98" cy="125" r="7" fill="#f4b94a" />
          <circle cx="148" cy="160" r="7" fill="#e34a6f" />
          <circle cx="78" cy="200" r="7" fill="#f4b94a" />
          <circle cx="168" cy="205" r="7" fill="#e34a6f" />
          <polygon
            points="120,4 124,14 134,14 126,21 129,32 120,25 111,32 114,21 106,14 116,14"
            fill="#f4d35e"
          />
        </svg>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 14,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 700,
              letterSpacing: -3,
              color: "#f4b94a",
              lineHeight: 1,
            }}
          >
            Ёлки.Shop
          </div>
          <div
            style={{
              fontSize: 34,
              color: "#c9b894",
              maxWidth: 900,
              lineHeight: 1.3,
            }}
          >
            Деревья, которые помнят запах детства
          </div>
        </div>
      </div>
    ),
    { ...size },
  );
}
