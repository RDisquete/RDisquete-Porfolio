# AGENTS.md — RDisquete Portfolio

## Commands
- `npm run dev` — dev server at `localhost:5173`
- `npm test` — Vitest (jsdom, setupTests.ts auto-mocks i18n + Framer Motion)
- `npm run build` — runs `tsc -b && vite build`
- `npm run lint` — ESLint 9 with React, Hooks, jsx-a11y plugins

## Architecture
- **Router (React Router v7):** `/` (Home), `/about` (Conoceme), `/projects` (Proyectos), `/contact` (Contacto), `*` (NotFound). All pages lazy-loaded via `React.lazy` + `<Suspense>`.
- **Project data flow:** `projectsData.tsx` holds non-textual fields (url, img, techIcons, stats, etc.). Text fields (`desc`, `context`, `problem`, `solution`, `result`, `impact`) are empty strings — `useTranslatedProjects` fills them from i18n at runtime. Each project has a `solutionCount: number` that determines how many i18n keys to read for the `solution` array — the array content comes solely from i18n.
- **i18n:** i18next + react-i18next. ES/EN complete parity (both ~517 lines, identical key structure). `<Trans>` component used for rich text with named tags (`<c1>`, `<c2>`).
- **Color palette:** `#171717` (dark), `#cdc69c` (cream), `#8e2b27` (maroon). Available as Tailwind classes: `bg-retro-dark`, `text-retro-cream`, `bg-retro-maroon`.
- **Custom fonts:** `font-display-impact` (Bebas Neue), `font-vintage-cursive` (Great Vibes), body is Montserrat.

## Testing quirks
- **setupTests.ts** mocks `react-i18next`'s `t()` and `Trans` using `es.json` as source. `Trans` strips HTML tags from translation values. Tests always run in Spanish locale.
- **Framer Motion mock** strips `whileInView`, `whileHover`, `initial`, `animate`, `viewport`, `variants`, `transition`, `exit`, `layout` props from motion elements.
- **Browser API mocks:** `IntersectionObserver`, `matchMedia`, `scrollTo`, `HTMLMediaElement` auto-mocked.

## Deployment
- **Netlify:** `public/_redirects` has `/* /index.html 200` for SPA routing.
- **Env vars (`.env.local`):** `VITE_FORMSPREE_KEY`, `VITE_GOOGLE_ANALYTICS_ID`.
- **Build:** Vite splits vendor (React/Router) and framer-motion into separate chunks.

## Known code quirks
- `projectKeys.ts` line 4: `'Wedding Album System — R&M': 'weddingAlbum'` is **dead code** (no project with that title exists).
- `i18n/index.ts` line 13: `escapeValue: true` should be `false` (React escapes by default; double-escaping can break HTML entities).
- `tsconfig.app.json` has `noUnusedLocals: false` and `noUnusedParameters: false` — don't rely on the compiler to catch these.
- `tailwind.config.js` has a custom `animate-spin-slow` (12s) used by the 404 page.
- `index.html` contains a large `<noscript>` block with full project content — keep synced with `projectsData.tsx`.
