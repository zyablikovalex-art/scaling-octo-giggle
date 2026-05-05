import { NextResponse } from "next/server";
import { checkAuth, sessionStore, orderStore } from "@/lib/ycp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(req: Request) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const url = new URL(req.url);
  const session_id = url.searchParams.get("session_id");
  const order_id = url.searchParams.get("order_id");
  const payment_method = url.searchParams.get("payment_method");

  if (!session_id || !order_id) {
    return NextResponse.json(
      { error: "session_id и order_id обязательны" },
      { status: 400 },
    );
  }

  const session = sessionStore.get(session_id);
  if (!session) {
    return NextResponse.json({ error: "Сессия не найдена" }, { status: 404 });
  }
  if (session.cancelled) {
    return NextResponse.json({ error: "Заказ уже отменен" }, { status: 409 });
  }

  session.placed = true;
  session.order_id = order_id;

  orderStore.set(order_id, {
    items: session.items.map((it) => ({
      id: it.id,
      quantity: it.quantity,
      refused_count: 0,
    })),
    statuses: [{ status: "new", timestamp: Math.floor(Date.now() / 1000) }],
    cancelled: false,
  });

  console.info("[YCP] order placed", {
    session_id,
    order_id,
    payment_method,
  });

  return NextResponse.json({});
}
