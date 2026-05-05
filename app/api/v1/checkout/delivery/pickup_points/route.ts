import { NextResponse } from "next/server";
import { checkAuth } from "@/lib/ycp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const ALL_POINTS = [
  {
    id: "PP001",
    name: "ПВЗ на Тверской",
    address: "Москва, Тверская улица, 12",
    coordinates: { lat: 55.762, lon: 37.609 },
    time_zone: 3,
    is_card_available: true,
    is_cash_available: true,
    has_fitting: false,
    description: "Самовывоз ёлок. Парковка с 9 до 21.",
    working_hours: {
      mon: "09:00-21:00",
      tue: "09:00-21:00",
      wed: "09:00-21:00",
      thu: "09:00-21:00",
      fri: "09:00-21:00",
      sat: "10:00-18:00",
      sun: "10:00-18:00",
    },
  },
  {
    id: "PP002",
    name: "ПВЗ во Владимире",
    address: "Владимир, Большая Московская улица, 24",
    coordinates: { lat: 56.131, lon: 40.394 },
    time_zone: 3,
    is_card_available: true,
    is_cash_available: false,
    has_fitting: false,
    description: "Питомничный пункт самовывоза.",
    working_hours: {
      mon: "10:00-19:00",
      tue: "10:00-19:00",
      wed: "10:00-19:00",
      thu: "10:00-19:00",
      fri: "10:00-19:00",
      sat: "10:00-17:00",
      sun: "10:00-17:00",
    },
  },
];

export async function GET(req: Request) {
  const authError = checkAuth(req);
  if (authError) return authError;

  const url = new URL(req.url);
  const limit = Number(url.searchParams.get("limit")) || ALL_POINTS.length;
  const offset = Number(url.searchParams.get("offset")) || 0;

  return NextResponse.json({
    pickup_points: ALL_POINTS.slice(offset, offset + limit),
    total_count: ALL_POINTS.length,
  });
}
