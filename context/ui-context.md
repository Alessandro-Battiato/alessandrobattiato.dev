# UI Context

## Design Direction

An editorial, product-oriented portfolio with a restrained technical aesthetic.

The visual language combines expressive serif typography, compact monospace metadata, generous whitespace, fine borders, subtle grid details, and blue accents. The interface should feel precise and considered rather than like a conventional developer dashboard.

The portfolio supports both light and dark themes. Both themes share the same typography, layout, spacing, component hierarchy, and accent colors. Only semantic color tokens change between themes.

## Theme

- Light and dark themes are both supported.
- Use semantic CSS custom properties for all interface colors.
- Define theme values in `index.css`, with light values in `:root` and dark overrides in `.dark`.
- Components must consume semantic tokens rather than hardcoded hex values or arbitrary Tailwind palette classes.
- Theme changes must not alter layout, typography, spacing, or component structure.
- Use the browser's color-scheme preference as the initial default when no explicit user preference exists.
- If a theme toggle is implemented, persist the user's selection and avoid a visible flash of the wrong theme.
- Apply the active theme consistently to page backgrounds, surfaces, borders, text, controls, and overlays.

## Color Palette

### Brand Colors

| Role               | Value     | Usage                                                  |
| ------------------ | --------- | ------------------------------------------------------ |
| Primary brand      | `#0A0D12` | Core brand reference and dark neutral (cool slate tint) |
| Interactive accent | `#2563EB` | Light-theme accent: links, active states, markers       |
| Accent (dark)      | `#60A5FA` | Dark-theme accent, lifted for contrast on `#0A0D12`     |
| Neutral            | `#8B98A9` | Neutral palette reference (slate-tinted grey)           |

The palette is cool and slate-tinted, matched to the reference screenshot in `src/assets/`. Neutrals lean slightly blue rather than pure grey.

The interface is predominantly neutral. Blue is the primary accent and should be used selectively.

Do not introduce additional accent colors without a clear design requirement.

### Semantic Theme Tokens

The following roles must be available in both themes:

- `--background` — page background.
- `--surface` — cards and primary content surfaces.
- `--surface-elevated` — elevated cards, popovers, and overlays.
- `--surface-subtle` — secondary section backgrounds and quiet UI areas.
- `--surface-glass` — translucent "dark glass" chrome (navbar); derived from `--background`, no blur.
- `--overlay` — scrim behind modal surfaces such as the mobile drawer.
- `--border` — every standalone line: navbar edge, section separators, list dividers, drawer edges. Must stay clearly visible in both themes.
- `--border-subtle` — outlines of filled controls only (badges, pills), where the fill already separates the element. Never a standalone line.
- `--text-primary` — headings and primary content.
- `--text-secondary` — supporting body copy.
- `--text-muted` — metadata and secondary labels.
- `--text-faint` — decorative or very low-emphasis content only.
- `--accent` — primary blue interactive accent.
- `--accent-hover` — hover state for interactive accents.
- `--accent-soft` — subtle accent backgrounds.
- `--accent-border` — borders of accent-tinted badges.
- `--accent-secondary` — orange secondary accent.
- `--focus-ring` — visible keyboard focus indicator.
- `--status-available` — green availability indicator (hero "Available" dot only).
- `--destructive` — error and destructive states only (e.g. form validation). Not a design accent; never decorative.

Tailwind utility names: `bg-background`, `bg-surface`, `bg-surface-elevated`, `bg-surface-subtle`, `border-border`, `border-border-subtle`, `text-copy-primary|secondary|muted|faint` (for the `--text-*` tokens), `text-accent`, `bg-accent-soft`, `bg-status-available`, etc. Fonts: `font-serif` (Instrument Serif), `font-sans` (DM Sans), `font-mono` (JetBrains Mono).

### Non-Color Tokens

Repeated or meaningful sizes are tokens in `index.css`, not arbitrary values:

