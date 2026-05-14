import { useState, useEffect } from "react";
import { motion, type Variants } from "framer-motion";
import { FaInstagram, FaWhatsapp, FaEnvelope, FaLinkedin, FaFileDownload, FaGithub,  } from "react-icons/fa";
import {
  SiReact, SiSupabase, SiFramer, SiTailwindcss,
  SiVite, SiTypescript, SiHtml5
} from "react-icons/si";

import Manifesto from "../components/Manifesto";
import ProyectosHome from "../components/ProyectosHome";
import SobreMi from "../components/Sobremi";


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

const projects = [
  {
    title: "Wedding Album System — R&M",
    url: "https://rdisquetesevadeboda.netlify.app/",
    img: "/images/invitacionboda.webp",
    github: "https://github.com/RDisquete/InvitacionDemo",
    video: "/images/invitacionboda.mp4",
    techStack: "React, Supabase, Framer Motion, Tailwind",
    techIcons: [
      <SiReact key="re" />,
      <SiSupabase key="su" />,
      <SiFramer key="fr" />,
      <SiTailwindcss key="tw" />
    ],
    pressingType: "First" as const,
  
    desc: "Invitación digital interactiva para eventos que centraliza toda la información, la historia de la pareja y una galería colaborativa en tiempo real accesible mediante QR.",
  
    context: "Proyecto desarrollado para una boda real con la necesidad de centralizar información, gestionar invitados y compartir recuerdos sin depender de múltiples herramientas.",
  
    problem: "La información del evento, la gestión de invitados y las fotos estaban dispersas en distintos canales, generando fricción tanto para los novios como para los invitados.",
  
    solution: [
      "Invitación digital con toda la información del evento",
      "Enlaces directos a ubicaciones clave (Google Maps)",
      "Sección con historia de la pareja",
      "Galería donde los invitados pueden ver, subir y descargar fotos",
      "Acceso a zona privada mediante QR sin fricción",
      "Formulario de confirmación conectado a Google Sheets",
      "Compresión de imágenes en cliente para mejorar rendimiento",
      "Diseño pensado para uso rápido desde móvil"
    ],
  
    result: "Los invitados accedieron a toda la información desde un único lugar y compartieron fotos en tiempo real, mientras que los novios gestionaron confirmaciones automáticamente sin procesos manuales.",
  
    impact: "Validado en un entorno real con usuarios no técnicos."
  },
  {
    title: "skyRESERVE",
    url: "https://sky-reserve.netlify.app/",
    img: "/images/skyreserve.webp",
    github: "https://github.com/RDisquete/skyReserve",
    video: "/images/skyReservehover.mp4",
    techStack: "React 19, TypeScript, Supabase, Zustand, Tailwind, Framer Motion, Vitest",
    techIcons: [
        <SiReact key="re" />,
        <SiTypescript key="ts" />,
        <SiSupabase key="su" />,
        <SiTailwindcss key="tw" />,
        <SiFramer key="fr" />,
    ],
    pressingType: "First" as const,
    desc: "Plataforma de reservas para servicios de drones con autenticación, panel admin y gestión de disponibilidad.",
    context: "Proyecto enfocado en arquitectura frontend moderna, estado global y experiencia de usuario.",
    problem: "La idea era construir una aplicación escalable con lógica real de reservas, autenticación y gestión de estado.",
    solution: [
        "Sistema de reservas conectado a Supabase",
        "Autenticación y control de roles",
        "Panel de administración protegido",
        "Estado global con Zustand",
        "Hooks personalizados",
        "Responsive design y dark mode",
        "Animaciones con Framer Motion",
        "Testing con Vitest"
    ],

    result: "El proyecto evolucionó hacia una aplicación frontend con estructura cercana a un entorno profesional.",

    impact: "Proyecto utilizado para profundizar en frontend moderno y arquitectura de aplicaciones."
},

  {
    title: "The Pueblo", url: "https://thepueblo.es/", img: "/images/ThePueblo.webp",
    github: "https://github.com/RDisquete/ThePuebloStudio", video: "/images/thePueblo%20Hover.mp4",
    techStack: "React, Vite, Tailwind CSS",
    techIcons: [<SiReact key="re" />, <SiVite key="vi" />, <SiTailwindcss key="tw" />],
    pressingType: 'First',
    desc: "Plataforma visual-first optimizada para contenido audiovisual pesado, combinando imágenes y video dinámico sin comprometer la velocidad de carga.",
    context: "Web desarrollada para una productora audiovisual con necesidad de mostrar contenido visual de alta calidad manteniendo una experiencia fluida.",
    problem: "El uso intensivo de imágenes y video (4K, galerías extensas) impactaba directamente en el rendimiento y la experiencia de usuario.",
    solution: ["Arquitectura SPA con React y routing dinámico", "Carga progresiva de contenido (imagen → video)", "Lazy loading de video optimizado", "Sistema híbrido de interacción para reducir consumo de recursos", "Optimización de tipografías para evitar layout shift", "Animaciones eficientes con CSS nativo y AOS"],
    result: "Plataforma visual fluida capaz de manejar contenido multimedia pesado manteniendo tiempos de carga rápidos y una navegación sin fricción."
  },
  {
    title: "Nor3xtrem", url: "https://nor3xtrem.es/", img: "/Nor3xtreme.webp",
    github: "https://github.com/RDisquete/Nor3Xtrem-2026", video: "/Nor3xtremeHover.mp4",
    techStack: "React, Vite, Tailwind CSS",
    techIcons: [<SiReact key="re" />, <SiVite key="vi" />, <SiTailwindcss key="tw" />],
    pressingType: 'First',
    desc: "Plataforma digital optimizada para una marcha cicloturista de alta exigencia, diseñada para funcionar en condiciones de baja conectividad y alto tráfico durante el evento.",
    context: "Plataforma desarrollada para una de las marchas cicloturistas más exigentes de España, con alta carga de usuarios en día de evento.",
    problem: "El acceso a información crítica (rutas, reglamento y clasificaciones) debía mantenerse rápido y estable incluso en zonas con baja cobertura móvil.",
    solution: ["Arquitectura SPA con React", "Optimización de build con Vite para carga ultrarrápida", "Diseño mobile-first orientado a uso en carretera", "Dark mode de alto contraste para exteriores", "Componentes modulares reutilizables", "Animaciones suaves con Framer Motion para UX fluida"],
    result: "Plataforma estable y rápida utilizada en un entorno real de alta demanda durante el evento cicloturista."
  },
  {
    title: "Matter & Sound", url: "https://mattersoundrdisquete.netlify.app/", img: "/MatterSound.webp",
    github: "https://github.com/RDisquete/MatterSound", video: "/MattersoundHover.mp4",
    techStack: "React, TypeScript, Web Audio API, HTML5 Canvas, Tailwind CSS",
    techIcons: [<SiReact key="re" />, <SiTypescript key="ts" />, <SiHtml5 key="h5" />],
    pressingType: 'Bootleg',
    desc: "Visualizador de audio en tiempo real que transforma frecuencias en sistemas de partículas mediante FFT y renderizado en Canvas.",
    context: "Proyecto experimental enfocado en la visualización de señales de audio en tiempo real mediante procesamiento en cliente.",
    problem: "Representar datos de audio en tiempo real sin bloquear el renderizado ni generar re-renders innecesarios en React.",
    solution: ["Procesamiento de señal con Web Audio API", "Análisis de frecuencias mediante FFT", "Renderizado de partículas con HTML5 Canvas a 60 FPS", "Uso de useRef para evitar re-renderizados en React", "Separación entre lógica de audio y motor visual", "Gestión eficiente del loop de animación"],
    result: "Sistema fluido de visualización en tiempo real capaz de procesar audio y renderizar múltiples partículas sin degradar el rendimiento."
  },
  {
    title: "Armario Escénico", url: "https://armarioescenico.netlify.app/", img: "/sambrona.webp",
    github: "https://github.com/RDisquete/ArmarioEscenico", video: "/sambronaHover.mp4",
    techStack: "React, TypeScript, Tailwind CSS",
    techIcons: [<SiReact key="re" />, <SiTypescript key="ts" />, <SiTailwindcss key="tw" />],
    pressingType: 'First',
    desc: "Catálogo digital de vestuario histórico con filtrado avanzado y persistencia de selección para facilitar el alquiler sin fricción.",
    context: "Plataforma desarrollada para digitalizar el archivo de vestuario de una asociación cultural y facilitar su uso por figurinistas y productores.",
    problem: "El inventario físico dificultaba la búsqueda de prendas específicas, obligando a procesos manuales lentos y poco eficientes.",
    solution: ["Sistema de filtrado multi-criterio (época, tipo, materiales)", "Optimización de renders con useMemo", "Persistencia de selección con localStorage", "Arquitectura de componentes reutilizables", "Diseño mobile-first orientado a consulta rápida"],
    result: "Herramienta digital que permite localizar y seleccionar vestuario de forma ágil, reduciendo el tiempo de búsqueda y mejorando la operativa del archivo."
  },
  {
    title: "Infra.RD",
    url: "https://rdisquetehealthmonitor.netlify.app/",
    img: "/infrard.webp",
    github: "https://github.com/RDisquete/health-monitor",
    video: "/infrard.mp4",
    techStack: "Next.js, TypeScript, Tailwind CSS, Supabase",
    techIcons: [
        <SiReact key="re" />,
        <SiTypescript key="ts" />,
        <SiTailwindcss key="tw" />,
        <SiSupabase key="su" />
    ],
    pressingType: 'First',
    desc: "Sistema de observabilidad y monitorización de servicios que detecta caídas, latencia y degradaciones en tiempo real con alertas automáticas.",
    context: "Proyecto orientado a supervisar el estado de múltiples servicios web de forma continua, eliminando la necesidad de comprobación manual.",
    problem: "La falta de visibilidad centralizada sobre el estado de varios endpoints hacía imposible detectar degradaciones o caídas de forma inmediata sin supervisión constante.",
    solution: [
        "Health-checks automatizados mediante cron jobs",
        "Registro histórico de latencia en base de datos",
        "Sistema de alertas automáticas por email ante fallos críticos",
        "Simulación de escenarios (OK / DOWN / TIMEOUT) para testing",
        "Dashboard técnico para lectura rápida del estado del sistema",
        "Arquitectura desacoplada entre monitorización y capa de visualización"
    ],
    result: "Permite detectar y notificar incidencias en servicios de forma automática, reduciendo drásticamente el tiempo de reacción ante fallos en producción.",
    impact: "Reduce el tiempo de detección de fallos de servicios al automatizar la monitorización y alertas, eliminando la necesidad de comprobación manual constante."
}
];

