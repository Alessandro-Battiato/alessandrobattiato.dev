import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";
import type { Theme } from "../lib/theme";

interface ThemeToggleProps {
  theme: Theme;
  onToggle: () => void;
  className?: string;
}

function ThemeToggle({ theme, onToggle, className }: ThemeToggleProps) {
  const isDark = theme === "dark";

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={onToggle}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className={cn(
        "h-9 shrink-0 cursor-pointer gap-2.5 rounded-full border-border-subtle bg-surface px-4 font-mono text-xs font-medium text-copy-primary",
        className
      )}
    >
      <span className="size-2 rounded-full bg-accent shadow-glow-accent" aria-hidden="true" />
      {isDark ? "Dark Mode" : "Light Mode"}
    </Button>
  );
}

export default ThemeToggle;
