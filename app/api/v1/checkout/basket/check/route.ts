import { NextResponse } from "next/server";
import { checkAuth, getProduct } from "@/lib/ycp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

type RequestItem = { id: string; quantity: number };

export async function POST(req: Request) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const body = (await req.json().catch(() => ({}))) as {
    items?: RequestItem[];
    offers_id_from_merchant_center?: boolean;
  };

  const items = (body.items ?? []).map((req) => {
    const p = getProduct(req.id);
    if (!p) {
      return null;
    }
    return {
      id: p.id,
      name: p.name,
      regular_price: p.regular_price,
      final_price: p.final_price,
      img: p.img,
      url: p.url,
      warehouses: p.warehouses,
      dimensions: p.dimensions,
      characteristics: p.characteristics,
      variations: p.variations,
    };
  });

  if (items.includes(null)) {
    return NextResponse.json(
      { error: "Один или несколько товаров не найдены" },
      { status: 404 },
    );
  }

  return NextResponse.json({ items });
}
