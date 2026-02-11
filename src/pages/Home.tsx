import { motion, type Variants } from "framer-motion";
import { FaInstagram, FaWhatsapp, FaEnvelope, FaLinkedin, FaFileDownload, FaGithub } from "react-icons/fa";

import Manifesto from "../components/Manifesto";
import ProyectosHome from "../components/ProyectosHome";
import SobreMi from "../components/Sobremi";

// --- CONFIGURACIÓN DE DATOS ---
const projects = [
  { title: "The Pueblo", url: "https://thepueblo.es/", img: "/images/ThePuebloHome.webp", desc: "Enfocado en contenido visual moderno.", video: "/images/thePueblo Hover.mp4", tech: ["React, Vite, Tailwind CSS"] },
  { title: "Nor3xtrem", url: "https://nor3xtrem.es/", img: "/Nor3xtreme.webp", desc: "Presencia digital de una marcha cicloturista.", video: "/Nor3xtremeHover.mp4", tech: ["React, Vite, Tailwind CSS"] },
  { title: "Matter & Sound", url: "https://mattersoundrdisquete.netlify.app/", img: "/MatterSound.webp", desc: "Estación de visualización generativa...", video: "/MattersoundHover.mp4", tech: ["React", "TypeScript", "Web Audio API", "HTML5 Canvas", "Tailwind CSS"] },
  { title: "Armario Escénico", url: "https://armarioescenico.netlify.app/", img: "/sambrona.webp", desc: "Gestión de archivo de vestuario histórico...", video: "/sambronaHover.mp4", tech: ["React, TypeScript, Tailwind CSS"] },
  { title: "ED Movil", url: "https://edmovil.netlify.app/", img: "/images/edmovil.webp", desc: "Enfocada en la presentación de tarifas...", video: "/images/edHover.mp4", tech: ["React, TypeScript, Tailwind CSS"] },
  { title: "AM Movil Repair", desc: "Web de servicios enfocada en la reparación...", img: "/images/am movil repair.webp", url: "https://ammovilrepair.com", video: "/amhover.mp4", tech: ["React, Tailwind, Google Maps"] },
];

const socials = [
  { label: "Instagram", url: "https://www.instagram.com/rdisquete/", aria: "Visitar mi perfil de Instagram" },
  { label: "WhatsApp", url: "https://wa.me/+34648791998", aria: "Contactar por WhatsApp" },
  { label: "Email", url: "mailto:rafael.doradozamoro@gmail.com", aria: "Enviar un correo electrónico" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/rafael-dorado-zamoro/", aria: "Ver mi perfil profesional en LinkedIn" },
  { label: "Descargar CV", url: "/images/CV_Rafael_Dorado_Zamoro.pdf", download: true, aria: "Descargar currículum vitae en PDF" },
  { label: "GitHub", url: "https://github.com/RDisquete", aria: "Ver mis proyectos en GitHub" }
];

// --- ANIMACIONES ---
const verticalSweep: Variants = {
  hidden: { opacity: 0, y: 20, scaleY: 0.8 },
  visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.4, ease: [0.17, 0.67, 0.83, 0.67] } },
};

const blockFade: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.1, ease: "easeOut" } },
};

const drawSilhouette: Variants = {
  hidden: { opacity: 0.3, scaleX: 0 },
  visible: { opacity: 1, scaleX: 1, transition: { duration: 0.5, ease: "linear", delay: 0.7 } },
};