const socials = [
  { label: "Instagram", url: "https://www.instagram.com/rdisquete/", aria: "Visitar mi perfil de Instagram" },
  { label: "WhatsApp", url: "https://wa.me/+34648791998", aria: "Contactar por WhatsApp" },
  { label: "Email", url: "mailto:rafael.doradozamoro@gmail.com", aria: "Enviar un correo electrónico" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/rafael-dorado-zamoro/", aria: "Ver mi perfil profesional en LinkedIn" },
  { label: "Descargar CV", url: "/images/CV_Rafael_Dorado_Zamoro.pdf", download: true, aria: "Descargar currículum vitae en PDF" },
  { label: "GitHub", url: "https://github.com/RDisquete", aria: "Ver mis proyectos en GitHub" },
];

const verticalSweep: Variants = {
  hidden: { opacity: 0, y: 20, scaleY: 0.8 },
  visible: { opacity: 1, y: 0, scaleY: 1, transition: { duration: 0.4, ease: [0.17, 0.67, 0.83, 0.67] } },
};

const blockFade: Variants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.1, ease: "easeOut" } },
};

const frontendSlideIn: Variants = {
  hidden: { x: "100%" },
  visible: { x: "0%", transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 } },
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

// ─── HERO MÓVIL ───────────────────────────────────────────────────────────────
function HeroMobile() {
  const isLandscape = useOrientation();

  // Tamaños según orientación
  const nameSize   = isLandscape ? "11vw" : "23vw";
  const rdSize     = isLandscape ? "6vw"  : "13vw";
  const ptTop      = isLandscape ? "pt-12" : "pt-20";

  return (
    <section
      className="relative w-full text-[#cdc69c] overflow-hidden border-8 border-[#bbb88c] bg-neutral-900"
      style={{ minHeight: "100dvh" }}
    >
      {/* Textura */}
      <picture className="absolute inset-0 z-[50] pointer-events-none">
        <img
          src="/images/texturas/abstract-crumpled-mobile.webp"
          alt="" role="presentation"
          className="absolute inset-0 w-full h-full object-cover opacity-20 grayscale mix-blend-multiply"
        />
      </picture>

      {/* FRONTEND fondo */}
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

      {/* Textos principales */}
      <div
        className={`relative z-20 flex flex-col justify-center px-5 ${ptTop} ${isLandscape ? "pb-16" : "pb-28"}`}
        style={{ minHeight: "100dvh" }}
      >
        {/* RAFA */}
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

        {/* DORADO */}
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

        {/* rdisquete */}
        <motion.div
          className="self-end mr-[10vw] mt-2"
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

      {/* Barra roja — solo en portrait */}
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

      {/* Redes sociales */}
      <nav className="absolute bottom-1 left-0 w-full z-40 flex justify-center" aria-label="Redes sociales">
        <div className="flex space-x-5">
          {socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" aria-label={s.aria}
              className="text-[#cdc69c] hover:text-[#8e2b27] transition-colors">
              {renderIcon(s.label)}
            </a>
          ))}
        </div>
      </nav>
    </section>
  );
}

