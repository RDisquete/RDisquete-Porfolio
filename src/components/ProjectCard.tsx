import { useMemo, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import type { Proyecto } from "../data/projectsData";

const COLORS = {
    bg: "#cdc69c",
    accent: "#8e2b27",
    cardLight: "#f5f3e7",
};

const COLLAGE_ROTATIONS = [
    "rotate-[-1deg]", "rotate-[2deg] -translate-y-1",
    "-rotate-1.5 translate-y-3", "rotate-2.5 -translate-y-2",
];

export default function ProjectCard({ project, index, onOpen, isFeatured }: { project: Proyecto, index: number, onOpen: (p: Proyecto) => void, isFeatured?: boolean }) {
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
                <img src={project.img} alt={project.title} loading="lazy" className="object-cover w-full h-full contrast-[1.1] grayscale-[20%]" />
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