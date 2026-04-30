export function SiteFooter() {
  return (
    <footer className="border-t border-border/40 bg-background/40 backdrop-blur-xl">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 md:h-16 md:flex-row md:py-0">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Ёлки.Shop — теплее, чем кажется.
        </p>
        <p className="text-sm text-muted-foreground">
          Сделано с какао и хвоей
        </p>
      </div>
    </footer>
  );
}
