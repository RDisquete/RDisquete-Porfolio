import React from 'react';
import { motion, type Variants } from "framer-motion";
import { useTranslation, Trans } from "react-i18next";
import {
    FaQuoteLeft, FaQuoteRight, FaInstagram, FaWhatsapp, FaLinkedin, FaFileDownload, FaGithub,
    FaRegPlayCircle, FaReact, FaCheckCircle, FaBolt, FaCubes, FaWrench, FaUniversalAccess, FaRocket,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import { SiTailwindcss, SiTypescript, SiFramer } from "react-icons/si";

const RETRO_DARK = "#171717";
const RETRO_CREAM = "#cdc69c";
const RETRO_MAROON = "#8e2b27";

const fotoRealUrl = "/images/IMG_6012_byn.webp";

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

const retroWhite = "text-[#cdc69c]";
const secondaryFont = "font-mono";

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
    badge?: string;
}

const TrackItem = ({ num, title, subtitle, details, extra, color = RETRO_MAROON, isPlatinum, icon, badge }: TrackItemProps) => (
    <motion.div
        className={`relative p-6 transition-all duration-300 border-b group border-current/10 cursor-crosshair 
        ${isPlatinum ? 'bg-white/10' : 'hover:bg-[#cdc69c]/5'}`}
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
                    {badge && (
                        <span className="font-mono text-[8px] font-black uppercase tracking-[0.15em] bg-[#8e2b27] text-[#cdc69c] px-2 py-0.5">
                            {badge}
                        </span>
                    )}
                    {icon && (
                        <span className="text-2xl transition-all duration-300 group-hover:text-white group-hover:scale-125">
                            {icon}
                        </span>
                    )}
                </div>

                {subtitle && (
                    <p className={`mb-2 font-mono text-sm italic transition-all duration-300 group-hover:text-white/90 group-hover:opacity-100 ${isPlatinum ? 'text-[#cdc69c] opacity-100 font-bold' : 'opacity-70'}`}>
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
    const { t } = useTranslation();

    const skillTracks = React.useMemo(() => [
        { num: '01', title: t("conoceme.skills.01.title"), subtitle: t("conoceme.skills.01.subtitle"), details: t("conoceme.skills.01.details"), isPlatinum: true, icon: <FaReact /> },
        { num: '02', title: t("conoceme.skills.02.title"), subtitle: t("conoceme.skills.02.subtitle"), details: t("conoceme.skills.02.details"), isPlatinum: true, icon: <SiTailwindcss /> },
        { num: '03', title: t("conoceme.skills.03.title"), subtitle: t("conoceme.skills.03.subtitle"), details: t("conoceme.skills.03.details"), icon: <SiTypescript /> },
        { num: '04', title: t("conoceme.skills.04.title"), subtitle: t("conoceme.skills.04.subtitle"), details: t("conoceme.skills.04.details") },
        { num: '05', title: t("conoceme.skills.05.title"), subtitle: t("conoceme.skills.05.subtitle"), details: t("conoceme.skills.05.details") },
        { num: '06', title: t("conoceme.skills.06.title"), subtitle: t("conoceme.skills.06.subtitle"), details: t("conoceme.skills.06.details"), icon: <SiFramer /> },
        { num: '07', title: t("conoceme.skills.07.title"), subtitle: t("conoceme.skills.07.subtitle"), details: t("conoceme.skills.07.details") },
    ], [t]);

    const experienciaData = React.useMemo(() => [
        { empresa: t("conoceme.experiencia.00.empresa"), puesto: t("conoceme.experiencia.00.puesto"), fecha: t("conoceme.experiencia.00.fecha"), resumen: t("conoceme.experiencia.00.resumen"), detalles: t("conoceme.experiencia.00.detalles") },
        { empresa: t("conoceme.experiencia.01.empresa"), puesto: t("conoceme.experiencia.01.puesto"), fecha: t("conoceme.experiencia.01.fecha"), resumen: t("conoceme.experiencia.01.resumen"), detalles: t("conoceme.experiencia.01.detalles") },
        { empresa: t("conoceme.experiencia.02.empresa"), puesto: t("conoceme.experiencia.02.puesto"), fecha: t("conoceme.experiencia.02.fecha"), resumen: t("conoceme.experiencia.02.resumen"), detalles: t("conoceme.experiencia.02.detalles") },
        { empresa: t("conoceme.experiencia.03.empresa"), puesto: t("conoceme.experiencia.03.puesto"), fecha: t("conoceme.experiencia.03.fecha"), resumen: t("conoceme.experiencia.03.resumen"), detalles: t("conoceme.experiencia.03.detalles") },
        { empresa: t("conoceme.experiencia.04.empresa"), puesto: t("conoceme.experiencia.04.puesto"), fecha: t("conoceme.experiencia.04.fecha"), resumen: t("conoceme.experiencia.04.resumen"), detalles: t("conoceme.experiencia.04.detalles") },
    ], [t]);

    const formacionData = React.useMemo(() => [
        { titulo: t("conoceme.formacion.00.titulo"), centro: t("conoceme.formacion.00.centro"), fecha: t("conoceme.formacion.00.fecha"), resumen: t("conoceme.formacion.00.resumen"), detalles: t("conoceme.formacion.00.detalles") },
        { titulo: t("conoceme.formacion.01.titulo"), centro: t("conoceme.formacion.01.centro"), fecha: t("conoceme.formacion.01.fecha"), resumen: t("conoceme.formacion.01.resumen"), detalles: t("conoceme.formacion.01.detalles") },
        { titulo: t("conoceme.formacion.02.titulo"), centro: t("conoceme.formacion.02.centro"), fecha: t("conoceme.formacion.02.fecha"), resumen: t("conoceme.formacion.02.resumen"), detalles: t("conoceme.formacion.02.detalles") },
        { titulo: t("conoceme.formacion.03.titulo"), centro: t("conoceme.formacion.03.centro"), fecha: t("conoceme.formacion.03.fecha"), resumen: t("conoceme.formacion.03.resumen"), detalles: t("conoceme.formacion.03.detalles") },
        { titulo: t("conoceme.formacion.04.titulo"), centro: t("conoceme.formacion.04.centro"), fecha: t("conoceme.formacion.04.fecha"), resumen: t("conoceme.formacion.04.resumen"), detalles: t("conoceme.formacion.04.detalles") },
        { titulo: t("conoceme.formacion.05.titulo"), centro: t("conoceme.formacion.05.centro"), fecha: t("conoceme.formacion.05.fecha"), resumen: t("conoceme.formacion.05.resumen"), detalles: t("conoceme.formacion.05.detalles") },
        { titulo: t("conoceme.formacion.06.titulo"), centro: t("conoceme.formacion.06.centro"), fecha: t("conoceme.formacion.06.fecha"), resumen: t("conoceme.formacion.06.resumen"), detalles: t("conoceme.formacion.06.detalles") },
        { titulo: t("conoceme.formacion.07.titulo"), centro: t("conoceme.formacion.07.centro"), fecha: t("conoceme.formacion.07.fecha"), resumen: t("conoceme.formacion.07.resumen"), detalles: t("conoceme.formacion.07.detalles") },
        { titulo: t("conoceme.formacion.08.titulo"), centro: t("conoceme.formacion.08.centro"), fecha: t("conoceme.formacion.08.fecha"), resumen: t("conoceme.formacion.08.resumen"), detalles: t("conoceme.formacion.08.detalles") },
        { titulo: t("conoceme.formacion.09.titulo"), centro: t("conoceme.formacion.09.centro"), fecha: t("conoceme.formacion.09.fecha"), resumen: t("conoceme.formacion.09.resumen"), detalles: t("conoceme.formacion.09.detalles") },
    ], [t]);

    const studioTracks = React.useMemo(() => [
        { num: '01', title: t("conoceme.studio.01.title"), details: t("conoceme.studio.01.details"), icon: <FaCheckCircle />, badge: t("conoceme.studio.01.badge") },
        { num: '02', title: t("conoceme.studio.02.title"), details: t("conoceme.studio.02.details"), icon: <FaCubes /> },
        { num: '03', title: t("conoceme.studio.03.title"), details: t("conoceme.studio.03.details"), icon: <FaBolt /> },
        { num: '04', title: t("conoceme.studio.04.title"), details: t("conoceme.studio.04.details"), icon: <FaWrench /> },
        { num: '05', title: t("conoceme.studio.05.title"), details: t("conoceme.studio.05.details"), icon: <FaUniversalAccess /> },
        { num: '06', title: t("conoceme.studio.06.title"), details: t("conoceme.studio.06.details"), icon: <FaRocket /> },
    ], [t]);

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
                            <motion.h1
                                className={`text-[10vw] md:text-[8vw] xl:text-[6rem] font-black leading-none uppercase mb-6 md:mb-8`}
                                style={{ color: RETRO_MAROON }}
                                variants={simpleEntryVariants}
                                transition={{ delay: 0.3 }}
                            >
                                {t("conoceme.title")}
                            </motion.h1>

                            <motion.p
                                className={`max-w-xl font-light text-lg md:text-2xl xl:text-2xl leading-relaxed tracking-wide italic ${secondaryFont}`}
                                style={{ color: RETRO_CREAM, opacity: 0.9 }}
                                variants={simpleEntryVariants}
                                transition={{ delay: 0.8 }}
                            >
                                <FaQuoteLeft className="inline mr-2 text-3xl md:mr-4 md:text-4xl" style={{ color: RETRO_MAROON }} />
                                <Trans
                                  i18nKey="conoceme.introQuote"
                                  components={{
                                    c1: <strong className="font-black" style={{ color: RETRO_MAROON }} />,
                                    c2: <strong className="font-black" style={{ color: RETRO_MAROON }} />,
                                    c3: <strong className="font-black" style={{ color: RETRO_MAROON }} />,
                                    c4: <strong className="font-black" style={{ color: RETRO_MAROON }} />,
                                    c5: <strong className="font-black" style={{ color: RETRO_MAROON }} />,
                                  }}
                                >
                                    <strong className="font-black" style={{ color: RETRO_MAROON }} />
                                    <strong className="font-black" style={{ color: RETRO_MAROON }} />
                                    <strong className="font-black" style={{ color: RETRO_MAROON }} />
                                    <strong className="font-black" style={{ color: RETRO_MAROON }} />
                                    <strong className="font-black" style={{ color: RETRO_MAROON }} />
                                </Trans>
                                <FaQuoteRight className="inline ml-2 text-3xl md:ml-4 md:text-4xl" style={{ color: RETRO_MAROON }} />
                                <br />
                                <span className="font-vintage-cursive text-lg md:text-xl font-bold not-italic opacity-70" style={{ color: RETRO_MAROON }}>
                                    {t("conoceme.signature")}
                                </span>
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
                                <picture>
                                    <source srcSet="/images/IMG_6012_byn-mobile.webp" media="(max-width: 767px)" />
                                    <source srcSet="/images/IMG_6012_byn.webp" media="(min-width: 768px)" />
                                    <img
                                        src={fotoRealUrl}
                                        alt="Rafa Dorado - Fotografía"
                                        loading="eager"
                                        className="absolute inset-0 w-full h-full object-cover object-top"
                                        style={{ height: '110%', filter: 'brightness(1.15)' }}
                                    />
                                </picture>
                                <picture className="absolute inset-0 pointer-events-none z-[35]" aria-hidden="true">
                                    <source srcSet="/images/texturas/abstract-crumpled-mobile.webp" media="(max-width: 767px)" />
                                    <source srcSet="/images/texturas/abstract-crumpled.webp" media="(min-width: 768px)" />
                                    <img
                                        src="/images/texturas/abstract-crumpled.webp"
                                        alt="" role="presentation"
                                        loading="lazy"
                                        className="absolute inset-0 w-full h-full object-cover opacity-15 mix-blend-overlay"
                                    />
                                </picture>
                            </div>
                        </motion.div>
                    </div>

                    <div className="relative z-30 w-full px-4 pt-4 pb-8 md:pt-4 md:pb-8 md:px-20">
                        <div className="flex justify-center w-full space-x-6 text-2xl md:space-x-8 md:text-3xl" style={{ color: RETRO_CREAM }}>
                            {Object.entries(socialLinks).map(([key, url], index) => {
                                const IconComponent = IconMap[key];
                                if (!IconComponent) return null;
                                return (
                                    <motion.a
                                        key={key} custom={index} variants={simpleEntryVariants} href={url}
                                        target="_blank" rel="noopener noreferrer" aria-label={t("conoceme.aria.profile")}
                                        className={`transition-colors hover:text-[#b43a31] transform hover:scale-110`}
                                    >
                                        <IconComponent />
                                    </motion.a>
                                );
                            })}
                        </div>
                    </div>

                    <motion.div
                        className="absolute inset-0 pointer-events-none"
                        variants={introTextureEntry}
                        aria-hidden="true"
                    >
                        <picture className="absolute inset-0">
                            <source srcSet="/images/texturas/abstract-crumpled-mobile.webp" media="(max-width: 767px)" />
                            <source srcSet="/images/texturas/abstract-crumpled.webp" media="(min-width: 768px)" />
                            <img
                                src="/images/texturas/abstract-crumpled.webp"
                                alt="" role="presentation"
                                fetchPriority="high"
                                className="absolute inset-0 w-full h-full object-cover opacity-30 mix-blend-overlay"
                            />
                        </picture>
                    </motion.div>
                </motion.section>
            </div>

            {/* --- SECCIÓN 1 --- */}
            <section className="relative py-32 px-6 bg-[#cdc69c] text-[#171717] overflow-hidden">
                <picture className="absolute inset-0 pointer-events-none">
                    <source srcSet="/images/texturas/old-paper-grunge-dark-mobile.webp" media="(max-width: 767px)" />
                    <source srcSet="/images/texturas/old-paper-grunge-dark.webp" media="(min-width: 768px)" />
                    <img
                        src="/images/texturas/old-paper-grunge-dark.webp"
                        alt="" role="presentation"
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover opacity-20 contrast-125 saturate-110 mix-blend-multiply"
                    />
                </picture>
                <div className="relative z-10 max-w-4xl mx-auto">
                    <h2 className="text-6xl md:text-8xl font-black uppercase mb-12 font-display-impact leading-[0.8] tracking-tighter">
                        <Trans
                          i18nKey="conoceme.passion.heading"
                          components={{ c1: <span style={{ color: RETRO_MAROON }} /> }}
                        >
                            <br />
                            <span style={{ color: RETRO_MAROON }} />
                        </Trans>
                    </h2>

                    <div className="space-y-8 text-lg md:text-2xl font-mono leading-relaxed text-left border-l-8 border-[#171717] pl-8">
                        <p>
                            <Trans
                              i18nKey="conoceme.passion.p1"
                              components={{
                                c1: <strong className="font-black" />,
                                c2: <span style={{ color: RETRO_MAROON }} className="font-bold" />,
                              }}
                            >
                                <strong className="font-black" />
                                <span style={{ color: RETRO_MAROON }} className="font-bold" />
                            </Trans>
                        </p>

                        <p>
                            <Trans
                              i18nKey="conoceme.passion.p2"
                              components={{ c1: <strong className="font-black" /> }}
                            >
                                <strong className="font-black" />
                            </Trans>
                        </p>

                        <p>
                            <Trans
                              i18nKey="conoceme.passion.p3"
                              components={{
                                c1: <strong style={{ color: RETRO_MAROON }} />,
                                c2: <strong className="font-black" />,
                              }}
                            >
                                <strong style={{ color: RETRO_MAROON }} />
                                <strong className="font-black" />
                            </Trans>
                        </p>
                    </div>
                </div>
            </section>

            {/* --- SECCIÓN SKILLS --- */}
            <section className="relative py-24 bg-[#171717] text-[#cdc69c] px-6">
                <picture className="absolute inset-0 pointer-events-none">
                    <source srcSet="/images/texturas/old-paper-grunge-dark-mobile.webp" media="(max-width: 767px)" />
                    <source srcSet="/images/texturas/old-paper-grunge-dark.webp" media="(min-width: 768px)" />
                    <img
                        src="/images/texturas/old-paper-grunge-dark.webp"
                        alt="" role="presentation"
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover opacity-30 contrast-125 saturate-110 mix-blend-overlay"
                    />
                </picture>
                <div className="relative z-10 max-w-6xl mx-auto">
                    <div className="flex items-center gap-6 mb-16">
                        <FaRegPlayCircle className="text-7xl text-[#8e2b27] animate-pulse" />
                        <h2 className="text-6xl font-black tracking-tighter uppercase md:text-8xl font-display-impact">{t("conoceme.skills.title")}</h2>
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

            {/* --- STUDIO SESSIONS: PROCESO TÉCNICO --- */}
            <section className="relative py-24 bg-[#0f0f0f] text-[#cdc69c] px-6 overflow-hidden">
                <picture className="absolute inset-0 pointer-events-none">
                    <source srcSet="/images/texturas/old-paper-grunge-dark-mobile.webp" media="(max-width: 767px)" />
                    <source srcSet="/images/texturas/old-paper-grunge-dark.webp" media="(min-width: 768px)" />
                    <img
                        src="/images/texturas/old-paper-grunge-dark.webp"
                        alt="" role="presentation"
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover opacity-20 contrast-125 saturate-110 mix-blend-overlay"
                    />
                </picture>
                <div className="relative z-10 max-w-6xl mx-auto">
                    <div className="flex items-center gap-6 mb-20">
                        <FaWrench className="text-6xl text-[#8e2b27]" />
                        <div>
                            <span className="text-[#8e2b27] font-mono font-bold tracking-[0.3em] uppercase text-sm block mb-2">{t("conoceme.studio.subtitle")}</span>
                            <h2 className="text-5xl md:text-7xl font-black tracking-tighter uppercase font-display-impact">
                                <Trans
                                  i18nKey="conoceme.studio.title"
                                  components={{ c1: <span className="text-[#8e2b27]" /> }}
                                >STUDIO <span className="text-[#8e2b27]">SESSIONS</span></Trans>
                            </h2>
                        </div>
                    </div>

                    <p className="max-w-2xl mb-14 font-mono text-sm leading-relaxed opacity-85 border-l-2 border-[#8e2b27] pl-4">
                        <Trans
                          i18nKey="conoceme.studio.intro"
                          components={{ c1: <strong className="text-[#cdc69c]" /> }}
                        >
                            <strong className="text-[#cdc69c]" />
                        </Trans>
                    </p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-4">
                        {studioTracks.map(s => (
                            <TrackItem
                                key={s.num}
                                num={s.num}
                                title={s.title}
                                details={s.details}
                                icon={s.icon}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* --- CARA A: EXPERIENCIA --- */}
            <section className="relative py-32 bg-[#cdc69c] text-[#171717] px-6 overflow-hidden">
                <picture className="absolute inset-0 pointer-events-none">
                    <img
                        src="/images/texturas/top-view-of-crumpled-vintage.webp"
                        alt="" role="presentation"
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover opacity-35 mix-blend-multiply"
                    />
                </picture>

                <div className="relative z-10 max-w-6xl mx-auto">
                    <h2 className="absolute -top-16 -left-10 text-[12rem] md:text-[20rem] font-black text-[#8e2b27]/20 font-display-impact select-none uppercase leading-none">
                        {t("conoceme.experiencia.watermark")}
                    </h2>

                    <div className="flex flex-col justify-between gap-4 mb-16 md:flex-row md:items-end">
                        <div>
                            <span className="text-[#8e2b27] font-mono font-bold tracking-[0.3em] uppercase text-sm block mb-2">{t("conoceme.experiencia.subtitle")}</span>
                            <h3 className="text-6xl font-black tracking-tighter uppercase font-display-impact">
                                <Trans
                                  i18nKey="conoceme.experiencia.heading"
                                  components={{ c1: <span className="text-[#8e2b27]" /> }}
                                ><span className="text-[#8e2b27]" /></Trans>
                            </h3>
                        </div>
                        <p className="font-mono text-xs opacity-60 max-w-[200px] text-right hidden md:block">
                            {t("conoceme.experiencia.caption")}
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
                <picture className="absolute inset-0 pointer-events-none">
                    <img
                        src="/images/texturas/old-black-background-grunge.webp"
                        alt="" role="presentation"
                        loading="lazy"
                        className="absolute inset-0 w-full h-full object-cover opacity-40 mix-blend-overlay"
                    />
                </picture>

                <div className="relative z-10 max-w-6xl mx-auto">
                    <h2 className="absolute -top-16 -right-10 text-[12rem] md:text-[20rem] font-black text-black/20 font-display-impact select-none uppercase leading-none text-right z-0">
                        {t("conoceme.formacion.watermark")}
                    </h2>
                    <div className="relative z-20 flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4 border-b-4 border-[#cdc69c]/30 pb-8">
                        <div>
                            <span className="text-[#cdc69c] font-mono font-bold tracking-[0.3em] uppercase text-sm block mb-2 opacity-60">
                                {t("conoceme.formacion.subtitle")}
                            </span>
                            <h3 className="text-6xl font-black tracking-tighter uppercase font-display-impact">
                                <Trans
                                  i18nKey="conoceme.formacion.heading"
                                  components={{ c1: <span className="text-white" /> }}
                                ><span className="text-white" /></Trans>
                            </h3>
                        </div>
                        <p className="font-mono text-xs opacity-60 max-w-[250px] text-right hidden md:block">
                            {t("conoceme.formacion.caption")}
                        </p>
                    </div>

                    {/* Lista de formación */}
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

