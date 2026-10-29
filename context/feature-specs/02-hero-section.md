### Navbar

Create `src/layout/Navbar.tsx`.

Requirements:

- fixed-height top navbar
- the contents of the navbar are as following:
  - "Alessandro Battiato" using the white token color, followed by a badge saying "Catania · Product Eng" all uppercase, using the accent token colors.
  - enumerated link sections that make the user navigate to the related section, the numbers use the token accent color:
    - 01 Intro
    - 02 How I Work
    - 03 Case Study
    - 04 Experience
    - 05 Now
    - 06 Talk
  - A button that switches the existing theme which says "Dark Mode" or "Light Mode" accordingly to the current activated mode, with a static glowing (not pulsing) accent token colored ball. The button uses a pointer cursor.
- the theme toggle lives in `src/layout/ThemeToggle.tsx`; theme state comes from `src/hooks/useTheme.ts`, is owned by the navbar, and is passed to every toggle instance.
- the navbar's bottom edge uses the line token (`border-border`), clearly visible in both themes.
- the navbar is a see-through "dark glass" bar: a translucent background (`bg-surface-glass`) with no backdrop blur, so content scrolling underneath stays visible but dimmed.
- below the `xl` breakpoint the section links collapse into a burger button that opens a right-side drawer (`src/layout/MobileNav.tsx`, built on the `Sheet` primitive in `src/components/ui/sheet.tsx`):
  - lists the same numbered links; selecting one closes the drawer and scrolls to the section.
  - closes on Escape, overlay click, or the close button; focus is trapped while open.
  - below the `sm` breakpoint the theme toggle moves from the navbar into the drawer.

### Hero Section

Create `src/sections/Hero.tsx`.

Requirements:

- a decorative radial glow sits behind the hero content (`hero-glow` utility, `--hero-glow` token), matched to the reference screenshot:
  - a single circle centred at ~66% of the viewport width and ~42% of the hero height, ~52vw in diameter.
  - peak colour `#2563eb` at 12.5% opacity on `#0a0d12`, fading with a bell-shaped (not linear) curve to transparent at the edge.
  - spans the full viewport width (not clipped to the content container), is `aria-hidden`, and never intercepts pointer events.
  - the Stitch export's gradient values (`ellipse 70% 50% at 80% 20%` + `circle at 20% 40%`) do not match the screenshot and are not used.
- left section contains the following:
  - pulse green ball beside an helper text saying: "Available for Product Collaborations" (the only pulsing element on the page)
  - subtitle saying: "Product Engineer"
  - title saying: "Alessandro Battiato"
- then we have a separator for the following items:
  - on the left, a paragraph saying: "I don't simply build features: I ideate the product and scientifically analyze if it really has - solved the users' issues through data" and highlight the "I ideate the product and scientifically analyze" words using the accent - token color in index.css
- on the right, we have a set of badges, describing the stack the developer uses: React, TypeScript, Next.js, Python, Product Analytics, Mixpanel, AI Workflows.
  - beneath the stack we have an helper text saying: "Based in Catania, Italy · Full-Stack Product Development "

### Check when done

- new components compile without TypeScript errors
- no lint errors
