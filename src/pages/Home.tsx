import { lazy, Suspense } from "react";
import { useTranslation } from "react-i18next";
import HeroSection from "../components/HeroSection";
import { projects } from "../data/homeProjects";

const projectKeyMap: Record<string, string> = {
  'Wedding Album System — R&M': 'weddingAlbum',
  'skyRESERVE': 'skyRESERVE',
  'The Pueblo': 'thePueblo',
  'Nor3xtrem': 'nor3xtrem',
  'Armario Escénico': 'armarioEscenico',
  'Infra.RD': 'infraRD',
};

const Manifesto = lazy(() => import("../components/Manifesto"));
const ProyectosHome = lazy(() => import("../components/ProyectosHome"));
const SobreMi = lazy(() => import("../components/Sobremi"));

export default function Home() {
  const { t } = useTranslation();
  const translatedProjects = projects.map(p => {
    const key = projectKeyMap[p.title];
    if (!key) return p;
    const tk = (s: string) => t(`projects.${key}.${s}`);
    return {
      ...p,
      title: tk('title'),
      desc: tk('desc'),
      context: tk('context'),
      problem: tk('problem'),
      solution: p.solution.map((_, i) => tk(`solution.${i}`)),
      result: p.result ? tk('result') : '',
      impact: p.impact ? tk('impact') : undefined,
    };
  });
  return (
    <div className="relative w-full bg-neutral-900">
      <HeroSection />
      <main className="relative">
        <Suspense fallback={null}>
          <Manifesto />
          <ProyectosHome projects={translatedProjects} />
          <SobreMi />
        </Suspense>
      </main>
    </div>
  );
}