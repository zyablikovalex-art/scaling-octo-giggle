import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { TreeShowcase } from "@/components/tree-scroll";
import { HeroVideo } from "@/components/hero-video";

const trees = [
  {
    name: "Сосна обыкновенная",
    height: "1.2 – 1.8 м",
    needles: "Длинные, мягкие",
    aroma: "Смолянистый, насыщенный",
    price: "от 1 490 ₽",
  },
  {
    name: "Ель датская",
    height: "1.5 – 2.2 м",
    needles: "Густые, не осыпаются",
    aroma: "Свежий, лёгкий",
    price: "от 3 290 ₽",
  },
  {
    name: "Ель голубая",
    height: "1.3 – 2.0 м",
    needles: "Серебристо-голубые",
    aroma: "Холодный, хвойный",
    price: "от 4 590 ₽",
  },
  {
    name: "Пихта Нордмана",
    height: "1.6 – 2.5 м",
    needles: "Мягкие, не колются",
    aroma: "Нежный, цитрусовый",
    price: "от 5 890 ₽",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative isolate overflow-hidden">
        <HeroVideo />
        <div className="container flex flex-col items-center justify-center gap-6 py-24 text-center md:py-36">
          <span className="inline-flex items-center gap-2 rounded-full border border-amber-500/30 bg-amber-500/10 px-4 py-1 text-xs font-medium uppercase tracking-widest text-amber-200">
            <Sparkles className="h-3.5 w-3.5" />
            Сезон 2026 уже стартует
          </span>
          <h1 className="max-w-4xl bg-gradient-to-b from-white via-amber-100 to-amber-300/80 bg-clip-text text-4xl font-bold tracking-tight text-transparent sm:text-6xl md:text-7xl">
            Продавай ёлки. Делай праздник.
          </h1>
          <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
            Каждая ёлка — это не просто дерево, а семейная традиция, запах
            мандаринов и блеск гирлянд. Мы привозим хвою прямиком из питомника:
            свежую, ароматную, готовую стать главной звездой Нового года. А ты
            продаёшь не товар — а волшебство.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="lg" className="shadow-[0_0_30px_rgba(251,191,36,0.35)]">
              <Link href="#assortment">
                Смотреть ассортимент
                <ArrowRight className="ml-1" />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/contacts">Стать партнёром</Link>
            </Button>
          </div>

          <dl className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-3">
            {[
              { value: "12 000+", label: "ёлок продано за сезон" },
              { value: "48 ч", label: "от заказа до доставки" },
              { value: "98%", label: "клиентов возвращаются" },
            ].map((s) => (
              <div
                key={s.label}
                className="rounded-2xl border border-border/50 bg-card/40 px-6 py-5 backdrop-blur"
              >
                <dt className="text-2xl font-semibold text-amber-200">
                  {s.value}
                </dt>
                <dd className="mt-1 text-sm text-muted-foreground">
                  {s.label}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      <TreeShowcase />

      <section id="assortment" className="container pb-32 pt-12">
        <div className="mb-10 max-w-2xl">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-200/80">
            Ассортимент
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            Подбери ёлку под свою витрину
          </h2>
          <p className="mt-3 text-muted-foreground">
            Цены оптовые, минимальная партия — 10 деревьев. Все позиции с
            сертификатом и маркировкой «Честный знак».
          </p>
        </div>

        <div className="overflow-hidden rounded-2xl border border-border/60 bg-card/40 backdrop-blur-md">
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/30 hover:bg-muted/30">
                <TableHead>Сорт</TableHead>
                <TableHead>Высота</TableHead>
                <TableHead>Хвоя</TableHead>
                <TableHead>Аромат</TableHead>
                <TableHead className="text-right">Цена</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {trees.map((t) => (
                <TableRow key={t.name}>
                  <TableCell className="font-medium text-foreground">
                    {t.name}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {t.height}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {t.needles}
                  </TableCell>
                  <TableCell className="text-muted-foreground">
                    {t.aroma}
                  </TableCell>
                  <TableCell className="text-right font-semibold text-amber-200">
                    {t.price}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </section>
    </>
  );
}
