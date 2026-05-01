import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HeroVideo } from "@/components/hero-video";
import { YandexPayMock } from "@/components/yandex-pay-mock";
import { ChatPanel } from "@/components/chat-widget";

const trees = [
  {
    name: "Сосна обыкновенная",
    height: "1.2 – 1.8 м",
    needles: "Длинные, мягкие",
    aroma: "Смолянистый, насыщенный",
    price: "1 490 ₽",
  },
  {
    name: "Ель датская",
    height: "1.5 – 2.2 м",
    needles: "Густые, не осыпаются",
    aroma: "Свежий, лёгкий",
    price: "3 290 ₽",
  },
  {
    name: "Ель голубая",
    height: "1.3 – 2.0 м",
    needles: "Серебристо-голубые",
    aroma: "Холодный, хвойный",
    price: "4 590 ₽",
  },
  {
    name: "Пихта Нордмана",
    height: "1.6 – 2.5 м",
    needles: "Мягкие, не колются",
    aroma: "Нежный, цитрусовый",
    price: "5 890 ₽",
  },
];

function StepBadge({ n }: { n: number }) {
  return (
    <span
      aria-hidden
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-amber-300/30 bg-amber-300/10 font-mono text-sm font-semibold tabular-nums text-amber-100 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
    >
      {n}
    </span>
  );
}

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <HeroVideo />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-x-16 gap-y-14 px-6 pb-24 pt-28 md:grid-cols-12 md:pb-32 md:pt-40">
          <div className="md:col-span-7 lg:col-span-7">
            <h1 className="fade-up text-4xl font-semibold leading-[1.05] tracking-tighter md:text-6xl">
              Ёлки, которые помнят
              <br />
              запах детства.
            </h1>
            <p
              className="fade-up mt-6 max-w-[58ch] text-base leading-relaxed text-muted-foreground md:text-lg"
              style={{ animationDelay: "120ms" }}
            >
              Срубили во вторник под Владимиром — стоят у тебя в пятницу.
              Каждое дерево с биркой питомника, в стрейч-сетке, с ровным срезом
              под подставку. Хвоя живая, осыпь минимальная, аромат —
              в первые двадцать минут после распаковки.
            </p>
          </div>

          <div
            className="fade-up md:col-span-5 md:col-start-8"
            style={{ animationDelay: "240ms" }}
          >
            <div className="rounded-2xl border border-white/10 bg-card/40 p-6 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl md:p-7">
              <h2 className="text-[15px] font-semibold leading-snug tracking-tight md:text-base">
                Всего пара шагов до новогодней&nbsp;радости
              </h2>

              <ol className="mt-6 space-y-6">
                <li className="flex items-start gap-4">
                  <StepBadge n={1} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold leading-tight">
                      Выбери ёлку
                    </p>
                    <p className="mt-1 text-[13px] leading-snug text-muted-foreground">
                      Помощник Ёлкин подберёт под потолок и привычки
                    </p>
                  </div>
                </li>

                <li className="flex items-start gap-4">
                  <StepBadge n={2} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[15px] font-semibold leading-tight">
                      Оплати удобным способом
                    </p>
                    <p className="mt-1 text-[13px] leading-snug text-muted-foreground">
                      Яндекс&nbsp;Пэй с кешбэком или Сплит без переплат
                    </p>
                    <div className="mt-3">
                      <YandexPayMock compact />
                    </div>
                  </div>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <section id="assistant" className="relative">
        <div className="mx-auto max-w-7xl px-6 py-20 md:py-28">
          <div className="grid grid-cols-1 items-center gap-x-16 gap-y-10 md:grid-cols-12">
            <div className="md:col-span-7">
              <p className="text-[11px] uppercase tracking-[0.22em] text-emerald-300/80">
                AI-консультант
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tighter md:text-5xl">
                Не откладывай вопрос
                <br />
                до выходных.
              </h2>
              <p className="mt-5 max-w-[52ch] text-base leading-relaxed text-muted-foreground md:text-lg">
                Ёлкин — это AI-помощник на базе Llama&nbsp;3.3 через Groq.
                Помнит весь ассортимент, считает доставку под твой район
                и не теряет нить разговора. Отвечает за секунды, в любое время —
                включая третий час ночи 31 декабря.
              </p>
              <ul className="mt-7 space-y-3 text-sm text-muted-foreground md:text-base">
                <li className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-[7px] block h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-400"
                  />
                  <span>
                    Подскажет высоту под потолок и тип хвои под аллергии в семье.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-[7px] block h-1.5 w-1.5 shrink-0 rounded-full bg-amber-300"
                  />
                  <span>
                    Назовёт реальную цену с учётом сезона и партии — без звонка
                    менеджеру.
                  </span>
                </li>
                <li className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-[7px] block h-1.5 w-1.5 shrink-0 rounded-full bg-rose-400"
                  />
                  <span>
                    Если нужен живой человек — переключит, не уронив контекст.
                  </span>
                </li>
              </ul>
            </div>
            <div className="md:col-span-5">
              <ChatPanel />
            </div>
          </div>
        </div>
      </section>

      <section id="assortment" className="relative">
        <div className="mx-auto max-w-7xl px-6 py-24 md:py-32">
          <div className="grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-12">
            <div className="md:col-span-5">
              <p className="text-[11px] uppercase tracking-[0.22em] text-amber-200/80">
                Ассортимент
              </p>
              <h2 className="mt-3 text-3xl font-semibold leading-tight tracking-tighter md:text-5xl">
                Подбери ёлку под потолок и привычки.
              </h2>
              <p className="mt-5 max-w-[40ch] text-base leading-relaxed text-muted-foreground">
                Цены оптовые, минимальная партия — десять деревьев. Все позиции
                с сертификатом и маркировкой «Честный знак».
              </p>
            </div>
            <div className="md:col-span-7">
              <div
                className="overflow-hidden rounded-2xl border border-border/50 bg-card/30 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md"
              >
                <Table>
                  <TableHeader>
                    <TableRow className="border-b-border/50 bg-muted/20 hover:bg-muted/20">
                      <TableHead>Сорт</TableHead>
                      <TableHead>Высота</TableHead>
                      <TableHead className="hidden sm:table-cell">
                        Хвоя
                      </TableHead>
                      <TableHead className="text-right">Цена</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {trees.map((t) => (
                      <TableRow
                        key={t.name}
                        className="border-b-border/40 last:border-b-0"
                      >
                        <TableCell className="font-medium">
                          <div>{t.name}</div>
                          <div className="mt-0.5 text-xs text-muted-foreground sm:hidden">
                            {t.needles}
                          </div>
                        </TableCell>
                        <TableCell className="font-mono text-sm tabular-nums text-muted-foreground">
                          {t.height}
                        </TableCell>
                        <TableCell className="hidden text-muted-foreground sm:table-cell">
                          {t.needles}
                        </TableCell>
                        <TableCell className="text-right font-mono text-sm font-medium tabular-nums text-amber-100">
                          от {t.price}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
