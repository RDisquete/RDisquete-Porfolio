import { describe, it, expect } from "vitest";
import ardRaw from "../../public/.well-known/ard.json?raw";
import legacyRaw from "../../public/.well-known/ai-catalog.json?raw";
import skillRaw from "../../public/.well-known/skills/rdisquete-portfolio/SKILL.md?raw";
import robotsRaw from "../../public/robots.txt?raw";
import indexHtmlRaw from "../../index.html?raw";

interface ArdEntry {
  identifier?: string;
  displayName?: string;
  type?: string;
  url?: string;
  data?: unknown;
  representativeQueries?: string[];
  capabilities?: string[];
}

interface ArdManifest {
  specVersion?: string;
  host?: Record<string, unknown>;
  entries: ArdEntry[];
}

const URN_PATTERN = /^urn:air:[a-zA-Z0-9.-]+(:[a-zA-Z0-9._-]+)+$/;

const STANDARD_MEDIA_TYPES = [
  "application/ai-catalog+json",
  "application/agent-card+json",
  "application/a2a-agent-card+json",
  "application/mcp-server-card+json",
  "application/agent-skills+json",
  "application/agent-skills+md",
  "application/agent-skills+zip",
  "application/agent-skills+gzip",
  "application/agent-plugins+zip",
  "application/agent-plugins+gzip",
  "application/ai-registry",
  "application/ai-registry+json",
];

const manifest = JSON.parse(ardRaw) as ArdManifest;

describe("manifiesto ARD", () => {
  it("es JSON válido con un array de entradas", () => {
    expect(Array.isArray(manifest.entries)).toBe(true);
    expect(manifest.entries.length).toBeGreaterThan(0);
  });

  it("ancla cada entrada en un URN de dominio válido", () => {
    for (const entry of manifest.entries) {
      expect(entry.identifier).toMatch(URN_PATTERN);
    }
  });

  it("declara displayName y type en cada entrada", () => {
    for (const entry of manifest.entries) {
      expect(entry.displayName).toBeTruthy();
      expect(entry.type).toBeTruthy();
    }
  });

  it("usa un tipo de medio estándar de ARD", () => {
    for (const entry of manifest.entries) {
      expect(STANDARD_MEDIA_TYPES).toContain(entry.type);
    }
  });

  it("define url o data en cada entrada, nunca ambos", () => {
    for (const entry of manifest.entries) {
      const hasUrl = typeof entry.url === "string";
      const hasData = entry.data !== undefined;
      expect(hasUrl).not.toBe(hasData);
    }
  });

  it("incluye entre 2 y 5 consultas representativas por entrada", () => {
    for (const entry of manifest.entries) {
      const queries = entry.representativeQueries;
      expect(Array.isArray(queries)).toBe(true);
      expect(queries!.length).toBeGreaterThanOrEqual(2);
      expect(queries!.length).toBeLessThanOrEqual(5);
      expect(queries!.every((query) => typeof query === "string")).toBe(true);
    }
  });

  it("publica el artefacto referenciado por la entrada", () => {
    const [entry] = manifest.entries;
    expect(entry.url).toBe(
      "https://rdisquete.es/.well-known/skills/rdisquete-portfolio/SKILL.md",
    );
    expect(skillRaw).toContain("name: rdisquete-portfolio");
    expect(skillRaw).toMatch(/^description: .+/m);
  });

  it("declara el host con su documentación", () => {
    expect(manifest.host?.displayName).toBe("RDisquete");
    expect(manifest.host?.documentationUrl).toBe("https://rdisquete.es/llms.txt");
  });
});

describe("coherencia del catálogo", () => {
  it("mantiene el espejo legacy idéntico al manifiesto canónico", () => {
    expect(JSON.parse(legacyRaw)).toEqual(manifest);
  });
});

describe("señales de descubrimiento", () => {
  it("declara el manifiesto en robots.txt con la directiva Agentmap", () => {
    expect(robotsRaw).toMatch(
      /^Agentmap:\s*https:\/\/rdisquete\.es\/\.well-known\/ard\.json$/m,
    );
  });

  it("enlaza el manifiesto desde el HTML con rel=ard", () => {
    expect(indexHtmlRaw).toContain('rel="ard"');
    expect(indexHtmlRaw).toContain("/.well-known/ard.json");
  });
});
