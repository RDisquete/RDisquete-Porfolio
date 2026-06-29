import { useState, useEffect } from "react";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { FaInstagram, FaWhatsapp, FaEnvelope, FaLinkedin, FaFileDownload, FaGithub } from "react-icons/fa";
import { useTranslation } from "react-i18next";

function useOrientation() {
  const [isLandscape, setIsLandscape] = useState(
    typeof window !== "undefined" ? window.innerWidth > window.innerHeight : false
  );
  useEffect(() => {
    const check = () => setIsLandscape(window.innerWidth > window.innerHeight);
    window.addEventListener("resize", check);
    window.addEventListener("orientationchange", check);
    return () => {
      window.removeEventListener("resize", check);
      window.removeEventListener("orientationchange", check);
    };
  }, []);
  return isLandscape;
}

const socials = [
  { label: "Instagram", url: "https://www.instagram.com/rdisquete/", key: "instagram" },
  { label: "WhatsApp", url: "https://wa.me/+34648791998", key: "whatsapp" },
  { label: "Email", url: "mailto:rafael.doradozamoro@gmail.com", key: "email" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/rafael-dorado-zamoro/", key: "linkedin" },
  { label: "Descargar CV", url: "/images/CV_Rafael_Dorado_Zamoro.pdf", download: true, key: "cv" },
  { label: "GitHub", url: "https://github.com/RDisquete", key: "github" },
];

const frontendSlideIn: Variants = {
  hidden: { x: "100%" },
  visible: { x: "0%", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 } },
};

const verticalSweep: Variants = {
  hidden: { opacity: 0, y: 20, scaleY: 0.8 },
  visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.4, ease: [0.17, 0.67, 0.83, 0.67] } },
};

const blockFade: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.1, ease: "easeOut" } },
};

const renderIcon = (label: string) => {
  const props = { className: "w-7 h-7 md:w-8 md:h-8", "aria-hidden": true as const };
  switch (label) {
    case "Instagram": return <FaInstagram {...props} />;
    case "WhatsApp": return <FaWhatsapp {...props} />;
    case "Email": return <FaEnvelope {...props} />;
    case "LinkedIn": return <FaLinkedin {...props} />;
    case "Descargar CV": return <FaFileDownload {...props} />;
    case "GitHub": return <FaGithub {...props} />;
    default: return null;
  }
};

function HeroMobile() {
  const { t } = useTranslation();
  const isLandscape = useOrientation();
  const nameSize = isLandscape ? "11vw" : "23vw";
  const rdSize = isLandscape ? "6vw" : "13vw";
  const ptTop = isLandscape ? "pt-12" : "pt-20";

  return (
    <section
      className="relative w-full text-[#cdc69c] overflow-hidden border-8 border-[#bbb88c] bg-neutral-900"
      style={{ minHeight: "100dvh" }}
    >
      <picture className="absolute inset-0 z-[50] pointer-events-none">
        <img
          src="/images/texturas/abstract-crumpled-mobile.webp"
          alt="" role="presentation"
          className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale mix-blend-multiply"
          fetchPriority="high"
        />
      </picture>

      <motion.div
        className="absolute top-0 right-[0%] z-[35] h-full flex items-center pointer-events-none"
        variants={frontendSlideIn} initial="hidden" animate="visible"
      >
        <span
          className="font-display-impact font-black select-none text-[#cdc69c]"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: "clamp(5rem, 20vw, 14rem)",
            lineHeight: 0.82,
            letterSpacing: "-0.04em",
            opacity: 0.15,
          }}
        >
          FRONTEND
        </span>
      </motion.div>

      <div
        className={`relative z-20 flex flex-col justify-center px-5 ${ptTop} ${isLandscape ? "pb-16" : "pb-28"}`}
        style={{ minHeight: "100dvh" }}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
        >
          <h1
            className="font-display-impact font-light uppercase text-[#cdc69c] leading-none"
            style={{ fontSize: nameSize, letterSpacing: "-0.03em" }}
          >
            RAFA
          </h1>
        </motion.div>

        <motion.div
          className="ml-[5vw]"
          initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        >
          <span
            className="font-display-impact font-extrabold uppercase text-[#8e2b27] leading-none block"
            style={{ fontSize: nameSize, letterSpacing: "-0.04em" }}
          >
            DORADO
          </span>
        </motion.div>

        <motion.div
          className="self-end"
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.3, delay: 0.3 }}
        >
          <p
            className="font-vintage-cursive font-bold text-[#cdc69c] leading-none"
            style={{ fontSize: rdSize }}
          >
            rdisquete
          </p>
        </motion.div>
      </div>

      {!isLandscape && (
        <motion.div
          className="absolute left-0 right-0 z-30 h-10 bg-[#8e2b27] flex items-center"
          style={{ bottom: "40px" }}
          initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="px-5 text-[10px] font-mono tracking-widest text-[#cdc69c] font-extrabold truncate uppercase">
            console.log('Frontend Developer — React & TypeScript')
          </p>
        </motion.div>
      )}

      <nav className="absolute bottom-1 left-0 w-full z-40 flex justify-center" aria-label={t("hero.aria.social")}>
        <div className="flex space-x-5">
          {socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" aria-label={t(`hero.aria.${s.key}`)}
              className="text-[#cdc69c] hover:text-[#8e2b27] transition-colors">
              {renderIcon(s.label)}
            </a>
          ))}
        </div>
      </nav>
    </section>
  );
}

