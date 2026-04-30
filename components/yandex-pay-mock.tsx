"use client";

import { useState } from "react";
import { ChevronRight, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

type TenorId = "2m" | "4m" | "6m";

const tenors: {
  id: TenorId;
  label: string;
  payments: number;
  intervalDays: number;
}[] = [
  { id: "2m", label: "2 мес", payments: 4, intervalDays: 14 },
  { id: "4m", label: "4 мес", payments: 4, intervalDays: 30 },
  { id: "6m", label: "6 мес", payments: 6, intervalDays: 30 },
];

const TOTAL = 15980;
const ANCHOR = new Date(2026, 3, 30);

const monthsRu = [
  "янв",
  "фев",
  "мар",
  "апр",
  "май",
  "июн",
  "июл",
  "авг",
  "сен",
  "окт",
  "ноя",
  "дек",
];

function formatDate(d: Date) {
  return `${d.getDate()} ${monthsRu[d.getMonth()]}`;
}

function formatRub(n: number) {
  return `${n.toLocaleString("ru-RU")} ₽`.replace(/ /g, " ");
}

export function YandexPayMock() {
  const [tenorId, setTenorId] = useState<TenorId>("2m");
  const tenor = tenors.find((t) => t.id === tenorId) ?? tenors[0];

  const perPayment = Math.round(TOTAL / tenor.payments);
  const schedule = Array.from({ length: tenor.payments }, (_, i) => {
    const d = new Date(ANCHOR);
    d.setDate(d.getDate() + i * tenor.intervalDays);
    return { date: formatDate(d), amount: formatRub(perPayment) };
  });

  return (
    <div
      aria-label="Превью оплаты Яндекс Пэй"
      className="space-y-3 text-left"
    >
      <div className="flex items-center gap-3 rounded-[20px] bg-zinc-900/95 px-4 py-3.5 ring-1 ring-white/5">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#f6a3ff,#e64a9b_45%,#7d2fff)] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
          <Plus className="h-5 w-5" strokeWidth={2.5} />
        </span>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1 text-[13px] text-zinc-400">
            Яндекс&nbsp;Пэй — оплата с кешбэком
            <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
          </div>
          <div className="mt-0.5 text-[15px] font-semibold text-white">
            1278 баллов Плюса
          </div>
        </div>
      </div>

      <div className="space-y-3.5 rounded-[20px] bg-zinc-900/95 p-4 ring-1 ring-white/5">
        <div className="flex items-start gap-3">
          <span className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[radial-gradient(circle_at_30%_30%,#86efac,#22c55e_55%,#15803d)] shadow-[inset_0_1px_0_rgba(255,255,255,0.25)]">
            <span className="absolute h-4 w-4 rounded-full bg-white" />
            <span className="absolute h-4 w-4 rounded-full bg-[radial-gradient(circle_at_30%_30%,#86efac,#22c55e_55%,#15803d)] [clip-path:polygon(50%_50%,100%_0,100%_100%)]" />
          </span>
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1 text-[13px] text-zinc-400">
              Сплит
              <ChevronRight className="h-3.5 w-3.5" strokeWidth={2} />
            </div>
            <div className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1">
              <span className="font-mono text-[15px] font-semibold tabular-nums text-white">
                {formatRub(perPayment)} × {tenor.payments}{" "}
                {tenor.payments % 10 === 1 && tenor.payments !== 11
                  ? "платёж"
                  : tenor.payments % 10 >= 2 &&
                      tenor.payments % 10 <= 4 &&
                      (tenor.payments < 12 || tenor.payments > 14)
                    ? "платежа"
                    : "платежей"}
              </span>
              <span className="rounded-md bg-emerald-400 px-1.5 py-[3px] text-[11px] font-semibold leading-none text-emerald-950">
                без переплат
              </span>
            </div>
          </div>
        </div>

        <div
          role="tablist"
          aria-label="Срок рассрочки"
          className="grid grid-cols-3 gap-1 rounded-full bg-zinc-800/80 p-1"
        >
          {tenors.map((t) => {
            const active = t.id === tenorId;
            return (
              <button
                type="button"
                role="tab"
                aria-selected={active}
                key={t.id}
                onClick={() => setTenorId(t.id)}
                className={cn(
                  "rounded-full py-2 text-[13px] font-medium transition-colors duration-200",
                  active
                    ? "bg-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                    : "text-zinc-400 hover:text-zinc-200",
                )}
              >
                {t.label}
              </button>
            );
          })}
        </div>

        <div>
          <div
            className="mb-3 grid gap-1.5"
            style={{
              gridTemplateColumns: `repeat(${schedule.length}, minmax(0,1fr))`,
            }}
          >
            {schedule.map((p, i) => (
              <span
                key={`${p.date}-${i}`}
                className={cn(
                  "h-[3px] rounded-full transition-colors duration-200",
                  i === 0 ? "bg-emerald-400" : "bg-zinc-700",
                )}
              />
            ))}
          </div>
          <div
            className="grid gap-3"
            style={{
              gridTemplateColumns: `repeat(${schedule.length}, minmax(0,1fr))`,
            }}
          >
            {schedule.map((p, i) => (
              <div key={`${p.date}-${i}`}>
                <div className="text-[11px] leading-none text-zinc-500">
                  {p.date}
                </div>
                <div className="mt-1 font-mono text-[13px] font-semibold tabular-nums text-white">
                  {p.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
