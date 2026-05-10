import type { Metadata } from "next";
import { Inter, Cormorant_Garamond } from "next/font/google";
import "./globals.css";

const sans = Inter({
  subsets: ["latin", "cyrillic"],
  variable: "--font-sans",
  display: "swap",
});

const serif = Cormorant_Garamond({
  subsets: ["latin", "cyrillic"],
  weight: ["500", "600", "700"],
  variable: "--font-serif",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Маршруты — авторские гиды по городам",
  description:
    "Несрежиссированные маршруты от местных: тихие районы, кофейни без очередей, закаты, о которых не пишут путеводители.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" className={`${sans.variable} ${serif.variable}`}>
      <body className="min-h-[100dvh] bg-cream text-ink antialiased">
        {children}
      </body>
    </html>
  );
}
