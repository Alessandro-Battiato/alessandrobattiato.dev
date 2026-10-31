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
  - `src/layout/ThemeToggle.tsx` — pill toggle labelled with the active mode, static glowing accent dot, pointer cursor. Theme state is owned once (now by `App`, see spec 03) and passed down, so every toggle instance stays in sync.
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
- 03 Hero Globe spec (`context/feature-specs/03-hero-globe.md`)
  - Installed `@react-three/fiber` 9, `three` r187, `@types/three`.
  - `src/components/3d/Globe.tsx` — R3F port of the Stitch three.js r125 globe: wireframe icosahedron, two orbital rings, 1800-particle "breathing" core, ambient + two point lights. Placed on the centre of the hero glow (66% / 42%) from 1024px up; below that (narrow layout, revised twice after 375px reviews: first the core overlapped the availability label, then the rings were clipped) the hero reserves a globe area above the text (`min-h-hero-globe`, `clamp(18rem, 75vw, 26rem)`, top padding included), the canvas fills that band (`hero-visual`), and the whole sculpture is scaled to fit it, rings and perspective included (extent radius 4.7, 92% fit). The text moves down by that height on phones. The glow follows the globe below `lg`. Verified at 375×812, 768×1024, 1600×1000.
  - Theme switch: the scene takes `theme` as a prop and reads every value from a per-theme `PALETTES` constant, so wireframe, both rings (colour and opacity), all three lights, and particle opacity update. Particle colours are rebuilt from a stored per-particle brightness on every switch, not computed once.
  - Refresh-rate independence: all motion uses an elapsed-seconds accumulator (delta capped at 0.1 s); the mouse tilt uses `MathUtils.damp` with a rate that matches the original 0.04-per-frame lerp at 60 fps.
  - Seeded particles: `src/lib/random.ts` (mulberry32) replaces `Math.random`; fixed seed, so the layout is the same on every visit.
  - Mouse: window-level `pointermove` (the canvas has `pointer-events: none` and sits behind the content).
  - Progressive loading: `Globe` is `React.lazy`-loaded (three.js is its own ~244 kB gzip chunk, off the initial bundle), rendered only when `src/lib/webgl.ts` detects WebGL; otherwise only the CSS glow shows. `src/hooks/usePrefersReducedMotion.ts` freezes the time-driven animation (the mouse tilt still works).
  - Lights: r125 "legacy" lights scaled intensities by PI and had no inverse-square decay, so the port multiplies by PI and uses `decay={0}`.
  - Deviation from the Stitch code: dark ring opacity 0.8 (was 0.4) to match the dark reference screenshot; Stitch's 0.4 rendered much fainter than the reference.
  - Theme state lifted from `Navbar` to `App` (`Navbar` and `Hero` now take it as props) so the globe and the toggle share one source of truth.
  - Verified in headless Chrome (SwiftShader) via CDP: both themes compared with the reference screenshots, a live toggle dark → light → dark updates all colours, and a mouse move tilts the globe. No runtime errors; the only console warning is R3F's internal use of the deprecated `THREE.Clock`.
- Page title (browser tab) changed to "Alessandro Battiato | Product Engineer".
- 04 Method Section spec (`context/feature-specs/04-method-section.md`)
  - `src/sections/Method.tsx`, mounted after the Hero with `id="how-i-work"` (the navbar's "02 How I Work" anchor now resolves).
  - New tokens: `--surface-band` (light `#f1f5f9`, dark `#0c1015`) → `bg-surface-band` for the section background; `text-heading` (fluid serif section title size, reusable by later sections). Documented in `ui-context.md`.
  - Layout per the reference: accent mono uppercase eyebrow ("02 — Method & Philosophy" + "Integrated Execution") followed by a `Separator` line; 5/12 left column (serif title + muted subtitle), 7/12 right column with the accordion. Single column below `lg`.
  - Accordion: reuses the `Accordion` / `AccordionItem` / `AccordionContent` primitives unchanged; the trigger is built in the section from `@radix-ui/react-accordion` (the primitive's trigger hard-codes a chevron, while the reference uses a circled +/× button), so `components/ui/accordion.tsx` was not modified. Single, collapsible, first item open by default. Closed titles are muted and brighten on hover; the open item's button turns accent and its `+` rotates to `×` (rotation is motion-safe only).
  - Chips are accent-tinted `Badge`s (`bg-accent-soft`, `border-accent-border`, `text-accent`, `rounded-md`, mono).
  - Verified via CDP screenshots at 1750×1300 (dark and light, with a different item opened) and 390 px mobile; section background computes to the spec colours in both themes.

## Next Up

- Define and implement the next feature specification (e.g. the "Case Study" section).

## Open Questions

- The Method eyebrow uses an em dash ("02 — Method & …") to match the reference screenshot; the spec text writes a hyphen. Confirm.
- Section anchors `#case-study`, `#experience`, `#now`, `#talk` are linked from the navbar but the sections do not exist yet.
- Resolved: the globe sits on top of the static CSS hero glow (and the glow remains as the no-WebGL fallback).
- The globe's large rings cross behind the stack badges and helper text on desktop (as in the Stitch design). Text stays readable, but confirm this is wanted.
- Vite warns that the lazy `Globe` chunk is over 500 kB minified. It does not block first paint; consider manual chunking only if it becomes a problem.

## Architecture Decisions

- Tailwind CSS v4 with CSS-first configuration (`@theme` in `index.css`); no `tailwind.config.js`.
- Dark mode is class-based (`.dark` on `<html>`) via `@custom-variant dark`.
- Theme state lives in the `useTheme` hook (`hooks/`), called once in `App` and passed down as props; no theme provider library.
- 3D scenes are lazy-loaded building blocks in `components/3d/`; they take the theme as a prop and keep their own colour palette (WebGL can't read CSS variables).

## Session Notes

- `npx tsc -b`, `npm run lint`, and `npm run build` all pass; `npm audit` reports 0 vulnerabilities.
- Hero verified visually in both themes against the Stitch reference screenshot (not kept in the repo; its sampled values are recorded in `ui-context.md` and the hero spec); mobile drawer (open, focus trap, close on link) and the see-through navbar verified in headless Chrome.
