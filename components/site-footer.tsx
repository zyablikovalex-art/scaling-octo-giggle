export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-background/40 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-3 px-6 py-8 text-sm text-muted-foreground md:h-16 md:flex-row md:items-center md:py-0">
        <p>
          © {new Date().getFullYear()} Ёлки.Shop · ИП Зябликов А. · ОГРНИП 320774600184217
        </p>
        <p>Питомник под Владимиром · Доставка по ЦФО</p>
      </div>
    </footer>
  );
}
