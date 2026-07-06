import React from "react";
import { useEffect, useState, type ReactNode, useCallback, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "./LanguageSwitcher";

const RETRO_DARK = "#171717";
const RETRO_CREAM = "#cdc69c";
const RETRO_MAROON = "#8e2b27";

export default function Header() {
  const { t } = useTranslation();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

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
    if (menuOpen) {
      const timer = setTimeout(() => {
        const closeBtn = menuRef.current?.querySelector('button');
        closeBtn?.focus();
      }, 100);
      return () => clearTimeout(timer);
    } else {
      hamburgerRef.current?.focus();
    }
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab') return;
      const focusable = menuRef.current?.querySelectorAll<HTMLElement>('a[href], button, [tabindex]:not([tabindex="-1"])');
      if (!focusable || focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [menuOpen]);

  return (
    <>
      {menuOpen && (
        <div
          ref={menuRef}
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
            aria-label={t("header.aria.closeMenu")}
            className="absolute p-2 text-4xl border-4 top-4 right-4"
            style={{ borderColor: RETRO_CREAM }}
          >
            <FaTimes aria-hidden="true" />
          </button>

          <nav aria-label={t("header.aria.mobileMenu")}>
            <ul className="flex flex-col gap-8 text-4xl font-black text-center uppercase">
              <NavLink 
                to="/about" 
                active={location.pathname === "/about"}
                onClick={() => playSfx('relay', 0.15)}
                onHover={() => playSfx('switch', 0.1)} 
              >
                {t("header.nav.about")}
              </NavLink>
              <NavLink 
                to="/projects" 
                active={location.pathname === "/projects"}
                onClick={() => playSfx('relay', 0.15)}
                onHover={() => playSfx('switch', 0.1)} 
              >
                {t("header.nav.projects")}
              </NavLink>
              <NavLink 
                to="/contact" 
                active={location.pathname === "/contact"}
                onClick={() => playSfx('relay', 0.15)}
                onHover={() => playSfx('switch', 0.1)}
              >
                {t("header.nav.contact")}
              </NavLink>
            </ul>
          </nav>
          <div className="mt-8">
            <LanguageSwitcher mobile/>
          </div>
        </div>
      )}

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
            ref={hamburgerRef}
            onClick={() => {
              setMenuOpen(true);
              playSfx('relay', 0.2);
            }}
            aria-label={t("header.aria.openMenu")}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            className="text-3xl md:hidden"
            style={{ color: RETRO_MAROON }}
          >
            <FaBars aria-hidden="true" />
          </button>

          <span
            className={`hidden md:block font-mono text-[9px] tracking-[0.2em] text-[#cdc69c]/50 uppercase whitespace-nowrap transition-opacity duration-300 ${scrolled ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            // Open for opportunities
          </span>

          <Link
            to="/"
            aria-label={t("header.aria.home")}
            onClick={() => playSfx('relay', 0.1)}
            onMouseEnter={() => playSfx('switch', 0.1)}
            className="absolute transition-all duration-500 -translate-x-1/2 left-1/2 hover:scale-105 hover:drop-shadow-[0_2px_4px_rgba(205,198,156,0.5)]"
          >
            <img
              src="/Logo-rojo-claro.svg"
              alt={t("header.alt.logo")}
              width="112"
              height="112"
              className="w-24 h-24 md:w-28 md:h-28"
            />
          </Link>

            <nav className="items-center hidden gap-6 ml-auto md:flex" aria-label={t("header.aria.nav")}>
            <NavLink 
              to="/about" 
              active={location.pathname === "/about"}
              onClick={() => playSfx('relay', 0.15)}
              onHover={() => playSfx('switch', 0.1)} 
            >
              {t("header.nav.about")}
            </NavLink>
            <NavLink 
              to="/projects" 
              active={location.pathname === "/projects"}
              onClick={() => playSfx('relay', 0.15)}
              onHover={() => playSfx('switch', 0.1)} 
            >
              {t("header.nav.projects")}
            </NavLink>
            <NavLink 
              to="/contact" 
              active={location.pathname === "/contact"}
              onClick={() => playSfx('relay', 0.15)}
              onHover={() => playSfx('switch', 0.1)}
            >
              {t("header.nav.contact")}
            </NavLink>
            <LanguageSwitcher />
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