import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ["var(--font-serif)", "Georgia", "serif"],
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "Segoe UI",
          "sans-serif",
        ],
      },
      colors: {
        cream: "#FFF8F0",
        sand: "#F4E9D8",
        terracotta: "#D4A574",
        clay: "#B8865A",
        ocean: "#2E8B9E",
        ink: "#2D3436",
        muted: "#6B6F72",
        gold: "#C8932B",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(45, 52, 54, 0.04), 0 8px 24px rgba(45, 52, 54, 0.06)",
        lift: "0 2px 4px rgba(45, 52, 54, 0.06), 0 16px 40px rgba(45, 52, 54, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
