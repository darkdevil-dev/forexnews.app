import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { applyTheme, getStoredTheme, THEME_KEY } from "@/lib/theme";

export function ThemeToggle({ className = "" }) {
  const [dark, setDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const stored = getStoredTheme();
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const isDark = stored ? stored === "dark" : prefersDark;
    setDark(isDark);
    applyTheme(isDark ? "dark" : "light");
    setMounted(true);
  }, []);

  function toggle() {
    const next = !dark;
    setDark(next);
    applyTheme(next ? "dark" : "light");
    try {
      localStorage.setItem(THEME_KEY, next ? "dark" : "light");
    } catch {
      /* storage unavailable */
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={dark ? "Switch to light theme" : "Switch to dark theme"}
      className={`grid h-9 w-9 shrink-0 place-items-center rounded-[8px] border border-border text-foreground/60 transition-colors hover:border-foreground/40 hover:text-foreground ${className}`}
    >
      {mounted && dark ? (
        <Sun className="h-4 w-4" strokeWidth={1.9} />
      ) : (
        <Moon className="h-4 w-4" strokeWidth={1.9} />
      )}
    </button>
  );
}