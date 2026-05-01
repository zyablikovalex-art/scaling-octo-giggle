import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { HeroVideo } from "@/components/hero-video";
import { YandexPayWidget } from "@/components/yandex-pay-widget";
import { cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

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

const stats = [
  { value: "11 847", label: "ёлок продано в сезоне 2024/25" },
  { value: "36 ч", label: "медианное время от заказа до двери" },
  { value: "94.3%", label: "клиентов вернулись через год" },
];

export default function HomePage() {
  const merchantId = process.env.ya_pay_mid;
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <HeroVideo />
        <div className="mx-auto grid max-w-7xl grid-cols-1 items-start gap-x-16 gap-y-14 px-6 pb-24 pt-28 md:grid-cols-12 md:pb-32 md:pt-40">
          <div className="md:col-span-7 lg:col-span-7">
            <span className="fade-up inline-flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/5 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.22em] text-amber-200/90 backdrop-blur-sm">
              Сезон 2025/26 открыт
            </span>
            <h1
              className="fade-up mt-6 text-4xl font-semibold leading-[1.05] tracking-tighter md:text-6xl"
              style={{ animationDelay: "80ms" }}
            >
              Ёлки, которые помнят
              <br />
              запах детства.
            </h1>
            <p
              className="fade-up mt-6 max-w-[58ch] text-base leading-relaxed text-muted-foreground md:text-lg"
              style={{ animationDelay: "160ms" }}
            >
              Срубили во вторник под Владимиром — стоят у тебя в пятницу.
              Каждое дерево с биркой питомника, в стрейч-сетке, с ровным срезом
              под подставку. Хвоя живая, осыпь минимальная, аромат —
              в первые двадцать минут после распаковки.
            </p>
            <dl
              className="fade-up mt-7 flex flex-wrap items-baseline gap-x-6 gap-y-2 text-sm text-muted-foreground"
              style={{ animationDelay: "200ms" }}
            >
              {stats.map((s, i) => (
                <div
                  key={s.label}
                  className={cn(
                    "flex items-baseline gap-2",
                    i > 0 && "border-l border-border/50 pl-6",
                  )}
                >
                  <dt className="font-mono text-base font-semibold tabular-nums text-amber-100">
                    {s.value}
                  </dt>
                  <dd>{s.label}</dd>
                </div>
              ))}
            </dl>
            <div
              className="fade-up mt-9 flex flex-col gap-3 sm:flex-row"
              style={{ animationDelay: "240ms" }}
            >
              <Button asChild size="lg">
                <Link href="#assortment">
                  Смотреть ассортимент
                  <ArrowRight className="ml-1 h-4 w-4" strokeWidth={1.75} />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/contacts">Стать партнёром</Link>
              </Button>
            </div>
          </div>

          <div
            className="fade-up md:col-span-5 md:col-start-8"
            style={{ animationDelay: "320ms" }}
          >
            <p className="mb-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
              Оплата
            </p>
            <YandexPayWidget merchantId={merchantId} />
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