function HeroDesktop() {
  const { t } = useTranslation();
  const prefersReducedMotion = useReducedMotion();
  return (
    <section className="relative w-full h-screen text-[#cdc69c] overflow-hidden border-8 border-[#bbb88c] bg-neutral-900">
      <picture className="absolute inset-0 z-[100] pointer-events-none">
        <source srcSet="/images/texturas/abstract-crumpled.webp" media="(min-width: 768px)" />
        <img src="/images/texturas/abstract-crumpled.webp" alt="" role="presentation"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover opacity-25 grayscale mix-blend-multiply" />
      </picture>

      {!prefersReducedMotion && (
        <motion.div
          className="absolute z-20 top-1/4 left-0 w-full h-[2px] bg-[#cdc69c] opacity-30"
          animate={{ x: ["0%", "100%"], opacity: [0.2, 0.8, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />
      )}

      <motion.div
        className="absolute bottom-16 left-0 right-0 z-[60] w-full h-16 bg-[#8e2b27] opacity-95 flex items-center"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <p className="px-8 text-xl font-mono tracking-widest text-[#cdc69c] font-extrabold truncate uppercase">
          console.log('Frontend Developer — React & TypeScript')
        </p>
      </motion.div>

      <motion.div
        className="absolute top-0 right-[0%] z-[35] h-full flex items-center pointer-events-none"
        variants={frontendSlideIn}
        initial="hidden"
        animate="visible"
      >
        <span
          className="font-display-impact font-black select-none text-[#cdc69c]"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
            fontSize: "clamp(6rem, 20vw, 14rem)",
            lineHeight: 0.82,
            letterSpacing: "-0.04em",
            opacity: 0.15,
          }}
        >
          FRONTEND
        </span>
      </motion.div>

      <div className="relative w-full h-full px-8 pt-8">
        <div className="absolute w-full top-[5%] left-0 z-[70]">
          <motion.div className="absolute z-20 top-0 left-0 translate-x-[5vw] translate-y-[-20%]"
            variants={verticalSweep} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
            <h1 className="text-[14vw] leading-[0.8] tracking-tight transform scale-y-[1.6] text-[#cdc69c] uppercase font-display-impact font-light whitespace-nowrap">
              RAFA
            </h1>
          </motion.div>

          <motion.div className="absolute z-40 left-[10vw] top-[19vw]"
            variants={verticalSweep} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
            <span className="text-[20vw] leading-[0.8] tracking-tight transform scale-y-[1.6] text-[#8e2b27] uppercase font-display-impact font-extrabold whitespace-nowrap block">
              DORADO
            </span>
          </motion.div>
        </div>
      </div>

      <motion.div className="absolute z-[70] right-[8vw] bottom-[42px]"
        variants={blockFade} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
        <p className="text-[8vw] font-bold text-[#cdc69c] font-vintage-cursive leading-none whitespace-nowrap drop-shadow-2xl">
          rdisquete
        </p>
      </motion.div>

      <nav className="absolute bottom-4 left-0 w-full z-[110] px-8 flex justify-center" aria-label={t("hero.aria.social")}>
        <div className="flex space-x-6">
          {socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" aria-label={t(`hero.aria.${s.key}`)}
              className="text-[#cdc69c] hover:text-[#8e2b27] transition-colors">
              {renderIcon(s.label)}
            </a>
          ))}
        </div>
      </nav>
    </section>
  );
}

export default function HeroSection() {
  return (
    <div className="relative w-full bg-neutral-900">
      <div className="md:hidden">
        <HeroMobile />
      </div>
      <div className="hidden md:block">
        <HeroDesktop />
      </div>
    </div>
  );
}