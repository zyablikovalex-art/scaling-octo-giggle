"use client";

import { useState, type ReactNode } from "react";

type ThemeKey = "city" | "nature" | "sea";
type View = "intro" | "catalog";

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

type HeroCopy = {
  label: string;
  title: ReactNode;
  subtitle: string;
  quote: string;
};

const heroContent: Record<ThemeKey, HeroCopy> = {
  city: {
    label: "Авторские гиды по городам",
    title: (
      <>
        Города,
        <br />
        которые читают
        <br />
        между строк.
      </>
    ),
    subtitle:
      "Не путеводители. Дневники редакторов, которые жили в этих городах и знают, где утром пахнет хлебом, а вечером — апельсиновыми деревьями.",
    quote: "Лиссабон на четыре утра.",
  },
  nature: {
    label: "Авторские маршруты по тропам",
    title: (
      <>
        Тропы,
        <br />
        на которых ещё
        <br />
        пахнет смолой.
      </>
    ),
    subtitle:
      "Не справочник МЧС. Заметки людей, которые ходят сюда каждое лето: где встать палаткой, как спускаться к роднику и где ждать рассвет в тумане.",
    quote: "Хибины на четыре утра.",
  },
  sea: {
    label: "Авторские гиды по побережьям",
    title: (
      <>
        Берега,
        <br />
        до которых не доехал
        <br />
        TripAdvisor.
      </>
    ),
    subtitle:
      "Не курортные карты. Тихие бухты, рыбные ужины у причала и пляжи, до которых час на лодке от ближайшего отеля. От тех, кто там ныряет с детства.",
    quote: "Менорка на четыре утра.",
  },
};

type Guide = {
  city: string;
  country: string;
  price: string;
  days: string;
  accent: string;
  note: string;
};

