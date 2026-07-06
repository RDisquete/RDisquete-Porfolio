import React from "react";
import { lazy, Suspense, useEffect } from "react";
import { useTranslation } from "react-i18next";
import HeroSection from "../components/HeroSection";
import { useTranslatedProjects } from "../hooks/useTranslatedProjects";

const Manifesto = lazy(() => import("../components/Manifesto"));
const ProyectosHome = lazy(() => import("../components/ProyectosHome"));
const SobreMi = lazy(() => import("../components/Sobremi"));

export default function Home() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("app.title.home");
  }, [t]);

  const translatedProjects = useTranslatedProjects().slice(0, 7);
  return (
    <div className="relative w-full bg-neutral-900">
      <HeroSection />
      <main className="relative">
        <Suspense>
          <Manifesto />
          <ProyectosHome projects={translatedProjects} />
          <SobreMi />
        </Suspense>
      </main>
    </div>
  );
}