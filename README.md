# Scaling Octo Giggle

Стартовый шаблон лендинга на **Next.js 14 (App Router)**, **TypeScript**,
**Tailwind CSS** и **shadcn/ui**. Минималистичный дизайн, готовая шапка с
навигацией, hero-секция и блок преимуществ на компонентах `Card`.

## Стек

- [Next.js 14](https://nextjs.org/) — App Router, серверные компоненты
- [TypeScript](https://www.typescriptlang.org/) — строгая типизация
- [Tailwind CSS](https://tailwindcss.com/) — утилитарные стили
- [shadcn/ui](https://ui.shadcn.com/) — компоненты `Button`, `Card`
- [lucide-react](https://lucide.dev/) — иконки

## Структура

```
app/
  layout.tsx        # шапка + футер, глобальные стили
  page.tsx          # главная с hero-секцией и преимуществами
  globals.css       # tailwind + CSS-переменные темы
components/
  site-header.tsx   # шапка с логотипом и навигацией
  site-footer.tsx   # футер
  ui/
    button.tsx      # компонент shadcn/ui
    card.tsx        # компонент shadcn/ui
lib/
  utils.ts          # helper `cn()` для объединения классов
```

## Локальный запуск

Требуется Node.js 18.17+ и npm (либо pnpm/yarn).

```bash
# 1. Установить зависимости
npm install

# 2. Запустить dev-сервер
npm run dev

# 3. Открыть в браузере
# http://localhost:3000
```

## Сборка production

```bash
npm run build
npm run start
```

## Линтинг

```bash
npm run lint
```

## Добавление новых компонентов shadcn/ui

Конфигурация уже есть в `components.json`. Добавить новый компонент:

```bash
npx shadcn@latest add dialog
```
