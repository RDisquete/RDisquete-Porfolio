# MEMORY

Memoria de decisiones del proyecto. Se actualiza al cerrar cada fase de SDD.

## Decisiones

- 2026-11-06 — SDD inicializado (`/sdd-init`) — el proyecto no tenía constitución,
  `specs/` ni memoria; se adopta el modo **spec-anchored** (la spec se mantiene viva).
- 2026-11-11 — Spec `001-visibilidad-seo-ia` creada en estado **borrador** — objetivo:
  que buscadores y sistemas de IA descubran, entiendan y citen el portfolio sin cambiar
  la experiencia visual.
- 2026-11-11 — Clarificación de `001-visibilidad-seo-ia` — se mantiene SPA sin
  prerender/SSR, canónico `https://rdisquete.es` sin `www`, español como idioma
  principal (inglés por selector), prioridad IA y luego SEO clásico.
- 2026-11-11 — Spec `001-visibilidad-seo-ia` **aprobada** y `plan.md` generado — metadatos
  por ruta con hook propio, `noscript` enriquecido, imagen social PNG, manifiesto en
  `public/`, y robots/llms/sitemap sincronizados.
- 2026-11-11 — `plan.md` aprobado y `tasks.md` generado (10 tareas, T1→T10).
- 2026-11-11 — Implementación de `001-visibilidad-seo-ia` completada (T1→T10). Tests
  35/35, `npm run build` y `npm run lint` en verde. Spec marcada como **implementada**.

## Pendiente

- Verificación post-despliegue: GSC (Inspección de URL con render), Rich Results Test,
  validar `og-image.png` y `llms.txt` en producción.
- Revisar si el fallback SPA y la retirada del canónico estático afectan a la indexación de
  subrutas en Google (comprobar en GSC).
