import React from "react";
import { useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { socialLinks, renderSocialIcon } from "../data/socialLinks";

const BG = "#171717";
const PAPER = "#e5dfbc"; 
const ACCENT = "#8e2b27";

export default function Footer() {
  const { t } = useTranslation();
  const timeRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const h = String(now.getHours()).padStart(2, "0");
      const m = String(now.getMinutes()).padStart(2, "0");
      const s = String(now.getSeconds()).padStart(2, "0");
      const f = String(Math.floor(Math.random() * 24)).padStart(2, "0");
      if (timeRef.current) timeRef.current.textContent = `${h}:${m}:${s}:${f}`;
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <footer
      className="relative flex flex-col items-center w-full py-6 border-t-[1px] select-none footer-root"
      style={{ backgroundColor: BG, borderColor: `${PAPER}20` }}
    >
      <div className="absolute flex items-center gap-2 pointer-events-none left-4 bottom-2 opacity-50">
        <div className="w-1 h-3" style={{ backgroundColor: ACCENT }} />
        <span className="text-[8px] font-mono tracking-[0.2em]" style={{ color: PAPER }}>
          {t("footer.decorative")}
        </span>
      </div>

      <div className="absolute text-right pointer-events-none right-4 bottom-2 opacity-50">
        <span className="text-[8px] font-mono tracking-widest uppercase block mb-[2px]" style={{ color: PAPER }}>
          Live Master
        </span>
        <span ref={timeRef} className="text-[10px] font-mono font-bold" style={{ color: ACCENT }}>
          00:00:00:00
        </span>
      </div>
      <nav aria-label={t("footer.aria.contactLinks")} className="z-10">
        <div className="flex text-2xl gap-7" style={{ color: PAPER }}>
          {socialLinks.map((link) => (
            <a
              key={link.key}
              href={link.href}
              target={link.download ? undefined : "_blank"}
              rel="noopener noreferrer"
              aria-label={t(`hero.aria.${link.key}`)}
              className="transition-all duration-300 hover:text-[#8e2b27] transform hover:scale-110"
              {...(link.download ? { download: '' } : {})}
            >
              {renderSocialIcon(link.key, "text-2xl")}
            </a>
          ))}
        </div>
      </nav>
    </footer>
  );
}