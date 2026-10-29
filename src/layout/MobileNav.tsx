import { Menu } from "lucide-react";

import { Button } from "../components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../components/ui/sheet";
import ThemeToggle from "./ThemeToggle";
import { NAV_LINKS } from "../lib/navigation";
import type { Theme } from "../lib/theme";

interface MobileNavProps {
  theme: Theme;
  onToggleTheme: () => void;
}

function MobileNav({ theme, onToggleTheme }: MobileNavProps) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label="Open navigation menu"
          className="size-9 shrink-0 cursor-pointer rounded-full text-copy-primary xl:hidden"
        >
          <Menu className="size-5" aria-hidden="true" />
        </Button>
      </SheetTrigger>

      <SheetContent
        side="right"
        className="flex w-full flex-col gap-10 border-border text-copy-primary sm:max-w-sm"
      >
        <SheetHeader>
          <SheetTitle className="font-mono text-2xs font-medium tracking-label text-accent uppercase">
            Navigation
          </SheetTitle>
          <SheetDescription className="sr-only">Jump to a section of the page.</SheetDescription>
        </SheetHeader>

        <nav aria-label="Mobile">
          <ul className="flex flex-col">
            {NAV_LINKS.map((link) => (
              <li key={link.href} className="border-b border-border">
                <SheetClose asChild>
                  <a
                    href={link.href}
                    className="flex items-baseline gap-4 py-4 font-serif text-3xl text-copy-primary transition-colors hover:text-accent"
                  >
                    <span className="font-mono text-xs text-accent">{link.index}</span>
                    {link.label}
                  </a>
                </SheetClose>
              </li>
            ))}
          </ul>
        </nav>

        <ThemeToggle theme={theme} onToggle={onToggleTheme} className="self-start sm:hidden" />
      </SheetContent>
    </Sheet>
  );
}

export default MobileNav;
