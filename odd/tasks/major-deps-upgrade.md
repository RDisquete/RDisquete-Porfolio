# Upgrade de dependencias mayores

Objetivo: actualizar los majors pendientes sin eliminar ninguna dependencia.

Grupos (verificar `npx vitest run`, `npm run build` y `npm run lint` tras cada uno):

1. Testing/build: `vitest`, `@vitest/coverage-v8`, `jsdom`, `@testing-library/jest-dom`, `@vitejs/plugin-react`, `vite`.
2. Lint: `eslint`, `@eslint/js`, `globals`, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh`, `typescript-eslint`.
3. TypeScript: `typescript`.
4. Runtime: `framer-motion`, `i18next`, `react-i18next`.
5. Tailwind: `tailwindcss`, `@tailwindcss/postcss` (migración a v4).

Correcciones aplicadas durante la migración:
- Vite 8: `manualChunks` pasa de objeto a función (Rolldown lo exige).
- ESLint 10: la regla nueva `react-hooks/set-state-in-effect` se deja en `warn`; se añade `@testing-library/dom` como devDependency (peer de jest-dom v7).
- TypeScript: fijado en 6.0.3 porque `typescript-eslint@8` rechaza TS 7 (issue #10940). `setupTests.ts` importa `@testing-library/jest-dom/vitest`.
- Tailwind 4: `@tailwindcss/postcss`, `@import "tailwindcss"` y tema CSS-first con `@theme` en `src/index.css`. `@config` desactiva el escaneo de fuentes, así que `tailwind.config.js` queda en disco pero sin cargar.
- `.npmrc` con `legacy-peer-deps=true` para instalaciones reproducibles.
- Runtime: `framer-motion@14`, `i18next@27`, `react-i18next@18` sin cambios de código.
- `jsdom@31` requiere Node `^22.22.2`; el Node local es 22.16.0 (tests pasan, pero conviene actualizar).

Estado final de puertas: 35/35 tests, `npm run build` OK, `npm run lint` OK (2 warnings).