// ─── HERO DESKTOP ─────────────────────────────────────────────────────────────
function HeroDesktop() {
  
  return (
    <section className="relative w-full h-screen text-[#cdc69c] overflow-hidden border-8 border-[#bbb88c] bg-neutral-900">

      <picture className="absolute inset-0 z-[100] pointer-events-none">
        <source srcSet="/images/texturas/abstract-crumpled.webp" media="(min-width: 768px)" />
        <img src="/images/texturas/abstract-crumpled-desktop.webp" alt="" role="presentation"
          fetchPriority="high"
          className="absolute inset-0 w-full h-full object-cover opacity-25 grayscale mix-blend-multiply" />
      </picture>

      <motion.div
        className="absolute z-20 top-1/4 left-0 w-full h-[2px] bg-[#cdc69c] opacity-30"
        animate={{ x: ["0%", "100%"], opacity: [0.2, 0.8, 0.4] }}
        transition={{ duration: 6, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }}
      />

      <motion.div
        className="absolute bottom-16 left-0 right-0 z-[60] w-full h-16 bg-[#8e2b27] opacity-95 flex items-center"
        initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        <p className="px-8 text-xl font-mono tracking-widest text-[#cdc69c] font-extrabold truncate uppercase">
          console.log('Frontend: React & TS')
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

          <motion.div className="absolute z-[70] left-[55vw] top-[39vw]"
            variants={blockFade} initial="hidden" animate="visible" transition={{ delay: 0.3 }}>
            <p className="text-[8vw] font-bold text-[#cdc69c] font-vintage-cursive leading-none whitespace-nowrap drop-shadow-2xl">
              rdisquete
            </p>
          </motion.div>
        </div>
      </div>

      <nav className="absolute bottom-4 left-0 w-full z-[110] px-8 flex justify-center" aria-label="Redes sociales">
        <div className="flex space-x-6">
          {socials.map((s) => (
            <a key={s.label} href={s.url} target="_blank" rel="noreferrer" aria-label={s.aria}
              className="text-[#cdc69c] hover:text-[#8e2b27] transition-colors">
              {renderIcon(s.label)}
            </a>
          ))}
        </div>
      </nav>
    </section>
  );
}

// ─── EXPORT ───────────────────────────────────────────────────────────────────
export default function HeroSection() {
  return (
    <div className="relative w-full bg-neutral-900">
      <div className="md:hidden">
        <HeroMobile />
      </div>
      <div className="hidden md:block">
        <HeroDesktop />
      </div>
      <main className="relative">
        <Manifesto />
        <ProyectosHome projects={projects} />
        <SobreMi />
      </main>
    </div>
  );
}