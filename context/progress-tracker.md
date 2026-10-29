# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Phase 1 — Foundation

## Current Goal

- Define and implement the next feature unit.

## Completed

- Design system and UI primitive components
- 02 Hero Section spec (`context/feature-specs/02-hero-section.md`)
  - `src/layout/Navbar.tsx` — fixed-height sticky "dark glass" navbar (translucent `bg-surface-glass`, no blur): name, "Catania · Product Eng" accent badge, numbered section links (01–06, from `src/lib/navigation.ts`), theme toggle.
  - `src/layout/ThemeToggle.tsx` — pill toggle labelled with the active mode, static glowing accent dot, pointer cursor. Theme state is owned once by `Navbar` and passed down, so every toggle instance stays in sync.
  - `src/layout/MobileNav.tsx` — burger button below `xl` opening a right-side drawer with the numbered links (closes on link click / Escape / overlay); hosts the theme toggle below `sm`.
  - `src/components/ui/sheet.tsx` — shadcn-style Sheet primitive on `@radix-ui/react-dialog`; overlay and surface use semantic tokens (`bg-overlay`, `bg-surface-elevated`) instead of shadcn's default `bg-black/50`.
  - `src/sections/Hero.tsx` — availability label with pulsing green dot, "Product Engineer" subtitle, "Alessandro Battiato" display title, separator, positioning paragraph with accent highlight, stack badges, location helper text.
  - `src/hooks/useTheme.ts` — `useTheme` hook: initial theme from stored preference, falling back to `prefers-color-scheme`; persists the user's choice in `localStorage` (`theme` key). An inline script in `index.html` applies the theme before first paint to prevent a flash.
- Foundation fixes required to build the hero:
  - Migrated to Tailwind CSS v4 (the installed version): `@tailwindcss/vite` plugin, CSS-first config in `src/index.css`; removed the v3 `tailwind.config.js` / CommonJS `postcss.config.js` and the unused `autoprefixer` / `postcss` dependencies.
  - Rewrote `src/index.css` with the semantic tokens from `ui-context.md` (light in `:root`, dark in `.dark`) and mapped shadcn primitive aliases onto them.
  - Added `src/lib/utils.ts` (`cn`) and fixed the broken `../../../lib/utils` import path in the `components/ui/*` primitives (path-only change, required for them to compile).
  - Enabled `strict` in `tsconfig.app.json` as required by `code-standards.md`.
  - Loaded Instrument Serif, DM Sans, and JetBrains Mono via `index.html`.

- Hero/Navbar visual refinements against the reference screenshot:
  - Theme toggle uses `cursor-pointer`; its accent dot now has a static glow (box-shadow), not a pulse. The green availability dot is the only pulsing element.
  - Availability label is larger (`text-sm sm:text-base`, `tracking-wider`) with a wider gap after the dot.
  - Availability dot and "Product Engineer" are nudged right (`pl-1`) to line up with where the "Alessandro Battiato" glyphs actually start (the large serif "A" extends slightly left of its box).
- Conventions and token pass:
  - Dark palette re-matched to the reference screenshot (cool slate tint: background `#0a0d12`, muted `#8b98a9`, faint `#526074`, accent `#60a5fa`, available `#10b981`); light theme tinted to match. `ui-context.md` brand values updated.
  - New tokens replace magic values: `--surface-glass`, `--overlay`, `--accent-border`, `shadow-glow-accent`, `max-w-page`, `h-nav`, `min-h-below-nav`, `gutter-chrome` / `gutter-content`, `text-display`, `text-lead`, `text-2xs`, `tracking-label`. Documented in `ui-context.md`.
  - Folder convention resolved: `src/sections/` (page parts) and `src/layout/` (page frame) are siblings of `src/components/` (building blocks); dependencies flow one way into `components/` (architecture invariant 7). `architecture-context.md`, `code-standards.md`, `ui-context.md`, and the hero spec updated.
  - Lines unified: every standalone line uses `--border`, raised in dark mode (`#26292d` to `#2c3340`) so separators and the navbar edge stay visible; `--border-subtle` (`#1c2129`) is now reserved for outlines of filled controls.
  - `Button` primitive patched (authorised): `outline` / `ghost` hover to `bg-surface-elevated`; the per-component hover overrides were removed.
  - Added `--destructive` (light `#dc2626`, dark `#f87171`) for error states only, completing the shadcn `destructive` variants.
  - Availability helper text stays `text-copy-muted` (deliberately brighter than the reference's faint tone, for readability).
- Hooks folder: `useTheme` moved from `src/lib/theme.ts` to `src/hooks/useTheme.ts`; `lib/` is now plain TypeScript only (architecture, code standards, and `index.html` comment updated).
- Hero radial glow: measured from the reference screenshot and reproduced with the `hero-glow` utility + `--hero-glow` token. At the reference's 1753×1402 size the rendered blue channel is within 1–2 units of the screenshot along both axes. Light mode uses 20% opacity (7% was invisible on the light background; 20% was chosen by comparing 14/20/26% renders). The Hero now has a full-width `relative isolate overflow-hidden` wrapper with the content container inside it.
  - `html` has `scroll-padding-top: var(--spacing-nav)` so anchor targets are not hidden under the sticky navbar.
  - Added `tw-animate-css`: provides the drawer's enter/exit animations and the `accordion-down/up` keyframes the existing Accordion primitive referenced but never had.
  - ESLint reviewed: ESLint 10 flat config with `defineConfig` (not the deprecated `tseslint.config()`), `reactHooks.configs.flat.recommended` and `reactRefresh.configs.vite` are the current documented presets, all plugin peer ranges are satisfied, no deprecated rules in use. `npm audit fix` bumped `zod` (dev-only, via `eslint-plugin-react-hooks`) to clear a high-severity advisory.

## Next Up

- Define and implement the next feature specification (e.g. the "How I Work" section).

## Open Questions

- Section anchors `#how-i-work`, `#case-study`, `#experience`, `#now`, `#talk` are linked from the navbar but the sections do not exist yet.
- The hero glow is currently static CSS. If the React Three Fiber visual lands in the same spot, decide whether it replaces the glow or sits on top of it.

## Architecture Decisions

- Tailwind CSS v4 with CSS-first configuration (`@theme` in `index.css`); no `tailwind.config.js`.
- Dark mode is class-based (`.dark` on `<html>`) via `@custom-variant dark`.
- Theme state lives in a client-side hook in `lib/`; no theme provider library.

## Session Notes

- `npx tsc -b`, `npm run lint`, and `npm run build` all pass; `npm audit` reports 0 vulnerabilities.
- Hero verified visually in both themes against the Stitch reference screenshot (not kept in the repo; its sampled values are recorded in `ui-context.md` and the hero spec); mobile drawer (open, focus trap, close on link) and the see-through navbar verified in headless Chrome.
