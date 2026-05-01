"use client";

import { useMemo, useState } from "react";
import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";

type TenorId = "2m" | "4m" | "6m";

const tenors: {
  id: TenorId;
  value: string;
  label: string;
  payments: number;
  intervalDays: number;
}[] = [
  { id: "2m", value: "2", label: "2 мес", payments: 4, intervalDays: 14 },
  { id: "4m", value: "4", label: "4 мес", payments: 4, intervalDays: 30 },
  { id: "6m", value: "6", label: "6 мес", payments: 6, intervalDays: 30 },
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
  return `${n.toLocaleString("ru-RU").replace(/ /g, " ")} ₽`;
}

function pluralPayments(n: number) {
  const mod10 = n % 10;
  const mod100 = n % 100;
  if (mod10 === 1 && mod100 !== 11) return "платёж";
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return "платежа";
  return "платежей";
}

function PlusLogo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 87 86" className={className} aria-hidden>
      <defs>
        <radialGradient id="ya-plus-grad" cx="35%" cy="30%" r="80%">
          <stop offset="0%" stopColor="#f6a3ff" />
          <stop offset="45%" stopColor="#e64a9b" />
          <stop offset="100%" stopColor="#7d2fff" />
        </radialGradient>
      </defs>
      <circle cx="43.5" cy="43" r="42" fill="url(#ya-plus-grad)" />
      <path
        d="M43.5 24v38M24.5 43h38"
        stroke="white"
        strokeWidth="7"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function YandexPayCashbackMock() {
  return (
    <div
      className="bg-white/[0.07] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl"
      style={{ borderRadius: 20 }}
      data-testid="cashback-btn-parent"
    >
      <div className="flex items-center" style={{ margin: 20, gap: 12 }}>
        <PlusLogo className="h-7 w-7 shrink-0" />
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-center gap-1">
            <span className="text-[13px] leading-tight text-zinc-400">
              Яндекс&nbsp;Пэй — оплата с&nbsp;кешбэком
            </span>
            <ChevronRight
              className="h-[14px] w-[14px] text-zinc-500"
              strokeWidth={2}
            />
          </div>
          <span className="mt-0.5 text-[15px] font-semibold leading-tight">
            1278 баллов Плюса
          </span>
        </div>
      </div>
    </div>
  );
}

export function YandexPaySplitMock() {
  const [tenorId, setTenorId] = useState<TenorId>("2m");
  const tenor = tenors.find((t) => t.id === tenorId) ?? tenors[0];

  const { perPayment, schedule } = useMemo(() => {
    const per = Math.round(TOTAL / tenor.payments);
    const sched = Array.from({ length: tenor.payments }, (_, i) => {
      const d = new Date(ANCHOR);
      d.setDate(d.getDate() + i * tenor.intervalDays);
      return { date: formatDate(d), amount: formatRub(per) };
    });
    return { perPayment: per, schedule: sched };
  }, [tenor.payments, tenor.intervalDays]);

  const groupName = "ya-pay-tenor";

  return (
    <div
      className="bg-white/[0.07] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-xl"
      style={{ borderRadius: 20 }}
    >
      <div className="flex flex-col" style={{ margin: 20, gap: 20 }}>
        <div className="flex items-start" style={{ gap: 12 }}>
          <img
            src="https://yastatic.net/s3/pay-static/yandex-pay/frames/_/split-logo.8a4cff28.png"
            alt=""
            className="h-7 w-7 shrink-0"
            loading="lazy"
          />
          <div className="flex min-w-0 flex-1 flex-col">
            <div className="flex items-center gap-1">
              <span className="text-[13px] leading-tight text-zinc-400">
                Сплит
              </span>
              <ChevronRight
                className="h-[14px] w-[14px] text-zinc-500"
                strokeWidth={2}
              />
            </div>
            <span className="mt-0.5 text-[15px] font-semibold leading-snug">
              <span className="tabular-nums">{formatRub(perPayment)}</span>{" "}
              ×{" "}
              <span className="tabular-nums">
                {tenor.payments} {pluralPayments(tenor.payments)}
              </span>{" "}
              <span
                className="ml-1 inline-flex items-center rounded-md bg-emerald-400 px-1.5 py-[2px] align-middle text-[11px] font-semibold leading-none text-emerald-950"
                style={{ transform: "translateY(-1px)" }}
              >
                без переплат
              </span>
            </span>
          </div>
        </div>

        <div
          role="radiogroup"
          aria-orientation="horizontal"
          className="grid grid-cols-3 gap-1 rounded-full bg-zinc-800/80 p-1"
        >
          {tenors.map((t) => {
            const active = t.id === tenorId;
            return (
              <label
                key={t.id}
                className={cn(
                  "relative flex cursor-pointer items-center justify-center rounded-full py-2 text-[14px] font-semibold transition-colors duration-150",
                  active
                    ? "bg-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]"
                    : "text-zinc-400 hover:text-zinc-200",
                )}
              >
                <input
                  type="radio"
                  name={groupName}
                  value={t.value}
                  checked={active}
                  onChange={() => setTenorId(t.id)}
                  className="absolute inset-0 cursor-pointer opacity-0"
                  aria-label={t.label}
                />
                <span>{t.label}</span>
              </label>
            );
          })}
        </div>

        <div
          className="grid"
          style={{
            gridTemplateColumns: `repeat(${schedule.length}, minmax(0, 1fr))`,
            columnGap: 12,
          }}
        >
          {schedule.map((p, i) => {
            const active = i === 0;
            return (
              <div
                key={`${p.date}-${i}`}
                className="flex flex-col gap-2"
                data-testid="split-payment-cell"
              >
                <div
                  className={cn(
                    "h-[3px] rounded-full",
                    active ? "bg-emerald-400" : "bg-zinc-700",
                  )}
                />
                <span className="text-[12px] leading-none text-zinc-500">
                  {p.date}
                </span>
                <span className="text-[14px] font-semibold leading-tight tabular-nums">
                  {p.amount}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export function YandexPayMock() {
  return (
    <div
      aria-label="Превью оплаты Яндекс Пэй"
      className="flex flex-col gap-3 text-left"
    >
      <YandexPayCashbackMock />
      <YandexPaySplitMock />
    </div>
  );
}
