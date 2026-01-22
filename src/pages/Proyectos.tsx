import { useMemo, useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt, FaTimes } from "react-icons/fa";

// --- CONFIGURACIÓN DE ESTILOS ---
const COLORS = {
    bg: "#cdc69c", 
    text: "#0f0f0f",
    accent: "#8e2b27",
    cardLight: "#f5f3e7",
};

const TEXTURE_URL = "/images/texturas/textura1.jpg";

const COLLAGE_ROTATIONS = [
    "rotate-[-1deg]", "rotate-[2deg] -translate-y-1",
    "-rotate-1.5 translate-y-3", "rotate-2.5 -translate-y-2",
];

// --- INTERFACES ---
export interface Proyecto {
    title: string;
    desc: string;
    img: string;
    url: string;
    video?: string;
    techStack?: string;
    pressingType?: 'First' | 'Remaster' | 'Bootleg';
}

// --- DATOS ---
const PROJECTS: Proyecto[] = [
    {
        title: "The Pueblo",
        url: "https://thepueblo.es/",
        img: "/images/ThePueblo.jpg",
        desc: "Productora creativa de imágenes para redes sociales, enfocada en crear contenido visual moderno.",
        video: "/images/thePueblo Hover.mp4",
        techStack: "React, Vite, Tailwind CSS",
        pressingType: 'First'
    },
    {
        title: "Nor3xtrem",
        url: "https://nor3xtrem.es/",
        img: "/Nor3xtreme.png",
        desc: "Presencia digital para una de las marchas cicloturistas más exigentes de España.",
        video: "/Nor3xtremeHover.mp4",
        techStack: "React, Vite, Tailwind CSS",
        pressingType: 'First'
    }, {
        title: "Armario Escénico",
        url: "https://armarioescenico.netlify.app/",
        img: "/sambrona.jpg",
        desc: "Gestión de archivo de vestuario histórico con búsqueda precisa.",
        video: "/sambronaHover.mp4",
        techStack: "React, TypeScript, Tailwind CSS",
        pressingType: 'Bootleg'
    },
    {
        title: "ED Movil",
        url: "https://edmovil.netlify.app",
        img: "/images/edmovil.png",
        desc: "Web responsive enfocada en la velocidad de carga y adaptabilidad.",
        video: "/images/edHover.mp4",
        techStack: "React, TypeScript, Tailwind CSS",
        pressingType: 'First'
    },
   
    {
        title: "Web RDisquete Photo",
        url: "https://rdisquetephoto.netlify.app/",
        img: "/images/rdisquetePhoto.jpg",
        desc: "Portafolio fotográfico con componentes reutilizables y carruseles fluidos.",
        video: "/RPhotoHover.mp4",
        techStack: "React, TypeScript, React Slick",
        pressingType: 'Bootleg'
    },
    {
        title: "AM Movil Repair",
        url: "https://ammovilrepair.com",
        img: "/images/am movil repair.jpg",
        desc: "Servicio técnico con integración de formularios dinámicos y mapas.",
        video: "/amhover.mp4",
        techStack: "React, Tailwind, Google Maps",
        pressingType: 'First'
    },
    {
        title: "Valle Escondido",
        url: "https://valleescondido.netlify.app/",
        img: "/Captura de pantalla 2025-08-11 a las 20.57.32.png",
        desc: "Demo de evento con animaciones complejas y transiciones fluidas.",
        video: "/home web.mp4",
        techStack: "React, Framer Motion, Tailwind CSS",
        pressingType: 'Remaster'
    },
    {
        title: "Rdisquete mk II",
        url: "https://rdisquetemk2.netlify.app/",
        img: "/rdisquetemk2.jpg",
        desc: "Portfolio frontend moderno con enfoque en UX fluida.",
        video: "/rdisquetemk2.mp4",
        techStack: "React, TypeScript, Tailwind CSS",
        pressingType: 'Remaster'
    },
    {
        title: "Buscador de bebidas",
        url: "https://buscadordebebidasrafadz.netlify.app",
        img: "/images/buscadorbibidas.jpg",
        desc: "Gestión de recetas con validación de datos en tiempo real.",
        video: "/CoctelHover.mp4",
        techStack: "Zustand, Zod, React Router",
        pressingType: 'Bootleg'
    },
    {
        title: "Portfolio v1.0",
        url: "https://rafadz.netlify.app",
        img: "/images/portfoliov1.jpg",
        desc: "Primera versión profesional optimizada para carga rápida.",
        video: "/Portfolio1Hover.mp4",
        techStack: "React, Vite, TypeScript",
        pressingType: 'Remaster'
    },
    {
        title: "CryptoApp",
        url: "https://cryptoapprafadz.netlify.app",
        img: "/images/appcrypto.jpg",
        desc: "Seguimiento de criptomonedas con gestión de estado global.",
        video: "/Criptoapp.mp4",
        techStack: "React, Zustand, Zod",
        pressingType: 'Bootleg'
    },
    {
        title: "App de clima",
        url: "https://appclimardz.netlify.app",
        img: "/images/appclima.jpg",
        desc: "Consulta climatológica con Axios y estados de carga.",
        video: "/ClimaApp.mp4",
        techStack: "React, TypeScript, Axios",
        pressingType: 'Bootleg'
    },
    {
        title: "Seguimiento de pacientes",
        url: "https://seguimientoclinicarafaeldorado.netlify.app",
        img: "/images/seguimientodepacientes.jpg",
        desc: "CRUD para gestión veterinaria con persistencia de datos.",
        video: "/PacienteHover.mp4",
        techStack: "React, Zustand, Tailwind CSS",
        pressingType: 'Bootleg'
    },
    {
        title: "Calculadora de gastos",
        url: "https://calculadordegastos-rafaeldorado.netlify.app",
        img: "/images/calculadoragastos.jpg",
        desc: "Control de finanzas con indicadores visuales circulares.",
        video: "/GastosHover.mp4",
        techStack: "Context API, Reducer, TypeScript",
        pressingType: 'Bootleg'
    },
    {
        title: "Contador de calorias",
        url: "https://calorietracker-rafadorado.netlify.app",
        img: "/images/contadorcalorias.jpg",
        desc: "Seguimiento de nutrición con lógica de reductor.",
        video: "/CaloriasHover.mp4",
        techStack: "React, useReducer, useMemo",
        pressingType: 'Bootleg'
    },
    {
        title: "Calculadora de descuentos",
        url: "https://calculadoradescuentosrafadorado.netlify.app",
        img: "/images/calculadoradescuentos.jpg",
        desc: "Herramienta optimizada con Custom Hooks.",
        video: "/CalculadoraHover.mp4",
        techStack: "Custom Hooks, useMemo, Vite",
        pressingType: 'Bootleg'
    },
    {
        title: "GuitarLa",
        url: "https://guitarlarafaeldorado.netlify.app",
        img: "/images/guitarlab.jpg",
        desc: "E-commerce de instrumentos con carrito de compras.",
        video: "/GuitarHover.mp4",
        techStack: "React, CSS Grid, LocalStorage",
        pressingType: 'Bootleg'
    }
];


