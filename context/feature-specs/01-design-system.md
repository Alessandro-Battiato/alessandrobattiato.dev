Read `AGENTS.md` before starting.

We're adding the design system and UI primitive components.

Install and configure `shadcn/ui` and `Tailwind CSS`.

Add these shadcn components:

- Button
- Card
- Accordion
- Separator
- Badge

Do not modify the generated `components/ui/*` files after installation.

Also Install `lucide-react`.

Create `lib/utils.ts` with a reusable `cn()` helper for merging Tailwind classes.

Ensure all components match the existing dark and light themes in `index.css`.

### Check when done

- All components import without errors
- `cn()` works properly
- Components support both dark and light themes
