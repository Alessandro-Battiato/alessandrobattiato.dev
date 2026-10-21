# Progress Tracker

Update this file whenever the current phase, active feature, or implementation state changes.

## Current Phase

- Phase 1 — Foundation

## Current Goal

- Define and implement the next feature unit.

## Completed

- Design system and UI primitive components
- 02 Hero Section spec (`context/feature-specs/02-hero-section.md`)
  - `src/components/Navbar/Navbar.tsx` — fixed-height sticky navbar: name, "Catania · Product Eng" accent badge, numbered section links (01–06), theme toggle with pulsing accent dot labelled with the active mode.
  - `src/components/Hero/Hero.tsx` — availability label with pulsing green dot, "Product Engineer" subtitle, "Alessandro Battiato" display title, separator, positioning paragraph with accent highlight, stack badges, location helper text.
  - `src/lib/theme.ts` — `useTheme` hook: initial theme from stored preference, falling back to `prefers-color-scheme`; persists the user's choice in `localStorage` (`theme` key). An inline script in `index.html` applies the theme before first paint to prevent a flash.
- Foundation fixes required to build the hero:
  - Migrated to Tailwind CSS v4 (the installed version): `@tailwindcss/vite` plugin, CSS-first config in `src/index.css`; removed the v3 `tailwind.config.js` / CommonJS `postcss.config.js` and the unused `autoprefixer` / `postcss` dependencies.
  - Rewrote `src/index.css` with the semantic tokens from `ui-context.md` (light in `:root`, dark in `.dark`) and mapped shadcn primitive aliases onto them.
  - Added `src/lib/utils.ts` (`cn`) and fixed the broken `../../../lib/utils` import path in the `components/ui/*` primitives (path-only change, required for them to compile).
  - Enabled `strict` in `tsconfig.app.json` as required by `code-standards.md`.
  - Loaded Instrument Serif, DM Sans, and JetBrains Mono via `index.html`.

## Next Up

- Define and implement the next feature specification (e.g. the "How I Work" section).

## Open Questions

- Mobile navigation: the section links are hidden below the `xl` breakpoint; no mobile menu is specified yet.
- Section anchors `#how-i-work`, `#case-study`, `#experience`, `#now`, `#talk` are linked from the navbar but the sections do not exist yet.
- Component location: the hero spec places components in `components/Navbar/` and `components/Hero/`, while `ui-context.md` / `code-standards.md` say sections belong in `components/sections/`. Decide which convention wins for future sections.
- The reference screenshot shows a soft blue radial glow on the right of the hero; it is not in the spec and was left out (likely the future React Three Fiber visual slot).

## Architecture Decisions

- Tailwind CSS v4 with CSS-first configuration (`@theme` in `index.css`); no `tailwind.config.js`.
- Dark mode is class-based (`.dark` on `<html>`) via `@custom-variant dark`.
- Theme state lives in a client-side hook in `lib/`; no theme provider library.

## Session Notes

- `npx tsc -b`, `npm run lint`, and `npm run build` all pass.
- Hero verified visually in both themes at 1750×1400 against `src/assets/Screenshot 2026-10-14 161052.png`.
