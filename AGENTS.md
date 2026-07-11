# AGENTS.md — RDisquete Portfolio
 
## Commands
- `npm run dev` — dev server at `localhost:5173`
- `npm test` — Vitest (jsdom, setupTests.ts auto-mocks i18n + Framer Motion)
- `npm run build` — runs `tsc -b && vite build`
- `npm run lint` — ESLint 9 with React, Hooks, jsx-a11y plugins
- No `coverage` script is defined in `package.json`, even though `@vitest/coverage-v8` is installed as a dependency. Run `npx vitest run --coverage` directly, or add a `"coverage": "vitest run --coverage"` script if you want `npm run coverage` to work.
## Architecture
- **Router (React Router v7):** `/` (Home), `/about` (Conoceme), `/projects` (Proyectos), `/contact` (Contacto), `*` (NotFound). All pages lazy-loaded via `React.lazy` + `<Suspense>`.
- **Project data flow:** `projectsData.tsx` holds non-textual fields (url, img, techIcons, stats, etc.). Text fields (`desc`, `context`, `problem`, `solution`, `result`, `impact`) are empty strings — `useTranslatedProjects` fills them from i18n at runtime via `projectKeyMap` (`data/projectKeys.ts`), which maps each project `title` to its i18n key. Each project has a `solutionCount: number` that determines how many i18n keys to read for the `solution` array — the array content comes solely from i18n.
- **i18n:** i18next + react-i18next. ES/EN parity, identical key structure. `interpolation.escapeValue` is `false` in `src/i18n/index.ts` (correct — React already escapes JSX output, so this avoids double-escaping HTML entities). `<Trans>` component used for rich text with named tags (`<c1>`, `<c2>`).
- **Color palette:** `#171717` (dark), `#cdc69c` (cream), `#8e2b27` (maroon). Available as Tailwind classes: `bg-retro-dark`, `text-retro-cream`, `bg-retro-maroon`.
- **Custom fonts:** `font-display-impact` (Bebas Neue), `font-vintage-cursive` (Great Vibes), body is Montserrat.
## Testing quirks
- **setupTests.ts** mocks `react-i18next`'s `t()` and `Trans` using `es.json` as source. `Trans` strips HTML tags from translation values. Tests always run in Spanish locale.
- **Framer Motion mock** strips `whileInView`, `whileHover`, `initial`, `animate`, `viewport`, `variants`, `transition`, `exit`, `layout` props from motion elements.
- **Browser API mocks:** `IntersectionObserver`, `matchMedia`, `scrollTo`, `HTMLMediaElement` auto-mocked.
## Deployment
- **Netlify:** `public/_redirects` has `/* /index.html 200` for SPA routing. No custom edge functions active (the previous `prerender.ts` placeholder was removed — it only re-fetched index.html without actual prerendering).
- **Env vars (`.env.local`):** `VITE_FORMSPREE_KEY`, `VITE_GOOGLE_ANALYTICS_ID`.
- **Build:** Vite splits `vendor` (React/React DOM/React Router) and `framer-motion` into separate manual chunks (see `vite.config.ts`).
- **Analytics:** Google Analytics (`gtag.js`) loads with consent mode defaulting to `denied` for `ad_storage`, `ad_user_data`, `ad_personalization`, and `analytics_storage`. A cookie consent banner UI is still needed for full GDPR/LOPDGDD compliance.
## Known code quirks
- `tsconfig.app.json` has `noUnusedLocals: false` and `noUnusedParameters: false` — don't rely on the compiler to catch these; ESLint's `@typescript-eslint/no-unused-vars` (set to `warn`) is the actual safety net.
- `tailwind.config.js` has a custom `animate-spin-slow` (12s) used by the 404 page.
- `index.html` contains a large `<noscript>` block with full project content — keep synced with `projectsData.tsx` whenever a project is added/removed/renamed.
- `HeroSection.tsx` renders only one layout (HeroMobile or HeroDesktop) based on `window.matchMedia` — no duplicate DOM or double image fetch.
- `ProjectModal.tsx` traps Tab focus, closes on `Escape`, and locks body scroll while open (consistent with the mobile nav pattern in `Header.tsx`).
 