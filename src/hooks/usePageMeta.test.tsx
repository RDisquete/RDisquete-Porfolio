import React from "react";
import { render, fireEvent } from "@testing-library/react";
import { MemoryRouter, useNavigate } from "react-router-dom";
import { beforeEach, describe, it, expect } from "vitest";
import { usePageMeta } from "./usePageMeta";

function MetaProbe() {
  usePageMeta();
  return null;
}

function NavigationTrigger() {
  const navigate = useNavigate();
  return (
    <button type="button" onClick={() => navigate("/about")}>
      go-about
    </button>
  );
}

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <MetaProbe />
      <NavigationTrigger />
    </MemoryRouter>,
  );
}

beforeEach(() => {
  document.head.innerHTML = "";
});

describe("usePageMeta", () => {
  it("aplica los metadatos de la página inicial", () => {
    renderAt("/");

    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(
      "https://rdisquete.es/",
    );
    expect(
      document.head.querySelector('meta[name="description"]')?.getAttribute("content"),
    ).toContain("Portfolio de RDisquete");
    expect(document.head.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe(
      "index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1",
    );
    expect(document.getElementById("seo-page-jsonld")).not.toBeNull();
  });

  it("actualiza canónico y descripción al cambiar de ruta", () => {
    const { getByText } = renderAt("/");
    fireEvent.click(getByText("go-about"));

    expect(document.head.querySelector('link[rel="canonical"]')?.getAttribute("href")).toBe(
      "https://rdisquete.es/about",
    );
    expect(
      document.head.querySelector('meta[name="description"]')?.getAttribute("content"),
    ).toContain("Conoce a Rafael Dorado");
  });

  it("aplica noindex en una ruta desconocida", () => {
    renderAt("/missing");

    expect(document.head.querySelector('meta[name="robots"]')?.getAttribute("content")).toBe(
      "noindex, follow",
    );
  });
});
