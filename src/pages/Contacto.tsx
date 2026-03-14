import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useMemo, useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaWhatsapp,
  FaFileDownload,
  FaGithub,
  FaArrowRight
} from "react-icons/fa";
import { useForm } from "@formspree/react";

const ACCENT_COLOR = "#681f1d";
const CARD_LIGHT = "#ffffff";
const BACKGROUND_SECUNDARY = "#e5dfbc";

const TEXTURE_PAPER = "/images/texturas/textura1.webp";
const TEXTURE_BG = "/images/texturas/top-view-of-crumpled-vintage.webp";
const TEXTURE_MOBILE = "/images/texturas/abstract-crumpled-mobile.webp";
const TEXTURE_DESKTOP = "/images/texturas/abstract-crumpled.webp";

const socialLinks = [
  { icon: FaInstagram, label: "Instagram", href: "https://www.instagram.com/rdisquete/" },
  { icon: FaWhatsapp, label: "WhatsApp", href: "https://wa.me/+34648791998" },
  { icon: FaEnvelope, label: "Email", href: "mailto:rafael.doradozamoro@gmail.com" },
  { icon: FaLinkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/rafael-dorado-zamoro/" },
  { icon: FaFileDownload, href: "/images/CV_Rafael_Dorado_Zamoro.pdf", label: "Descargar CV", download: true },
  { icon: FaGithub, label: "GitHub", href: "https://github.com/RDisquete" }
];

const sectionVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" }
  }
};

