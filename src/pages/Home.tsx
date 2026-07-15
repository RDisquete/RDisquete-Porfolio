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
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-[60vh]">
            <div className="text-center">
              <div className="w-12 h-12 border-2 border-[#cdc69c]/20 border-t-[#cdc69c] rounded-full animate-spin mx-auto mb-4" />
              <p className="font-mono text-[#cdc69c] text-xs tracking-[0.2em] uppercase">{t("app.loading")}</p>
            </div>
          </div>
        }>
          <Manifesto />
          <ProyectosHome projects={translatedProjects} />
          <SobreMi />
        </Suspense>
      </main>
    </div>
  );
}