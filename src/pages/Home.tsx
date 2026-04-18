import { motion, type Variants } from "framer-motion";
import { FaInstagram, FaWhatsapp, FaEnvelope, FaLinkedin, FaFileDownload, FaGithub } from "react-icons/fa";
import {
  SiReact, SiSupabase, SiFramer, SiTailwindcss,
  SiVite, SiTypescript, SiHtml5
} from "react-icons/si";

import Manifesto from "../components/Manifesto";
import ProyectosHome from "../components/ProyectosHome";
import SobreMi from "../components/Sobremi";

const projects = [
  {
    title: "Invitación R&M",
    url: "https://rdisquetesevadeboda.netlify.app/",
    img: "/images/invitacionboda.webp",
    github: "https://github.com/RDisquete/InvitacionDemo",
    video: "/images/invitacionboda.mp4",
    techStack: "React, Supabase, Framer Motion, Tailwind",
    techIcons: [
      <SiReact key="re" />,
      <SiSupabase key="su" />,
      <SiFramer key="fr" />,
      <SiTailwindcss key="tw" />,
    ],
    pressingType: "First" as const,
    desc: "Sistema de invitación con acceso mediante QR que permite a los invitados subir y compartir fotos del evento en tiempo real sin aplicaciones externas.",
    context: "Proyecto desarrollado para un evento real con necesidad de compartir recuerdos de forma inmediata desde móvil.",
    problem: "Los invitados no tenían una forma sencilla de centralizar fotos sin usar apps externas ni registros complejos.",
    solution: [
      "Acceso mediante QR sin fricción",
      "Autenticación para contenido privado",
      "Subida de imágenes en tiempo real",
      "Storage con Supabase",
      "Optimización de imágenes en cliente",
      "Diseño mobile-first",
    ],
    result: "Plataforma usada en un evento real donde los invitados compartieron recuerdos en segundos desde el móvil.",
  },
  {
    title: "The Pueblo",
    url: "https://thepueblo.es/",
    img: "/images/ThePueblo.webp",
    github: "https://github.com/RDisquete/ThePuebloStudio",
    video: "/images/thePueblo%20Hover.mp4",
    techStack: "React, Vite, Tailwind CSS",
    techIcons: [
      <SiReact key="re" />,
      <SiVite key="vi" />,
      <SiTailwindcss key="tw" />
    ],
    pressingType: 'First',
    desc: "Plataforma visual-first optimizada para contenido audiovisual pesado, combinando imágenes y video dinámico sin comprometer la velocidad de carga.",
    context: "Web desarrollada para una productora audiovisual con necesidad de mostrar contenido visual de alta calidad manteniendo una experiencia fluida.",
    problem: "El uso intensivo de imágenes y video (4K, galerías extensas) impactaba directamente en el rendimiento y la experiencia de usuario.",
    solution: [
      "Arquitectura SPA con React y routing dinámico",
      "Carga progresiva de contenido (imagen → video)",
      "Lazy loading de video optimizado",
      "Sistema híbrido de interacción para reducir consumo de recursos",
      "Optimización de tipografías para evitar layout shift",
      "Animaciones eficientes con CSS nativo y AOS"
    ],

    result: "Plataforma visual fluida capaz de manejar contenido multimedia pesado manteniendo tiempos de carga rápidos y una navegación sin fricción."
  },
 
  {
    title: "Nor3xtrem",
    url: "https://nor3xtrem.es/",
    img: "/Nor3xtreme.webp",
    github: "https://github.com/RDisquete/Nor3Xtrem-2026",

    video: "/Nor3xtremeHover.mp4",

    techStack: "React, Vite, Tailwind CSS",

    techIcons: [
        <SiReact key="re" />,
        <SiVite key="vi" />,
        <SiTailwindcss key="tw" />
    ],

    pressingType: 'First',
    desc: "Plataforma digital optimizada para una marcha cicloturista de alta exigencia, diseñada para funcionar en condiciones de baja conectividad y alto tráfico durante el evento.",
    context: "Plataforma desarrollada para una de las marchas cicloturistas más exigentes de España, con alta carga de usuarios en día de evento.",
    problem: "El acceso a información crítica (rutas, reglamento y clasificaciones) debía mantenerse rápido y estable incluso en zonas con baja cobertura móvil.",
    solution: [
        "Arquitectura SPA con React",
        "Optimización de build con Vite para carga ultrarrápida",
        "Diseño mobile-first orientado a uso en carretera",
        "Dark mode de alto contraste para exteriores",
        "Componentes modulares reutilizables",
        "Animaciones suaves con Framer Motion para UX fluida"
    ],
    result: "Plataforma estable y rápida utilizada en un entorno real de alta demanda durante el evento cicloturista."
},

{
  title: "Matter & Sound",
  url: "https://mattersoundrdisquete.netlify.app/",
  img: "/MatterSound.webp",
  github: "https://github.com/RDisquete/MatterSound",

  video: "/MattersoundHover.mp4",

  techStack: "React, TypeScript, Web Audio API, HTML5 Canvas, Tailwind CSS",

  techIcons: [
      <SiReact key="re" />,
      <SiTypescript key="ts" />,
      <SiHtml5 key="h5" />
  ],
  pressingType: 'Bootleg',
  desc: "Visualizador de audio en tiempo real que transforma frecuencias en sistemas de partículas mediante FFT y renderizado en Canvas.",
  context: "Proyecto experimental enfocado en la visualización de señales de audio en tiempo real mediante procesamiento en cliente.",
  problem: "Representar datos de audio en tiempo real sin bloquear el renderizado ni generar re-renders innecesarios en React.",
  solution: [
      "Procesamiento de señal con Web Audio API",
      "Análisis de frecuencias mediante FFT",
      "Renderizado de partículas con HTML5 Canvas a 60 FPS",
      "Uso de useRef para evitar re-renderizados en React",
      "Separación entre lógica de audio y motor visual",
      "Gestión eficiente del loop de animación"
  ],
  result: "Sistema fluido de visualización en tiempo real capaz de procesar audio y renderizar múltiples partículas sin degradar el rendimiento."
},  

{
  title: "Armario Escénico",
  url: "https://armarioescenico.netlify.app/",
  img: "/sambrona.webp",
  github: "https://github.com/RDisquete/ArmarioEscenico",

  video: "/sambronaHover.mp4",

  techStack: "React, TypeScript, Tailwind CSS",

  techIcons: [
      <SiReact key="re" />,
      <SiTypescript key="ts" />,
      <SiTailwindcss key="tw" />
  ],
  pressingType: 'First',
  desc: "Catálogo digital de vestuario histórico con filtrado avanzado y persistencia de selección para facilitar el alquiler sin fricción.",
  context: "Plataforma desarrollada para digitalizar el archivo de vestuario de una asociación cultural y facilitar su uso por figurinistas y productores.",
  problem: "El inventario físico dificultaba la búsqueda de prendas específicas, obligando a procesos manuales lentos y poco eficientes.",
  solution: [
      "Sistema de filtrado multi-criterio (época, tipo, materiales)",
      "Optimización de renders con useMemo",
      "Persistencia de selección con localStorage",
      "Arquitectura de componentes reutilizables",
      "Diseño mobile-first orientado a consulta rápida"
  ],
  result: "Herramienta digital que permite localizar y seleccionar vestuario de forma ágil, reduciendo el tiempo de búsqueda y mejorando la operativa del archivo."
},

{
  title: "ED Movil",
  url: "https://edmovil.netlify.app",
  img: "/images/edmovil.webp",
  github: "https://github.com/RDisquete/EDmovil",
  video: "/images/edHover.mp4",
  techStack: "React, TypeScript, Tailwind CSS",
  techIcons: [
      <SiReact key="re" />,
      <SiTypescript key="ts" />,
      <SiTailwindcss key="tw" />
  ],
  pressingType: 'First',
  desc: "Plataforma de contratación de servicios optimizada para comparar tarifas de forma rápida y guiar al usuario hacia la conversión.",
  context: "Web desarrollada para un servicio de telecomunicaciones centrada en facilitar la contratación de fibra, móvil y televisión.",
  problem: "Los usuarios necesitaban comparar múltiples tarifas de forma clara y rápida sin fricción en el proceso de decisión.",
  solution: [
      "Diseño centrado en conversión con CTAs estratégicos",
      "Estructura clara para comparación de tarifas",
      "Responsive design optimizado para móvil",
      "Validación de formularios de contacto",
      "Testing con Vitest y Testing Library",
      "Integración en flujo CI/CD para evitar regresiones"
  ],

  result: "Plataforma clara y accesible que facilita la comparación de servicios y mejora la experiencia de contratación del usuario."
},

];

const socials = [
  { label: "Instagram", url: "https://www.instagram.com/rdisquete/", aria: "Visitar mi perfil de Instagram" },
  { label: "WhatsApp", url: "https://wa.me/+34648791998", aria: "Contactar por WhatsApp" },
  { label: "Email", url: "mailto:rafael.doradozamoro@gmail.com", aria: "Enviar un correo electrónico" },
  { label: "LinkedIn", url: "https://www.linkedin.com/in/rafael-dorado-zamoro/", aria: "Ver mi perfil profesional en LinkedIn" },
  { label: "Descargar CV", url: "/images/CV_Rafael_Dorado_Zamoro.pdf", download: true, aria: "Descargar currículum vitae en PDF" },
  { label: "GitHub", url: "https://github.com/RDisquete", aria: "Ver mis proyectos en GitHub" },
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

        {/* Textos Principales */}
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

          {/* Sello 2026 */}
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