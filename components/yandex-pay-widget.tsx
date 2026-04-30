"use client";

import { useEffect, useRef, useState } from "react";

import {
  YandexPayCashbackMock,
  YandexPaySplitMock,
} from "./yandex-pay-mock";

declare global {
  interface Window {
    YaPay?: {
      createSession: (
        data: Record<string, unknown>,
        handlers: Record<string, (...args: unknown[]) => unknown>,
      ) => Promise<{
        mountWidget: (el: Element, options: Record<string, unknown>) => void;
        unmountWidget?: () => void;
        destroy?: () => void;
      }>;
      CurrencyCode?: { Rub: string };
      WidgetType?: { Ultimate: string };
      WidgetTheme?: { Light: string; Dark: string };
      WidgetPaddingType?: { Default: string; None: string };
      WidgetBackgroundType?: { Default: string };
      WidgetSize?: { Small: string; Medium: string; Large: string };
      PaymentEnv?: { Production: string; Sandbox: string };
    };
  }
}

interface Props {
  merchantId?: string;
}

const TOTAL_AMOUNT = "15980.00";

async function waitForSdk(timeoutMs = 5000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (typeof window !== "undefined" && window.YaPay) return window.YaPay;
    await new Promise((r) => setTimeout(r, 100));
  }
  return null;
}

function CashbackLive({ merchantId }: { merchantId: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let session: Awaited<
      ReturnType<NonNullable<Window["YaPay"]>["createSession"]>
    > | null = null;

    (async () => {
      const YaPay = await waitForSdk();
      if (cancelled || !YaPay) return;

      try {
        session = await YaPay.createSession(
          {
            env: YaPay.PaymentEnv?.Sandbox ?? "SANDBOX",
            version: 4,
            merchantId,
            currencyCode: YaPay.CurrencyCode?.Rub ?? "RUB",
            orderId: `demo-${Date.now()}`,
            totalAmount: TOTAL_AMOUNT,
            availablePaymentMethods: ["CARD"],
            type: "ByToken",
          },
          {
            onPaymentSuccess: () => {},
            onPaymentError: () => {},
            onAbort: () => {},
          },
        );

        if (cancelled || !containerRef.current) return;

        session.mountWidget(containerRef.current, {
          widgetType: YaPay.WidgetType?.Ultimate ?? "Ultimate",
          widgetTheme: YaPay.WidgetTheme?.Dark ?? "DARK",
          borderRadius: 20,
          padding: YaPay.WidgetPaddingType?.Default ?? "default",
          withOutline: false,
          widgetBackground: YaPay.WidgetBackgroundType?.Default ?? "default",
          hideWidgetHeader: false,
          widgetSize: YaPay.WidgetSize?.Medium ?? "medium",
        });

        setMounted(true);
      } catch (err) {
        if (typeof console !== "undefined") {
          console.warn(
            "[YaPay] cashback widget did not mount, falling back to mock",
            err,
          );
        }
      }
    })();

    return () => {
      cancelled = true;
      try {
        session?.unmountWidget?.();
        session?.destroy?.();
      } catch {}
    };
  }, [merchantId]);

  return (
    <div className="relative">
      <div
        ref={containerRef}
        aria-hidden={!mounted}
        className={
          mounted
            ? ""
            : "pointer-events-none invisible absolute inset-0"
        }
      />
      {!mounted && <YandexPayCashbackMock />}
    </div>
  );
}

export function YandexPayWidget({ merchantId }: Props) {
  return (
    <div
      aria-label="Превью оплаты Яндекс Пэй"
      className="flex flex-col gap-3 text-left"
    >
      {merchantId ? (
        <CashbackLive merchantId={merchantId} />
      ) : (
        <YandexPayCashbackMock />
      )}
      <YandexPaySplitMock />
    </div>
  );
}
