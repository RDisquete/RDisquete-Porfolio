import { lazy, Suspense } from "react";
import HeroSection from "../components/HeroSection";
import { projects } from "../data/homeProjects";

const Manifesto = lazy(() => import("../components/Manifesto"));
const ProyectosHome = lazy(() => import("../components/ProyectosHome"));
const SobreMi = lazy(() => import("../components/Sobremi"));

export default function Home() {
  return (
    <div className="relative w-full bg-neutral-900">
      <HeroSection />
      <main className="relative">
        <Suspense fallback={null}>
          <Manifesto />
          <ProyectosHome projects={projects} />
          <SobreMi />
        </Suspense>
      </main>
    </div>
  );
}