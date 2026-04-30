import Link from "next/link";
import { ArrowRight, Sparkles, Zap, Layers } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const features = [
  {
    icon: Zap,
    title: "Молниеносно",
    description:
      "App Router, серверные компоненты и потоковая отрисовка из коробки.",
  },
  {
    icon: Layers,
    title: "Готовые компоненты",
    description:
      "shadcn/ui подключён — добавляйте кнопки, карточки и формы за секунды.",
  },
  {
    icon: Sparkles,
    title: "Чистый дизайн",
    description:
      "Минималистичная тема на Tailwind CSS, легко настраивается под бренд.",
  },
];

export default function HomePage() {
  return (
    <div className="container">
      <section className="flex flex-col items-center justify-center gap-6 py-24 text-center md:py-32">
        <span className="inline-flex items-center gap-2 rounded-full border bg-muted/40 px-4 py-1 text-xs font-medium text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          Next.js 14 · TypeScript · shadcn/ui
        </span>
        <h1 className="max-w-3xl text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Создавайте быстрые продукты на современном стеке
        </h1>
        <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl">
          Готовый стартовый шаблон с App Router, Tailwind CSS и компонентами
          shadcn/ui. Сосредоточьтесь на продукте, а не на конфигурации.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Button asChild size="lg">
            <Link href="/about">
              Начать
              <ArrowRight className="ml-1" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline">
            <Link href="/contacts">Связаться с нами</Link>
          </Button>
        </div>
      </section>

      <section className="grid gap-6 pb-24 md:grid-cols-3">
        {features.map(({ icon: Icon, title, description }) => (
          <Card key={title} className="transition-shadow hover:shadow-md">
            <CardHeader>
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
                <Icon className="h-5 w-5" />
              </div>
              <CardTitle className="text-xl">{title}</CardTitle>
              <CardDescription>{description}</CardDescription>
            </CardHeader>
          </Card>
        ))}
      </section>
    </div>
  );
}
