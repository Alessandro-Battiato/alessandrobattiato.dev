# Architecture Context

## Stack

| Layer     | Technology           | Role                                            |
| --------- | -------------------- | ----------------------------------------------- |
| Build     | Vite                 | Fast development server and production bundling |
| Framework | React + TypeScript   | Client-side UI and component architecture       |
| UI        | Tailwind + shadcn/ui | Component composition and styling               |
| 3D        | React Three Fiber    | Interactive 3D scene and WebGL elements         |

## System Boundaries

- `src/` — Application source: React components, pages, 3D scenes, animations, and shared UI logic.
- `components/` — Building blocks: context-free, reusable pieces that do not know which page part uses them.
  - `components/ui/` — shadcn/ui primitives (protected foundation components).
  - `components/3d/` — React Three Fiber scenes, 3D objects, materials, lighting, and camera logic.
- `sections/` — Page parts: one component per portfolio section (Hero, How I Work, Case Study, ...), composed from building blocks.
- `layout/` — Page frame shared across sections: navbar, mobile drawer, theme toggle.
- `hooks/` — Custom React hooks (stateful, React-dependent logic such as `useTheme`). Theme state is owned once by `App` and passed down as props to `Navbar` and `Hero`.
- `lib/` — Shared client-side utilities, constants, and helper functions. Plain TypeScript, no React hooks.
- `public/` — Static assets such as images, fonts, and icons.

## 3D Model

- React Three Fiber provides the React renderer for Three.js.
- 3D scenes are rendered entirely in the browser through WebGL.
- 3D elements are used selectively as visual and interactive enhancements rather than as the primary application surface.

## UI and Interaction Model

- Tailwind CSS handles utility-based styling and responsive layouts.
- shadcn/ui provides reusable UI primitives where appropriate.
- React manages component state and browser-side interactions.
- No authentication or protected routes are required.

## Build and Deployment

- Vite provides the development server and production build pipeline.
- Production output is a static bundle.
- The application is deployed through Netlify.
- No server-side runtime is required.

## Invariants

1. The application remains fully client-side.
2. No backend or database is introduced unless a future feature explicitly requires one.
3. 3D rendering must remain progressive and non-blocking to preserve usability and performance.
4. UI components remain independent from the 3D rendering layer where possible.
5. Static assets are kept separate from application logic.
6. Interactive 3D elements enhance the portfolio experience without becoming necessary for navigation or content consumption.
7. Dependencies flow one way: `sections/` and `layout/` import from `components/`, `hooks/`, and `lib/`; `components/` never imports from `sections/` or `layout/`; `lib/` imports from nothing app-level.
