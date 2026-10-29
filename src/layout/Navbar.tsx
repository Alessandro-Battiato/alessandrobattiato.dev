import { Badge } from "../components/ui/badge";
import MobileNav from "./MobileNav";
import ThemeToggle from "./ThemeToggle";
import { NAV_LINKS } from "../lib/navigation";
import { useTheme } from "../hooks/useTheme";

function Navbar() {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-40 h-nav border-b border-border bg-surface-glass">
      <nav
        aria-label="Primary"
        className="mx-auto flex h-full max-w-page items-center justify-between gap-6 gutter-chrome"
      >
        <a href="#intro" className="flex shrink-0 items-center gap-3 rounded-md whitespace-nowrap">
          <span className="font-serif text-2xl leading-none tracking-tight text-copy-primary">
            Alessandro Battiato
          </span>
          <Badge
            variant="outline"
            className="hidden rounded-full border-accent-border bg-accent-soft px-3 py-1 font-mono text-2xs font-medium tracking-label whitespace-nowrap text-accent uppercase sm:inline-flex"
          >
            Catania · Product Eng
          </Badge>
        </a>

        <ul className="hidden items-center gap-6 xl:flex 2xl:gap-10">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="rounded-md font-mono text-sm tracking-wide whitespace-nowrap text-copy-muted transition-colors hover:text-copy-primary"
              >
                <span className="text-accent">{link.index}</span> {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex shrink-0 items-center gap-2">
          <ThemeToggle theme={theme} onToggle={toggleTheme} className="hidden sm:inline-flex" />
          <MobileNav theme={theme} onToggleTheme={toggleTheme} />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
