import { useEffect, useState, type ReactNode, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const RETRO_DARK = "#171717";
const RETRO_CREAM = "#cdc69c";
const RETRO_MAROON = "#8e2b27";

export default function Header() {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  
  const audioCache = useRef<{ [key: string]: HTMLAudioElement }>({});

  const playSfx = useCallback((fileName: string, volume = 0.1) => {
    if (!audioCache.current[fileName]) {
      audioCache.current[fileName] = new Audio(`/sounds/${fileName}.mp3`);
    }
    const audio = audioCache.current[fileName];
    audio.volume = volume;
    audio.currentTime = 0;
    audio.play().catch(() => {});
  }, []);

  useEffect(() => {
    playSfx('relay', 0.12);
    setMenuOpen(false);
  }, [location.pathname, playSfx]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("overflow-hidden", menuOpen);
  }, [menuOpen]);

  return (
    <>
      {/* OVERLAY MENÚ MÓVIL */}
      {menuOpen && (
        <div
          id="mobile-navigation"
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex flex-col items-center justify-center border-8"
          style={{
            backgroundColor: RETRO_DARK,
            borderColor: RETRO_CREAM,
            color: RETRO_CREAM,
          }}
        >
          <button
            onClick={() => {
              setMenuOpen(false);
              playSfx('relay', 0.2);
            }}
            aria-label="Cerrar menú de navegación"
            className="absolute p-2 text-4xl border-4 top-4 right-4"
            style={{ borderColor: RETRO_CREAM }}
          >
            <FaTimes aria-hidden="true" />
          </button>

          <nav aria-label="Menú móvil">
            <ul className="flex flex-col gap-8 text-4xl font-black text-center uppercase">
              <NavLink 
                to="/biography" 
                active={location.pathname === "/biography"}
                onClick={() => playSfx('relay', 0.15)}
                onHover={() => playSfx('switch', 0.1)} 
              >
                Biography
              </NavLink>
              <NavLink 
                to="/catalog" 
                active={location.pathname === "/catalog"}
                onClick={() => playSfx('relay', 0.15)}
                onHover={() => playSfx('switch', 0.1)} 
              >
                Catalog
              </NavLink>
              <NavLink 
                to="/feedback" 
                active={location.pathname === "/feedback"}
                onClick={() => playSfx('relay', 0.15)}
                onHover={() => playSfx('switch', 0.1)}
              >
                Feedback
              </NavLink>
            </ul>
          </nav>
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

          <button
            onClick={() => {
              setMenuOpen(true);
              playSfx('relay', 0.2);
            }}
            aria-label="Abrir menú de navegación"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="text-3xl md:hidden"
            style={{ color: RETRO_MAROON }}
          >
            <FaBars aria-hidden="true" />
          </button>

          <Link
            to="/"
            aria-label="Ir a la página de inicio"
            onClick={() => playSfx('relay', 0.1)}
            onMouseEnter={() => playSfx('switch', 0.1)} 
            className="absolute transition-transform -translate-x-1/2 left-1/2 hover:scale-110"
          >
            <img
              src="/Logo rojo claro.svg" 
              alt="Logo RDisquete"
              width="48"
              height="48"
              className="w-12 h-12"
            />
          </Link>

          <nav className="items-center hidden gap-6 ml-auto md:flex" aria-label="Navegación principal">
            <NavLink 
              to="/biography" 
              active={location.pathname === "/biography"}
              onClick={() => playSfx('relay', 0.15)}
              onHover={() => playSfx('switch', 0.1)} 
            >
              Biography
            </NavLink>
            <NavLink 
              to="/catalog" 
              active={location.pathname === "/catalog"}
              onClick={() => playSfx('relay', 0.15)}
              onHover={() => playSfx('switch', 0.1)} 
            >
              Catalog
            </NavLink>
            <NavLink 
              to="/feedback" 
              active={location.pathname === "/feedback"}
              onClick={() => playSfx('relay', 0.15)}
              onHover={() => playSfx('switch', 0.1)} 
            >
              Feedback
            </NavLink>
          </nav>
        </div>
      </header>
    </>
  );
}

interface NavLinkProps {
  to: string;
  active: boolean;
  children: ReactNode;
  onClick?: () => void;
  onHover?: () => void;
}

function NavLink({ to, active, children, onClick, onHover }: NavLinkProps) {
  return (
    <Link
      to={to}
      onClick={onClick}
      onMouseEnter={onHover}
      className="relative px-3 py-2 uppercase transition-transform duration-200 hover:scale-110" 
      style={{ 
        fontFamily: "'Montserrat', sans-serif", 
        fontWeight: 400, 
        fontSize: "1rem",
        letterSpacing: "0.15em",
        color: active ? RETRO_MAROON : RETRO_CREAM,
        display: "inline-block"
      }}
    >
      {children}
    </Link>
  );
}