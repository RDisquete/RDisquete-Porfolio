import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence, type Variants } from "framer-motion";
import { FaPlay, FaArrowRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

// --- TIPOS ---
interface Project {
  title: string;
  desc: string;
  img: string;
  url: string;
  video?: string;
  techStack?: string;
  techIcons?: React.ReactNode[];
  context?: string;
  problem?: string;
  solution?: string[];
  result?: string;
  github?: string;
  impact?: string;
  apkUrl?: string;
}

// --- ANIMACIONES MODAL ---
const modalOverlay: Variants = {
  hidden:  { opacity: 0 },
  visible: { opacity: 1, transition: { duration: 0.25 } },
  exit:    { opacity: 0, transition: { duration: 0.2 } },
};

const modalPanel: Variants = {
  hidden:   { opacity: 0, y: 30, scale: 0.97 },
  visible:  { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.3, ease: [0.17, 0.67, 0.83, 0.67] } },
  exit:     { opacity: 0, y: 20, scale: 0.97, transition: { duration: 0.2 } },
};

// --- MODAL ---
function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = "hidden";
    
    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  const modal = (
    <motion.div
      className="fixed inset-0 flex items-center justify-center p-4"
      style={{ zIndex: 99999, backgroundColor: "rgba(0,0,0,0.95)" }}
      variants={modalOverlay}
      initial="hidden"
      animate="visible"
      exit="exit"
      onClick={onClose}
    >
      <motion.div
        variants={modalPanel}
        initial="hidden"
        animate="visible"
        exit="exit"
        onClick={(e) => e.stopPropagation()}
        className="bg-[#f5f3e7] max-w-5xl w-full flex flex-col md:flex-row border-2 border-black shadow-[20px_20px_0px_#8e2b27] max-h-[90vh] overflow-y-auto"
      >
        <div className="w-full md:w-3/5 flex-shrink-0 overflow-hidden aspect-[4/3] md:aspect-auto md:self-stretch">
          <img
            src={project.img}
            alt={project.title}
            className="w-full h-full object-cover object-center"
          />
        </div>

        <div className="p-8 md:w-2/5 space-y-6 text-black relative flex flex-col">
          <button
            onClick={onClose}
            aria-label="Cerrar modal"
            className="absolute top-4 right-4 text-xl hover:text-[#8e2b27] transition"
          >
            ✕
          </button>

          <h2 className="text-4xl font-black uppercase leading-[0.9] pr-8">
            {project.title}
          </h2>

          {project.context && (
            <div>
              <h3 className="text-[10px] font-black uppercase text-black/40 mb-1">Contexto</h3>
              <p className="text-xs font-mono text-black/80">{project.context}</p>
            </div>
          )}

          {project.solution && (
            <div>
              <h3 className="text-[10px] font-black uppercase text-black/40 mb-2">Solución</h3>
              <ul className="text-xs font-mono space-y-1">
                {project.solution.map((item, i) => (
                  <li key={i}>• {item}</li>
                ))}
              </ul>
            </div>
          )}{project.problem && (
            <div>
              <h3 className="text-[10px] font-black uppercase text-black/40 mb-1">Problema</h3>
              <p className="text-xs font-mono text-black/80">{project.problem}</p>
            </div>
          )}
          
          {project.result && (
            <div>
              <h3 className="text-[10px] font-black uppercase text-black/40 mb-1">Resultado</h3>
              <p className="text-xs font-mono text-black/80">{project.result}</p>
            </div>
          )}
          
          {project.impact && (
            <div>
              <h3 className="text-[10px] font-black uppercase text-black/40 mb-1">Impacto</h3>
              <p className="text-xs font-mono text-black/80">{project.impact}</p>
            </div>
          )}

          {project.techIcons && (
            <div className="pt-4 border-t border-black/10">
              <div className="flex flex-wrap gap-2 text-2xl text-[#8e2b27]">
                {project.techIcons.map((icon, i) => (
                  <span key={i}>{icon}</span>
                ))}
              </div>
            </div>
          )}

          <div className="flex flex-col gap-3 pt-4 mt-auto pb-4">
            <a
              href={project.url}
              target="_blank"
              rel="noreferrer"
              className="w-full text-center bg-[#8e2b27] text-white py-3 text-[11px] font-black tracking-[0.2em] uppercase hover:bg-black transition"
            >
              Ver proyecto
            </a>
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noreferrer"
                className="w-full text-center border-2 border-black text-black py-3 text-[11px] font-black tracking-[0.2em] uppercase hover:bg-black hover:text-white transition"
              >
                Ver código
              </a>
            )}
            {project.apkUrl && (
              <a
                href={project.apkUrl}
                target="_blank" rel="noreferrer"
                className="w-full text-center border-2 border-[#8e2b27] text-[#8e2b27] py-3 text-[11px] font-black tracking-[0.2em] uppercase hover:bg-[#8e2b27] hover:text-white transition"
              >
                Descargar APK
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return createPortal(modal, document.body);
}

// --- VIDEO LAZY ---
const LazyVideo = ({ src, isHovered, poster }: { src: string; isHovered?: boolean; poster?: string }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const startedRef = useRef(false);

  useEffect(() => {
    if (!videoRef.current || startedRef.current) return;
    if (isHovered) {
      videoRef.current.play().catch(() => {});
      startedRef.current = true;
    }
  }, [isHovered]);

  return (
    <video
      ref={videoRef}
      src={src}
      poster={poster}
      className="object-cover w-full h-full grayscale contrast-125"
      loop muted playsInline preload="none"
    />
  );
};

// --- TRACK DE PROYECTO ---
interface ProjectTrackProps {
  project: Project;
  index: number;
  featured?: boolean;
  onHoverStart: (project: Project) => void;
  onSelect:    (project: Project) => void;
}

const ProjectTrack = ({ project, index, featured, onHoverStart, onSelect }: ProjectTrackProps) => {
  const trackNumber = String(index + 1).padStart(2, "0");

  // ── FEATURED: igual que un track normal pero número y título más grandes ──
  if (featured) {
    return (
      <motion.div
        initial={{ opacity: 0, x: -10 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.3 }}
        className="group border-b border-[#cdc69c]/20"
        onMouseEnter={() => onHoverStart(project)}
        onClick={() => onSelect(project)}
      >
      <div
         role="button"
         tabIndex={0}
         onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(project); } }}
         className="flex items-center gap-4 py-5 px-2 cursor-pointer transition-all hover:bg-[#cdc69c]/5"
       >
           <span className="font-mono text-sm text-[#8e2b27] font-black">{trackNumber}.</span>
           <div className="flex-grow">
             <h3 className="text-2xl md:text-4xl font-black uppercase tracking-tighter text-white group-hover:text-[#cdc69c] transition-colors">
               {project.title}
             </h3>
           </div>
           <FaPlay className="w-3 h-3 text-[#cdc69c] opacity-0 group-hover:opacity-100 transition-opacity" />
         </div>
      </motion.div>
    );
  }

  // ── NORMAL track ──
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="group border-b border-[#cdc69c]/10 last:border-0"
      onMouseEnter={() => onHoverStart(project)}
      onClick={() => onSelect(project)}
    >
      <div
         role="button"
         tabIndex={0}
         onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onSelect(project); } }}
         className="flex items-center gap-4 py-4 px-2 cursor-pointer transition-all hover:bg-[#cdc69c]/5"
       >
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