- `max-w-page` — page container width (`--container-page`).
- `h-nav` — navbar height (`--spacing-nav`); `min-h-below-nav` fills the viewport under the navbar.
- `gutter-chrome` / `gutter-content` — horizontal page gutters for navbar chrome and section content.
- `text-display` — fluid hero display size with its line height and tracking.
- `text-lead` — large lead paragraph size.
- `text-2xs` + `tracking-label` — compact uppercase mono labels and badges.
- `shadow-glow-accent` — soft static accent glow for indicator dots.

Avoid one-off arbitrary values (`text-[…]`, `max-w-[…]`, hex colors) in components. If a value repeats or carries meaning, add a token.

Do not use low-contrast text for essential information. Faint colors are reserved for decoration, never for important content or interactive controls.

## Typography

### Display and Headings

- Use an editorial serif typeface, preferably Instrument Serif.
- Use large, expressive headings in the hero and major section introductions.
- Preserve the contrast between oversized display typography and compact supporting text.
- Avoid heavy, dashboard-like heading styles.

### Body and UI

- Use DM Sans for paragraphs, navigation, cards, buttons, and general interface text.
- Keep paragraphs concise and readable.
- Maintain comfortable line heights and a clear hierarchy between primary and supporting content.

### Labels and Metadata

- Use JetBrains Mono for section indices, eyebrow labels, dates, technical metadata, and compact annotations.
- Keep labels small, precise, and visually subordinate to headings.
- Use uppercase sparingly where it matches the reference design.

Load fonts through `index.html` or a dedicated font stylesheet. Define reusable font-family variables in `index.css`.

## Layout and Spacing

- Use a centered, responsive content container with consistent horizontal gutters.
- Preserve generous whitespace around major headings and section transitions.
- Use a clear editorial grid rather than a generic dashboard grid.
- Keep section introductions and primary content visually distinct while maintaining alignment across the page.
- Use thin borders and subtle background shifts to separate sections.
- Avoid excessive cards, shadows, gradients, and decorative containers.
- Ensure the long-form case study remains readable and navigable on narrow screens.

## Border Radius and Surfaces

- Prefer restrained corner radii.
- Use smaller radii for controls and compact UI elements.
- Use moderate radii for cards where present in the reference design.
- Avoid excessively rounded panels and pill-shaped containers unless explicitly required by the design. The reference uses pills (`rounded-full`) only for the navbar badge and theme toggle; stack/tag badges use `rounded-md`.
- Keep shadows subtle and limited to elements that need clear elevation.

## 3D Animations

- Use React Three Fiber for the selected interactive 3D experience.
- Use Drei for reusable Three.js helpers where appropriate.
- Motion should feel deliberate, restrained, and consistent with the editorial aesthetic.
- Respect `prefers-reduced-motion`.
- Provide a graceful fallback when WebGL is unavailable or disabled.
- Keep essential content, navigation, and contact links independent of 3D rendering.
- Lazy-load expensive 3D assets where appropriate and avoid blocking initial content rendering.

## Component Library

- Use Tailwind CSS for styling.
- Use shadcn/ui selectively for accessible primitives when they fit the design.
- Keep the visual language custom to the portfolio rather than applying a default shadcn dashboard appearance.
- Place reusable UI primitives in `components/ui/` and 3D-specific building blocks in `components/3d/`.
- Keep portfolio sections in `sections/` and the page frame (navbar, mobile drawer, theme toggle) in `layout/`, both siblings of `components/`.
- The `Button` primitive's `outline` / `ghost` hovers use `bg-surface-elevated` (patched from shadcn's `bg-accent`, which would be our blue).
- Use semantic theme tokens for all shared UI colors.

## Accessibility and Responsiveness

- Use semantic HTML and meaningful heading order.
- Maintain sufficient contrast in both themes.
- Provide visible keyboard focus states.
- Ensure interactive elements have accessible names and appropriate keyboard behavior.
- Support reduced-motion preferences.
- Keep navigation, content, and contact links usable without WebGL.
- Adapt grids, typography, and spacing to mobile layouts without simply shrinking the desktop design.

## Icons

- Use Lucide React for interface icons where needed.
- Prefer consistent stroke-based icons.
- Keep icons visually secondary to typography and content.
- Avoid adding icons purely for decoration when they do not improve clarity.
