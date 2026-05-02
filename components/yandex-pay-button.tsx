"use client";

import { useEffect, useRef, useState } from "react";
import Script from "next/script";

const MERCHANT_ID = "90f801c3-8a2b-4484-9470-679d500836d9";
const TOTAL_AMOUNT = "1000.00";

declare global {
  interface Window {
    YaPay?: {
      createSession: (
        data: Record<string, unknown>,
        handlers: Record<string, unknown>,
      ) => Promise<{
        mountButton: (el: Element, options: Record<string, unknown>) => void;
        unmountButton?: () => void;
        destroy?: () => void;
      }>;
      CurrencyCode: { Rub: string };
      PaymentEnv: { Sandbox: string; Production: string };
      ButtonType: { Pay: string };
      ButtonTheme: { Black: string; White: string };
      ButtonWidth: { Auto: string; Max: string };
    };
  }
}

export function YandexPayButton() {
  const containerRef = useRef<HTMLDivElement>(null);
  const sessionRef = useRef<Awaited<
    ReturnType<NonNullable<Window["YaPay"]>["createSession"]>
  > | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    let pollHandle: number | null = null;

    const init = () => {
      const YaPay = window.YaPay;
      if (!YaPay || cancelled || !containerRef.current) return;

      const paymentData = {
        env: YaPay.PaymentEnv.Sandbox,
        version: 4,
        currencyCode: YaPay.CurrencyCode.Rub,
        merchantId: MERCHANT_ID,
        totalAmount: TOTAL_AMOUNT,
        availablePaymentMethods: ["CARD", "SPLIT"],
      };

      const onPayButtonClick = async () => {
        const res = await fetch("/api/yandex-pay/order", { method: "POST" });
        const data = (await res.json().catch(() => ({}))) as {
          paymentUrl?: string;
          error?: string;
        };
        if (!res.ok || !data.paymentUrl) {
          throw new Error(data.error || "no_payment_url");
        }
        return data.paymentUrl;
      };

      const onFormOpenError = (reason: unknown) => {
        console.error("[YaPay] form open error:", reason);
      };

      YaPay.createSession(paymentData, {
        onPayButtonClick,
        onFormOpenError,
      })
        .then((session) => {
          if (cancelled || !containerRef.current) return;
          sessionRef.current = session;
          session.mountButton(containerRef.current, {
            type: YaPay.ButtonType.Pay,
            theme: YaPay.ButtonTheme.Black,
            width: YaPay.ButtonWidth.Auto,
          });
        })
        .catch((err) => {
          console.error("[YaPay] createSession failed:", err);
          setError("Не удалось загрузить кнопку оплаты");
        });
    };

    if (window.YaPay) {
      init();
    } else {
      pollHandle = window.setInterval(() => {
        if (window.YaPay) {
          if (pollHandle !== null) window.clearInterval(pollHandle);
          init();
        }
      }, 100);
    }

    return () => {
      cancelled = true;
      if (pollHandle !== null) window.clearInterval(pollHandle);
      try {
        sessionRef.current?.unmountButton?.();
        sessionRef.current?.destroy?.();
      } catch {}
    };
  }, []);

  return (
    <>
      <Script
        src="https://pay.yandex.ru/sdk/v1/pay.js"
        strategy="afterInteractive"
      />
      <div className="flex flex-col items-center gap-2">
        <div ref={containerRef} className="min-h-[48px]" />
        {error && (
          <p className="text-xs text-destructive-foreground/80">{error}</p>
        )}
      </div>
    </>
  );
}
