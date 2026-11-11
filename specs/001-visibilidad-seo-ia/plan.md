# Plan 001 — Visibilidad en buscadores y sistemas de IA

Spec: `specs/001-visibilidad-seo-ia/spec.md`

Enfoque: se mantiene la SPA actual (sin prerenderizado ni renderizado en servidor). Se
refuerzan los metadatos estáticos del documento, se gestionan metadatos por ruta en cliente,
se enriquece el contenido de respaldo para rastreadores sin JavaScript y se corrigen los
recursos de descubrimiento (manifiesto, imagen social, mapa del sitio y resumen para IA).

## Archivos y responsabilidades

| Archivo | Responsabilidad | RF |
|---|---|---|
| `index.html` | Metadatos estáticos: `robots`, `og:locale`, `og:site_name`, dimensiones de imagen; JSON-LD `Person` + `WebSite`; `noscript` con el contenido de todas las páginas públicas. Quita el canónico estático. | RF-2, RF-4, RF-3 |
| `public/og-image.png` | Imagen social 1200x630 en formato compatible. | RF-5, RF-10 |
| `public/site.webmanifest` | Manifiesto servido en la raíz del sitio (se mueve desde la raíz del repo). | RF-6, RF-10 |
| `public/robots.txt` | Directrices de rastreo + grupos explícitos para rastreadores de IA. | RF-2, RF-7 |
| `public/sitemap.xml` | Mapa del sitio con las cuatro páginas públicas (sin cambios funcionales). | RF-7 |
| `public/llms.txt` | Resumen del sitio coherente con el contenido real (número de proyectos, secciones). | RF-8 |
| `src/seo/routeSeo.ts` | Funciones puras: mapeo ruta→página, canónico, construcción de JSON-LD de página y migas. | RF-1, RF-4, RF-9 |
| `src/seo/domMeta.ts` | Aplicación de metadatos al `document` (upsert de `meta`, `link` y `script` JSON-LD). | RF-1, RF-2, RF-4, RF-10 |
| `src/hooks/usePageMeta.ts` | Hook que conecta router + i18n + `document`; sustituye a `useCanonical`. | RF-1, RF-2, RF-4, RF-9, RF-10 |
| `src/App.tsx` | Monta el gestor de metadatos por ruta (reemplaza `CanonicalUpdater`). | RF-1, RF-4, RF-9 |
| `src/i18n/es.json`, `src/i18n/en.json` | Nueva sección `seo` con descripciones, migas y nombre del sitio (paridad exacta). | RF-1, RNF-5 |
| `src/hooks/useCanonical.ts` | Se elimina: su lógica pasa a `usePageMeta`. | RF-1 |

## Interfaz (tipos y funciones)

```ts
// src/seo/routeSeo.ts
export type SeoPageKey = "home" | "proyectos" | "conoceme" | "contacto" | "notFound";
export interface BreadcrumbItem { name: string; url: string }
export interface PageMeta {
  page: SeoPageKey;
  title: string;
  description: string;
  canonical: string;
  robots: string;
  locale: string;
  siteName: string;
  breadcrumbs: BreadcrumbItem[];
}
export type Translate = (key: string) => string;

export const SEO_BASE_URL = "https://rdisquete.es";
export function getPageKey(pathname: string): SeoPageKey;
export function canonicalUrl(pathname: string): string;
export function buildPageMeta(pathname: string, t: Translate, language: string): PageMeta;
export function buildWebPageJsonLd(meta: PageMeta): Record<string, unknown>;
export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): Record<string, unknown>;
export function buildPageJsonLd(meta: PageMeta): Record<string, unknown>;
```

```ts
// src/seo/domMeta.ts
export function applyPageMeta(doc: Document, meta: PageMeta): void;
export function removePageJsonLd(doc: Document): void;
export function upsertMeta(doc: Document, name: string, content: string): void;
export function upsertProperty(doc: Document, property: string, content: string): void;
export function upsertCanonical(doc: Document, href: string): void;
```

```ts
// src/hooks/usePageMeta.ts
export function usePageMeta(): void;
```

## Algoritmo (pseudocódigo)

```
buildPageMeta(pathname, t, language):
  page = getPageKey(pathname)                      // rutas desconocidas -> "notFound"
  title = t("app.title." + page)                   // reutiliza las claves existentes
  description = t("seo." + page + ".description")
  canonical = canonicalUrl(pathname)               // base + (pathname == "/" ? "/" : pathname)
  robots = page == "notFound"
             ? "noindex, follow"
             : "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1"
  locale = language.startsWith("en") ? "en_US" : "es_ES"
  siteName = t("seo.siteName")
  breadcrumbs = page == "notFound" ? []
              : page == "home"     ? [{name: t("seo.breadcrumb.home"), url: canonical}]
              : [{name: t("seo.breadcrumb.home"), url: SEO_BASE_URL + "/"},
                 {name: t("seo.breadcrumb." + page), url: canonical}]
  return { page, title, description, canonical, robots, locale, siteName, breadcrumbs }

applyPageMeta(doc, meta):
  upsertMeta(doc, "description", meta.description)
  upsertMeta(doc, "robots", meta.robots)
  upsertCanonical(doc, meta.canonical)
  upsertProperty(doc, "og:type", "website")
  upsertProperty(doc, "og:title", meta.title)
  upsertProperty(doc, "og:description", meta.description)
  upsertProperty(doc, "og:url", meta.canonical)
  upsertProperty(doc, "og:locale", meta.locale)
  upsertProperty(doc, "og:site_name", meta.siteName)
  upsertMeta(doc, "twitter:title", meta.title)
  upsertMeta(doc, "twitter:description", meta.description)
  upsertMeta(doc, "twitter:image", SEO_BASE_URL + "/og-image.png")
  upsertJsonLd(doc, "seo-page-jsonld", buildPageJsonLd(meta))   // WebPage + BreadcrumbList

usePageMeta():
  { pathname } = useLocation()
  { t, i18n } = useTranslation()
  useEffect([pathname, i18n.language]):
    applyPageMeta(document, buildPageMeta(pathname, t, i18n.language))
    return () => removePageJsonLd(document)
```

