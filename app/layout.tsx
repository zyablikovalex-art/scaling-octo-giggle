import type { Metadata } from "next";
import "./globals.css";

import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { CozyBackground } from "@/components/cozy-background";

export const metadata: Metadata = {
  title: "Ёлки.Shop — продавай ёлки красиво",
  description:
    "Тёплый лендинг для продажи новогодних ёлок: сосны, пихты и ели прямиком от поставщика.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ru" suppressHydrationWarning>
      <body className="relative flex min-h-screen flex-col font-sans antialiased">
        <CozyBackground />
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
