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
  if (order.cancelled) {
    return NextResponse.json({ error: "Заказ отменен" }, { status: 409 });
  }

  const body = (await req.json().catch(() => ({}))) as {
    purchased_items?: Array<{ id: string; quantity: number }>;
  };

  for (const purchased of body.purchased_items ?? []) {
    const item = order.items.find((it) => it.id === purchased.id);
    if (item) {
      item.refused_count = Math.max(0, item.quantity - purchased.quantity);
    }
  }

  order.statuses.push({
    status: "delivered",
    timestamp: Math.floor(Date.now() / 1000),
  });

  console.info("[YCP] order delivered", order_id);
  return NextResponse.json({});
}
