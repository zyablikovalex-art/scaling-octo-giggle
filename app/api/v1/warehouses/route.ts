import { NextResponse } from "next/server";
import { checkAuth } from "@/lib/ycp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  const authError = checkAuth(req);
  if (authError) return authError;

  return NextResponse.json({
    warehouses: [
      {
        id: "1",
        title: "Питомник под Владимиром",
        address: "Владимирская обл., д. Боголюбово, ул. Ёлочная, 1",
        phone: "+7 (495) 000-00-00",
        description: "Главный склад питомника. Самовывоз по предварительной записи.",
      },
    ],
  });
}
