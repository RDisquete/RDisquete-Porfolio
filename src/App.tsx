import React from "react";
import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useTranslation } from "react-i18next";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import ErrorBoundary from "./components/ErrorBoundary";

import { useVinyl } from "./hooks/useVinyl";
import { useCanonical } from "./hooks/useCanonical";

const Home = lazy(() => import("./pages/Home"));
const Conoceme = lazy(() => import("./pages/Conoceme"));
const Proyectos = lazy(() => import("./pages/Proyectos"));
const Contacto = lazy(() => import("./pages/Contacto"));
const NotFound = lazy(() => import("./pages/NotFound"));

function CanonicalUpdater() {
  useCanonical();
  return null;
}

export default function App() {
  const { t, i18n } = useTranslation();
  const { startAtmosphere } = useVinyl();

  useEffect(() => {
    document.documentElement.lang = i18n.language?.startsWith("en") ? "en" : "es";
  }, [i18n.language]);

  useEffect(() => {
    const handleFirstInteraction = () => {
      startAtmosphere();
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });

    return () => window.removeEventListener("click", handleFirstInteraction);
  }, [startAtmosphere]);

  return (
    <Router>
      <CanonicalUpdater />
      <div className="relative flex flex-col min-h-screen overflow-x-hidden bg-[#171717]">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:bg-[#8e2b27] focus:text-white focus:px-4 focus:py-2 focus:top-2 focus:left-2">
          {t("app.skipToContent")}
        </a>
        <ScrollToTop />
        <Header />
        <main id="main-content" className="relative z-10 flex-1">
          <Suspense fallback={
            <div className="flex items-center justify-center min-h-[60vh]">
              <p className="font-mono text-[#cdc69c] text-sm animate-pulse">{t("app.loading")}</p>
            </div>
          }>
            <ErrorBoundary>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<Conoceme />} />
                <Route path="/projects" element={<Proyectos />} />
                <Route path="/contact" element={<Contacto />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </ErrorBoundary>
          </Suspense>
        </main>

        <Footer />
      </div>
    </Router>
  );
}