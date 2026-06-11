import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { type Proyecto } from "../data/projectsData";
import { useTranslatedProjects } from "../hooks/useTranslatedProjects";
import ProjectCard from "../components/ProjectCard";
import ProjectModal from "../components/ProjectModal";

const COLORS = {
    bg: "#cdc69c",
    accent: "#8e2b27",
};

const TEXTURE_URL = "/images/texturas/paperproject.webp";
const TEXTURE_MOBILE_URL = "/images/texturas/paperproject-mobile.webp";

export default function Proyectos() {
    const { t } = useTranslation();
    const PROJECTS = useTranslatedProjects();
    const [selected, setSelected] = useState<Proyecto | null>(null);
    const [filter, setFilter] = useState('ALL');

    const categories = ['ALL', 'REACT', 'TYPESCRIPT', 'TAILWIND', 'VITE', 'FRAMER', 'SUPABASE', 'NEXT.JS', 'GOOGLE MAPS'];

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

                <nav className="mt-20 mb-22 relative z-10 flex flex-col items-center">
                    <span className="text-[9px] font-mono text-black/30 mb-4 tracking-[0.5em] uppercase">Select_Frequency:</span>
                    <div className="flex items-center gap-8 md:gap-16 overflow-x-auto pb-2">
                        {categories.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setFilter(tag)}
                                aria-pressed={filter === tag}
                                className="group relative flex flex-col items-center flex-shrink-0"
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
                    <Link to="/contact" className="flex items-center gap-4 group w-fit">
                        <motion.div whileHover={{ x: 10 }} className="flex items-center gap-4 cursor-pointer">
                            <div className="flex items-center justify-center w-10 h-10 border-2 border-black rounded-full group-hover:bg-black transition-colors">
                                <FaArrowRight className="w-4 h-4 text-black group-hover:text-[#cdc69c] transition-colors" />
                            </div>
                            <span className="text-xl md:text-3xl font-black uppercase tracking-tighter text-[#8e2b27] group-hover:text-black">{t("proyectos.cta")}</span>
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