const cardVariants: Variants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
    hover: { scale: 1.02, transition: { duration: 0.3 } }
};

function ProjectCard({ project, index, onOpen, isFeatured }: { project: Proyecto, index: number, onOpen: (p: Proyecto) => void, isFeatured?: boolean }) {
    const [isHovered, setIsHovered] = useState(false);
    const videoRef = useRef<HTMLVideoElement>(null);

    const theme = useMemo(() => {
        if (isFeatured) return { bg: COLORS.accent, text: "#ffffff", label: "FEATURED RELEASE" };
        if (project.pressingType === 'Remaster') return { bg: "#171717", text: "#f5f3e7", label: "REMASTERED" };
        if (project.pressingType === 'Bootleg') return { bg: "#d1d1d1", text: "#171717", label: "BOOTLEG" };
        return { bg: COLORS.accent, text: "#f5f3e7", label: "FIRST PRESS" };
    }, [project.pressingType, isFeatured]);

    useEffect(() => {
        if (isHovered) videoRef.current?.play().catch(() => {});
        else { if (videoRef.current) { videoRef.current.pause(); videoRef.current.currentTime = 0; } }
    }, [isHovered]);

    const rotation = isFeatured ? "rotate-0" : COLLAGE_ROTATIONS[index % COLLAGE_ROTATIONS.length];

    return (
        <motion.button
            onClick={() => onOpen(project)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            variants={cardVariants}
            initial="initial"
            whileInView="animate"
            whileHover="hover"
            viewport={{ once: true }}
            className={`group relative overflow-hidden rounded-sm border-black/20 shadow-xl transition-all w-full
                ${isFeatured ? "md:col-span-2 md:row-span-2 border-[4px] border-[#8e2b27] min-h-[400px]" : "border-[1px] aspect-square min-h-[300px]"} 
                ${rotation}`}
            style={{ backgroundColor: COLORS.cardLight }}
        >
            <div className="absolute inset-0 z-[15] pointer-events-none opacity-30 mix-blend-multiply"
                style={{ backgroundImage: `url(${TEXTURE_URL})`, backgroundSize: 'cover' }} />

            <motion.div className="absolute inset-0 z-10" animate={{ opacity: isHovered ? 0 : 1 }}>
                <img src={project.img} alt={project.title} className="object-cover w-full h-full contrast-[1.1] grayscale-[20%]" />
                
                <div className={`absolute top-4 right-4 z-20 px-3 py-1 border-2 font-mono font-black uppercase shadow-lg
                    ${isFeatured ? "bg-[#8e2b27] text-white -rotate-3 text-[10px]" : "bg-white/90 text-[#8e2b27] rotate-12 text-[8px]"}`}
                    style={{ borderColor: isFeatured ? 'white' : COLORS.accent }}>
                    {isFeatured ? "★ SPECIAL EDITION ★" : theme.label}
                </div>

                <div className="absolute inset-x-0 bottom-0 p-6 text-left bg-gradient-to-t from-black via-black/80 to-transparent">
                    <p className="font-mono text-[9px] text-[#cdc69c]/80 mb-1 tracking-[0.2em] uppercase">
                        {isFeatured ? "PREMIUM_COLLECTION_VOL_01" : `CATALOG_ID: RD-202${index}`}
                    </p>
                    <h3 className={`font-black tracking-tighter text-white uppercase leading-[0.9] 
                        ${isFeatured ? "text-4xl md:text-8xl" : "text-2xl"}`}>
                        {project.title}
                    </h3>
                </div>
            </motion.div>

            <motion.div className="absolute inset-0 z-20 flex flex-col justify-between p-6 overflow-hidden md:p-8"
                initial={{ opacity: 0 }} animate={{ opacity: isHovered ? 1 : 0 }}
                style={{ backgroundColor: theme.bg }}
            >
                {project.video && (
                    <video ref={videoRef} src={project.video.replace(/ /g, "%20")} loop muted playsInline 
                           className="absolute inset-0 z-0 object-cover w-full h-full opacity-40 grayscale mix-blend-overlay" />
                )}

                <div className="relative z-10 flex flex-col h-full text-left">
                    <div className="flex items-start justify-between pb-3 mb-4 border-b border-current/20" style={{ color: theme.text }}>
                        <span className="font-mono text-[10px] font-black tracking-widest uppercase">// SIDE B: TRACK_DETAILS</span>
                        <span className="font-mono text-[10px]">LP 12"</span>
                    </div>

                    <p className={`font-mono leading-tight mb-6 italic ${isFeatured ? "text-lg md:text-2xl" : "text-xs md:text-sm"}`} style={{ color: theme.text }}>
                        "{project.desc}"
                    </p>

                    <div className="p-4 mt-auto border-2 border-current border-dashed bg-black/10" style={{ color: theme.text }}>
                        <h4 className="mb-2 text-[9px] font-black uppercase tracking-[0.2em]">Technical_Specs:</h4>
                        <div className="flex flex-wrap gap-1.5">
                            {project.techStack?.split(',').map((tech, i) => (
                                <span key={i} className={`font-mono bg-black/20 px-2 py-0.5 font-bold text-[9px] md:text-[10px]`}>
                                    {tech.trim()}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.button>
    );
}

function ProjectModal({ project, onClose }: { project: Proyecto, onClose: () => void }) {
    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose}
                    className="fixed inset-0 flex items-center justify-center bg-black/95 backdrop-blur-md z-[9999] p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onClick={e => e.stopPropagation()}
                        className="bg-[#f5f3e7] max-w-5xl w-full flex flex-col md:flex-row overflow-hidden shadow-[25px_25px_0px_#8e2b27] border-2 border-black relative">
                <div className="absolute inset-0 pointer-events-none opacity-20 mix-blend-multiply" style={{ backgroundImage: `url(${TEXTURE_URL})`, backgroundSize: 'cover' }} />
                
                <div className="relative w-full border-b-4 border-black h-72 md:w-3/5 md:h-auto md:border-b-0 md:border-r-4">
                    <img src={project.img} className="object-cover w-full h-full" alt="" />
                </div>

                <div className="relative flex flex-col justify-between p-8 md:p-12 md:w-2/5">
                    <button onClick={onClose} className="absolute text-black transition-transform top-6 right-6 hover:rotate-90">
                        <FaTimes size={28} />
                    </button>
                    <div className="space-y-8">
                        <div>
                            <span className="text-[10px] font-mono text-[#8e2b27] font-black tracking-widest uppercase block mb-2">// DATA_LOG_01</span>
                            <h2 className="text-5xl font-black leading-[0.85] text-black uppercase tracking-tighter">{project.title}</h2>
                        </div>
                        <p className="font-mono text-sm leading-relaxed text-black/80 border-l-4 border-[#8e2b27] pl-5">{project.desc}</p>
                        <div className="pt-6 font-mono text-xs font-bold text-black uppercase border-t border-black/10">
                            <span className="text-[#8e2b27]">Stack:</span> {project.techStack}
                        </div>
                    </div>
                    <a href={project.url} target="_blank" rel="noreferrer" 
                       className="mt-12 bg-[#8e2b27] text-white py-5 text-center text-xs font-black tracking-[0.3em] uppercase hover:bg-black transition-colors">
                        LAUNCH_PREVIEW <FaExternalLinkAlt className="inline mb-1 ml-2" />
                    </a>
                </div>
            </motion.div>
        </motion.div>
    );
}

export default function Proyectos() {
    const [selected, setSelected] = useState<Proyecto | null>(null);

    return (
        <main className="relative min-h-screen" style={{ backgroundColor: COLORS.bg }}>
            <section className="relative z-20 px-6 pt-32 pb-16 mx-auto text-center max-w-7xl">
                <span className="absolute top-10 left-1/2 -translate-x-1/2 text-[18vw] font-black text-white/20 select-none pointer-events-none uppercase leading-none">
                    Catalog
                </span>
                <h1 className="flex flex-col items-center leading-[0.8] mb-8 relative z-10">
                    <span className="text-6xl md:text-[9rem] font-black uppercase tracking-tighter text-black">PROJECT</span>
                    <div className="flex items-center gap-4 mt-2 md:gap-8">
                        <div className="w-12 h-2 md:w-32 md:h-4" style={{ backgroundColor: COLORS.accent }} />
                        <span className="text-5xl md:text-[9rem] font-black uppercase italic" style={{ color: "transparent", WebkitTextStroke: `2px ${COLORS.accent}` }}>PRESS</span>
                        <span className="text-5xl md:text-[9rem] font-black uppercase tracking-tighter" style={{ color: COLORS.accent }}>INGS</span>
                    </div>
                </h1>
                <p className="font-mono text-[10px] md:text-sm uppercase tracking-[0.5em] font-black text-black/40 italic">— Flip the record —</p>
            </section>

            <section className="px-6 pb-40 mx-auto max-w-7xl">
                {/* Grid adaptativo para móvil */}
                <div className="grid grid-cols-1 gap-12 sm:grid-cols-2 lg:grid-cols-3 xl:gap-14">
                    {PROJECTS.map((proj, idx) => (
                        <ProjectCard key={proj.title} project={proj} index={idx} onOpen={setSelected} isFeatured={idx === 0} />
                    ))}
                </div>

                <div className="flex flex-col items-center mt-32">
                    <Link to="/contacto" className="px-16 py-6 bg-[#8e2b27] text-[#cdc69c] text-sm font-black uppercase tracking-[0.5em] hover:bg-black transition-all shadow-xl">
                        ¿HACEMOS UN NUEVO LANZAMIENTO?
                    </Link>
                </div>
            </section>

            <AnimatePresence>
                {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
            </AnimatePresence>
        </main>
    );
}