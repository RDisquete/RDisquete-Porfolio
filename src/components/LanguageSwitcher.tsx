import { useTranslation } from "react-i18next";

const RETRO_CREAM = "#cdc69c";

interface LanguageSwitcherProps {
  mobile?: boolean;
}

export default function LanguageSwitcher({ mobile = false }: LanguageSwitcherProps) {
  const { t, i18n } = useTranslation();
  const current = i18n.language?.startsWith("en") ? "en" : "es";

  const toggle = () => {
    i18n.changeLanguage(current === "en" ? "es" : "en");
  };

  if (mobile) {
    return (
      <div
        className="flex items-center gap-0 border-2"
        style={{ borderColor: RETRO_CREAM }}
        role="group"
        aria-label={t("languageSwitcher.ariaLabel")}
      >
        {(["en", "es"] as const).map((lang) => {
          const isActive = current === lang;
          return (
            <button
              key={lang}
              onClick={() => i18n.changeLanguage(lang)}
              aria-pressed={isActive}
              className="px-6 py-2 text-sm font-black tracking-[0.2em] uppercase transition-all duration-200"
              style={{
                fontFamily: "'Montserrat', sans-serif",
                backgroundColor: isActive ? RETRO_CREAM : "transparent",
                color: isActive ? "#171717" : RETRO_CREAM,
              }}
            >
              {lang.toUpperCase()}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <button
      onClick={toggle}
      aria-label={t("languageSwitcher.ariaLabel")}
      className="font-mono text-[11px] font-black tracking-[0.15em] uppercase transition-colors duration-200 hover:scale-110"
      style={{ color: RETRO_CREAM }}
    >
      {current === "en" ? "ES" : "EN"}
    </button>
  );
}