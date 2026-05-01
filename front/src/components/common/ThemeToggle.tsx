import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import { getTheme, setTheme, type ThemeMode } from "@/lib/theme";

export function ThemeToggle() {
  const [mode, setMode] = useState<ThemeMode>(getTheme());

  const toggle = () => {
    const next = mode === "light" ? "dark" : "light";
    setTheme(next);
    setMode(next);
  };

  return (
    <button
      onClick={toggle}
      className="p-2 rounded-lg hover:bg-secondary transition-colors"
      aria-label={mode === "light" ? "Тёмная тема" : "Светлая тема"}
    >
      {mode === "light" ? (
        <Moon className="w-5 h-5 text-foreground" />
      ) : (
        <Sun className="w-5 h-5 text-foreground" />
      )}
    </button>
  );
}
