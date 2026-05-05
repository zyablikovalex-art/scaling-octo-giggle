import { NextResponse } from "next/server";

export type Warehouse = {
  id: string;
  available_quantity: number;
};

export type Product = {
  id: string;
  name: string;
  regular_price: number;
  final_price: number;
  img: string;
  url: string;
  warehouses: Warehouse[];
  dimensions: { width: number; height: number; depth: number; weight: number };
  characteristics: Array<{
    display_type: "text" | "color";
    code: string;
    name: string;
    properties: { value: string } | { value: string; hex: string };
  }>;
  variations: never[];
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://scaling-octo-giggle-5vy7.vercel.app");

function img(label: string) {
  return `https://placehold.co/600x600/1f5d2c/f5e8c8?text=${encodeURIComponent(label)}`;
}

export const PRODUCTS: Record<string, Product> = {
  "1": {
    id: "1",
    name: "Сосна обыкновенная",
    regular_price: 1490,
    final_price: 1490,
    img: img("Сосна"),
    url: SITE_URL,
    warehouses: [{ id: "1", available_quantity: 50 }],
    dimensions: { width: 800, height: 1500, depth: 800, weight: 5000 },
    characteristics: [
      {
        display_type: "text",
        code: "TREE_HEIGHT",
        name: "Высота",
        properties: { value: "1.2 – 1.8 м" },
      },
      {
        display_type: "text",
        code: "TREE_NEEDLES",
        name: "Хвоя",
        properties: { value: "Длинные, мягкие" },
      },
    ],
    variations: [],
  },
  "2": {
    id: "2",
    name: "Ель датская",
    regular_price: 3290,
    final_price: 3290,
    img: img("Ель датская"),
    url: SITE_URL,
    warehouses: [{ id: "1", available_quantity: 30 }],
    dimensions: { width: 900, height: 1800, depth: 900, weight: 6500 },
    characteristics: [
      {
        display_type: "text",
        code: "TREE_HEIGHT",
        name: "Высота",
        properties: { value: "1.5 – 2.2 м" },
      },
      {
        display_type: "text",
        code: "TREE_NEEDLES",
        name: "Хвоя",
        properties: { value: "Густые, не осыпаются" },
      },
    ],
    variations: [],
  },
  "3": {
    id: "3",
    name: "Ель голубая",
    regular_price: 4590,
    final_price: 4590,
    img: img("Ель голубая"),
    url: SITE_URL,
    warehouses: [{ id: "1", available_quantity: 20 }],
    dimensions: { width: 850, height: 1700, depth: 850, weight: 6000 },
    characteristics: [
      {
        display_type: "text",
        code: "TREE_HEIGHT",
        name: "Высота",
        properties: { value: "1.3 – 2.0 м" },
      },
      {
        display_type: "color",
        code: "TREE_COLOR",
        name: "Цвет хвои",
        properties: { value: "Серебристо-голубой", hex: "#8fb6c3" },
      },
    ],
    variations: [],
  },
  "4": {
    id: "4",
    name: "Пихта Нордмана",
    regular_price: 5890,
    final_price: 5890,
    img: img("Пихта"),
    url: SITE_URL,
    warehouses: [{ id: "1", available_quantity: 15 }],
    dimensions: { width: 1000, height: 2000, depth: 1000, weight: 7000 },
    characteristics: [
      {
        display_type: "text",
        code: "TREE_HEIGHT",
        name: "Высота",
        properties: { value: "1.6 – 2.5 м" },
      },
      {
        display_type: "text",
        code: "TREE_NEEDLES",
        name: "Хвоя",
        properties: { value: "Мягкие, не колются" },
      },
    ],
    variations: [],
  },
};

export function getProduct(id: string): Product | undefined {
  return PRODUCTS[id];
}

export function checkAuth(req: Request): NextResponse | null {
  const expected = process.env.YCP_TOKEN;
  if (!expected) return null;
  const auth = req.headers.get("authorization");
  if (auth !== `Bearer ${expected}`) {
    return NextResponse.json({ error: "Не авторизован" }, { status: 401 });
  }
  return null;
}

const sessions = new Map<
  string,
  {
    items: Array<{ id: string; quantity: number; final_price: number }>;
    customer?: unknown;
    delivery?: unknown;
    placed: boolean;
    cancelled: boolean;
    order_id?: string;
    created_at: number;
  }
>();

const orders = new Map<
  string,
  {
    items: Array<{ id: string; quantity: number; refused_count: number }>;
    statuses: Array<{ status: string; timestamp: number }>;
    cancelled: boolean;
  }
>();

export const sessionStore = sessions;
export const orderStore = orders;
