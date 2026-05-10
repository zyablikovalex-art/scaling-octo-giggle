"use client";

import { useState } from "react";

type ThemeKey = "city" | "nature" | "sea";

type Theme = {
  label: string;
  baseColor: string;
  gradient: string;
  accent: string;
  heroGradient: string;
};

const themes: Record<ThemeKey, Theme> = {
  city: {
    label: "Город",
    baseColor: "#FFF8F0",
    gradient:
      "radial-gradient(ellipse 60% 45% at 85% -10%, rgba(212,165,116,0.32), transparent 60%), radial-gradient(ellipse 55% 40% at -10% 70%, rgba(200,147,43,0.22), transparent 60%), radial-gradient(ellipse 50% 35% at 50% 110%, rgba(184,134,90,0.18), transparent 60%)",
    accent: "#B8865A",
    heroGradient: "linear-gradient(135deg, #D4A574, #B8865A 45%, #7B4F2C)",
  },
  nature: {
    label: "Природа",
    baseColor: "#EAF3E2",
    gradient:
      "radial-gradient(ellipse 60% 45% at 85% -10%, rgba(124,179,66,0.34), transparent 60%), radial-gradient(ellipse 55% 40% at -10% 70%, rgba(63,125,58,0.24), transparent 60%), radial-gradient(ellipse 50% 35% at 50% 110%, rgba(167,205,123,0.28), transparent 60%)",
    accent: "#3F7D3A",
    heroGradient: "linear-gradient(135deg, #7CB342, #3F7D3A 45%, #1F4A1B)",
  },
  sea: {
    label: "Море",
    baseColor: "#E6F2F5",
    gradient:
      "radial-gradient(ellipse 60% 45% at 85% -10%, rgba(46,139,158,0.34), transparent 60%), radial-gradient(ellipse 55% 40% at -10% 70%, rgba(31,92,107,0.24), transparent 60%), radial-gradient(ellipse 50% 35% at 50% 110%, rgba(188,217,223,0.4), transparent 60%)",
    accent: "#1F5C6B",
    heroGradient: "linear-gradient(135deg, #2E8B9E, #1F5C6B 45%, #0F3540)",
  },
};

const themeOrder: ThemeKey[] = ["city", "nature", "sea"];

const guides = [
  {
    city: "Лиссабон",
    country: "Португалия",
    price: "590 ₽",
    days: "4 дня",
    accent: "from-[#D4A574] to-[#B8865A]",
    note: "Азулежу, мирадоры на закате, винные таверны в Алфаме.",
  },
  {
    city: "Стамбул",
    country: "Турция",
    price: "690 ₽",
    days: "5 дней",
    accent: "from-[#C8932B] to-[#8B5E2A]",
    note: "Кадыкёй без туристов, рыбные ужины и чай у Босфора.",
  },
  {
    city: "Мехико",
    country: "Мексика",
    price: "590 ₽",
    days: "4 дня",
    accent: "from-[#7CB342] to-[#3F7D3A]",
    note: "Койоакан, рынки Меркадо Хамайка, мескаль и тако-туры.",
  },
  {
    city: "Тбилиси",
    country: "Грузия",
    price: "490 ₽",
    days: "3 дня",
    accent: "from-[#2E8B9E] to-[#1F5C6B]",
    note: "Сололаки, серные бани, пекарни и квеври у виноделов.",
  },
];

const features = [
  {
    title: "Маршруты по дням",
    text: "Пешие петли с расчётом по времени. Без беготни между точками на разных концах города.",
  },
  {
    title: "Места от местных",
    text: "Кофейни, рюмочные, рынки и видовые точки, которые редакторы знают лично.",
  },
  {
    title: "Карта офлайн",
    text: "PDF и ссылка на Google Maps с пинами. Открывается в самолёте и в горах без сети.",
  },
  {
    title: "Без воды",
    text: "Никаких списков из Википедии. Только то, куда мы сами возвращаемся.",
  },
];

function ArrowIcon({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden
    >
      <path d="M5 12h14" />
      <path d="m13 5 7 7-7 7" />
    </svg>
  );
}

