import { useEffect, Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

const Home = lazy(() => import("./pages/Home"));
const Conoceme = lazy(() => import("./pages/Conoceme"));
const Proyectos = lazy(() => import("./pages/Proyectos"));
const Contacto = lazy(() => import("./pages/Contacto"));

import { useVinyl } from "./hooks/useVinyl";

export default function App() {
  const { startAtmosphere } = useVinyl();

  useEffect(() => {
    const handleFirstInteraction = () => {
      startAtmosphere();
    };

    window.addEventListener("click", handleFirstInteraction, { once: true });

    return () => window.removeEventListener("click", handleFirstInteraction);
  }, [startAtmosphere]);

  return (
    <Router>
      <div className="relative flex flex-col min-h-screen overflow-x-hidden bg-[#171717]">
        <ScrollToTop />
        <Header />
        <main className="relative z-10 flex-1">
          <Suspense fallback={<div className="bg-[#171717] min-h-screen" />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/biography" element={<Conoceme />} />
              <Route path="/catalog" element={<Proyectos />} />
              <Route path="/feedback" element={<Contacto />} />
              <Route path="*" element={<Home />} />
            </Routes>
          </Suspense>
        </main>

        <Footer />
      </div>
    </Router>
  );
}