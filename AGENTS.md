# AGENTS.md — RDisquete Portfolio

## Commands
- `npm run dev` — dev server at `localhost:5173`
- `npm test` — Vitest (jsdom)
- `npm run build` — runs `tsc -b && vite build` (both must pass)
- `npm run lint` — ESLint 9 with React, Hooks, jsx-a11y
- Coverage: `npx vitest run --coverage` (no npm script, but `@vitest/coverage-v8` is installed)

## Architecture
- **Router (React Router v7):** `/` (Home), `/about` (Conoceme), `/projects` (Proyectos), `/contact` (Contacto), `*` (NotFound). All lazy-loaded via `React.lazy` + `<Suspense>`.
- **Project data flow:** `projectsData.tsx` holds non-textual fields (url, img, techIcons, stats). Text fields are empty strings — `useTranslatedProjects` fills them from i18n at runtime via `projectKeyMap` (`data/projectKeys.ts`), which maps `title` → i18n key. Each project has a `solutionCount: number` — the `solution` array content is read from i18n using that count, not from the raw data's empty array length.
- **i18n:** i18next + react-i18next. ES/EN parity, identical key structure. `interpolation.escapeValue` is `false` (correct — React already escapes). `<Trans>` used for rich text with named tags (`<c1>`, `<c2>`). Language detected via `localStorage` then `navigator`.
- **@font-face:** declared in both `src/index.css` (Vite bundle) AND inline `<style>` in `index.html` (connects preloads immediately). Both must stay in sync if fonts change.
- **Ambient audio:** `useVinyl` hook (in `hooks/useVinyl.ts`) plays `/sounds/vnyl_intro.mp3` on first user click — starts nothing by default.
- **Color palette:** `#171717` (dark), `#cdc69c` (cream), `#8e2b27` (maroon). Tailwind classes: `bg-retro-dark`, `text-retro-cream`, `bg-retro-maroon`.
- **Custom fonts:** `font-display-impact` (Bebas Neue), `font-vintage-cursive` (Great Vibes), body is Montserrat.

## Testing quirks
- **setupTests.ts** mocks `react-i18next` (`t()` + `Trans`) using `es.json` as source. `Trans` strips HTML tags from translation values. Tests always run in Spanish locale.
- **Framer Motion mock** strips `whileInView`, `whileHover`, `initial`, `animate`, `viewport`, `variants`, `transition`, `exit`, `layout` from motion elements.
- **Browser API mocks:** `IntersectionObserver`, `matchMedia`, `scrollTo`, `HTMLMediaElement` auto-mocked.

## Deployment
- **Netlify:** `public/_redirects` has `/* /index.html 200` for SPA routing. No edge functions.
- **Env vars (`.env.local`):** `VITE_FORMSPREE_KEY`, `VITE_GOOGLE_ANALYTICS_ID`. The GA ID is injected via a custom `html-transform` Vite plugin that replaces `%VITE_GOOGLE_ANALYTICS_ID%` in `index.html`.
- **Build:** Vite splits `vendor` (React/React DOM/React Router) and `framer-motion` into separate manual chunks (see `vite.config.ts`).
- **Analytics:** Google Analytics loads with consent mode defaulting to `denied` for all storage types. A cookie consent banner UI is still needed for full GDPR/LOPDGDD compliance.

## Known code quirks
- `tsconfig.app.json` has `noUnusedLocals: false` and `noUnusedParameters: false` — the compiler won't catch these; ESLint's `@typescript-eslint/no-unused-vars` (set to `warn`) is the actual safety net.
- `index.html` contains a large `<noscript>` block with full project content — keep synced with `projectsData.tsx` whenever a project is added/removed/renamed.

