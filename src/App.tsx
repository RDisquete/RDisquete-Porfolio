import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// Componentes de estructura
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop";

// Vistas del portfolio
import Home from "./pages/Home";
import Conoceme from "./pages/Conoceme";
import Proyectos from "./pages/Proyectos";
import Contacto from "./pages/Contacto";

export default function App() {
  return (
  
    <div className="relative flex flex-col min-h-screen overflow-x-hidden bg-[#171717]"> 
      
      <Router>
    
        <ScrollToTop />
        
        <Header />

        <main className="relative z-0 flex-1"> 
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/conoceme" element={<Conoceme />} />
            <Route path="/proyectos" element={<Proyectos />} />
            <Route path="/contacto" element={<Contacto />} />
          </Routes>
        </main>

        <Footer />
      </Router>

    </div>
  );
}