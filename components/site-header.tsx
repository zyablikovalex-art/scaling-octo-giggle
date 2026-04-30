import Link from "next/link";
import { TreePine } from "lucide-react";

const navItems = [
  { href: "/", label: "Главная" },
  { href: "/about", label: "О нас" },
  { href: "/contacts", label: "Контакты" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/60 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-300 transition-colors group-hover:border-emerald-400/60 group-hover:bg-emerald-500/15">
            <TreePine className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <span className="text-[15px] font-medium tracking-tight">
            Ёлки.Shop
          </span>
        </Link>
        <nav className="flex items-center gap-7 text-sm">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-muted-foreground transition-colors hover:text-foreground"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
