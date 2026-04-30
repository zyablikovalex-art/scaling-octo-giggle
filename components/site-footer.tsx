export function SiteFooter() {
  return (
    <footer className="border-t border-border/60 bg-background">
      <div className="container flex flex-col items-center justify-between gap-4 py-8 md:h-16 md:flex-row md:py-0">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Scaling Octo. Все права защищены.
        </p>
        <p className="text-sm text-muted-foreground">
          Сделано на Next.js 14 и shadcn/ui
        </p>
      </div>
    </footer>
  );
}
