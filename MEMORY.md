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
- 2026-11-11 — Enmienda de `001-visibilidad-seo-ia` (RF-11, RNF-8, T11) — el fallback SPA
  (`/* /index.html 200`) servía HTML en `/.well-known/ai-catalog.json` y Lighthouse lo
  leía como manifiesto ("Malformed JSON in manifest"). Se publica un manifiesto ARD
  válido en `/.well-known/ard.json` (espejo en `ai-catalog.json`) que anuncia una
  *agent skill* real del portfolio, con `rel="ard"` en el HTML y `Agentmap:` en
  `robots.txt`. No hay servidor MCP: el recurso publicado es una skill de consulta.

## Pendiente

- Verificación post-despliegue: GSC (Inspección de URL con render), Rich Results Test,
  validar `og-image.png` y `llms.txt` en producción.
- Verificar post-despliegue que `/.well-known/ard.json` responde `application/json` (y no
  el `index.html` del fallback SPA) y repetir la auditoría de Lighthouse.
- Revisar si el fallback SPA y la retirada del canónico estático afectan a la indexación de
  subrutas en Google (comprobar en GSC).