const renderIcon = (label: string) => {
  const props = { className: "w-7 h-7 md:w-8 md:h-8", "aria-hidden": true };
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

export default function HeroSection() {
  return (
    <div className="relative w-full bg-neutral-900">
      <section className="relative w-full h-screen text-[#cdc69c] overflow-hidden border-8 border-[#bbb88c] bg-neutral-900">
        
        <picture className="absolute inset-0 z-[100] pointer-events-none">
          <source srcSet="/images/texturas/abstract-crumpled-mobile.webp" media="(max-width: 767px)" />
          <source srcSet="/images/texturas/abstract-crumpled.webp" media="(min-width: 768px)" />
          <img 
            src="/images/texturas/abstract-crumpled-desktop.webp" 
            alt="" 
            role="presentation" 
            fetchPriority="high" 
            className="absolute inset-0 w-full h-full object-cover opacity-20 md:opacity-25 grayscale mix-blend-multiply"
          />
        </picture>

        <motion.div
          className="hidden md:block absolute z-20 top-1/4 left-0 w-full h-[2px] bg-[#cdc69c] opacity-30"
          animate={{ x: ["0%", "100%"], opacity: [0.2, 0.8, 0.4] }}
          transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
        />

        <motion.div 
          className="absolute bottom-24 md:bottom-16 left-0 right-0 z-[60] w-full h-12 md:h-16 bg-[#8e2b27] opacity-95 flex items-center"
          initial={{ scaleX: 0 }} 
          animate={{ scaleX: 1 }} 
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <p className="px-6 md:px-8 text-sm md:text-xl font-mono tracking-widest text-[#cdc69c] font-extrabold truncate uppercase">
            console.log('ART IS CODE')
          </p>
        </motion.div>

        <picture className="absolute top-0 right-0 z-[10] md:z-[80] mr-[-20px] md:mr-[-16px] w-[60vw] md:w-[25vw] h-full pointer-events-none">
          <source srcSet="/images/siluetalineas-mobile.webp" media="(max-width: 767px)" />
          <source srcSet="/images/siluetalineas.webp" media="(min-width: 768px)" />
          <motion.img 
            src="/images/siluetalineas-desktop.webp" 
            alt="Silueta Rafa Dorado"
            variants={drawSilhouette} 
            initial="hidden" 
            animate="visible" 
            className="w-full h-full object-cover object-bottom contrast-125 opacity-40 md:opacity-100 origin-right" 
          />
        </picture>

        {/* Textos Principales (Adaptativos con clases responsive) */}
        <div className="relative w-full h-full px-6 md:px-8 pt-8">
          <div className="absolute w-full top-[35%] md:top-[5%] left-0 z-[70]">
            <motion.div className="absolute z-20 top-0 left-0 translate-x-[5vw] translate-y-[-20%]" variants={verticalSweep} initial="hidden" animate="visible" transition={{ delay: 0.1 }}>
              <h1 className="text-[16vw] md:text-[14vw] leading-[0.8] tracking-tight transform scale-y-[1.6] text-[#cdc69c] uppercase font-display-impact font-light whitespace-nowrap">RAFA</h1>
            </motion.div>
            <motion.div className="absolute z-40 left-[10vw] top-[30vw] md:top-[19vw]" variants={verticalSweep} initial="hidden" animate="visible" transition={{ delay: 0.2 }}>
              <span className="text-[20vw] leading-[0.8] tracking-tight transform scale-y-[1.6] text-[#8e2b27] uppercase font-display-impact font-extrabold whitespace-nowrap block">DORADO</span>
            </motion.div>
            <motion.div className="absolute z-[70] left-[30vw] md:left-[55vw] top-[60vw] md:top-[39vw]" variants={blockFade} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
              <p className="text-[15vw] md:text-[8vw] font-bold text-[#cdc69c] font-vintage-cursive leading-none whitespace-nowrap drop-shadow-2xl">rdisquete</p>
            </motion.div>
          </div>

          {/* Sello 2026 (Adaptativo) */}
          <motion.div
            initial={{ opacity: 0, scale: 3, rotate: -20, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, rotate: 8, filter: "blur(0px)" }}
            transition={{ delay: 1.4, type: "spring", stiffness: 260, damping: 20 }}
            className="absolute z-[95] right-[4vw] md:right-[6vw] top-[35vw] md:top-[4vw] bg-[#cdc69c] p-1 md:p-1.5 shadow-[8px_8px_0px_rgba(0,0,0,1)] md:shadow-[12px_12px_0px_rgba(0,0,0,1)] border-2 border-black/40 pointer-events-none"
          >
            <div className="border border-black md:border-2 px-3 py-2 md:px-6 md:py-4 flex flex-col items-center bg-[#d4cea6] relative">
              <div className="absolute -left-3 md:-left-5 top-1/2 -translate-y-1/2 w-3 md:w-6 h-10 md:h-20 bg-[#8e2b27] border border-black flex items-center justify-center">
                <span className="text-[1.5vw] md:text-[0.45vw] font-black text-[#cdc69c] rotate-90 whitespace-nowrap uppercase">2026</span>
              </div>
              <div className="pl-2 md:pl-4 text-center">
                <h2 className="text-[4vw] md:text-[2vw] font-display-impact uppercase text-black leading-none italic">FRONTEND</h2>
                <div className="flex items-center justify-center gap-1 md:gap-2 my-1 md:my-1.5">
                  <span className="text-[2vw] md:text-[0.9vw] font-display-impact text-[#8e2b27]">React · TypeScript</span>
                </div>
                <h2 className="text-[2.5vw] md:text-[1.2vw] font-display-impact uppercase text-black leading-none">UI
                  <span className="text-[#8e2b27]">   & </span>Web Performance
                </h2>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Navegación Redes Sociales */}
        <nav className="absolute bottom-4 left-0 w-full z-[110] px-4 md:px-8 flex justify-center" aria-label="Redes sociales">
          <div className="flex space-x-6">
            {socials.map((s) => (
              <a 
                key={s.label} 
                href={s.url} 
                target="_blank" 
                rel="noreferrer" 
                aria-label={s.aria} 
                className="text-[#cdc69c] hover:text-[#8e2b27] transition-colors"
              >
                {renderIcon(s.label)}
              </a>
            ))}
          </div>
        </nav>
      </section>

      <main className="relative">
        <Manifesto />
        <ProyectosHome projects={projects} />
        <SobreMi />
      </main>
    </div>
  );
}