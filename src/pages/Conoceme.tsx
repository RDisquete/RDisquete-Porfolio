import { motion, type Variants } from "framer-motion";
import {
    FaQuoteLeft, FaQuoteRight, FaInstagram, FaWhatsapp, FaLinkedin, FaFileDownload, FaGithub,
    FaRegPlayCircle, FaReact,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiTailwindcss, SiTypescript, SiFramer } from "react-icons/si";

const RETRO_DARK = "#171717";
const RETRO_CREAM = "#cdc69c";
const RETRO_MAROON = "#8e2b27";

const TEXTURE_1 = "/images/texturas/abstract-crumpled-black-paper-texture-background-f-2025-02-22-04-38-59-utc.jpg";
const TEXTURE_2 = "/images/texturas/old-paper-grunge-dark-photo-grungy-black-textur-2025-10-15-04-48-44-utc.jpg";
const TEXTURE_3 = "/images/texturas/old-crumpled-paper-sheet-or-parchment-texture-back-2025-09-04-18-44-37-utc.jpg";
const TEXTURE_4 = "/images/texturas/top-view-of-crumpled-vintage-beige-paper-texture-w-2024-11-19-09-16-52-utc.jpg";
const TEXTURE_5 = "/images/texturas/old-black-background-grunge-texture-dark-wallpap-2025-03-08-03-00-25-utc.jpg";

const fotoRealUrl = "/IMG_6012_byn.png";

const socialLinks = {
    linkedin: "https://www.linkedin.com/in/rafael-dorado-zamoro/",
    instagram: "https://www.instagram.com/rdisquete/",
    whatsapp: "https://wa.me/+34648791998",
    email: "mailto:rafael.doradozamoro@gmail.com",
    cv: "/images/CV_Rafael_Dorado_Zamoro.pdf",
    github: "https://github.com/RDisquete",
};

const IconMap: Record<string, React.ElementType> = {
    instagram: FaInstagram,
    whatsapp: FaWhatsapp,
    email: MdEmail,
    linkedin: FaLinkedin,
    github: FaGithub,
    cv: FaFileDownload,
};

// --- ESTILOS AUXILIARES ---
const retroWhite = "text-[#cdc69c]";
const secondaryFont = "font-mono";
const signatureStyle = { color: RETRO_MAROON };

type BlendMode = "overlay" | "multiply" | "soft-light" | "screen" | "darken" | "normal";

const createTextureStyle = (src: string, opacity = 0.2, blend: BlendMode = 'overlay', zIndex = 1) => ({
    backgroundImage: `url(${src})`,
    backgroundSize: 'cover',
    opacity,
    mixBlendMode: blend,
    zIndex,
    position: 'absolute' as const,
});

const textureStyle = createTextureStyle(TEXTURE_1, 0.3, 'overlay', 1);

// --- ANIMACIONES ---
const simpleEntryVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } }
};
const imageEntry: Variants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.8 } }
};
const introTextureEntry: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.3, transition: { duration: 1.5 } }
};

// --- INTERFACES ---
interface TrackItemProps {
    num: string;
    title: string;
    subtitle?: string;
    details: string;
    extra?: string;
    color?: string;
    isPlatinum?: boolean;
    icon?: React.ReactNode;
}

const TrackItem = ({ num, title, subtitle, details, extra, color = RETRO_MAROON, isPlatinum, icon }: TrackItemProps) => (
    <motion.div
        className={`relative p-6 transition-all duration-300 border-b group border-current/10 cursor-crosshair 
        ${isPlatinum ? 'bg-white/10' : 'hover:bg-[#8e2b27]/5'}`}
        whileHover={{ x: 15 }}
    >
        <div className="flex items-start">
            <span className="mr-6 font-mono text-2xl font-black transition-colors duration-300 group-hover:text-white group-hover:drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]" style={{ color }}>
                {num}.
            </span>

            <div className="flex-grow">
                <div className="flex items-center gap-3">
                    <h4 className="text-xl font-bold leading-tight tracking-tight uppercase md:text-2xl transition-colors duration-300 group-hover:text-white group-hover:drop-shadow-[0_2px_8px_rgba(0,0,0,0.4)]">
                        {title}
                    </h4>
                    {icon && (
                        <span className="text-2xl transition-all duration-300 group-hover:text-white group-hover:scale-125">
                            {icon}
                        </span>
                    )}
                </div>

                {subtitle && (
                    <p className="mb-2 font-mono text-sm italic transition-all duration-300 opacity-70 group-hover:text-white/90 group-hover:opacity-100" style={{ color: isPlatinum ? color : undefined }}>
                        {subtitle}
                    </p>
                )}

                <p className="mb-1 font-mono text-sm leading-relaxed md:text-base opacity-90 transition-all duration-300 group-hover:text-white group-hover:drop-shadow-[0_1px_3px_rgba(0,0,0,0.2)]">
                    {details}
                </p>

                {extra && (
                    <p className="pl-3 mt-2 font-sans text-xs italic transition-all duration-300 border-l-2 md:text-sm opacity-60 border-current/20 group-hover:text-white/60 group-hover:border-white/40">
                        {extra}
                    </p>
                )}
            </div>

            <div className="absolute transition-opacity -translate-y-1/2 opacity-0 group-hover:opacity-100 right-4 top-1/2">
                <div className="w-1 h-12 bg-white shadow-[0_0_10px_rgba(255,255,255,0.5)] rounded-full animate-pulse" />
            </div>
        </div>

        <motion.div
            className="absolute bottom-0 left-0 h-[2px] w-full origin-left"
            style={{ backgroundColor: isPlatinum ? color : '#ffffff' }}
            initial={{ scaleX: 0 }}
            whileHover={{ scaleX: 1 }}
            transition={{ duration: 0.4 }}
        />
    </motion.div>
);

