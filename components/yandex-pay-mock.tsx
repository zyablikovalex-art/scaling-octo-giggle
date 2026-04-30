import { ChevronRight, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

const schedule = [
  { date: "30 апр", amount: "3 995 ₽" },
  { date: "14 мая", amount: "3 995 ₽" },
  { date: "28 мая", amount: "3 995 ₽" },
  { date: "11 июн", amount: "3 995 ₽" },
];

const tenors = [
  { label: "2 мес", active: true },
  { label: "4 мес", active: false },
  { label: "6 мес", active: false },
];

export function YandexPayMock() {
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
              <span className="text-[15px] font-semibold text-white">
                3 995&nbsp;₽ × 4 платежа
              </span>
              <span className="rounded-md bg-emerald-400 px-1.5 py-[3px] text-[11px] font-semibold leading-none text-emerald-950">
                без переплат
              </span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-1 rounded-full bg-zinc-800/80 p-1">
          {tenors.map((t) => (
            <button
              type="button"
              key={t.label}
              className={cn(
                "rounded-full py-2 text-[13px] font-medium transition-colors",
                t.active
                  ? "bg-black text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                  : "text-zinc-400 hover:text-zinc-200",
              )}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div>
          <div className="mb-3 flex gap-1.5">
            <span className="h-[3px] flex-1 rounded-full bg-emerald-400" />
            <span className="h-[3px] flex-1 rounded-full bg-zinc-700" />
            <span className="h-[3px] flex-1 rounded-full bg-zinc-700" />
            <span className="h-[3px] flex-1 rounded-full bg-zinc-700" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {schedule.map((p) => (
              <div key={p.date}>
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
