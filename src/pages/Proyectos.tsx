import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaExternalLinkAlt, FaTimes, FaArrowRight, FaGithub } from "react-icons/fa";
import { 
    SiReact, SiTailwindcss, SiTypescript, SiVite, SiFramer, 
    SiHtml5, SiJavascript, SiReactrouter, SiAxios, SiZod, SiCss3, SiGooglemaps, SiSupabase
} from "react-icons/si";

// --- CONFIGURACIÓN DE ESTILOS ---
const COLORS = {
    bg: "#cdc69c",
    text: "#0f0f0f",
    accent: "#8e2b27",
    cardLight: "#f5f3e7",
};

const TEXTURE_URL = "/images/texturas/paperproject.webp";
const TEXTURE_MOBILE_URL = "/images/texturas/paperproject-mobile.webp";

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
    github?: string; 
    video?: string;
    techStack?: string;
    techIcons?: React.ReactNode[];
    pressingType?: 'First' | 'Remaster' | 'Bootleg';
}

// --- DATA ---
const PROJECTS: Proyecto[] = [
    {
        title: "Invitación R&M",
        url: "https://rdisquetesevadeboda.netlify.app/", 
        img: "/images/invitacionboda.webp", 
        github: "https://github.com/tu-usuario/wedding-demo",
        desc: "Invitación editorial premium con galería colaborativa en tiempo real. Los invitados acceden mediante QR para subir y compartir fotos del evento instantáneamente.",
        video: "/images/invitacionboda.mp4", 
        techStack: "React, Supabase, Framer Motion, Tailwind",
        techIcons: [
            <SiReact key="re" />, 
            <SiSupabase key="su" />, 
            <SiFramer key="fr" />, 
            <SiTailwindcss key="tw" />
        ],
        pressingType: 'First'
    },
    {
        title: "The Pueblo",
        url: "https://thepueblo.es/",
        img: "/images/ThePueblo.webp",
        github: "https://github.com/RDisquete/ThePuebloStudio",
        desc: "Productora creativa de imágenes para redes sociales, enfocada en crear contenido visual moderno.",
        video: "/images/thePueblo%20Hover.mp4",
        techStack: "React, Vite, Tailwind CSS",
        techIcons: [<SiReact key="re" />, <SiVite key="vi" />, <SiTailwindcss key="tw" />],
        pressingType: 'First'
    },
    {
        title: "Nor3xtrem",
        url: "https://nor3xtrem.es/",
        img: "/Nor3xtreme.webp",
        github: "https://github.com/RDisquete/Nor3Xtrem-2026",
        desc: "Presencia digital para una de las marchas cicloturistas más exigentes de España.",
        video: "/Nor3xtremeHover.mp4",
        techStack: "React, Vite, Tailwind CSS",
        techIcons: [<SiReact key="re" />, <SiVite key="vi" />, <SiTailwindcss key="tw" />],
        pressingType: 'First'
    },
    {
        title: "Armario Escénico",
        url: "https://armarioescenico.netlify.app/",
        img: "/sambrona.webp",
        github: "https://github.com/RDisquete/ArmarioEscenico",
        desc: "Gestión de archivo de vestuario histórico con búsqueda precisa.",
        video: "/sambronaHover.mp4",
        techStack: "React, TypeScript, Tailwind CSS",
        techIcons: [<SiReact key="re" />, <SiTypescript key="ts" />, <SiTailwindcss key="tw" />],
        pressingType: 'First'
    },
    {
        title: "Matter & Sound",
        url: "https://mattersoundrdisquete.netlify.app/",
        img: "/MatterSound.webp",
        github: "https://github.com/RDisquete/MatterSound",
        desc: "Estación de visualización generativa que transforma ondas mecánicas en materia digital mediante FFT y Web Audio API.",
        video: "/MattersoundHover.mp4",
        techStack: "React, TypeScript, Web Audio API, HTML5 Canvas, Tailwind CSS",
        techIcons: [<SiReact key="re" />, <SiTypescript key="ts" />, <SiHtml5 key="h5" />],
        pressingType: 'Bootleg'
    },
    {
        title: "ED Movil",
        url: "https://edmovil.netlify.app",
        img: "/images/edmovil.webp",
        github: "https://github.com/RDisquete/EDmovil",
        desc: "Web responsive enfocada en la velocidad de carga y adaptabilidad.",
        video: "/images/edHover.mp4",
        techStack: "React, TypeScript, Tailwind CSS",
        techIcons: [<SiReact key="re" />, <SiTypescript key="ts" />, <SiTailwindcss key="tw" />],
        pressingType: 'First'
    },
    {
        title: "Web RDisquete Photo",
        url: "https://rdisquetephoto.netlify.app/",
        img: "/images/rdisquetePhoto.webp",
        desc: "Portafolio fotográfico con componentes reutilizables y carruseles fluidos.",
        video: "/RPhotoHover.mp4",
        techStack: "React, TypeScript, CSS3",
        techIcons: [<SiReact key="re" />, <SiTypescript key="ts" />, <SiCss3 key="cs" />],
        pressingType: 'Bootleg'
    },
    {
        title: "AM Movil Repair",
        url: "https://ammovilrepair.com",
        img: "/images/ammovilrepair.webp",
        desc: "Servicio técnico con integración de formularios dinámicos y mapas.",
        video: "/amhover.mp4",
        techStack: "React, Tailwind, Google Maps",
        techIcons: [<SiReact key="re" />, <SiTailwindcss key="tw" />, <SiGooglemaps key="gm" />],
        pressingType: 'First'
    },
    {
        title: "Valle Escondido",
        url: "https://valleescondido.netlify.app/",
        img: "/valleescondido.webp",
        desc: "Demo de evento con animaciones complejas y transiciones fluidas.",
        video: "/home_web.mp4",
        techStack: "React, Framer Motion, Tailwind CSS",
        techIcons: [<SiReact key="re" />, <SiFramer key="fr" />, <SiTailwindcss key="tw" />],
        pressingType: 'Remaster'
    },
    {
        title: "Rdisquete mk II",
        url: "https://rdisquetemk2.netlify.app/",
        img: "/rdisquetemk2.webp",
        desc: "Portfolio frontend moderno con enfoque en UX floida.",
        video: "/rdisquetemk2.mp4",
        techStack: "React, TypeScript, Tailwind CSS",
        techIcons: [<SiReact key="re" />, <SiTypescript key="ts" />, <SiTailwindcss key="tw" />],
        pressingType: 'Remaster'
    },
    {
        title: "Buscador de bebidas",
        url: "https://buscadordebebidasrafadz.netlify.app",
        img: "/images/buscadorbibidas.webp",
        desc: "Gestión de recetas con validación de datos en tiempo real.",
        video: "/CoctelHover.mp4",
        techStack: "Zod, React Router, Javascript",
        techIcons: [<SiZod key="zo" />, <SiReactrouter key="rr" />, <SiJavascript key="js" />],
        pressingType: 'Bootleg'
    },
    {
        title: "Portfolio v1.0",
        url: "https://rafadz.netlify.app",
        img: "/images/portfoliov1.webp",
        desc: "Primera versión profesional optimizada para carga rápida.",
        video: "/Portfolio1Hover.mp4",
        techStack: "React, Vite, TypeScript",
        techIcons: [<SiReact key="re" />, <SiVite key="vi" />, <SiTypescript key="ts" />],
        pressingType: 'Remaster'
    },
    {
        title: "CryptoApp",
        url: "https://cryptoapprafadz.netlify.app",
        img: "/images/appcrypto.webp",
        desc: "Seguimiento de criptomonedas con gestión de estado global.",
        video: "/Criptoapp.mp4",
        techStack: "React, Zod, Vite",
        techIcons: [<SiReact key="re" />, <SiZod key="zo" />, <SiVite key="vi" />],
        pressingType: 'Bootleg'
    },
    {
        title: "App de clima",
        url: "https://appclimardz.netlify.app",
        img: "/images/appclima.webp",
        desc: "Consulta climatológica con Axios y estados de carga.",
        video: "/ClimaApp.mp4",
        techStack: "React, TypeScript, Axios",
        techIcons: [<SiReact key="re" />, <SiTypescript key="ts" />, <SiAxios key="ax" />],
        pressingType: 'Bootleg'
    },
    {
        title: "Seguimiento de pacientes",
        url: "https://seguimientoclinicarafaeldorado.netlify.app",
        img: "/images/seguimientodepacientes.webp",
        desc: "CRUD para gestión veterinaria con persistencia de datos.",
        video: "/PacienteHover.mp4",
        techStack: "React, Tailwind CSS, Javascript",
        techIcons: [<SiReact key="re" />, <SiTailwindcss key="tw" />, <SiJavascript key="js" />],
        pressingType: 'Bootleg'
    },
    {
        title: "Calculadora de gastos",
        url: "https://calculadordegastos-rafaeldorado.netlify.app",
        img: "/images/calculadoragastos.webp",
        desc: "Control de finanzas con indicadores visuales circulares.",
        video: "/GastosHover.mp4",
        techStack: "Context API, CSS3, TypeScript",
        techIcons: [<SiReact key="re" />, <SiCss3 key="cs" />, <SiTypescript key="ts" />],
        pressingType: 'Bootleg'
    },
    {
        title: "Contador de calorias",
        url: "https://calorietracker-rafadorado.netlify.app",
        img: "/images/contadorcalorias.webp",
        desc: "Seguimiento de nutrición con lógica de reductor.",
        video: "/CaloriasHover.mp4",
        techStack: "React, Javascript, CSS3",
        techIcons: [<SiReact key="re" />, <SiJavascript key="js" />, <SiCss3 key="cs" />],
        pressingType: 'Bootleg'
    },
    {
        title: "Calculadora de descuentos",
        url: "https://calculadoradescuentosrafadorado.netlify.app",
        img: "/images/calculadoradescuentos.webp",
        desc: "Herramienta optimizada con Custom Hooks.",
        video: "/CalculadoraHover.mp4",
        techStack: "React, Vite, Javascript",
        techIcons: [<SiReact key="re" />, <SiVite key="vi" />, <SiJavascript key="js" />],
        pressingType: 'Bootleg'
    },
    {
        title: "GuitarLa",
        url: "https://guitarlarafaeldorado.netlify.app",
        img: "/images/guitarlab.webp",
        desc: "E-commerce de instrumentos con carrito de compras.",
        video: "/GuitarHover.mp4",
        techStack: "React, CSS3, Javascript",
        techIcons: [<SiReact key="re" />, <SiCss3 key="cs" />, <SiJavascript key="js" />],
        pressingType: 'Bootleg'
    }
];

