import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { useTheme } from "../../lib/theme";

interface NavLink {
  index: string;
  label: string;
  href: string;
}

const NAV_LINKS: NavLink[] = [
  { index: "01", label: "Intro", href: "#intro" },
  { index: "02", label: "How I Work", href: "#how-i-work" },
  { index: "03", label: "Case Study", href: "#case-study" },
  { index: "04", label: "Experience", href: "#experience" },
  { index: "05", label: "Now", href: "#now" },
  { index: "06", label: "Talk", href: "#talk" },
];

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <header className="sticky top-0 z-50 h-18 border-b border-border-subtle bg-background/85 backdrop-blur-md">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-full max-w-[100rem] items-center justify-between gap-6 px-6 lg:px-20"
      >
        <a href="#intro" className="flex shrink-0 items-center gap-3 rounded-md whitespace-nowrap">
          <span className="font-serif text-2xl leading-none tracking-tight text-copy-primary">
            Alessandro Battiato
          </span>
          <Badge
            variant="outline"
            className="hidden rounded-full border-accent/40 bg-accent-soft px-3 py-1 font-mono text-[0.6875rem] font-medium tracking-[0.12em] whitespace-nowrap text-accent uppercase sm:inline-flex"
          >
            Catania · Product Eng
          </Badge>
        </a>

        <ul className="hidden items-center gap-6 xl:flex 2xl:gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-md font-mono text-sm tracking-wide whitespace-nowrap text-copy-secondary transition-colors hover:text-copy-primary"
              >
                <span className="text-accent">{link.index}</span> {link.label}
              </a>
            </li>
          ))}
        </ul>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          className="h-9 shrink-0 gap-2.5 rounded-full border-border bg-surface px-4 font-mono text-xs font-medium text-copy-primary hover:bg-surface-elevated hover:text-copy-primary"
        >
          <span className="relative flex size-2" aria-hidden="true">
            <span className="absolute inline-flex size-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          {isDark ? "Dark Mode" : "Light Mode"}
        </Button>
      </nav>
    </header>
  );
}

export default Navbar;
