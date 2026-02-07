import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import type { Variants } from "framer-motion";
import { useMemo, useEffect, useState, useCallback } from "react";
import {
  FaLinkedin,
  FaInstagram,
  FaEnvelope,
  FaWhatsapp,
  FaFileDownload,
  FaGithub
} from "react-icons/fa";
import { ArrowRight } from "lucide-react"; 
import { useForm } from "@formspree/react";

const ACCENT_COLOR = "#681f1d";
const CARD_LIGHT = "#ffffff";
const BACKGROUND_SECUNDARY = "#cdc69c";
const TEXTURE_PAPER = "/images/texturas/textura1.webp"; 
const TEXTURE_BG = "/images/texturas/top-view-of-crumpled-vintage.webp"; 

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
  const formKey = import.meta.env.VITE_FORMSPREE_KEY;
  const [state, handleSubmitFormspree, reset] = useForm(formKey || "");
  
  const [showSuccess, setShowSuccess] = useState(false);
  const [formIteration, setFormIteration] = useState(0);

  const phrases = useMemo(() => [
    "Me puedes contar tu idea, o simplemente decirme hola 👋",
    "Un formulario nunca muerde.",
    "¿Tienes dudas? ¡Pregúntame sin miedo!",
    "Aquí empieza todo gran proyecto…",
    "Respondo rápido, prometido."
  ], []);

  const [index, setIndex] = useState(0);

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
      <div 
        className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
        style={{ backgroundImage: `url(${TEXTURE_BG})`, backgroundSize: 'cover', backgroundPosition: 'center' }} 
      />

      <div className="absolute z-0 w-full overflow-hidden text-center pointer-events-none select-none top-10 md:top-20">
        <h1 className="text-[18vw] font-black leading-none uppercase tracking-tighter text-white/10">
          CONTACT
        </h1>
      </div>

      <div className="relative z-10 flex flex-col items-center w-full max-w-xl">
        
        <motion.div className="mb-8 text-center" {...animationProps}>
            <span className="font-mono text-[10px] tracking-[0.5em] text-[#cdc69c] uppercase font-bold">
                Session No. 2026_A
            </span>
            <h2 className="mt-2 text-4xl font-black leading-none tracking-tighter uppercase md:text-6xl" 
                style={{ color: BACKGROUND_SECUNDARY }}>
                GRABAR <span className="italic text-white underline decoration-1">TRACK</span>
            </h2>
        </motion.div>
        
        <motion.section
          className="relative w-full p-6 md:p-12 shadow-[30px_30px_0px_rgba(0,0,0,0.4)] border-[3px] border-black"
          style={{ backgroundColor: CARD_LIGHT }}
          {...animationProps}
        >
          <div className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-multiply" 
               style={{ backgroundImage: `url(${TEXTURE_PAPER})`, backgroundSize: 'cover' }} />

          <div className="relative z-10">
            <div className="flex items-center justify-between pb-3 mb-8 border-b-2 border-black/20 font-mono text-[10px] font-black uppercase italic">
              <span className="text-[#8e2b27]">// INPUT_SIGNAL_RECORDS</span>
              <div className="flex gap-1.5">
                  {[1,2,3].map(i => <div key={i} className="w-2 h-2 rounded-full bg-[#8e2b27]" />)}
              </div>
            </div>

            <form 
                key={formIteration} 
                className="flex flex-col gap-6" 
                onSubmit={handleSubmitFormspree}
            >
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div className="border-b-2 border-black/10 focus-within:border-[#8e2b27] transition-all">
                  <label className="block font-mono text-[9px] font-black text-[#8e2b27] uppercase mb-1">Producer_Name</label>
                  <input type="text" name="nombre" placeholder="TU NOMBRE..." required
                    className="w-full py-1 font-mono text-base text-black uppercase bg-transparent outline-none placeholder:opacity-20" />
                </div>
                <div className="border-b-2 border-black/10 focus-within:border-[#8e2b27] transition-all">
                  <label className="block font-mono text-[9px] font-black text-[#8e2b27] uppercase mb-1">Return_Path</label>
                  <input type="email" name="email" placeholder="EMAIL..." required
                    className="w-full py-1 font-mono text-base text-black uppercase bg-transparent outline-none placeholder:opacity-20" />
                </div>
              </div>

              <div className="border-b-2 border-black/10 focus-within:border-[#8e2b27] transition-all">
                <label className="block font-mono text-[9px] font-black text-[#8e2b27] uppercase mb-1">Project_Brief</label>
                <textarea name="mensaje" placeholder="ESCRIBE TU IDEA AQUÍ..." required
                  className="w-full bg-transparent py-1 font-mono text-base outline-none min-h-[100px] resize-none text-black placeholder:opacity-20" />
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
                      <ArrowRight className="w-6 h-6 text-black transition-colors group-hover:text-white" />
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
                  <div className="border-[10px] border-green-800 text-green-800 font-black p-6 text-5xl md:text-6xl uppercase tracking-tighter bg-white shadow-2xl mix-blend-multiply opacity-95">
                    GOT_IT!
                  </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.section>

        <div className="flex flex-col items-center gap-6 mt-12">
            <div className="flex gap-8">
                {socialLinks.map((s) => (
                    <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}
                        className="text-[#cdc69c] hover:text-white transition-all hover:-translate-y-1 text-2xl">
                        <s.icon />
                    </a>
                ))}
            </div>
            
            <div className="flex items-center gap-3 font-mono text-[11px] text-white/40 italic min-h-[20px]">
                <span className="w-1.5 h-1.5 bg-[#cdc69c] rounded-full animate-pulse flex-shrink-0" />
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
        </div>
      </div>
    </main>
  );
}