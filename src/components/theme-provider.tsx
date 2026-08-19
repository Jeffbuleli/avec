"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const STORAGE = "eavec-theme";

type Theme = "light" | "dark";

type Ctx = { theme: Theme; setTheme: (t: Theme) => void; toggle: () => void };

const ThemeCtx = createContext<Ctx | null>(null);

function getInitial(): Theme {
  return "light";
}

/** e-AVEC is cream / light. */
export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("light");

  useEffect(() => {
    setThemeState("light");
    document.documentElement.classList.remove("dark");
    localStorage.setItem(STORAGE, "light");
  }, []);

  const setTheme = useCallback((t: Theme) => {
    setThemeState("light");
    localStorage.setItem(STORAGE, "light");
    document.documentElement.classList.remove("dark");
    void t;
  }, []);

  const toggle = useCallback(() => {
    /* intentionally no-op: dark-only experience */
  }, []);

  return (
    <ThemeCtx.Provider value={{ theme, setTheme, toggle }}>
      {children}
    </ThemeCtx.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error("useTheme outside ThemeProvider");
  return ctx;
}