`upsertMeta`/`upsertProperty`/`upsertCanonical`/`upsertJsonLd`: buscan el elemento por
selector; si existe, actualizan el atributo; si no, lo crean y lo añaden a `<head>`. Nunca
duplican etiquetas.

## Decisiones justificadas

1. **Se elimina el canónico estático de `index.html` y se gestiona por ruta en cliente.**
   - Alternativa descartada: mantener `https://rdisquete.es` fijo. Con el fallback SPA,
     todas las rutas sirven el mismo HTML; un canónico fijo haría que `/projects`, `/about`
     y `/contact` se declarasen como la home (peor que no tener canónico).
2. **Títulos: se mantienen los `document.title` por página y el hook no los pisa.**
   - Alternativa descartada: centralizar también el título en el hook. Rompería
     `src/pages/NotFound.test.tsx`, que renderiza la página sin `App`, y obligaría a
     refactorizar todas las páginas sin ganancia.
3. **Metadatos por ruta con hook propio (sin dependencias).**
   - Alternativa descartada: `react-helmet`. Requiere una dependencia nueva (RNF-4) para
     algo que se resuelve con `document`.
4. **Imagen social PNG generada desde el SVG existente** con `qlmanage` + `sips` (macOS).
   - Alternativa descartada: mantener `og-image.svg` (soporte irregular en redes) o añadir
     una librería de conversión (dependencia nueva).
5. **Se mantiene la SPA y se enriquece el `noscript` con todas las páginas públicas.**
   - Alternativa descartada: prerenderizado/SSR (más trabajo y cambio de arquitectura, no
     aprobado en la spec).
6. **`robots.txt` con grupos explícitos para rastreadores de IA además del comodín.**
   - Alternativa descartada: dejar solo `User-agent: *`. Funciona, pero no deja explícita la
     intención para GPTBot/PerplexityBot/ClaudeBot/Google-Extended/CCBot.
7. **JSON-LD estático con `Person` + `WebSite`; `WebPage` + `BreadcrumbList` en cliente.**
   - Alternativa descartada: un único `Person` como hasta ahora, que no describe el sitio ni
     la jerarquía de páginas.

## Estrategia de tests

Comando del proyecto: `npx vitest run` (una pasada). Entorno jsdom; `setupTests.ts` ya
mockea `react-i18next` con `es.json` y las APIs de navegador.

- `src/seo/routeSeo.test.ts`
  - `getPageKey` mapea `/`, `/projects`, `/about`, `/contact`; ruta desconocida → `notFound`.
  - `canonicalUrl` produce `https://rdisquete.es/` para `/` y `https://rdisquete.es/about`
    para `/about`.
  - `buildPageMeta`: robots `noindex` en `notFound`; `index, follow, ...` en el resto;
    `locale` según idioma; migas correctas (home sin miga de página; internas con dos).
  - `buildPageJsonLd`: incluye `WebPage` y, cuando hay migas, `BreadcrumbList`.
- `src/seo/domMeta.test.ts` (jsdom)
  - Crea `meta[name=description]`, `meta[name=robots]` y `link[rel=canonical]` si no existen.
  - Actualiza sin duplicar en llamadas sucesivas.
  - `notFound` aplica `noindex, follow`; una ruta normal lo revierte.
  - `removePageJsonLd` elimina el `script#seo-page-jsonld`.
- `src/hooks/usePageMeta.test.tsx`
  - Con `MemoryRouter` + `usePageMeta`, cambiar de ruta actualiza canónico, descripción y
    JSON-LD; la ruta desconocida aplica `noindex`.
- Regresión: las pruebas existentes (`NotFound`, `Home`, `Conoceme`, `Proyectos`,
  `Contacto`, `Header`, `App`) deben seguir en verde.

Puertas: `npx vitest run`, `npm run build`, `npm run lint`.

## Riesgos y notas

- El `noscript` debe seguir sincronizado con `projectsData.tsx` (regla del `AGENTS.md`).
- Al quitar `useCanonical`, verificar que no queden referencias (hoy solo lo usa `App.tsx`).
- El `noscript` queda en español (idioma principal); para inglés se usa el selector.
- La generación de `og-image.png` se hace una vez y se versiona el binario.
