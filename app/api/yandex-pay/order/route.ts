import { randomUUID } from "node:crypto";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const YAPAY_SANDBOX_ORDERS_URL =
  "https://sandbox.pay.yandex.ru/api/merchant/v1/orders";

const ALL_METHODS = ["CARD", "SPLIT"] as const;
type Method = (typeof ALL_METHODS)[number];

export async function POST(req: Request) {
  const apiKey = process.env.ya_pay_apikey;
  if (!apiKey) {
    return NextResponse.json(
      { error: "merchant_not_configured" },
      { status: 500 },
    );
  }

  const reqBody = (await req.json().catch(() => ({}))) as {
    methods?: Method[];
  };
  const methods =
    Array.isArray(reqBody.methods) && reqBody.methods.length > 0
      ? reqBody.methods.filter((m): m is Method => ALL_METHODS.includes(m))
      : [...ALL_METHODS];

  const origin =
    req.headers.get("origin") ||
    `https://${req.headers.get("host") ?? "example.com"}`;

  const body = {
    orderId: randomUUID(),
    currencyCode: "RUB",
    cart: {
      items: [
        {
          productId: "demo-tree",
          quantity: { count: "1" },
          title: "Демо-ёлка",
          total: "1000.00",
        },
      ],
      total: { amount: "1000.00" },
    },
    orderAmount: "1000.00",
    redirectUrls: {
      onError: `${origin}/?pay=error`,
      onSuccess: `${origin}/?pay=success`,
      onAbort: `${origin}/?pay=abort`,
    },
    ttl: 1800,
    availablePaymentMethods: methods,
  };

  const upstream = await fetch(YAPAY_SANDBOX_ORDERS_URL, {
    method: "POST",
    headers: {
      Authorization: `Api-Key ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

  const data = await upstream.json().catch(() => null);

  if (!upstream.ok || data?.status !== "success") {
    return NextResponse.json(
      { error: "yapay_failed", upstream: data },
      { status: 502 },
    );
  }

  const paymentUrl = data?.data?.paymentUrl;
  if (!paymentUrl) {
    return NextResponse.json(
      { error: "missing_payment_url", upstream: data },
      { status: 502 },
    );
  }

  return NextResponse.json({ paymentUrl });
}