const guidesByTheme: Record<ThemeKey, Guide[]> = {
  city: [
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
      accent: "from-[#D4A574] to-[#7B4F2C]",
      note: "Койоакан, рынки Меркадо Хамайка, мескаль и тако-туры.",
    },
    {
      city: "Тбилиси",
      country: "Грузия",
      price: "490 ₽",
      days: "3 дня",
      accent: "from-[#B8865A] to-[#5A3D24]",
      note: "Сололаки, серные бани, пекарни и квеври у виноделов.",
    },
  ],
  nature: [
    {
      city: "Хибины",
      country: "Кольский п-ов",
      price: "690 ₽",
      days: "6 дней",
      accent: "from-[#7CB342] to-[#3F7D3A]",
      note: "Перевалы, лагерь у Малого Вудъявра, морошка на склонах.",
    },
    {
      city: "Камчатка",
      country: "Россия",
      price: "890 ₽",
      days: "8 дней",
      accent: "from-[#5C9A3D] to-[#1F4A1B]",
      note: "Авачинский, термальные источники, выход к косаткам.",
    },
    {
      city: "Алтай",
      country: "Россия",
      price: "790 ₽",
      days: "7 дней",
      accent: "from-[#A7CD7B] to-[#3F7D3A]",
      note: "Чуйский тракт, кедровая тайга, Каракольские озёра.",
    },
    {
      city: "Архыз",
      country: "Кавказ",
      price: "590 ₽",
      days: "4 дня",
      accent: "from-[#7CB342] to-[#1F4A1B]",
      note: "Софийские озёра, водопады и древние храмы X века.",
    },
  ],
  sea: [
    {
      city: "Менорка",
      country: "Испания",
      price: "690 ₽",
      days: "5 дней",
      accent: "from-[#2E8B9E] to-[#1F5C6B]",
      note: "Тихие кальяс, маяки и сыр махон прямо с фермы.",
    },
    {
      city: "Маскат",
      country: "Оман",
      price: "790 ₽",
      days: "5 дней",
      accent: "from-[#5BB0C2] to-[#1F5C6B]",
      note: "Вади Шаб, ужины у пристани, дайвинг с черепахами.",
    },
    {
      city: "Бали",
      country: "Индонезия",
      price: "690 ₽",
      days: "6 дней",
      accent: "from-[#BCD9DF] to-[#2E8B9E]",
      note: "Букит, пустые споты для серфа и тёплое море на закате.",
    },
    {
      city: "Кипр",
      country: "Запад",
      price: "590 ₽",
      days: "4 дня",
      accent: "from-[#2E8B9E] to-[#0F3540]",
      note: "Акамас, черепашьи бухты и рыбные таверны Лачи.",
    },
  ],
};

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
    <div className="flex flex-col items-center gap-2 md:gap-5">
      <p className="text-[10px] uppercase tracking-[0.24em] text-muted md:text-xs md:tracking-[0.28em]">
        Куда путешествуем
      </p>
      <div
        role="tablist"
        aria-label="Куда путешествуем"
        className="inline-flex flex-wrap items-center justify-center gap-1 rounded-full border border-ink/10 bg-cream/70 p-1 backdrop-blur md:gap-1.5 md:p-1.5"
      >
        {themeOrder.map((key) => {
          const active = value === key;
          return (
            <button
              key={key}
              role="tab"
              aria-selected={active}
              onClick={() => onChange(key)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-colors md:px-9 md:py-3.5 md:text-lg ${
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

function IntroView({
  theme,
  t,
  onStart,
}: {
  theme: ThemeKey;
  t: Theme;
  onStart: () => void;
}) {
  const c = heroContent[theme];
  return (
    <main className="flex flex-1 flex-col">
      <section className="relative flex flex-1 flex-col overflow-hidden">
        <div className="mx-auto grid w-full max-w-6xl grid-cols-1 items-start gap-4 px-6 pt-2 md:grid-cols-12 md:items-center md:gap-12 md:pb-12 md:pt-8">
          <div className="md:col-span-7">
            <div key={theme} className="animate-fade-up">
              <p
                className="text-[10px] uppercase tracking-[0.24em] md:text-[11px]"
                style={{ color: t.accent }}
              >
                {c.label}
              </p>
              <h1 className="mt-3 font-display text-3xl font-bold leading-[1.05] tracking-tight sm:text-4xl md:mt-5 md:text-7xl md:leading-[1.02]">
                {c.title}
              </h1>
              <p className="mt-3 max-w-[52ch] text-sm leading-relaxed text-muted md:mt-7 md:text-lg">
                {c.subtitle}
              </p>
            </div>
          </div>

          <div className="md:col-span-5">
            <div className="relative aspect-[16/9] w-full overflow-hidden rounded-2xl shadow-lift md:aspect-[4/5] md:rounded-3xl">
              {themeOrder.map((key) => (
                <div
                  key={key}
                  aria-hidden
                  className="absolute inset-0 transition-opacity duration-700 ease-out"
                  style={{
                    backgroundImage: themes[key].heroGradient,
                    opacity: theme === key ? 1 : 0,
                  }}
                />
              ))}
              <div
                className="absolute inset-0 opacity-40 mix-blend-overlay"
                style={{
                  backgroundImage:
                    "radial-gradient(circle at 20% 20%, rgba(255,248,240,0.5), transparent 40%), radial-gradient(circle at 80% 80%, rgba(45,52,54,0.4), transparent 50%)",
                }}
              />
              <div className="absolute inset-x-0 bottom-0 p-4 text-cream md:p-7">
                <div key={theme} className="animate-fade-up">
                  <p className="font-display text-xl font-semibold leading-tight md:text-3xl">
                    «{c.quote}»
                  </p>
                  <p className="mt-1.5 text-xs text-cream/80 md:mt-3 md:text-sm">
                    Из последнего гида редакции
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-auto flex w-full max-w-6xl flex-col items-center px-6 pb-6 pt-4 text-center md:pb-24 md:pt-8">
          <button
            type="button"
            onClick={onStart}
            className="group inline-flex items-center gap-3 rounded-full bg-ink px-8 py-3.5 text-base font-medium text-cream shadow-soft transition-all hover:bg-ink/85 hover:shadow-lift md:px-10 md:py-5"
          >
            Поехали
            <ArrowIcon className="h-5 w-5 transition-transform group-hover:translate-x-1" />
          </button>
          <p className="mt-3 hidden text-xs uppercase tracking-[0.2em] text-muted md:block md:mt-4">
            Откроется каталог гидов
          </p>
        </div>
      </section>
    </main>
  );
}

function CatalogView({ theme, t }: { theme: ThemeKey; t: Theme }) {
  const guides = guidesByTheme[theme];
  return (
    <main>
      <section id="guides" className="bg-ink/[0.03]">
        <div className="mx-auto max-w-6xl px-6 py-12 md:py-16">
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

          <div
            key={theme}
            className="mt-12 grid animate-fade-up grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4"
          >
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
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-ink">
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

      <section className="border-t border-ink/5">
        <div className="mx-auto max-w-6xl px-6 py-20 md:py-24">
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

      <footer className="border-t border-ink/5">
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
    </main>
  );
}

export default function HomePage() {
  const [theme, setTheme] = useState<ThemeKey>("city");
  const [view, setView] = useState<View>("intro");
  const [transitioning, setTransitioning] = useState(false);
  const t = themes[theme];

  const switchView = (next: View) => {
    if (next === view || transitioning) return;
    setTransitioning(true);
    window.setTimeout(() => {
      setView(next);
      window.scrollTo({ top: 0, behavior: "auto" });
      requestAnimationFrame(() => {
        requestAnimationFrame(() => setTransitioning(false));
      });
    }, 300);
  };

  return (
    <div
      className="relative flex min-h-[100dvh] flex-col transition-colors duration-700 ease-out"
      style={{ backgroundColor: t.baseColor }}
    >
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-0">
        {themeOrder.map((key) => (
          <div
            key={key}
            className="absolute inset-0 transition-opacity duration-700 ease-out"
            style={{
              backgroundImage: themes[key].gradient,
              opacity: theme === key ? 1 : 0,
            }}
          />
        ))}
      </div>
      <header className="relative shrink-0">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:py-5">
          <a href="/" className="font-display text-lg font-bold tracking-tight md:text-xl">
            Маршруты
          </a>
          {view === "catalog" && (
            <button
              type="button"
              onClick={() => switchView("intro")}
              className="text-sm text-ink/70 transition-colors hover:text-ink"
            >
              ← К началу
            </button>
          )}
        </div>
      </header>

      <div className="relative mx-auto w-full max-w-6xl shrink-0 animate-fade-up px-6 pb-2 pt-4 md:pb-6 md:pt-12">
        <ThemeTabs value={theme} onChange={setTheme} />
      </div>

      <div
        className={`relative flex flex-1 flex-col transition-opacity duration-300 ease-out ${
          transitioning ? "opacity-0" : "opacity-100"
        }`}
      >
        {view === "intro" ? (
          <IntroView theme={theme} t={t} onStart={() => switchView("catalog")} />
        ) : (
          <CatalogView theme={theme} t={t} />
        )}
      </div>
    </div>
  );
}
