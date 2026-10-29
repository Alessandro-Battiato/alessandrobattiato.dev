# Code Standards

## General

- Keep modules small and single-purpose.
- Fix root causes — do not layer workarounds.
- Do not mix unrelated concerns in one component or route.
- Respect the system boundaries defined in `architecture-context.md`.

## TypeScript

- Strict mode is required throughout the project.
- Avoid `any`; use explicit interfaces or narrowly scoped types.
- Validate unknown external input at system boundaries before trusting it.
- Use `interface` for object contracts.

## Styling

- Use CSS custom property tokens defined in `index.css` — no raw Tailwind color classes like `zinc-*` or hardcoded hex values.
- Lines: every standalone line (navbar edge, separators, list dividers, drawer edges) uses `border-border` / the default `Separator`. `border-border-subtle` is only for outlines of filled controls (badges, pills).
- Reference tokens through their Tailwind utility names: `bg-background`, `bg-surface`, `text-copy-primary`, `border-border`, `text-accent`, etc. (full list in `ui-context.md`).
- Tailwind v4 is configured CSS-first in `src/index.css` (`@theme`); there is no `tailwind.config.js`.
- No arbitrary values for repeated or meaningful sizes (`max-w-[…]`, `text-[…]`, `calc(…)` tied to other components): add a token or `@utility` in `index.css` instead. The non-color tokens are listed in `ui-context.md`.
- Shared constants (e.g. navigation links) live in `lib/`, not inside components.
- Maintain the border radius scale: `rounded-md` for compact tags and controls, `rounded-full` only for pill badges and toggles that the reference shows as pills, `rounded-2xl` for cards, `rounded-3xl` for modals.

## File Organization

- `src/` — application source and entry points.
- `components/` — building blocks: reusable, context-free UI; no business logic. Never imports from `sections/` or `layout/`.
- `components/ui/` — shadcn/ui primitives (protected foundation components).
- `components/3d/` — React Three Fiber scenes, objects, materials, and 3D-specific components.
- `sections/` — page parts: one file per portfolio section, such as Hero, About, Experience, Case Study, and Contact.
- `layout/` — page frame shared across sections: navbar, mobile navigation drawer, theme toggle. A piece used only by the layout stays here until something else needs it, then moves to `components/`.
- `lib/` — shared utilities, constants, and client-side helpers.
- `assets/` — imported static assets such as images, icons, and fonts.
- `public/` — static files that need to be served directly, such as 3D models and public images.
