import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import "./globals.css";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CozyBackground } from "@/components/cozy-background";

export const metadata: Metadata = {
  title: "Ёлки.Shop — деревья, которые помнят запах детства",
  description:
    "Тёплый лендинг для продажи новогодних ёлок: сосны, пихты и ели прямиком из питомника.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ru"
      suppressHydrationWarning
      className={`${GeistSans.variable} scroll-smooth`}
    >
      <body className="relative flex min-h-[100dvh] flex-col antialiased">
        <CozyBackground />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