export default function Contacto() {
  const navigate = useNavigate();
  const formKey = import.meta.env.VITE_FORMSPREE_KEY;
  const [state, handleSubmitFormspree, reset] = useForm(formKey || "");

  const [showSuccess, setShowSuccess] = useState(false);
  const [formIteration, setFormIteration] = useState(0);
  const [index, setIndex] = useState(0);

  const phrases = useMemo(() => [
    "Me puedes contar tu idea, o simplemente decirme hola 👋",
    "Un formulario nunca muerde.",
    "¿Tienes dudas? ¡Pregúntame sin miedo!",
    "Aquí empieza todo gran proyecto…",
    "Respondo rápido, prometido."
  ], []);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((current) => (current + 1) % phrases.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [phrases.length]);

  const prefersReducedMotion = useReducedMotion();

  const handleReset = useCallback(() => {
    reset();
    setFormIteration(prev => prev + 1);
  }, [reset]);

  useEffect(() => {
    if (state.succeeded) {
      setShowSuccess(true);
      const timer = setTimeout(() => {
        setShowSuccess(false);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [state.succeeded]);

  const animationProps = {
    variants: sectionVariants,
    initial: prefersReducedMotion ? { opacity: 1, y: 0 } : "initial",
    whileInView: "animate",
    viewport: { once: true }
  };

  return (
    <main
      className="relative flex flex-col items-center justify-center min-h-screen px-4 py-12 overflow-hidden"
      style={{ backgroundColor: ACCENT_COLOR }}
    >
      <picture className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-overlay">
        <source srcSet={TEXTURE_MOBILE} media="(max-width: 767px)" />
        <source srcSet={TEXTURE_DESKTOP} media="(min-width: 768px)" />
        <img
  src={TEXTURE_BG}
  alt=""
  role="presentation"
  fetchPriority="high" // Corregido: de 'fetchpriority' a 'fetchPriority'
  className="object-cover w-full h-full"
  width="1920"
  height="1080"
/>
      </picture>

      <div className="absolute z-0 w-full overflow-hidden text-center pointer-events-none select-none top-10 md:top-20">
        <h1 className="text-[18vw] font-black leading-none uppercase tracking-tighter text-white/10">
          CONTACT
        </h1>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-xl">

        <motion.div className="mb-8 text-center" {...animationProps}>
          <span className="font-mono text-[10px] tracking-[0.5em] text-[#cdc69c] uppercase font-black">
            Session No. 2026_A
          </span>
          <h2 className="mt-2 text-4xl font-black leading-none tracking-tighter uppercase md:text-6xl"
            style={{ color: BACKGROUND_SECUNDARY }}>
            GRABAR <span className="italic text-white underline decoration-1">TRACK</span>
          </h2>
        </motion.div>

        <motion.section
          className="relative w-full p-6 md:p-12 shadow-[20px_20px_0px_rgba(0,0,0,0.5)] border-[3px] border-black"
          style={{ backgroundColor: CARD_LIGHT }}
          {...animationProps}
        >
          <img
            src={TEXTURE_PAPER}
            alt=""
            role="presentation"
            loading="eager"
            width="600"
            height="800"
            className="absolute inset-0 object-cover w-full h-full z-0 pointer-events-none opacity-30 mix-blend-multiply"
          />

          <div className="relative z-10">
            <header className="flex items-center justify-between pb-3 mb-8 border-b-2 border-black/20 font-mono text-[10px] font-black uppercase italic">
              <span className="text-[#8e2b27]">// INPUT_SIGNAL_RECORDS</span>
              <div className="flex gap-1.5" aria-hidden="true">
                {[1, 2, 3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-[#8e2b27]" />)}
              </div>
            </header>

            <form
              key={formIteration}
              className="flex flex-col gap-6"
              onSubmit={handleSubmitFormspree}
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="border-b-2 border-black/10 focus-within:border-[#8e2b27] transition-all">
                  <label htmlFor="nombre" className="block font-mono text-[10px] font-black text-[#8e2b27] uppercase mb-1">Producer_Name</label>
                  <input type="text" id="nombre" name="nombre" placeholder="TU NOMBRE..." required
                    className="w-full py-1 font-mono text-base text-black uppercase bg-transparent outline-none placeholder:text-black/20" />
                </div>
                <div className="border-b-2 border-black/10 focus-within:border-[#8e2b27] transition-all">
                  <label htmlFor="email" className="block font-mono text-[10px] font-black text-[#8e2b27] uppercase mb-1">Return_Path</label>
                  <input type="email" id="email" name="email" placeholder="EMAIL..." required
                    className="w-full py-1 font-mono text-base text-black uppercase bg-transparent outline-none placeholder:text-black/20" />
                </div>
              </div>

              <div className="border-b-2 border-black/10 focus-within:border-[#8e2b27] transition-all">
                <label htmlFor="mensaje" className="block font-mono text-[10px] font-black text-[#8e2b27] uppercase mb-1">Project_Brief</label>
                <textarea id="mensaje" name="mensaje" placeholder="ESCRIBE TU IDEA AQUÍ..." required
                  className="w-full bg-transparent py-1 font-mono text-base outline-none min-h-[100px] resize-none text-black placeholder:text-black/20" />
              </div>

              <div className="flex justify-start mt-4">
                <button
                  type="submit"
                  disabled={state.submitting}
                  className="flex items-center gap-4 group w-fit disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <motion.div
                    whileHover={!state.submitting ? { x: 10 } : {}}
                    className="flex items-center gap-4"
                  >
                    <div className="flex items-center justify-center w-12 h-12 transition-all duration-300 border-2 border-black rounded-full group-hover:bg-black">
                      <FaArrowRight className="w-5 h-5 text-black transition-colors group-hover:text-white" />
                    </div>
                    <div className="flex flex-col text-left">
                      <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#8e2b27]">
                        {state.submitting ? "Sending Signal..." : "Ready to Send?"}
                      </span>
                      <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-black group-hover:text-[#8e2b27] transition-colors">
                        {state.submitting ? "ENVIANDO..." : "PUSH_TO_START"}
                      </span>
                    </div>
                  </motion.div>
                </button>
              </div>
            </form>
          </div>

          <AnimatePresence onExitComplete={handleReset}>
            {showSuccess && (
              <motion.div
                key="success-overlay"
                initial={{ scale: 2, opacity: 0 }}
                animate={{ scale: 1, opacity: 1, rotate: -12 }}
                exit={{ scale: 0.5, opacity: 0 }}
                className="absolute inset-0 z-50 flex items-center justify-center bg-white/40 backdrop-blur-[4px] pointer-events-none"
              >
                <div className="border-[10px] border-green-800 text-green-800 font-black p-6 text-5xl md:text-6xl uppercase tracking-tighter bg-white shadow-2xl">
                  GOT_IT!
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        <footer className="flex flex-col items-center gap-6 mt-12 w-full">
          <div className="flex gap-8">
            {socialLinks.map((s) => (
              <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer"
                aria-label={`Visitar mi perfil de ${s.label}`}
                className="text-[#e5dfbc] hover:text-white transition-all hover:-translate-y-1 text-2xl">
                <s.icon aria-hidden="true" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-3 font-mono text-[11px] text-white/60 italic min-h-[20px]">
            <span className="w-1.5 h-1.5 bg-[#cdc69c] rounded-full animate-pulse flex-shrink-0" aria-hidden="true" />
            <AnimatePresence mode="wait">
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                transition={{ duration: 0.3 }}
              >
                {`console.log: "${phrases[index]}"`}
              </motion.span>
            </AnimatePresence>
          </div>

          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-4 group w-fit mt-12 mb-8 border-none outline-none cursor-pointer"
            aria-label="Volver a la página principal"
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#cdc69c] group-hover:bg-[#cdc69c] transition-all duration-300">
              <FaArrowRight className="w-4 h-4 text-[#cdc69c] rotate-[180deg] group-hover:text-[#681f1d] transition-colors" />
            </div>
            <div className="flex flex-col text-left">
             
              <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[#cdc69c] group-hover:text-white transition-colors">
              RETURN_TO_HOME
              </span>
            </div>
          </button>
        </footer>
      </div>
    </main>
  );
}