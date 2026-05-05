import { NextResponse } from "next/server";
import { checkAuth } from "@/lib/ycp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function inDays(n: number) {
  const d = new Date();
  d.setDate(d.getDate() + n);
  return d.toISOString().slice(0, 10);
}

export async function POST(req: Request) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const body = (await req.json().catch(() => ({}))) as {
    delivery_target?: { delivery_method?: string };
  };

  const isPickup = body.delivery_target?.delivery_method === "pickup_point";

  if (isPickup) {
    return NextResponse.json({
      delivery_options: [
        {
          id: "pickup-tomorrow",
          cost: 0,
          delivery_date_interval: {
            start_interval: { date: inDays(1) },
            end_interval: { date: inDays(2) },
            time_zone: 3,
          },
        },
      ],
    });
  }

  return NextResponse.json({
    delivery_options: [
      {
        id: "courier-fast",
        cost: 490,
        delivery_date_interval: {
          start_interval: { date: inDays(1), time: "10:00:00" },
          end_interval: { date: inDays(1), time: "14:00:00" },
          time_zone: 3,
        },
      },
      {
        id: "courier-standard",
        cost: 290,
        delivery_date_interval: {
          start_interval: { date: inDays(2) },
          end_interval: { date: inDays(3) },
          time_zone: 3,
        },
      },
    ],
  });
}
