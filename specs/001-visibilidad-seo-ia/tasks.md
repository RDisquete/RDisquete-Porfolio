# Tareas 001 — Visibilidad en buscadores y sistemas de IA

Spec: `specs/001-visibilidad-seo-ia/spec.md` · Plan: `specs/001-visibilidad-seo-ia/plan.md`

Una tarea cada vez: tests primero (en rojo), después el código, `npx vitest run` en verde,
marcar la tarea y parar. Máximo ~30 min por tarea.

- [x] **T1. Añadir la sección `seo` a `es.json` y `en.json`.** RF-1, RF-5, RNF-5
- Hecho cuando: ambos idiomas tienen `seo.siteName`, `seo.<página>.description`
  (home, proyectos, conoceme, contacto, notFound) y `seo.breadcrumb.*` con estructura
  idéntica, y el proyecto compila.

- [x] **T2. Crear `src/seo/routeSeo.ts` con funciones puras y sus tests.** RF-1, RF-4, RF-9
- Hecho cuando: `src/seo/routeSeo.test.ts` cubre `getPageKey` (rutas conocidas y
  desconocidas), `canonicalUrl`, `buildPageMeta` (robots `noindex` en `notFound`, `locale`,
  migas) y `buildPageJsonLd` (WebPage + BreadcrumbList), y `npx vitest run` sigue verde.

- [x] **T3. Crear `src/seo/domMeta.ts` con los helpers DOM y sus tests.** RF-1, RF-2, RF-4, RF-10
- Hecho cuando: `src/seo/domMeta.test.ts` comprueba que se crean y actualizan sin duplicar
  `meta[name=description]`, `meta[name=robots]`, `link[rel=canonical]` y
  `script#seo-page-jsonld`, que `notFound` aplica `noindex` y que una ruta normal lo
  revierte, con tests verdes.

- [x] **T4. Crear `src/hooks/usePageMeta.ts`, montarlo en `App.tsx` y retirar `useCanonical`.** RF-1, RF-2, RF-4, RF-9
- Hecho cuando: `src/hooks/usePageMeta.test.tsx` (con `MemoryRouter`) verifica que cambiar
  de ruta actualiza canónico, descripción y JSON-LD, y que una ruta desconocida aplica
  `noindex`; `src/hooks/useCanonical.ts` ya no existe, `App.tsx` monta el nuevo hook y no
  quedan referencias al anterior; la suite completa sigue en verde.

- [x] **T5. Actualizar `index.html`: meta robots, `og:locale`, `og:site_name`, dimensiones de imagen y JSON-LD `Person`+`WebSite`; quitar el canónico estático.** RF-2, RF-4
- Hecho cuando: el HTML contiene `meta[name=robots]` con
  `index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1`,
  `og:locale`, `og:site_name`, `og:image:width/height/type`, un JSON-LD con `Person` y
  `WebSite` enlazados por `@id`, y ya no hay `<link rel="canonical">` estático.

- [x] **T6. Generar `public/og-image.png` (1200x630) desde `og-image.svg` y actualizar referencias.** RF-5, RF-10
- Hecho cuando: `public/og-image.png` existe con dimensiones 1200x630 (verificado con
  `sips`), y `og:image` y `twitter:image` en `index.html` apuntan a
  `https://rdisquete.es/og-image.png`.

- [x] **T7. Mover `site.webmanifest` a `public/` y eliminar la copia de la raíz.** RF-6, RF-10
- Hecho cuando: `public/site.webmanifest` existe con JSON válido, la copia en la raíz ya no
  está y la referencia `/site.webmanifest` de `index.html` resuelve en el build.

- [x] **T8. Enriquecer el `noscript` con el contenido de todas las páginas públicas.** RF-3, RNF-7
- Hecho cuando: el HTML crudo incluye secciones de inicio, proyectos, conóceme y contacto,
  con los 11 proyectos actuales sincronizados con `projectsData.tsx`, sin cambios visuales.

- [x] **T9. Actualizar `public/llms.txt` y `public/robots.txt`.** RF-7, RF-8
- Hecho cuando: `llms.txt` menciona los 11 proyectos y secciones reales del sitio, y
  `robots.txt` incluye grupos explícitos para GPTBot, PerplexityBot, ClaudeBot,
  Google-Extended y CCBot con `Allow: /`, manteniendo el `Sitemap`.

- [x] **T10. Validación final de la spec.** RNF-2, RNF-3, RNF-6
- Hecho cuando: `npx vitest run`, `npm run build` y `npm run lint` pasan, y se revisa el
  checklist de "Criterios de finalización" de la spec sin pendientes.

- [x] **T11. Publicar el manifiesto ARD y su *agent skill*.** RF-11, RNF-8
- Hecho cuando: `public/.well-known/ard.json` y su espejo `ai-catalog.json` son JSON
  válido con entradas que cumplen el esquema ARD (URN `urn:air:`, `url` o `data`,
  2-5 `representativeQueries`), la *agent skill* referenciada existe en
  `public/.well-known/skills/rdisquete-portfolio/SKILL.md`, `index.html` la enlaza con
  `rel="ard"`, `robots.txt` declara `Agentmap:`, `src/seo/ardManifest.test.ts` cubre
  todo ello y el build copia la carpeta `.well-known` a `dist/`.
