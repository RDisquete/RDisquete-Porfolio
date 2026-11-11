import { SEO_BASE_URL, buildPageJsonLd } from "./routeSeo";
import type { PageMeta } from "./routeSeo";

const JSONLD_ID = "seo-page-jsonld";

function ensureMetaElement(
  doc: Document,
  attribute: "name" | "property",
  key: string,
  content: string,
): void {
  let element = doc.head.querySelector<HTMLMetaElement>(`meta[${attribute}="${key}"]`);
  if (!element) {
    element = doc.createElement("meta");
    element.setAttribute(attribute, key);
    doc.head.appendChild(element);
  }
  element.setAttribute("content", content);
}

export function upsertMeta(doc: Document, name: string, content: string): void {
  ensureMetaElement(doc, "name", name, content);
}

export function upsertProperty(doc: Document, property: string, content: string): void {
  ensureMetaElement(doc, "property", property, content);
}

export function upsertCanonical(doc: Document, href: string): void {
  let link = doc.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
  if (!link) {
    link = doc.createElement("link");
    link.setAttribute("rel", "canonical");
    doc.head.appendChild(link);
  }
  link.setAttribute("href", href);
}

export function upsertJsonLd(doc: Document, id: string, data: Record<string, unknown>): void {
  let script = doc.getElementById(id) as HTMLScriptElement | null;
  if (!script) {
    script = doc.createElement("script");
    script.id = id;
    script.type = "application/ld+json";
    doc.head.appendChild(script);
  }
  script.textContent = JSON.stringify(data);
}

export function removePageJsonLd(doc: Document): void {
  doc.getElementById(JSONLD_ID)?.remove();
}

export function applyPageMeta(doc: Document, meta: PageMeta): void {
  upsertMeta(doc, "description", meta.description);
  upsertMeta(doc, "robots", meta.robots);
  upsertCanonical(doc, meta.canonical);

  upsertProperty(doc, "og:type", "website");
  upsertProperty(doc, "og:title", meta.title);
  upsertProperty(doc, "og:description", meta.description);
  upsertProperty(doc, "og:url", meta.canonical);
  upsertProperty(doc, "og:locale", meta.locale);
  upsertProperty(doc, "og:site_name", meta.siteName);

  upsertMeta(doc, "twitter:title", meta.title);
  upsertMeta(doc, "twitter:description", meta.description);
  upsertMeta(doc, "twitter:image", `${SEO_BASE_URL}/og-image.png`);

  upsertJsonLd(doc, JSONLD_ID, buildPageJsonLd(meta));
}