// --- COMPONENTES AUXILIARES ---

function ProjectCard({ project, index, onOpen, isFeatured }: { project: Proyecto, index: number, onOpen: (p: Proyecto) => void, isFeatured?: boolean }) {
    const [isHovered, setIsHovered] = useState(false);
    const prefersReducedMotion = useReducedMotion();

    const theme = useMemo(() => {
        if (isFeatured) return { bg: COLORS.accent, text: "#ffffff", label: "FEATURED RELEASE" };
        if (project.pressingType === 'Remaster') return { bg: "#171717", text: "#f5f3e7", label: "REMASTERED" };
        if (project.pressingType === 'Bootleg') return { bg: "#d1d1d1", text: "#171717", label: "BOOTLEG" };
        return { bg: COLORS.accent, text: "#f5f3e7", label: "FIRST PRESS" };
    }, [project.pressingType, isFeatured]);

    const rotation = isFeatured ? "rotate-0" : COLLAGE_ROTATIONS[index % COLLAGE_ROTATIONS.length];

    return (
        <motion.button
            onClick={() => onOpen(project)}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            whileHover={prefersReducedMotion ? {} : { scale: 1.02 }}
            viewport={{ once: true }}
            className={`group relative overflow-hidden rounded-sm border-black/20 shadow-xl transition-all w-full text-left
                ${isFeatured ? "md:col-span-2 md:row-span-2 border-[4px] border-[#8e2b27] min-h-[350px]" : "border-[1px] aspect-square min-h-[280px]"} 
                ${rotation}`}
            style={{ backgroundColor: COLORS.cardLight }}
        >
            <motion.div className="absolute inset-0 z-10" animate={{ opacity: isHovered ? 0 : 1 }}>
                <img src={project.img} alt={project.title} className="object-cover w-full h-full contrast-[1.1] grayscale-[20%]" />
                <div className={`absolute top-3 right-3 z-20 px-2 py-1 border-2 font-mono font-black uppercase text-[8px] shadow-lg
                    ${isFeatured ? "bg-[#8e2b27] text-white -rotate-3" : "bg-white/90 text-[#8e2b27] rotate-12"}`}
                    style={{ borderColor: isFeatured ? 'white' : COLORS.accent }}>
                    {isFeatured ? "★ SPECIAL EDITION ★" : theme.label}
                </div>
                <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black via-black/90 to-transparent flex justify-between items-end">
                    <div className="max-w-[70%]">
                        <p className="font-mono text-[8px] text-[#cdc69c]/70 mb-1 tracking-[0.2em] uppercase">{isFeatured ? "PREMIUM_COLLECTION" : `RD-202${index}`}</p>
                        <h2 className={`font-black tracking-tighter text-white uppercase leading-[0.8] ${isFeatured ? "text-4xl md:text-7xl" : "text-xl md:text-2xl"}`}>{project.title}</h2>
                    </div>
                    <div className="flex gap-2 text-white/50 mb-1">
                        {project.techIcons?.map((icon, i) => <span key={i} className="text-lg md:text-xl">{icon}</span>)}
                    </div>
                </div>
            </motion.div>

            <motion.div className="absolute inset-0 z-20 flex flex-col justify-between p-5 overflow-hidden" initial={{ opacity: 0 }} animate={{ opacity: isHovered ? 1 : 0 }} style={{ backgroundColor: theme.bg }}>
                {!prefersReducedMotion && isHovered && project.video && (
                    <video src={project.video.replace(/ /g, "%20")} autoPlay loop muted playsInline className="absolute inset-0 z-0 object-cover w-full h-full opacity-30 grayscale mix-blend-overlay" />
                )}
                <div className="relative z-10 flex flex-col h-full">
                    <div className="flex items-start justify-between pb-2 mb-3 border-b border-current/20" style={{ color: theme.text }}>
                        <span className="font-mono text-[9px] font-black tracking-widest uppercase">// SIDE B: TRACK_DETAILS</span>
                        <span className="font-mono text-[9px]">LP 12"</span>
                    </div>
                    <p className={`font-mono leading-tight mb-4 italic ${isFeatured ? "text-base md:text-xl" : "text-[11px] md:text-sm"}`} style={{ color: theme.text }}>"{project.desc}"</p>
                    <div className="p-3 mt-auto border-2 border-current border-dashed bg-black/5" style={{ color: theme.text }}>
                        <h3 className="mb-1.5 text-[8px] font-black uppercase tracking-[0.1em]">Technical_Specs:</h3>
                        <div className="flex flex-wrap gap-1">
                            {project.techStack?.split(',').map((tech, i) => (
                                <span key={i} className="font-mono bg-black/10 px-1.5 py-0.5 font-bold text-[8px] md:text-[9px]">{tech.trim()}</span>
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={onClose} className="fixed inset-0 flex items-center justify-center bg-black/95 backdrop-blur-md z-[9999] p-4">
            <motion.div initial={{ scale: 0.9, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.9, opacity: 0, y: 20 }} onClick={e => e.stopPropagation()} className="bg-[#f5f3e7] max-w-5xl w-full flex flex-col md:flex-row overflow-hidden shadow-[20px_20px_0px_#8e2b27] border-2 border-black relative text-left">
                <div className="relative w-full border-b-4 border-black h-60 md:w-3/5 md:h-auto md:border-b-0 md:border-r-4 bg-black">
                    <img src={project.img} className="object-cover w-full h-full opacity-90" alt={project.title} />
                </div>
                <div className="relative flex flex-col justify-between p-8 md:p-10 md:w-2/5 text-black">
                    <button onClick={onClose} className="absolute top-6 right-6 hover:rotate-90 hover:text-[#8e2b27] transition-all duration-300">
                        <FaTimes size={28} />
                    </button>
                    <div className="space-y-6">
                        <div>
                            <span className="text-[10px] font-mono text-[#8e2b27] font-black tracking-widest uppercase block mb-1">// ARCHIVE_LOG_2026</span>
                            <h2 className="text-5xl font-black uppercase tracking-tighter leading-[0.8] text-black">{project.title}</h2>
                        </div>
                        <p className="font-mono text-xs leading-relaxed text-black/80 border-l-4 border-[#8e2b27] pl-4 italic">{project.desc}</p>
                        <div className="pt-4 border-t border-black/10">
                            <h3 className="text-[9px] font-black uppercase mb-3 tracking-[0.2em] text-black/40">Technical_Stack:</h3>
                            <div className="flex flex-wrap gap-2 text-3xl text-[#8e2b27]">
                                {project.techIcons?.map((icon, i) => <span key={i}>{icon}</span>)}
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-col gap-3 mt-10">
                        <a href={project.url} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 bg-[#8e2b27] text-white py-4 text-[11px] font-black tracking-[0.3em] uppercase hover:bg-black transition-colors">
                            LAUNCH_PREVIEW <FaExternalLinkAlt size={12} />
                        </a>
                        {project.github && (
                            <a href={project.github} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-3 border-2 border-black text-black py-3 text-[11px] font-black tracking-[0.3em] uppercase hover:bg-black hover:text-white transition-all">
                                <FaGithub size={16} /> REPO_SOURCE
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}

// --- MAIN COMPONENT ---

export default function Proyectos() {
    const [selected, setSelected] = useState<Proyecto | null>(null);
    const [filter, setFilter] = useState('ALL');

    const categories = ['ALL', 'REACT', 'TYPESCRIPT', 'TAILWIND', 'VITE'];

    const filteredProjects = PROJECTS.filter(p => 
        filter === 'ALL' || p.techStack?.toUpperCase().includes(filter)
    );

    return (
        <main className="relative min-h-screen" style={{ backgroundColor: COLORS.bg }}>
            <div className="hidden md:block absolute inset-0 z-[100] pointer-events-none opacity-25 mix-blend-multiply" style={{ backgroundImage: `url(${TEXTURE_URL})`, backgroundSize: 'cover' }} />
            <div className="block md:hidden absolute inset-0 z-[100] pointer-events-none opacity-25 mix-blend-multiply" style={{ backgroundImage: `url(${TEXTURE_MOBILE_URL})`, backgroundSize: 'cover' }} />

            <section className="relative z-[1] px-6 pt-24 pb-12 mx-auto text-center max-w-7xl">
                <span className="absolute top-6 left-1/2 -translate-x-1/2 text-[18vw] font-black text-white/20 select-none pointer-events-none uppercase">Catalog</span>
                <h1 className="flex flex-col items-center leading-[0.8] mb-12 relative z-10 text-black">
                    <span className="text-5xl md:text-[9rem] font-black uppercase tracking-tighter">PROJECT</span>
                    <div className="flex items-center gap-3 mt-2 md:gap-8">
                        <div className="w-10 h-1.5 md:w-32 md:h-4" style={{ backgroundColor: COLORS.accent }} />
                        <span className="text-4xl md:text-[9rem] font-black uppercase italic" style={{ WebkitTextStroke: `1.5px ${COLORS.accent}`, paintOrder: 'stroke fill' }}>PRESS</span>
                        <span className="text-4xl md:text-[9rem] font-black uppercase tracking-tighter" style={{ color: COLORS.accent }}>INGS</span>
                    </div>
                </h1>

                {/* --- NUEVO FILTRO APLICADO --- */}
                <nav className="mt-20 mb-22 relative z-10 flex flex-col items-center">
                    <span className="text-[9px] font-mono text-black/30 mb-4 tracking-[0.5em] uppercase">Select_Frequency:</span>
                    <div className="flex items-center gap-8 md:gap-16">
                        {categories.map((tag) => (
                            <button 
                                key={tag} 
                                onClick={() => setFilter(tag)} 
                                className="group relative flex flex-col items-center"
                            >
                                <span className={`font-mono text-[10px] font-black transition-colors duration-300
                                    ${filter === tag ? 'text-[#8e2b27]' : 'text-black/40 group-hover:text-black'}`}>
                                    {tag}
                                </span>
                                <motion.div 
                                    initial={false}
                                    animate={{ 
                                        height: filter === tag ? 20 : 0,
                                        opacity: filter === tag ? 1 : 0 
                                    }}
                                    className="w-[2px] bg-[#8e2b27] mt-2"
                                />
                            </button>
                        ))}
                    </div>
                </nav>
            </section>

            <section className="px-6 pb-32 mx-auto max-w-7xl relative z-10">
                <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-14">
                    {filteredProjects.map((proj, idx) => (
                        <ProjectCard 
                            key={proj.title} 
                            project={proj} 
                            index={idx} 
                            onOpen={setSelected} 
                            isFeatured={idx === 0 && filter === 'ALL'} 
                        />
                    ))}
                </div>

                <div className="flex flex-col items-center mt-24">
                    <Link to="/Feedback" className="flex items-center gap-4 group w-fit">
                        <motion.div whileHover={{ x: 10 }} className="flex items-center gap-4 cursor-pointer">
                            <div className="flex items-center justify-center w-10 h-10 border-2 border-black rounded-full group-hover:bg-black transition-colors">
                                <FaArrowRight className="w-4 h-4 text-black group-hover:text-[#cdc69c] transition-colors" />
                            </div>
                            <span className="text-xl md:text-3xl font-black uppercase tracking-tighter text-[#8e2b27] group-hover:text-black">¿GRABAMOS EL PRÓXIMO HIT?</span>
                        </motion.div>
                    </Link>
                </div>
            </section>

            <AnimatePresence>
                {selected && <ProjectModal project={selected} onClose={() => setSelected(null)} />}
            </AnimatePresence>
        </main>
    );
}