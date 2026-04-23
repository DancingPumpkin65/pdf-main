import { Moon, Sun } from "lucide-react";
import type { Theme } from "../theme/ThemeProvider";

export function ThemeIconButton({
  theme,
  onToggle,
  mounted = true,
}: {
  theme: Theme;
  onToggle: () => void;
  mounted?: boolean;
}) {
  if (!mounted) {
    return <div className="h-8 w-8" aria-hidden="true" />;
  }

  return (
    <button
      type="button"
      onClick={onToggle}
      className="flex h-8 w-8 items-center justify-center text-[var(--foreground-muted)] transition-colors hover:bg-[var(--surface-alt)] hover:text-[var(--foreground)]"
      title={`Switch to ${theme === "dark" ? "light" : "dark"} mode (Ctrl/Cmd+Shift+L)`}
      aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} mode`}
    >
      {theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      )}
    </button>
  );
}
