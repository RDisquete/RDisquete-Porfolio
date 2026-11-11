import { describe, it, expect } from "vitest";
import {
  SEO_BASE_URL,
  getPageKey,
  canonicalUrl,
  buildPageMeta,
  buildPageJsonLd,
} from "./routeSeo";

const t = (key: string) => key;
const ROBOTS_INDEXABLE =
  "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1";

describe("getPageKey", () => {
  it("mapea las rutas públicas", () => {
    expect(getPageKey("/")).toBe("home");
    expect(getPageKey("/projects")).toBe("proyectos");
    expect(getPageKey("/about")).toBe("conoceme");
    expect(getPageKey("/contact")).toBe("contacto");
  });

  it("marca como notFound las rutas desconocidas", () => {
    expect(getPageKey("/nope")).toBe("notFound");
    expect(getPageKey("/projects/extra")).toBe("notFound");
  });

  it("tolera la barra final y la ausencia de barra inicial", () => {
    expect(getPageKey("/projects/")).toBe("proyectos");
    expect(getPageKey("about")).toBe("conoceme");
  });
});

describe("canonicalUrl", () => {
  it("usa la barra final en la raíz", () => {
    expect(canonicalUrl("/")).toBe(`${SEO_BASE_URL}/`);
  });

  it("normaliza las rutas internas sin barra final", () => {
    expect(canonicalUrl("/about")).toBe(`${SEO_BASE_URL}/about`);
    expect(canonicalUrl("/projects/")).toBe(`${SEO_BASE_URL}/projects`);
  });
});

describe("buildPageMeta", () => {
  it("genera metadatos indexables para la home", () => {
    const meta = buildPageMeta("/", t, "es");
    expect(meta.page).toBe("home");
    expect(meta.title).toBe("app.title.home");
    expect(meta.description).toBe("seo.home.description");
    expect(meta.canonical).toBe(`${SEO_BASE_URL}/`);
    expect(meta.robots).toBe(ROBOTS_INDEXABLE);
    expect(meta.locale).toBe("es_ES");
    expect(meta.siteName).toBe("seo.siteName");
    expect(meta.breadcrumbs).toHaveLength(1);
    expect(meta.breadcrumbs[0].name).toBe("seo.breadcrumb.home");
  });

  it("genera migas de dos niveles en páginas internas", () => {
    const meta = buildPageMeta("/about", t, "en-US");
    expect(meta.page).toBe("conoceme");
    expect(meta.locale).toBe("en_US");
    expect(meta.breadcrumbs).toHaveLength(2);
    expect(meta.breadcrumbs[0].url).toBe(`${SEO_BASE_URL}/`);
    expect(meta.breadcrumbs[1].url).toBe(`${SEO_BASE_URL}/about`);
    expect(meta.breadcrumbs[1].name).toBe("seo.breadcrumb.conoceme");
  });

  it("marca las rutas desconocidas como no indexables", () => {
    const meta = buildPageMeta("/missing", t, "es");
    expect(meta.page).toBe("notFound");
    expect(meta.robots).toBe("noindex, follow");
    expect(meta.breadcrumbs).toHaveLength(0);
  });
});

describe("buildPageJsonLd", () => {
  it("incluye WebPage y BreadcrumbList cuando hay migas", () => {
    const meta = buildPageMeta("/about", t, "es");
    const data = buildPageJsonLd(meta) as {
      "@context": string;
      "@graph": Array<Record<string, unknown>>;
    };
    expect(data["@context"]).toBe("https://schema.org");
    expect(data["@graph"]).toHaveLength(2);
    expect(data["@graph"][0]["@type"]).toBe("WebPage");
    expect(data["@graph"][1]["@type"]).toBe("BreadcrumbList");
  });

  it("solo incluye WebPage en notFound", () => {
    const meta = buildPageMeta("/missing", t, "es");
    const data = buildPageJsonLd(meta) as {
      "@graph": Array<Record<string, unknown>>;
    };
    expect(data["@graph"]).toHaveLength(1);
    expect(data["@graph"][0]["@type"]).toBe("WebPage");
  });
});
