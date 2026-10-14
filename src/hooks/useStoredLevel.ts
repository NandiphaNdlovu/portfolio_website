import { useCallback, useState } from "react";

const KEY = "portfolio:game:level";

function read(): number {
  try {
    const value = Number(window.localStorage.getItem(KEY));
    return Number.isFinite(value) && value > 0 ? Math.floor(value) : 0;
  } catch {
    return 0;
  }
}

export function useStoredLevel(): [number, (level: number) => void] {
  const [level, setLevelState] = useState(read);

  const setLevel = useCallback((next: number) => {
    setLevelState(next);
    try {
      if (next > 0) window.localStorage.setItem(KEY, String(next));
      else window.localStorage.removeItem(KEY);
    } catch {
      // Progress just won't persist.
    }
  }, []);

  return [level, setLevel];
}
