export const YM_COUNTER_ID = 109023784;

declare global {
  interface Window {
    ym?: (
      counterId: number,
      action: string,
      ...args: unknown[]
    ) => void;
  }
}

export function reachGoal(goal: string) {
  if (typeof window === "undefined") return;
  try {
    window.ym?.(YM_COUNTER_ID, "reachGoal", goal);
  } catch {}
}
