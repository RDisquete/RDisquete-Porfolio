import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { FaHome } from "react-icons/fa";

export default function NotFound() {
  const { t } = useTranslation();

  useEffect(() => {
    document.title = t("app.title.notFound");
  }, [t]);

  return (
    <section className="relative flex items-center justify-center min-h-screen px-6 py-32 overflow-hidden bg-retro-dark">
      <picture className="absolute inset-0 pointer-events-none">
        <img
          src="/images/texturas/old-black-background-grunge.webp"
          alt=""
          role="presentation"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-60 mix-blend-overlay"
        />
      </picture>

      <picture className="absolute inset-0 pointer-events-none">
        <img
          src="/images/texturas/abstract-crumpled.webp"
          alt=""
          role="presentation"
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-soft-light"
        />
      </picture>

      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
        }}
      />

      <div className="relative z-10 flex flex-col items-center max-w-2xl mx-auto text-center">
        <span className="font-mono text-[10px] font-bold tracking-[0.3em] text-retro-maroon uppercase mb-6">
          SIDE A // 404 // SIDE B
        </span>

        <h1 className="text-[10rem] md:text-[18rem] font-black leading-none text-retro-cream font-display-impact tracking-tighter select-none">
          404
        </h1>

        <div className="w-full h-0.5 bg-retro-maroon mb-2" />

        <div className="flex items-center gap-3 mb-6">
          <div className="w-12 h-px bg-retro-maroon" />
          <span className="text-retro-maroon text-[8px] font-mono">* * *</span>
          <div className="w-12 h-px bg-retro-maroon" />
        </div>

        <p className="font-mono text-xs tracking-[0.15em] text-retro-cream/50 uppercase mb-3">
          TRACK NOT FOUND
        </p>

        <p className="max-w-md mb-12 text-sm leading-relaxed md:text-base font-mono text-retro-cream/70">
          {t("notFound.message")}
        </p>

        <div className="w-16 h-px bg-retro-maroon/50 mb-8" />

        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-retro-maroon text-retro-cream px-8 py-3 text-[11px] font-black tracking-[0.2em] uppercase transition-all duration-200 hover:bg-black hover:scale-105"
        >
          <FaHome />
          {t("notFound.cta")}
        </Link>
      </div>
    </section>
  );
}
