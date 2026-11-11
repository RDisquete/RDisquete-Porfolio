import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { buildPageMeta } from "../seo/routeSeo";
import { applyPageMeta, removePageJsonLd } from "../seo/domMeta";

export function usePageMeta(): void {
  const { pathname } = useLocation();
  const { t, i18n } = useTranslation();
  const language = i18n.language ?? "es";

  useEffect(() => {
    const meta = buildPageMeta(pathname, (key) => t(key), language);
    applyPageMeta(document, meta);
    return () => {
      removePageJsonLd(document);
    };
  }, [pathname, language, t]);
}
