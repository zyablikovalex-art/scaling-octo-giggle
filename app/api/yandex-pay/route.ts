import { NextResponse } from "next/server";

export const runtime = "edge";

export async function POST(req: Request) {
  const apiKey = process.env.ya_pay_apikey;
  if (!apiKey) {
    return NextResponse.json(
      { status: "fail", reasonCode: "merchant_not_configured" },
      { status: 500 },
    );
  }

  let payload: unknown = null;
  try {
    payload = await req.json();
  } catch {
    payload = null;
  }

  if (process.env.NODE_ENV !== "production") {
    console.log("[ya-pay merchant_api] event", payload);
  }

  return NextResponse.json({ status: "success" });
}

export async function GET() {
  return NextResponse.json({ status: "ok" });
}
