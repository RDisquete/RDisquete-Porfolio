import React from 'react';
import { motion, type Variants } from "framer-motion";
import { FaInstagram, FaWhatsapp, FaEnvelope, FaLinkedin, FaFileDownload, FaGithub } from "react-icons/fa";

import Manifesto from "../components/Manifesto";
import ProyectosHome from "../components/ProyectosHome";
import SobreMi from "../components/Sobremi";

const projects = [
  {
    title: "The Pueblo",
    url: "https://thepueblo.es/",
    img: "/images/ThePueblo.jpg",
    desc: "Enfocado en contenido visual moderno.",
    video: "/images/thePueblo Hover.mp4",
    tech: ["React, Vite, Tailwind CSS"]
  },
  {
    title: "Nor3xtrem",
    url: "https://nor3xtrem.es/",
    img: "/Nor3xtreme.png",
    desc: "Presencia digital de una marcha cicloturista.",
    video: "/Nor3xtremeHover.mp4",
    tech: ["React, Vite, Tailwind CSS"]
  },
  {
    title: "ED Movil",
    url: "https://edmovil.netlify.app/",
    img: "/images/edmovil.png",
    desc: "Enfocada en la presentación de tarifas y productos.",
    video: "/images/edHover.mp4",
    tech: ["React, TypeScript, Tailwind CSS"]
  },
  {
    title: "Web RDisquete Photo",
    desc: "Combina fotografía y desarrollo web.",
    img: "/images/rdisquetePhoto.jpg",
    url: "https://rdisquetephoto.netlify.app/",
    video: "/RPhotoHover.mp4",
    tech: ["React, TypeScript, React Slick"]
  },
  {
    title: "AM Movil Repair",
    desc: "Web de servicios enfocada en la reparación de móviles.",
    img: "/images/am movil repair.jpg",
    url: "https://ammovilrepair.com",
    video: "/amhover.mp4",
    tech: ["React, Tailwind, Google Maps"]
  },
];

const socials = [
  { label: "Instagram", url: "https://www.instagram.com/rdisquete/" },
  { label: "WhatsApp", url: "https://wa.me/+34648791998" },
  { label: "Email", url: "mailto:rafael.doradozamoro@gmail.com" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/rafael-dorado-zamoro/" },
  { label: "Descargar CV", url: "/images/CV_Rafael_Dorado_Zamoro.pdf", download: true },
  {label: "GitHub", url:"https://github.com/RafaDZdeveloper"}
];

const TEXTURA_URL = "/images/texturas/abstract-crumpled-black-paper-texture-background-f-2025-02-22-04-38-59-utc.jpg";
const SILUETA_URL = "/siluetalineas.png";

const ESTILO_OVERLAY: React.CSSProperties = {
  backgroundImage: `url(${TEXTURA_URL})`,
  backgroundSize: 'cover',
  opacity: 0.25,
  top: 0, left: 0, width: '100vw', height: '100vh',
  zIndex: 9999,
  pointerEvents: 'none',
};

const verticalSweep: Variants = {
  hidden: { opacity: 0, y: 20, scaleY: 0.8 },
  visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.4, ease: [0.17, 0.67, 0.83, 0.67] } },
};

const blockFade: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.1, ease: "easeOut" } },
};

const drawSilhouette: Variants = {
  hidden: { opacity: 0.5, scaleX: 0 },
  visible: { opacity: 1, scaleX: 1, transition: { duration: 0.5, ease: "linear", delay: 0.7 } },
};