// --- COMPONENTE PRINCIPAL ---
export default function ProyectosHome({ projects }: { projects: Project[] }) {
  const [hoveredProject, setHoveredProject] = useState<Project | null>(
    projects?.[0] ?? null
  );
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isPreviewHovered, setIsPreviewHovered] = useState(false);
  const [isNavHovered, setIsNavHovered] = useState(false);
  const navigate = useNavigate();

  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-screen py-16 overflow-hidden lg:flex-row lg:py-0 bg-neutral-950">

      {/* TEXTURA DE FONDO */}
      <picture className="absolute inset-0 z-[500] pointer-events-none">
        <source srcSet="/images/texturas/abstract-crumpled-mobile.webp" media="(max-width: 767px)" />
        <source srcSet="/images/texturas/top-view-of-crumpled-vintage.webp" media="(min-width: 768px)" />
        <img
          src="/images/texturas/top-view-of-crumpled-vintage.webp"
          alt=""
          role="presentation"
          loading="lazy"
          className="absolute inset-0 object-cover w-full h-full opacity-[0.15] mix-blend-multiply grayscale brightness-[0.3] will-change-transform"
        />
      </picture>

      {/* CONTENIDO PRINCIPAL */}
      <div className="relative z-10 flex flex-col items-center w-full h-auto gap-12 px-6 lg:h-screen lg:px-12 max-w-7xl lg:flex-row">

        {/* LADO IZQUIERDO - LISTA DE TRACKS */}
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

          <nav className="flex-grow pr-4 custom-scrollbar lg:overflow-y-auto lg:max-h-[45vh] mb-4"
            onMouseEnter={() => setIsNavHovered(true)}
            onMouseLeave={() => setIsNavHovered(false)}>
            {projects?.map((project, index) => (
              <ProjectTrack
                key={project.title}
                project={project}
                index={index}
                featured={index === 0}
                onHoverStart={setHoveredProject}
                onSelect={setSelectedProject}
              />
            ))}
          </nav>

          <button
            className="flex items-center gap-3 py-4 mt-4 group w-fit bg-transparent border-none outline-none cursor-pointer"
            onClick={() => navigate("/projects")}
          >
            <div className="flex items-center justify-center w-10 h-10 rounded-full border border-[#8e2b27] group-hover:bg-[#8e2b27] transition-all duration-300">
              <FaArrowRight className="w-4 h-4 text-[#8e2b27] group-hover:text-[#cdc69c]" />
            </div>
            <span className="font-mono text-[10px] font-black uppercase tracking-[0.2em] text-[#cdc69c] group-hover:text-white">
              View Full Discography
            </span>
          </button>
        </div>
        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="relative w-full max-w-[450px] lg:max-w-[500px] aspect-[4/5] lg:aspect-square">
            <AnimatePresence mode="wait">
              <motion.div
                key={hoveredProject?.title}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.02 }}
                transition={{ duration: 0.2 }}
                onClick={() => hoveredProject && setSelectedProject(hoveredProject)}
                onMouseEnter={() => setIsPreviewHovered(true)}
                onMouseLeave={() => setIsPreviewHovered(false)}
                className="relative lg:absolute inset-0 p-4 md:p-6 bg-[#cdc69c] shadow-[15px_15px_0px_rgba(142,43,39,0.3)] md:shadow-[30px_30px_0px_rgba(142,43,39,0.2)] flex flex-col cursor-pointer group/card transition-transform hover:-translate-y-1 active:scale-[0.99]"
              >
                {/* MEDIA */}
                <div className="relative h-[45%] md:h-[55%] w-full overflow-hidden bg-black border border-black/5">
                  {/* Overlay sutil al hacer hover sobre la tarjeta */}
                  <div className="absolute inset-0 z-10 bg-[#8e2b27]/0 group-hover/card:bg-[#8e2b27]/10 transition-colors" />
                  
                  <div className="hidden md:block w-full h-full">
                    {hoveredProject?.video ? (
                      <LazyVideo src={hoveredProject.video} isHovered={isNavHovered || isPreviewHovered} poster={hoveredProject?.img} />
                    ) : (
                      <img src={hoveredProject?.img} className="object-cover w-full h-full grayscale group-hover/card:grayscale-0 transition-all duration-500" alt="" loading="lazy" />
                    )}
                  </div>
                  <div className="block md:hidden w-full h-full">
                    <img src={hoveredProject?.img} className="object-cover w-full h-full grayscale" alt={hoveredProject?.title} loading="lazy" />
                  </div>
                </div>

                {/* INFO */}
                <div className="flex flex-col flex-grow pt-4 text-black md:pt-6">
                  <div className="flex items-start justify-between pb-2 border-b border-black/20">
                    <h4 className="text-xl font-black leading-none uppercase md:text-3xl tracking-tighter">{hoveredProject?.title}</h4>
                    <span className="font-mono text-[10px] font-bold bg-black text-[#cdc69c] px-2 py-0.5">
                      {`OP_0${projects.indexOf(hoveredProject!) + 1}`}
                    </span>
                  </div>

                  <p className="mt-3 font-serif text-sm italic leading-snug md:text-base opacity-90 line-clamp-2">
                    "{hoveredProject?.desc}"
                  </p>

                  {/* TECH ICONS */}
                  {hoveredProject?.techIcons && hoveredProject.techIcons.length > 0 && (
                    <div className="flex flex-wrap gap-2 pt-3 mt-2 border-t border-black/10 text-xl text-[#8e2b27]">
                      {hoveredProject.techIcons.map((icon, i) => (
                        <span key={i}>{icon}</span>
                      ))}
                    </div>
                  )}

                  {/* BOTONES RÁPIDOS (con e.stopPropagation para no abrir el modal al clicar botones externos) */}
                  <div className="flex gap-2 mt-auto pt-3 border-t border-black/10">
                    {hoveredProject?.url && (
                      <a
                        href={hoveredProject.url}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 text-center bg-black text-[#cdc69c] py-2 text-[9px] font-black tracking-[0.15em] uppercase hover:bg-[#8e2b27] transition-colors"
                      >
                        Ver proyecto
                      </a>
                    )}
                    {hoveredProject?.github && (
                      <a
                        href={hoveredProject.github}
                        target="_blank"
                        rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 text-center border border-black text-black py-2 text-[9px] font-black tracking-[0.15em] uppercase hover:bg-black hover:text-[#cdc69c] transition-colors"
                      >
                        Código
                      </a>
                    )}
                    {hoveredProject?.apkUrl && (
                      <a
                        href={hoveredProject.apkUrl}
                        target="_blank" rel="noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex-1 text-center bg-[#8e2b27] text-[#cdc69c] py-2 text-[9px] font-black tracking-[0.15em] uppercase hover:bg-black transition-colors"
                      >
                        APK
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
}