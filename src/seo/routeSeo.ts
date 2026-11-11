export type SeoPageKey = "home" | "proyectos" | "conoceme" | "contacto" | "notFound";

export interface BreadcrumbItem {
  name: string;
  url: string;
}

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

const ROBOTS_INDEXABLE =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";
const ROBOTS_NOT_INDEXABLE = "noindex, follow";

const ROUTE_TO_PAGE: Record<string, SeoPageKey> = {
  "/": "home",
  "/projects": "proyectos",
  "/about": "conoceme",
  "/contact": "contacto",
};

function normalizePath(pathname: string): string {
  if (!pathname || pathname === "/") return "/";
  const withLeading = pathname.startsWith("/") ? pathname : `/${pathname}`;
  const withoutTrailing = withLeading.replace(/\/+$/, "");
  return withoutTrailing || "/";
}

export function getPageKey(pathname: string): SeoPageKey {
  return ROUTE_TO_PAGE[normalizePath(pathname)] ?? "notFound";
}

export function canonicalUrl(pathname: string): string {
  const normalized = normalizePath(pathname);
  return normalized === "/" ? `${SEO_BASE_URL}/` : `${SEO_BASE_URL}${normalized}`;
}

export function buildPageMeta(pathname: string, t: Translate, language: string): PageMeta {
  const page = getPageKey(pathname);
  const canonical = canonicalUrl(pathname);
  const isNotFound = page === "notFound";

  const breadcrumbs: BreadcrumbItem[] = isNotFound
    ? []
    : page === "home"
      ? [{ name: t("seo.breadcrumb.home"), url: canonical }]
      : [
          { name: t("seo.breadcrumb.home"), url: `${SEO_BASE_URL}/` },
          { name: t(`seo.breadcrumb.${page}`), url: canonical },
        ];

  return {
    page,
    title: t(`app.title.${page}`),
    description: t(`seo.${page}.description`),
    canonical,
    robots: isNotFound ? ROBOTS_NOT_INDEXABLE : ROBOTS_INDEXABLE,
    locale: language.toLowerCase().startsWith("en") ? "en_US" : "es_ES",
    siteName: t("seo.siteName"),
    breadcrumbs,
  };
}

export function buildWebPageJsonLd(meta: PageMeta): Record<string, unknown> {
  return {
    "@type": "WebPage",
    "@id": `${meta.canonical}#webpage`,
    url: meta.canonical,
    name: meta.title,
    description: meta.description,
    inLanguage: meta.locale === "en_US" ? "en" : "es",
    isPartOf: { "@id": `${SEO_BASE_URL}/#website` },
  };
}

export function buildBreadcrumbJsonLd(items: BreadcrumbItem[]): Record<string, unknown> {
  return {
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildPageJsonLd(meta: PageMeta): Record<string, unknown> {
  const graph: Record<string, unknown>[] = [buildWebPageJsonLd(meta)];
  if (meta.breadcrumbs.length > 0) {
    graph.push(buildBreadcrumbJsonLd(meta.breadcrumbs));
  }
  return { "@context": "https://schema.org", "@graph": graph };
}
