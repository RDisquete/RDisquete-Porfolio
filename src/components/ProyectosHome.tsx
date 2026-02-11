import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaPlay, FaArrowRight } from "react-icons/fa"; 
import { useNavigate } from "react-router-dom";

interface Project {
  title: string;
  desc: string;
  img: string;
  url: string;
  video?: string;
  tech?: string[];
}

interface ProjectTrackProps {
  project: Project;
  index: number;
  onHoverStart: (project: Project) => void;
}

const LazyVideo = ({ src }: { src: string }) => {
  return (
    <video 
      src={src} 
      className="object-cover w-full h-full grayscale contrast-125" 
      autoPlay 
      loop 
      muted 
      playsInline 
      preload="auto"
    />
  );
};

const ProjectTrack = ({ project, index, onHoverStart }: ProjectTrackProps) => {
  const trackNumber = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group border-b border-[#cdc69c]/10 last:border-0"
      onMouseEnter={() => onHoverStart(project)}
      onClick={() => window.open(project.url, '_blank')}
    >
      <div className="flex items-center gap-4 py-4 px-2 cursor-pointer transition-all hover:bg-[#cdc69c]/5">
        <span className="font-mono text-xs text-[#8e2b27] font-bold">{trackNumber}.</span>
        <div className="flex-grow">
          <h3 className="text-lg md:text-2xl font-black uppercase tracking-tighter text-[#cdc69c] group-hover:text-white transition-colors">
            {project.title}
          </h3>
        </div>
        <FaPlay className="w-3 h-3 text-[#cdc69c] opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
};

export default function ProyectosHome({ projects }: { projects: Project[] }) {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(projects[0] || null);
  const navigate = useNavigate(); 

  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-screen py-16 overflow-hidden lg:flex-row lg:py-0 bg-neutral-950">
      
      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 flex flex-col items-center w-full h-auto gap-12 px-6 lg:h-screen lg:px-12 max-w-7xl lg:flex-row">
        
        {/* LADO IZQUIERDO */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center border-l border-[#8e2b27]/30 pl-6 md:pl-8 lg:h-full lg:py-12">
          <header className="mb-8">
            <span className="font-mono text-[9px] tracking-[0.5em] text-[#8e2b27] uppercase font-bold block mb-2">
                Side_B // Archive
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#cdc69c] uppercase tracking-tighter leading-[0.85]">
              SELECTED <br />
              <span className="inline-block mt-2 italic text-white">TRACKS</span>
            </h2>
          </header>

          <nav className="flex-grow pr-4 custom-scrollbar lg:overflow-y-auto lg:max-h-[45vh] mb-4">
            {projects?.map((project, index) => (
              <ProjectTrack
                key={project.title} 
                project={project}
                index={index}
                onHoverStart={setHoveredProject}
              />
            ))}
          </nav>

          <button
            className="flex items-center gap-3 py-4 mt-4 group w-fit bg-transparent border-none outline-none cursor-pointer"
            onClick={() => navigate('/catalog')}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#8e2b27] group-hover:bg-[#8e2b27] transition-all duration-300">
              <FaArrowRight className="w-4 h-4 text-[#8e2b27] group-hover:text-[#cdc69c]" />
            </div>
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[#cdc69c] group-hover:text-white">
              View Full Discography
            </span>
          </button>

          <footer className="mt-auto pt-6 border-t border-[#cdc69c]/10 font-mono text-[9px] uppercase opacity-30 flex justify-between">
            <span>© 2026 RDisquete Records</span>
            <span>Hi-Fid Digital</span>
          </footer>
        </div>

        {/* LADO DERECHO */}
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="relative w-full max-w-[450px] lg:max-w-[500px] aspect-[4/5] lg:aspect-square">
            <AnimatePresence mode="wait">
              <motion.div
                key={hoveredProject?.title}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                className="relative lg:absolute inset-0 p-4 md:p-6 bg-[#cdc69c] shadow-[15px_15px_0px_rgba(142,43,39,0.3)] md:shadow-[30px_30px_0px_rgba(142,43,39,0.2)] flex flex-col"
              >
                <div className="relative h-[45%] md:h-[55%] w-full overflow-hidden bg-black border border-black/5">
                  <div className="hidden md:block w-full h-full">
                    {hoveredProject?.video ? (
                      <LazyVideo src={hoveredProject.video} />
                    ) : (
                      <img src={hoveredProject?.img} className="object-cover w-full h-full grayscale" alt="" loading="lazy" />
                    )}
                  </div>
                  <div className="block md:hidden w-full h-full">
                    <img src={hoveredProject?.img} className="object-cover w-full h-full grayscale" alt={hoveredProject?.title} loading="lazy" />
                  </div>
                </div>

                <div className="flex flex-col flex-grow pt-4 text-black md:pt-6">
                  <div className="flex items-start justify-between pb-2 border-b border-black/20">
                    <h4 className="text-xl font-black leading-none uppercase md:text-3xl tracking-tighter">{hoveredProject?.title}</h4>
                    <span className="font-mono text-[10px] font-bold bg-black text-[#cdc69c] px-2 py-0.5">{`OP_0${projects.indexOf(hoveredProject!) + 1}`}</span>
                  </div>
                  <p className="mt-3 font-serif text-sm italic leading-snug md:text-base opacity-90 line-clamp-3">"{hoveredProject?.desc}"</p>
                  <div className="flex flex-wrap pt-3 mt-auto gap-x-3 gap-y-1 border-t border-black/10">
                    {hoveredProject?.tech?.slice(0, 4).map((t, i) => (
                      <span key={i} className="font-mono text-[9px] uppercase font-bold">{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            <div className="absolute hidden w-full h-full -translate-y-1/2 border rounded-full lg:block -z-10 top-1/2 left-1/2 -translate-x-1/4 bg-neutral-900 border-white/5" />
          </div>
        </div>
      </div>


      <picture className="absolute inset-0 z-[500] pointer-events-none">
        <source srcSet="/images/texturas/textura2-mobile.webp" media="(max-width: 767px)" />
        <source srcSet="/images/texturas/textura2.webp" media="(min-width: 768px)" />
        <img 
          src="/images/texturas/textura2.webp"
          alt=""
          role="presentation"
          loading="lazy"
          className="absolute inset-0 object-cover w-full h-full opacity-[0.15] md:opacity-15 mix-blend-multiply grayscale will-change-transform"
        />
      </picture>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #8e2b27; }
      `}</style>
    </section>
  );
}