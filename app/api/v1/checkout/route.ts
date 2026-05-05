import { NextResponse } from "next/server";
import { checkAuth, getProduct, sessionStore } from "@/lib/ycp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type SessionItem = {
  id: string;
  quantity: number;
  regular_price: number;
  final_price: number;
};

export async function POST(req: Request) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const body = (await req.json().catch(() => ({}))) as {
    session_id?: string;
    warehouse_id?: string;
    items?: SessionItem[];
    customer?: unknown;
    delivery?: unknown;
  };

  if (!body.session_id || !body.items?.length) {
    return NextResponse.json({ error: "session_id и items обязательны" }, { status: 400 });
  }

  if (sessionStore.has(body.session_id)) {
    return NextResponse.json({ error: "Сессия уже существует" }, { status: 409 });
  }

  const conflicts: Array<{
    id: string;
    regular_price: number;
    final_price: number;
    warehouses: { id: string; available_quantity: number }[];
  }> = [];

  for (const item of body.items) {
    const p = getProduct(item.id);
    if (!p) continue;
    const stock = p.warehouses[0]?.available_quantity ?? 0;
    if (item.quantity > stock || item.final_price !== p.final_price) {
      conflicts.push({
        id: p.id,
        regular_price: p.regular_price,
        final_price: p.final_price,
        warehouses: p.warehouses,
      });
    }
  }

  if (conflicts.length > 0) {
    return NextResponse.json(
      {
        error: "Изменились цены или наличие",
        actual_inventory: { items: conflicts },
      },
      { status: 409 },
    );
  }

  sessionStore.set(body.session_id, {
    items: body.items,
    customer: body.customer,
    delivery: body.delivery,
    placed: false,
    cancelled: false,
    created_at: Date.now(),
  });

  return NextResponse.json(
    { order_number: `elki-${body.session_id.slice(0, 8)}` },
    { status: 201 },
  );
}
