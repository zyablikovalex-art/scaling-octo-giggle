"use client";

import { useEffect, useRef, useState } from "react";

import { YandexPayMock } from "./yandex-pay-mock";

declare global {
  interface Window {
    YaPay?: {
      createSession: (
        data: Record<string, unknown>,
        handlers: Record<string, unknown>,
      ) => Promise<{
        mountWidget: (el: Element, options: Record<string, unknown>) => void;
        unmountWidget?: () => void;
        destroy?: () => void;
      }>;
      PaymentEnv?: { Production: string; Sandbox: string };
      CurrencyCode?: { Rub: string };
      PaymentMethodType?: { Card: string; Split: string; Cash: string };
      WidgetType?: { Ultimate: string; Info: string; BnplPreview: string };
      WidgetTheme?: { Light: string; Dark: string };
      WidgetPaddingType?: { Default: string; None: string };
      WidgetBackgroundType?: {
        Default: string;
        Saturated: string;
        Transparent: string;
      };
      WidgetSize?: { Medium: string; Small: string };
    };
  }
}

interface Props {
  merchantId?: string;
  env?: "PRODUCTION" | "SANDBOX";
}

const TOTAL_AMOUNT = "15980.00";

async function waitForSdk(timeoutMs = 8000) {
  const start = Date.now();
  while (Date.now() - start < timeoutMs) {
    if (typeof window !== "undefined" && window.YaPay) return window.YaPay;
    await new Promise((r) => setTimeout(r, 100));
  }
  return null;
}

export function YandexPayWidget({ merchantId, env = "PRODUCTION" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    if (!merchantId) return;

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
            env:
              env === "SANDBOX"
                ? YaPay.PaymentEnv?.Sandbox ?? "SANDBOX"
                : YaPay.PaymentEnv?.Production ?? "PRODUCTION",
            version: 4,
            merchantId,
            currencyCode: YaPay.CurrencyCode?.Rub ?? "RUB",
            totalAmount: TOTAL_AMOUNT,
            availablePaymentMethods: [
              YaPay.PaymentMethodType?.Card ?? "CARD",
              YaPay.PaymentMethodType?.Split ?? "SPLIT",
            ],
            type: "ByToken",
          },
          {
            onPayButtonClick: () =>
              Promise.reject(new Error("Демо-режим: оплата отключена")),
            onFormOpenError: () => {},
          },
        );

        if (cancelled || !containerRef.current) return;

        session.mountWidget(containerRef.current, {
          widgetType: YaPay.WidgetType?.Ultimate ?? "Ultimate",
          widgetTheme: YaPay.WidgetTheme?.Dark ?? "DARK",
          borderRadius: 20,
          padding: YaPay.WidgetPaddingType?.Default ?? "default",
          withOutline: false,
          widgetBackground:
            YaPay.WidgetBackgroundType?.Default ?? "default",
          hideWidgetHeader: false,
          widgetSize: YaPay.WidgetSize?.Medium ?? "medium",
        });

        setMounted(true);
      } catch (err) {
        if (typeof console !== "undefined") {
          console.warn(
            "[YaPay] widget failed to mount, falling back to mock",
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
          mounted ? "" : "pointer-events-none invisible absolute inset-0"
        }
      />
      {!mounted && <YandexPayMock />}
    </div>
  );
}
