"use client";

import { useEffect, useRef, useState } from "react";

import { YandexPayMock } from "./yandex-pay-mock";

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

export function YandexPayWidget({ merchantId }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!merchantId) return;

    let cancelled = false;
    let session: Awaited<ReturnType<NonNullable<Window["YaPay"]>["createSession"]>> | null = null;

    (async () => {
      const YaPay = await waitForSdk();
      if (cancelled || !YaPay) return;

      try {
        session = await YaPay.createSession(
          {
            merchantId,
            currencyCode: YaPay.CurrencyCode?.Rub ?? "RUB",
            orderId: `demo-${Date.now()}`,
            totalAmount: TOTAL_AMOUNT,
            availablePaymentMethods: ["CARD", "SPLIT"],
            items: [
              {
                id: "danish-spruce",
                title: "Ель датская, 1.8 м",
                quantity: { count: "4" },
                total: TOTAL_AMOUNT,
              },
            ],
          },
          {
            onPaymentSuccess: () => {},
            onPaymentError: () => {},
            onAbort: () => {},
          },
        );

        if (cancelled || !containerRef.current) return;

        session.mountWidget(containerRef.current, {
          widgetType: YaPay.WidgetType?.Ultimate ?? "ULTIMATE",
          widgetTheme: YaPay.WidgetTheme?.Dark ?? "DARK",
          borderRadius: 20,
          padding: YaPay.WidgetPaddingType?.Default ?? "DEFAULT",
          withOutline: false,
          widgetBackground: YaPay.WidgetBackgroundType?.Default ?? "DEFAULT",
          hideWidgetHeader: false,
          widgetSize: YaPay.WidgetSize?.Medium ?? "MEDIUM",
        });

        setMounted(true);
      } catch (err) {
        if (typeof console !== "undefined") {
          console.warn("[YaPay] widget did not mount, falling back to mock", err);
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
        className={mounted ? "" : "pointer-events-none invisible absolute inset-0"}
      />
      {!mounted && <YandexPayMock />}
    </div>
  );
}
