import React from "react";
import { useState, useEffect } from "react";
import { motion, type Variants, useReducedMotion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { socialLinks, renderSocialIcon } from "../data/socialLinks.tsx";

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

function HeroMobile() {
  const { t } = useTranslation();
  const isLandscape = useOrientation();

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
        className="absolute top-0 right-[-5%] z-[35] h-full flex items-center pointer-events-none"
        variants={frontendSlideIn} initial="hidden" animate="visible"
      >
        <span
          className="font-display-impact font-black select-none text-[#cdc69c]"
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg) scaleX(1.3)",
            fontSize: "clamp(7rem, 28vw, 18rem)",
            lineHeight: 0.9,
            letterSpacing: "-0.02em",
            opacity: 0.08,
            transformOrigin: "center center",
          }}
        >
          FRONTEND
        </span>
      </motion.div>

      <div
        className="relative z-20 flex flex-col justify-center px-5 pb-24"
        style={{ minHeight: "100dvh" }}
      >
        <div className="flex flex-col items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h1
              className="font-display-impact font-light uppercase text-[#cdc69c] leading-[0.75]"
              style={{ fontSize: isLandscape ? "14vw" : "28vw", letterSpacing: "-0.03em" }}
            >
              RAFA
            </h1>
          </motion.div>

          <motion.div
            className={isLandscape ? "ml-[3vw]" : "-mt-3 ml-[2vw]"}
            initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <span
              className="font-display-impact font-extrabold uppercase text-[#8e2b27] leading-[0.75] block"
              style={{ fontSize: isLandscape ? "14vw" : "32vw", letterSpacing: "-0.04em" }}
            >
              DORADO
            </span>
          </motion.div>
        </div>

        <div className={isLandscape ? "absolute right-4 bottom-[52px]" : "absolute right-5 z-50"}
          style={isLandscape ? {} : { bottom: "90px" }}>
          <motion.div
            className="text-right"
            initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: 0.3 }}
          >
            <p
              className="font-vintage-cursive font-bold text-[#cdc69c] leading-none"
              style={{ fontSize: isLandscape ? "6vw" : "13vw" }}
            >
              rdisquete
            </p>
          </motion.div>
        </div>
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
          {socialLinks.map((s) => (
            <a key={s.key} href={s.href} target={s.download ? undefined : "_blank"} rel="noopener noreferrer" aria-label={t(`hero.aria.${s.key}`)}
              className="text-[#cdc69c] hover:text-[#8e2b27] transition-colors" {...(s.download ? { download: '' } : {})}>
              {renderSocialIcon(s.key)}
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
          {socialLinks.map((s) => (
            <a key={s.key} href={s.href} target={s.download ? undefined : "_blank"} rel="noopener noreferrer" aria-label={t(`hero.aria.${s.key}`)}
              className="text-[#cdc69c] hover:text-[#8e2b27] transition-colors" {...(s.download ? { download: '' } : {})}>
              {renderSocialIcon(s.key)}
            </a>
          ))}
        </div>
      </nav>
    </section>
  );
}

export default function HeroSection() {
  const [isDesktop, setIsDesktop] = useState(
    typeof window !== "undefined" ? window.innerWidth >= 768 : false
  );
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  return (
    <div className="relative w-full bg-neutral-900">
      {isDesktop ? <HeroDesktop /> : <HeroMobile />}
    </div>
  );
}