export function SiteFooter() {
  const version = process.env.NEXT_PUBLIC_BUILD_VERSION ?? "dev";
  return (
    <footer className="border-t border-border/40 bg-background/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-8 text-sm text-muted-foreground md:h-16 md:flex-row md:items-center md:py-0">
        <p>
          © {new Date().getFullYear()} Ёлки.Shop · ИП Зябликов А. А. · ИНН 503016586380
        </p>
        <p className="flex items-center gap-3">
          <span>Питомник под Владимиром · Доставка по ЦФО</span>
          <span className="font-mono text-xs tabular-nums text-muted-foreground/70">
            v{version}
          </span>
        </p>
      </div>
    </footer>
  );
}
