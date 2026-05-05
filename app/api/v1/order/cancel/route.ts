import { NextResponse } from "next/server";
import { checkAuth, orderStore } from "@/lib/ycp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const order_id = new URL(req.url).searchParams.get("order_id");
  if (!order_id) {
    return NextResponse.json({ error: "order_id обязателен" }, { status: 400 });
  }

  const order = orderStore.get(order_id);
  if (!order) {
    return NextResponse.json({ error: "Заказ не найден" }, { status: 404 });
  }

  order.cancelled = true;
  order.statuses.push({
    status: "cancelled",
    timestamp: Math.floor(Date.now() / 1000),
  });

  console.info("[YCP] order cancelled", order_id);
  return NextResponse.json({});
}
