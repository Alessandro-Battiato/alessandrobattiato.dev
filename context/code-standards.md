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
- Reference tokens through their Tailwind utility names: `bg-background`, `bg-surface`, `text-copy-primary`, `border-border`, `text-accent`, etc. (full list in `ui-context.md`).
- Tailwind v4 is configured CSS-first in `src/index.css` (`@theme`); there is no `tailwind.config.js`.
- Maintain the border radius scale: `rounded-xl` for small elements, `rounded-2xl` for cards, `rounded-3xl` for modals.

## File Organization

- `src/` — application source and entry points.
- `components/` — reusable UI composition; no business logic.
- `components/3d/` — React Three Fiber scenes, objects, materials, and 3D-specific components.
- `components/sections/` — portfolio sections such as Hero, About, Experience, Case Study, and Contact.
- `lib/` — shared utilities, constants, and client-side helpers.
- `assets/` — imported static assets such as images, icons, and fonts.
- `public/` — static files that need to be served directly, such as 3D models and public images.