export default function Conoceme() {
    return (
        <main className="w-full bg-[#171717]">
            <div className={`w-full`}>
                <motion.section
                    className={`relative w-full min-h-screen border-4 box-border flex flex-col justify-between select-none ${retroWhite}`}
                    style={{
                        backgroundColor: RETRO_DARK,
                        borderColor: RETRO_CREAM,
                        borderStyle: 'solid',
                        willChange: 'transform, opacity'
                    }}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    <motion.div
                        className="absolute top-0 left-0 z-20 hidden w-8 h-full origin-left transform -skew-x-6 pointer-events-none md:block"
                        style={{ backgroundColor: RETRO_MAROON, opacity: 0.8 }}
                        initial={{ scaleX: 0 }}
                        whileInView={{ scaleX: 1 }}
                        transition={{ duration: 0.7, delay: 0.1 }}
                    />

                    <div className="relative z-30 flex flex-col flex-grow w-full px-4 pt-20 pb-12 mx-auto md:py-12 md:gap-12 max-w-7xl lg:flex-row lg:items-center md:px-20">
                        <div className="flex flex-col flex-1 order-1 pt-0 lg:w-7/12">
                            <motion.h2
                                className={`text-[10vw] md:text-[8vw] xl:text-[6rem] font-black leading-none uppercase mb-6 md:mb-8`}
                                style={{ color: RETRO_MAROON }}
                                variants={simpleEntryVariants}
                                transition={{ delay: 0.3 }}
                            >
                                ¿QUIÉN SOY?
                            </motion.h2>

                            <motion.p
                                className={`max-w-xl font-light text-lg md:text-2xl xl:text-2xl leading-relaxed tracking-wide italic ${secondaryFont}`}
                                style={{ color: RETRO_CREAM, opacity: 0.9 }}
                                variants={simpleEntryVariants}
                                transition={{ delay: 0.8 }}
                            >
                                <FaQuoteLeft className="inline mr-2 text-3xl md:mr-4 md:text-4xl" style={{ color: RETRO_MAROON }} />
                                Soy <strong className="font-black" style={{ color: RETRO_MAROON }}>Rafa</strong>, frontend developer. Me gusta <strong className="font-black" style={{ color: RETRO_MAROON }}>ir más allá de lo esperado</strong>, combinando <strong className="font-black" style={{ color: RETRO_MAROON }}>rigor técnico</strong> con un toque creativo que hace que cada proyecto tenga <strong className="font-black" style={{ color: RETRO_MAROON }}>personalidad propia</strong>. Disfruto <strong className="font-black" style={{ color: RETRO_MAROON }}>resolviendo problemas</strong> y construyendo experiencias digitales que funcionen y sorprendan. Si buscas alguien que aporte <strong className="font-black" style={{ color: RETRO_MAROON }}>ideas frescas</strong> y resultados que se noten, podemos crear algo interesante juntos.
                                <FaQuoteRight className="inline ml-2 text-3xl md:ml-4 md:text-4xl" style={{ color: RETRO_MAROON }} />
                            </motion.p>

                            <motion.div
                                className="w-full h-[2px] mt-4 mb-4 md:mt-8 md:mb-8"
                                style={{ backgroundColor: RETRO_MAROON, opacity: 0.8 }}
                                initial={{ scaleX: 0 }}
                                whileInView={{ scaleX: 1 }}
                                transition={{ ease: "easeOut", duration: 0.8, delay: 1.5 }}
                                viewport={{ once: true }}
                            />
                        </div>

                        <motion.div
                            className="relative flex justify-center flex-shrink-0 order-2 pt-0 lg:w-5/12 lg:pl-16 lg:justify-end"
                            variants={imageEntry}
                        >
                            <div
                                className="relative overflow-hidden border-4 w-[60vw] h-[60vw] md:w-[35vw] md:h-[35vw] max-w-[480px] max-h-[480px]"
                                style={{ borderColor: RETRO_CREAM, backgroundColor: RETRO_MAROON }}
                            >
                                <img
                                    src={fotoRealUrl}
                                    alt="Rafa Dorado - Fotografía"
                                    loading="eager"
                                    style={{
                                        width: '100%',
                                        height: '110%',
                                        position: 'absolute',
                                        objectFit: 'cover',
                                        objectPosition: 'center top',
                                        filter: 'brightness(1.15) ',
                                    }}
                                />
                                <div
                                    className="absolute inset-0 pointer-events-none z-35"
                                    style={createTextureStyle(TEXTURE_1, 0.15, 'overlay', 35)}
                                    aria-hidden="true"
                                />
                            </div>

                            <motion.div
                                className="absolute z-30 bottom-[-60px] right-0 transform rotate-[-2deg] pointer-events-none hidden md:block"
                                variants={simpleEntryVariants}
                                transition={{ delay: 1.0 }}
                            >
                                <p className={`text-[6vw] md:text-[6vw] font-bold normal-case font-vintage-cursive leading-none whitespace-nowrap opacity-90`} style={signatureStyle}>
                                    rdisquete
                                </p>
                            </motion.div>
                        </motion.div>
                    </div>

                    <div className="relative z-30 w-full px-4 pt-4 pb-8 md:pt-4 md:pb-8 md:px-20">
                        <motion.div
                            className="flex justify-center w-full mb-2 md:hidden"
                            variants={simpleEntryVariants}
                            transition={{ delay: 1.0 }}
                        >
                            <p className={`text-3xl font-bold normal-case font-vintage-cursive leading-none whitespace-nowrap opacity-90`} style={signatureStyle}>
                                rdisquete
                            </p>
                        </motion.div>

                        <div className="flex justify-center w-full space-x-6 text-2xl md:space-x-8 md:text-3xl" style={{ color: RETRO_CREAM }}>
                            {Object.entries(socialLinks).map(([key, url], index) => {
                                const IconComponent = IconMap[key];
                                if (!IconComponent) return null;
                                return (
                                    <motion.a
                                        key={key} custom={index} variants={simpleEntryVariants} href={url}
                                        target="_blank" rel="noopener noreferrer" aria-label={key}
                                        className={`transition-colors hover:text-[#b43a31] transform hover:scale-110`}
                                    >
                                        <IconComponent />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>

                    <motion.div
                        className="absolute inset-0"
                        style={textureStyle}
                        variants={introTextureEntry}
                        aria-hidden="true"
                    />
                </motion.section>
            </div>

            {/* --- SECCIÓN PASIÓN --- */}
            <section className="relative py-32 px-6 bg-[#cdc69c] text-[#171717] overflow-hidden">
                <div className="absolute inset-0 opacity-20 contrast-125 saturate-110" style={{ backgroundImage: `url(${TEXTURE_2})`, backgroundSize: 'cover', mixBlendMode: 'multiply' }} />
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="text-6xl md:text-8xl font-black uppercase mb-12 font-display-impact leading-[0.8] tracking-tighter">
                        Donde la Creatividad <br />
                        <span style={{ color: RETRO_MAROON }}>se Une al Código</span>
                    </h2>

                    <div className="space-y-8 text-lg md:text-2xl font-mono leading-relaxed text-left border-l-8 border-[#171717] pl-8">
                        <p>
                            Después de más de una década contando historias con la cámara, descubrí que mi verdadera pasión iba <strong className="font-black">más allá del encuadre</strong>.
                            Lo que empezó como la <span style={{ color: RETRO_MAROON }} className="font-bold">necesidad de crear una presencia digital</span> para mis proyectos, se convirtió en una obsesión por entender cómo el código da vida a las ideas.
                        </p>

                        <p>
                            Esa transición de <strong className="font-black">fotógrafo y videógrafo a desarrollador frontend</strong> no fue un cambio, sino una <span style={{ color: RETRO_MAROON }} className="font-bold">evolución natural</span> para fusionar mi ojo creativo con la lógica del desarrollo web.
                        </p>

                        <p>
                            Ahora, cada línea de código es una extensión de mi visión artística. No busco solo que algo funcione, sino que <strong style={{ color: RETRO_MAROON }}>sienta, funcione y deje una huella duradera</strong> en el usuario, a través de interfaces intuitivas y un código impecable.
                        </p>
                    </div>
                </div>
            </section>

            {/* --- SECCIÓN SKILLS --- */}
            <section className="relative py-24 bg-[#171717] text-[#cdc69c] px-6">
                <div className="absolute inset-0 opacity-30 contrast-125 saturate-110" style={{ backgroundImage: `url(${TEXTURE_3})`, backgroundSize: 'cover', mixBlendMode: 'overlay' }} />
                <div className="relative z-10 max-w-6xl mx-auto">
                    <div className="flex items-center gap-6 mb-16">
                        <FaRegPlayCircle className="text-7xl text-[#8e2b27] animate-pulse" />
                        <h2 className="text-6xl font-black tracking-tighter uppercase md:text-8xl font-display-impact">TRACKLIST: Skills</h2>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
                        {skillTracks.map(s => (
                            <TrackItem
                                key={s.num}
                                num={s.num}
                                title={s.title}
                                details={s.details}
                                subtitle={s.subtitle}
                                isPlatinum={s.isPlatinum}
                                icon={s.icon}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CARA A: EXPERIENCIA --- */}
            <section className="relative py-32 bg-[#cdc69c] text-[#171717] px-6 overflow-hidden">
                <div className="absolute inset-0 opacity-25 pointer-events-none mix-blend-multiply"
                    style={{ backgroundImage: `url(${TEXTURE_4})`, backgroundSize: 'cover' }} />

                <div className="relative z-10 max-w-6xl mx-auto">
                    <h2 className="absolute -top-16 -left-10 text-[12rem] md:text-[20rem] font-black text-[#8e2b27]/5 font-display-impact select-none uppercase leading-none">
                        A SIDE
                    </h2>

                    <div className="flex flex-col justify-between gap-4 mb-16 md:flex-row md:items-end">
                        <div>
                            <span className="text-[#8e2b27] font-mono font-bold tracking-[0.3em] uppercase text-sm block mb-2">Side A // 33 RPM</span>
                            <h3 className="text-6xl font-black tracking-tighter uppercase font-display-impact">
                                Experiencia <span className="text-[#8e2b27]">Laboral</span>
                            </h3>
                        </div>
                        <p className="font-mono text-xs opacity-60 max-w-[200px] text-right hidden md:block">
                            TECHNICAL SKILLS APPLIED IN REAL SCENARIOS _
                        </p>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 border-t-4 border-[#171717]">
                        {experienciaData.map((exp, i) => (
                            <TrackItem
                                key={i}
                                num={String(i + 1).padStart(2, '0')}
                                title={exp.puesto}
                                subtitle={`${exp.empresa} • ${exp.fecha}`}
                                details={exp.resumen}
                                extra={exp.detalles}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CARA B: FORMACIÓN --- */}
            <section className="relative py-32 bg-[#8e2b27] text-[#cdc69c] px-6 overflow-hidden">
                <div className="absolute inset-0 pointer-events-none opacity-40 mix-blend-overlay"
                    style={{ backgroundImage: `url(${TEXTURE_5})`, backgroundSize: 'cover' }} />

                <div className="relative z-10 max-w-6xl mx-auto">
                    <h2 className="absolute -top-16 -right-10 text-[12rem] md:text-[20rem] font-black text-black/20 font-display-impact select-none uppercase leading-none text-right">
                        B SIDE
                    </h2>

                    <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4 border-b-4 border-[#cdc69c]/30 pb-8">
                        <div>
                            <span className="text-[#cdc69c] font-mono font-bold tracking-[0.3em] uppercase text-sm block mb-2 opacity-60">Side B // 45 RPM</span>
                            <h3 className="text-6xl font-black tracking-tighter uppercase font-display-impact">
                                Formación <span className="text-white">Académica</span>
                            </h3>
                        </div>
                        <p className="font-mono text-xs opacity-60 max-w-[250px] text-right hidden md:block">
                            CONTINUOUS LEARNING & VERTICAL SPECIALIZATION _
                        </p>
                    </div>

                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-2">
                        {formacionData.map((form, i) => (
                            <TrackItem
                                key={i}
                                num={String(i + 1).padStart(2, '0')}
                                title={form.titulo}
                                subtitle={`${form.centro} | ${form.fecha}`}
                                details={form.resumen}
                                extra={form.detalles}
                                color={RETRO_CREAM} 
                            />
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}

// --- DATA ---
const skillTracks = [
    {
        num: '01',
        title: 'React & Next.js',
        subtitle: 'Platinum Track / Especialidad',
        details: 'Arquitectura de interfaces de alto rendimiento. Experto en Hooks, Server Components y gestión de estado avanzada.',
        isPlatinum: true,
        icon: <FaReact />

    },
    {
        num: '02',
        title: 'Tailwind CSS',
        subtitle: 'Platinum Track / Diseño Atómico',
        details: 'Maquetación ultra-rápida y sistemas de diseño escalables. Control total sobre el layout y la consistencia visual.',
        isPlatinum: true,
        icon: <SiTailwindcss />
    },
    {
        num: '03',
        title: 'TypeScript',
        subtitle: 'Gold Track',
        details: 'Desarrollo robusto con tipado estricto. Código limpio, mantenible y profesional.',
        icon: <SiTypescript />
    },
    {
        num: '04',
        title: 'Ecosistema Frontend',
        subtitle: 'JS ES6+ • HTML5 • CSS3',
        details: 'Sólida base técnica en lógica de programación, semántica web y accesibilidad profesional.',
    },
    {
        num: '05',
        title: 'UI/UX Visual Eye',
        subtitle: 'Creative Vision',
        details: 'Criterio estético heredado de la fotografía: composición, jerarquía visual y psicología del color aplicada a la web.',
    },
    {
        num: '06',
        title: 'Framer Motion',
        subtitle: 'Interacciones',
        details: 'Micro-animaciones y coreografías visuales que elevan la experiencia de usuario.',
        icon: <SiFramer />
    },
    {
        num: '07',
        title: 'Angular & Otras Tecnologías',
        subtitle: 'B-Side',
        details: 'Conocimientos de Angular para proyectos modulares, además de herramientas como WordPress, Git y despliegue en Netlify.',
    }
];

const experienciaData = [
    { empresa: "Adv Estudio", puesto: "Fotógrafo, filmmaker y desarrollo web", fecha: "2024 - Presente", resumen: "Desarrollo web a medida y contenido audiovisual estratégico.", detalles: "Lideré proyectos para pequeñas agencias y artistas integrando vídeo y web." },
    { empresa: "Apple Mecanorba", puesto: "Asesor comercial y soporte técnico", fecha: "2024", resumen: "Estrategias personalizadas, soporte técnico y +15% ventas en productos Apple.", detalles: "Atención personalizada y formación a clientes." },
    { empresa: "P.D. Fotógrafos", puesto: "Fotógrafo y filmmaker", fecha: "2012 - 2023", resumen: "Producción visual y campañas de branding digital (+20% engagement).", detalles: "Coordinación de equipos y mejora de engagement visual." },
    { empresa: "Gestor.Ex", puesto: "Técnico de sonido y docente", fecha: "2014", resumen: "Sonido en directo y formación audiovisual.", detalles: "Técnica de sonido para Radio Marca." },
    { empresa: "Uveauve", puesto: "Auxiliar de vídeo y sonido", fecha: "2011", resumen: "Retransmisión en directo.", detalles: "Montaje y operación de equipos en eventos." },
];

const formacionData = [
    { titulo: "IA para Desarrolladores", centro: "Big School", fecha: "2025", resumen: "Diseño prompts técnicos y automatización.", detalles: "" },
    { titulo: "Maestría en JavaScript", centro: "Udemy", fecha: "2025", resumen: "Fundamentos sólidos y sintaxis moderna.", detalles: "Manejo avanzado de asincronía." },
    { titulo: "React y TypeScript", centro: "Udemy", fecha: "2024", resumen: "Zustand, React Query y Next.js.", detalles: "" },
    { titulo: "Master en JavaScript", centro: "Udemy", fecha: "2024", resumen: "jQuery, Angular y NodeJS.", detalles: "" },
    { titulo: "Front End Libraries", centro: "FreeCodeCamp", fecha: "2023", resumen: "Certificación en frameworks modernos.", detalles: "" },
    { titulo: "JavaScript Algorithms", centro: "FreeCodeCamp", fecha: "2023", resumen: "Estructuras de datos y algoritmos.", detalles: "" },
    { titulo: "Responsive Web Design", centro: "FreeCodeCamp", fecha: "2023", resumen: "Diseño web adaptable.", detalles: "" },
    { titulo: "Postgrado Full Stack", centro: "Euroinnova", fecha: "2023", resumen: "HTML, CSS, JS, PHP y MySQL.", detalles: "" },
    { titulo: "Certificado Multimedia", centro: "Sexpe", fecha: "2021", resumen: "Creación de productos interactivos.", detalles: "" },
];