function ThemeTabs({
  value,
  onChange,
}: {
  value: ThemeKey;
  onChange: (key: ThemeKey) => void;
}) {
  return (
    <div className="flex flex-col items-center gap-3">
      <p className="text-[11px] uppercase tracking-[0.24em] text-muted">
        Куда путешествуем
      </p>
      <div
        role="tablist"
        aria-label="Куда путешествуем"
        className="inline-flex items-center gap-1 rounded-full border border-ink/10 bg-cream/60 p-1 backdrop-blur"
      >
        {themeOrder.map((key) => {
          const active = value === key;
          return (
            <button
              key={key}
              role="tab"
              aria-selected={active}
              onClick={() => onChange(key)}
              className={`rounded-full px-5 py-1.5 text-sm font-medium transition-colors ${
                active
                  ? "bg-ink text-cream shadow-soft"
                  : "text-ink/70 hover:text-ink"
              }`}
            >
              {themes[key].label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default function HomePage() {
  const [theme, setTheme] = useState<ThemeKey>("city");
  const t = themes[theme];

  return (
    <div
      className="transition-colors duration-700 ease-out"
      style={{
        backgroundColor: t.baseColor,
        backgroundImage: t.gradient,
      }}
    >
      <header className="border-b border-ink/5">
        <div className="mx-auto max-w-6xl px-6 py-5">
          <div className="flex items-center justify-between">
            <a
              href="/"
              className="font-display text-xl font-bold tracking-tight"
            >
              Маршруты
            </a>
            <a
              href="#guides"
              className="rounded-full bg-ink px-4 py-2 text-sm text-cream transition-colors hover:bg-ink/85"
            >
              Купить гид
            </a>
          </div>
          <div className="mt-6 flex justify-center pb-2">
            <ThemeTabs value={theme} onChange={setTheme} />
          </div>
        </div>
      </header>

      <main>
        <section className="relative overflow-hidden">
          <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-20 pt-20 md:grid-cols-12 md:pb-28 md:pt-28">
            <div className="md:col-span-7">
              <p
                className="text-[11px] uppercase tracking-[0.24em]"
                style={{ color: t.accent }}
              >
                Авторские гиды · 12 направлений
              </p>
              <h1 className="mt-5 font-display text-5xl font-bold leading-[1.02] tracking-tight md:text-7xl">
                Места,
                <br />
                которые читают
                <br />
                между строк.
              </h1>
              <p className="mt-7 max-w-[52ch] text-base leading-relaxed text-muted md:text-lg">
                Не путеводители. Дневники редакторов, которые жили в этих
                местах и знают, где утром пахнет хлебом, а вечером —
                апельсиновыми деревьями. PDF, карта и плейлист — на четыре дня.
              </p>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <a
                  href="#guides"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-cream shadow-soft transition-all hover:bg-ink/85 hover:shadow-lift"
                >
                  Выбрать направление
                  <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                </a>
                <a
                  href="#inside"
                  className="text-sm font-medium text-ink underline-offset-4 transition-colors hover:underline"
                >
                  Что внутри гида
                </a>
              </div>
            </div>

            <div className="md:col-span-5">
              <div
                className="relative aspect-[4/5] w-full overflow-hidden rounded-3xl shadow-lift transition-[background-image] duration-700"
                style={{ backgroundImage: t.heroGradient }}
              >
                <div
                  className="absolute inset-0 opacity-40 mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 20% 20%, rgba(255,248,240,0.5), transparent 40%), radial-gradient(circle at 80% 80%, rgba(45,52,54,0.4), transparent 50%)",
                  }}
                />
                <div className="absolute inset-x-0 bottom-0 p-7 text-cream">
                  <p className="font-display text-3xl font-semibold leading-tight">
                    «{t.label} на четыре утра.»
                  </p>
                  <p className="mt-3 text-sm text-cream/80">
                    Из последнего гида редакции
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="guides" className="border-t border-ink/5 bg-ink/[0.03]">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="flex items-end justify-between gap-6">
              <div>
                <p
                  className="text-[11px] uppercase tracking-[0.24em]"
                  style={{ color: t.accent }}
                >
                  Каталог
                </p>
                <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
                  Свежая полка.
                </h2>
              </div>
              <p className="hidden max-w-xs text-sm text-muted md:block">
                Каждый гид обновляется два раза в год. Если место закрылось —
                редактор едет искать замену.
              </p>
            </div>

            <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
              {guides.map((g) => (
                <article
                  key={g.city}
                  className="group flex flex-col overflow-hidden rounded-2xl bg-cream shadow-soft transition-all hover:-translate-y-0.5 hover:shadow-lift"
                >
                  <div
                    className={`relative aspect-[4/5] w-full bg-gradient-to-br ${g.accent}`}
                  >
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,248,240,0.35),transparent_55%)]" />
                    <div className="absolute left-4 top-4 rounded-full bg-cream/90 px-3 py-1 text-[11px] uppercase tracking-[0.18em] text-ink">
                      {g.days}
                    </div>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[11px] uppercase tracking-[0.2em] text-muted">
                      {g.country}
                    </p>
                    <h3 className="mt-2 font-display text-2xl font-bold leading-tight">
                      {g.city}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">
                      {g.note}
                    </p>
                    <div className="mt-5 flex items-center justify-between">
                      <span className="font-display text-xl font-bold tabular-nums">
                        {g.price}
                      </span>
                      <span
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-ink transition-colors"
                        style={{ color: undefined }}
                      >
                        Купить
                        <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="inside" className="border-t border-ink/5">
          <div className="mx-auto max-w-6xl px-6 py-20 md:py-28">
            <div className="max-w-2xl">
              <p
                className="text-[11px] uppercase tracking-[0.24em]"
                style={{ color: t.accent }}
              >
                Что внутри
              </p>
              <h2 className="mt-3 font-display text-4xl font-bold tracking-tight md:text-5xl">
                Не лонгрид и не Википедия.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-muted md:text-lg">
                Каждый гид — 40–60 страниц вёрстки в PDF, карта в Google Maps
                и плейлист на дорогу. Ничего лишнего.
              </p>
            </div>

            <div className="mt-14 grid grid-cols-1 gap-x-10 gap-y-10 md:grid-cols-2">
              {features.map((f, i) => (
                <div key={f.title} className="flex gap-5">
                  <span
                    className="mt-1 font-display text-xl font-bold tabular-nums"
                    style={{ color: t.accent }}
                  >
                    0{i + 1}
                  </span>
                  <div>
                    <h3 className="font-display text-2xl font-bold leading-tight">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-muted">
                      {f.text}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="border-t border-ink/5 bg-ink text-cream">
          <div className="mx-auto flex max-w-6xl flex-col items-start gap-8 px-6 py-20 md:flex-row md:items-end md:justify-between md:py-24">
            <div className="max-w-2xl">
              <h2 className="font-display text-4xl font-bold leading-tight tracking-tight md:text-5xl">
                Одно направление. Четыре дня.
                <br />
                590 ₽.
              </h2>
              <p className="mt-5 text-base leading-relaxed text-cream/70 md:text-lg">
                Купить раз — пользоваться всю поездку. После оплаты письмо
                с PDF и ссылкой на карту приходит за минуту.
              </p>
            </div>
            <a
              href="#guides"
              className="group inline-flex items-center gap-2 rounded-full bg-cream px-7 py-4 text-sm font-medium text-ink transition-all hover:bg-sand"
            >
              Выбрать гид
              <ArrowIcon className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </a>
          </div>
        </section>
      </main>

      <footer id="faq" className="border-t border-ink/5">
        <div className="mx-auto flex max-w-6xl flex-col gap-3 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} Маршруты</p>
          <div className="flex gap-6">
            <a href="#" className="transition-colors hover:text-ink">
              Контакты
            </a>
            <a href="#" className="transition-colors hover:text-ink">
              Оферта
            </a>
            <a href="#" className="transition-colors hover:text-ink">
              Возврат
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
