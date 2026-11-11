import { describe, it, expect } from "vitest";
import { applyPageMeta, removePageJsonLd } from "./domMeta";
import { buildPageMeta } from "./routeSeo";

const t = (key: string) => key;

function createDoc(): Document {
  return new DOMParser().parseFromString(
    "<!doctype html><html><head></head><body></body></html>",
    "text/html",
  );
}

describe("applyPageMeta", () => {
  it("crea descripción, robots y canónico", () => {
    const doc = createDoc();
    applyPageMeta(doc, buildPageMeta("/about", t, "es"));

    expect(doc.head.querySelector('meta[name="description"]')?.getAttribute("content")).toBe(
      "seo.conoceme.description",
    );
    expect(doc.head.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe(
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );
    expect(doc.head.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(
      "https://rdisquete.es/about",
    );
  });

  it("crea las etiquetas Open Graph y Twitter", () => {
    const doc = createDoc();
    applyPageMeta(doc, buildPageMeta("/projects", t, "es"));

    expect(doc.head.querySelector('meta[property="og:title"]')?.getAttribute("content")).toBe(
      "app.title.proyectos",
    );
    expect(doc.head.querySelector('meta[property="og:url"]')?.getAttribute("content")).toBe(
      "https://rdisquete.es/projects",
    );
    expect(doc.head.querySelector('meta[property="og:locale"]')?.getAttribute("content")).toBe(
      "es_ES",
    );
    expect(doc.head.querySelector('meta[property="og:site_name"]')?.getAttribute("content")).toBe(
      "seo.siteName",
    );
    expect(doc.head.querySelector('meta[name="twitter:image"]')?.getAttribute("content")).toBe(
      "https://rdisquete.es/og-image.png",
    );
  });

  it("añade el JSON-LD de la página", () => {
    const doc = createDoc();
    applyPageMeta(doc, buildPageMeta("/", t, "es"));

    const script = doc.getElementById("seo-page-jsonld");
    expect(script).not.toBeNull();
    expect(script?.getAttribute("type")).toBe("application/ld+json");
    const data = JSON.parse(script?.textContent ?? "{}") as {
      "@graph": Array<Record<string, unknown>>;
    };
    expect(data["@graph"][0]["@type"]).toBe("WebPage");
  });

  it("no duplica etiquetas al aplicarse varias veces", () => {
    const doc = createDoc();
    applyPageMeta(doc, buildPageMeta("/", t, "es"));
    applyPageMeta(doc, buildPageMeta("/about", t, "es"));

    expect(doc.head.querySelectorAll('meta[name="description"]')).toHaveLength(1);
    expect(doc.head.querySelectorAll('meta[name="robots"]')).toHaveLength(1);
    expect(doc.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(doc.head.querySelectorAll("#seo-page-jsonld")).toHaveLength(1);
  });

  it("aplica noindex en notFound y lo revierte en una ruta normal", () => {
    const doc = createDoc();
    applyPageMeta(doc, buildPageMeta("/missing", t, "es"));
    expect(doc.head.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe(
      "noindex, follow",
    );

    applyPageMeta(doc, buildPageMeta("/contact", t, "es"));
    expect(doc.head.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe(
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );
  });
});

describe("removePageJsonLd", () => {
  it("elimina el JSON-LD de la página", () => {
    const doc = createDoc();
    applyPageMeta(doc, buildPageMeta("/", t, "es"));
    expect(doc.getElementById("seo-page-jsonld")).not.toBeNull();

    removePageJsonLd(doc);
    expect(doc.getElementById("seo-page-jsonld")).toBeNull();
  });
});