export default function HeroSection() {
  
  const renderIcon = (label: string) => {
    const props = { className: "w-7 h-7" };
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

  return (
    <div className="relative w-full bg-neutral-900">
      <section className="relative w-full h-screen text-[#cdc69c] overflow-hidden border-8 border-[#bbb88c] bg-neutral-900">
        <div className="absolute inset-0 z-[100] pointer-events-none" style={ESTILO_OVERLAY} />

        <div className="relative block w-full h-full md:hidden">
          <motion.img
            src={SILUETA_URL}
            variants={drawSilhouette} initial="hidden" animate="visible"
            className="absolute top-0 right-[-15%] z-0 h-full object-cover opacity-40 landscape:opacity-10"
          />
          <div className="relative z-50 flex flex-col justify-center h-full px-6 pt-10 landscape:pt-20">
            <div className="flex flex-col space-y-[-2vw] landscape:space-y-[-5px]">
              <motion.div variants={verticalSweep} initial="hidden" animate="visible">
                <h2 className="text-[18vw] landscape:text-[35px] leading-none tracking-tighter uppercase font-display-impact font-light text-[#cdc69c]">RAFA</h2>
              </motion.div>
              <motion.div variants={verticalSweep} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
                <h3 className="text-[clamp(18vw,24vw,28vw)] landscape:text-[55px] leading-[0.8] tracking-tighter uppercase font-display-impact font-extrabold text-[#8e2b27] whitespace-nowrap">DORADO</h3>
              </motion.div>
              <motion.p variants={blockFade} initial="hidden" animate="visible" transition={{ delay: 0.3 }} className="text-[12vw] landscape:text-[22px] font-bold text-[#cdc69c] font-vintage-cursive mt-1">rdisquete</motion.p>
            </div>
          </div>
          <div className="absolute bottom-20 left-0 w-full h-10 bg-[#8e2b27] opacity-70 flex items-center px-4">
            <p className="font-mono text-[3.5vw] font-extrabold uppercase tracking-widest text-[#cdc69c]">console.log('ART IS CODE')</p>
          </div>
        </div>

        <div className="relative hidden w-full h-full md:block">
          <motion.div className="absolute z-20 top-1/4 left-0 w-full h-[2px] bg-[#cdc69c] opacity-30" animate={{ x: ["0%", "100%"], opacity: [0.2, 0.8, 0.4] }} transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }} />
          <motion.img src={SILUETA_URL} variants={drawSilhouette} initial="hidden" animate="visible" className="absolute top-0 right-0 z-[80] mr-[-16px] w-[25vw] h-full object-cover object-bottom contrast-125 transform origin-right" />
          <div className="relative w-full h-full px-8 pt-8">
            <div className="absolute w-full top-[5%] left-0">
              <motion.div className="absolute z-10 top-0 left-0 translate-x-[5vw] translate-y-[-20%]" variants={verticalSweep} initial="hidden" animate="visible" transition={{ delay: 0.05 }}><h1 className="text-[14vw] leading-[0.8] tracking-tight transform scale-y-[1.6] text-black/30 uppercase font-display-impact font-extrabold whitespace-nowrap">RAFA</h1></motion.div>
              <motion.div className="absolute z-20 top-0 left-0 translate-x-[5vw] translate-y-[-20%]" variants={verticalSweep} initial="hidden" animate="visible" transition={{ delay: 0.1 }}><h2 className="text-[14vw] leading-[0.8] tracking-tight transform scale-y-[1.6] text-[#cdc69c] uppercase font-display-impact font-light whitespace-nowrap">RAFA</h2></motion.div>
              <motion.div className="absolute z-40 left-[10vw] top-[19vw]" variants={verticalSweep} initial="hidden" animate="visible" transition={{ delay: 0.2 }}><h3 className="text-[20vw] leading-[0.8] tracking-tight transform scale-y-[1.6] text-[#8e2b27] uppercase font-display-impact font-extrabold whitespace-nowrap">DORADO</h3></motion.div>
              <motion.div className="absolute z-[70] left-[55vw] top-[39vw]" variants={blockFade} initial="hidden" animate="visible" transition={{ delay: 0.3 }}><p className="text-[8vw] font-bold text-[#cdc69c] font-vintage-cursive leading-none whitespace-nowrap">rdisquete</p></motion.div>
            </div>
          </div>
          <motion.div className="absolute bottom-16 left-0 right-0 z-[60] w-full h-16 bg-[#8e2b27] opacity-95" initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.6, duration: 0.5 }}><p className="absolute top-1/2 left-8 transform -translate-y-1/2 text-xl font-mono tracking-widest text-[#cdc69c] font-extrabold">console.log('ART IS CODE')</p></motion.div>
        </div>

        <div className="absolute bottom-4 left-0 w-full z-[110] px-4 md:px-8 flex justify-center">
          <div className="flex space-x-6">
            {socials.map((social) => (
              <a key={social.label} href={social.url} target="_blank" rel="noreferrer" className="text-[#cdc69c] text-3xl hover:text-[#8e2b27] transition-colors">{renderIcon(social.label)}</a>
            ))}
          </div>
        </div>
      </section>

      <main className="relative" style={{ position: 'relative' }}>
        <Manifesto />
        <ProyectosHome projects={projects} />
        <SobreMi />
      </main>
    </div>
  );
}