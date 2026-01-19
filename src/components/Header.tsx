import { useEffect, useState, type ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const RETRO_DARK = "#171717";
const RETRO_CREAM = "#cdc69c";
const RETRO_MAROON = "#8e2b27";

export default function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", menuOpen);
  }, [menuOpen]);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  return (
    <>
      {/* OVERLAY MENÚ MÓVIL */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center border-8"
          style={{
            backgroundColor: RETRO_DARK,
            borderColor: RETRO_CREAM,
            color: RETRO_CREAM,
          }}
        >
          <button
            onClick={() => setMenuOpen(false)}
            className="absolute p-2 text-4xl border-4 top-4 right-4"
            style={{ borderColor: RETRO_CREAM }}
          >
            <FaTimes />
          </button>

          <ul className="flex flex-col gap-8 text-4xl font-black text-center uppercase">
            <NavLink to="/conoceme" active={location.pathname === "/conoceme"}>Biography</NavLink>
            <NavLink to="/proyectos" active={location.pathname === "/proyectos"}>Catalog</NavLink>
            <NavLink to="/contacto" active={location.pathname === "/contacto"}>Feedback</NavLink>
          </ul>
        </div>
      )}

      {/* HEADER PRINCIPAL */}
      <header
        className="fixed top-0 left-0 z-40 w-full transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(23,23,23,0.96)" : "transparent",
          backdropFilter: scrolled ? "blur(6px)" : "none",
          color: RETRO_CREAM,
        }}
      >
        <div className="relative flex items-center justify-between h-20 px-4 mx-auto max-w-7xl md:px-8">

          {/* Hamburguesa */}
          <button
            onClick={() => setMenuOpen(true)}
            className="text-3xl md:hidden"
            style={{ color: RETRO_MAROON }}
          >
            <FaBars />
          </button>

          <Link
            to="/"
            className="absolute transition-transform -translate-x-1/2 left-1/2 hover:scale-150"
          >
            <img
              src="/images/Logo rojo claro.png" 
              alt="rdisquete"
              className="w-12 h-12 md:w-12 md:h-12"
            />
          </Link>

          {/* Menú de Navegación Escritorio */}
          <div className="items-center hidden gap-6 ml-auto md:flex">
            <NavLink to="/conoceme" active={location.pathname === "/conoceme"}>Biography</NavLink>
            <NavLink to="/proyectos" active={location.pathname === "/proyectos"}>Catalog</NavLink>
            <NavLink to="/contacto" active={location.pathname === "/contacto"}>Feedback</NavLink>
          </div>
        </div>
      </header>
    </>
  );
}

interface NavLinkProps {
  to: string;
  active: boolean;
  children: ReactNode;
}

function NavLink({ to, active, children }: NavLinkProps) {
  return (
    <Link
      to={to}
      className="relative px-3 py-2 uppercase transition-transform duration-200 hover:scale-110" 
      style={{ 
        fontFamily: "'Montserrat', sans-serif",
        fontWeight: 900,
        fontSize: "0.9rem",
        letterSpacing: "0.15em",
        color: active ? RETRO_MAROON : RETRO_CREAM,
        display: "inline-block"
      }}
    >
      {children}
    </Link>
  );
}