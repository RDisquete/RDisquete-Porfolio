import { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";
import Home from "./pages/Home";
import Conoceme from "./pages/Conoceme";
import Proyectos from "./pages/Proyectos";
import Contacto from "./pages/Contacto";

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
        <a href="#main-content" className="sr-only focus:not-sr-only focus:absolute focus:z-[9999] focus:bg-[#8e2b27] focus:text-white focus:px-4 focus:py-2 focus:top-2 focus:left-2">
          Saltar al contenido principal
        </a>
        <ScrollToTop />
        <Header />
        <main id="main-content" className="relative z-10 flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<Conoceme />} />
            <Route path="/projects" element={<Proyectos />} />
            <Route path="/contact" element={<Contacto />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </Router>
  );
}