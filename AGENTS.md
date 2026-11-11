# AGENTS.md — RDisquete Portfolio

## Reglas SDD
- Lee `docs/constitution.md` y la spec activa (`specs/NNN-*/`) antes de tocar código.
- Ningún cambio de comportamiento sin spec aprobada en `specs/`.
- Implementa una tarea por vez, tests primero (rojo → verde) y para.
- El comando de tests es `npx vitest run` (una pasada); `npm test` abre el modo watch.

## Commands
- `npm run dev` — dev server at `localhost:5173`
- `npm test` — Vitest (jsdom)
- `npm run build` — runs `tsc -b && vite build` (both must pass)
- `npm run lint` — ESLint 10 with React, Hooks, jsx-a11y
- Coverage: `npx vitest run --coverage` (no npm script, but `@vitest/coverage-v8` is installed)

## Architecture
- **Router (React Router v7):** `/` (Home), `/about` (Conoceme), `/projects` (Proyectos), `/contact` (Contacto), `*` (NotFound). All lazy-loaded via `React.lazy` + `<Suspense>`.
- **Project data flow:** `projectsData.tsx` holds non-textual fields (url, img, techIcons, stats). Text fields are empty strings — `useTranslatedProjects` fills them from i18n at runtime via `projectKeyMap` (`data/projectKeys.ts`), which maps `title` → i18n key. Each project has a `solutionCount: number` — the `solution` array content is read from i18n using that count, not from the raw data's empty array length.
- **i18n:** i18next + react-i18next. ES/EN parity, identical key structure. `interpolation.escapeValue` is `false` (correct — React already escapes). `<Trans>` used for rich text with named tags (`<c1>`, `<c2>`). Language detected via `localStorage` then `navigator`.
- **@font-face:** declared in both `src/index.css` (Vite bundle) AND inline `<style>` in `index.html` (connects preloads immediately). Both must stay in sync if fonts change.
- **Ambient audio:** `useVinyl` hook (in `hooks/useVinyl.ts`) plays `/sounds/vnyl_intro.mp3` on first user click — starts nothing by default.
- **Color palette:** `#171717` (dark), `#cdc69c` (cream), `#8e2b27` (maroon). Tailwind classes: `bg-retro-dark`, `text-retro-cream`, `bg-retro-maroon`.
- **Custom fonts:** `font-display-impact` (Bebas Neue), `font-vintage-cursive` (Great Vibes), body is Montserrat.
- **Tailwind 4 (CSS-first):** theme tokens (`--color-retro-*`, `--font-*`, `--animate-spin-slow`) live in `src/index.css` under `@theme`. `postcss.config.js` uses `@tailwindcss/postcss`. `tailwind.config.js` is kept on disk but is no longer loaded: using `@config` in v4 disables source scanning here, so add new tokens to `@theme` instead.

## Testing quirks
- **setupTests.ts** mocks `react-i18next` (`t()` + `Trans`) using `es.json` as source. `Trans` strips HTML tags from translation values. Tests always run in Spanish locale. It imports `@testing-library/jest-dom/vitest` (v7 entry point for matcher types).
- **Framer Motion mock** strips `whileInView`, `whileHover`, `initial`, `animate`, `viewport`, `variants`, `transition`, `exit`, `layout` from motion elements.
- **Browser API mocks:** `IntersectionObserver`, `matchMedia`, `scrollTo`, `HTMLMediaElement` auto-mocked.

## Deployment
- **Netlify:** `public/_redirects` has `/* /index.html 200` for SPA routing. No edge functions.
- **Env vars (`.env.local`):** `VITE_FORMSPREE_KEY`, `VITE_GOOGLE_ANALYTICS_ID`. The GA ID is injected via a custom `html-transform` Vite plugin that replaces `%VITE_GOOGLE_ANALYTICS_ID%` in `index.html`.
- **Build:** Vite 8 (Rolldown) splits `vendor` (React/React DOM/React Router) and `framer-motion` into separate chunks via a function-based `manualChunks` in `vite.config.ts` (object form is rejected).
- **Analytics:** Google Analytics loads with consent mode defaulting to `denied` for all storage types. A cookie consent banner UI is still needed for full GDPR/LOPDGDD compliance.

## Dependencies
- `.npmrc` sets `legacy-peer-deps=true`: `eslint-plugin-react@7` still declares ESLint ≤9 while the project uses ESLint 10. Keep it for reproducible installs.
- TypeScript is pinned to `6.0.3`: `typescript-eslint@8` does not support TS 7 (upstream issue #10940). Revisit when it lands; TS 7 is the native compiler and lacks the JS API the lint stack needs.
- `jsdom@31` declares Node `^22.22.2` (current local Node is 22.16.0). Tests pass, but upgrade Node to ≥22.22.2 for full support.
- All dependencies are in use. `@vitest/coverage-v8` is only needed for `npx vitest run --coverage`; it is intentionally kept.

## Known code quirks
- `tsconfig.app.json` has `noUnusedLocals: false` and `noUnusedParameters: false` — the compiler won't catch these; ESLint's `@typescript-eslint/no-unused-vars` (set to `warn`) is the actual safety net.
- `index.html` contains a large `<noscript>` block with full project content — keep synced with `projectsData.tsx` whenever a project is added/removed/renamed.

