import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play } from "lucide-react";

// --- INTERFACES ---
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

const ProjectTrack = ({ project, index, onHoverStart }: ProjectTrackProps) => {
  const trackNumber = String(index + 1).padStart(2, '0');

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
      className="group border-b border-[#cdc69c]/10 last:border-0"
      onMouseEnter={() => onHoverStart(project)}
      onClick={() => window.open(project.url, '_blank')}
    >
      <div className="flex items-center gap-4 py-5 px-2 cursor-pointer transition-all hover:bg-[#cdc69c]/5">
        <span className="font-mono text-sm text-[#8e2b27] font-bold">{trackNumber}.</span>
        <div className="flex-grow">
          <h3 className="text-xl md:text-2xl font-black uppercase tracking-tighter text-[#cdc69c] group-hover:text-white transition-colors">
            {project.title}
          </h3>
        </div>
        <Play className="w-4 h-4 text-[#cdc69c] opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>
    </motion.div>
  );
};

export default function ProyectosHome({ projects }: { projects: Project[] }) {
  
  const [hoveredProject, setHoveredProject] = useState<Project | null>(projects[0] || null);

  return (
    <section className="relative flex flex-col items-center justify-center w-full min-h-screen py-16 overflow-hidden lg:flex-row lg:py-0 bg-neutral-950 lg:overflow-visible">
      
      <div 
        className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-overlay" 
        style={{ backgroundImage: "url('/images/texturas/textura2.jpg')", backgroundSize: 'cover' }} 
      />

      <div className="relative z-10 flex flex-col items-center w-full h-auto gap-12 px-6 lg:h-screen lg:px-12 max-w-7xl lg:flex-row">
        
        <div className="w-full lg:w-1/2 flex flex-col justify-center border-l border-[#8e2b27]/30 pl-6 md:pl-8 lg:h-full lg:py-12">
          <header className="mb-8">
            <span className="font-mono text-[10px] tracking-[0.5em] text-[#8e2b27] uppercase font-bold block mb-2">
                Side_B // Archive
            </span>
            <h2 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#cdc69c] uppercase tracking-tighter leading-[0.85]">
              SELECTED <br />
              <span className="inline-block mt-2 italic text-white">TRACKS</span>
            </h2>
          </header>

          <div className="flex-grow pr-4 custom-scrollbar lg:overflow-y-auto lg:max-h-[55vh] mb-8 lg:mb-0">
            {projects?.map((project, index) => (
              <ProjectTrack
                key={index}
                project={project}
                index={index}
                onHoverStart={setHoveredProject}
              />
            ))}
          </div>

          <footer className="mt-auto pt-6 border-t border-[#cdc69c]/10 font-mono text-[10px] uppercase opacity-30 flex justify-between">
            <span>© 2026 RDisquete Records</span>
            <span>Hi-Fidelity Digital</span>
          </footer>
        </div>

        <div className="flex items-center justify-center w-full lg:w-1/2">
          <div className="relative w-full max-w-[450px] lg:max-w-[500px] aspect-[4/5] lg:aspect-square">
            <AnimatePresence mode="wait">
              <motion.div
                key={hoveredProject?.title}
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 1.05, y: -10 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="relative lg:absolute inset-0 p-4 md:p-6 bg-[#cdc69c] shadow-[20px_20px_0px_rgba(142,43,39,0.3)] md:shadow-[30px_30px_0px_rgba(142,43,39,0.2)] flex flex-col"
              >
                <div className="relative h-[45%] md:h-[55%] w-full overflow-hidden bg-black border border-black/10">
                  {hoveredProject?.video ? (
                    <video 
                      src={hoveredProject.video} 
                      className="object-cover w-full h-full grayscale contrast-125" 
                      autoPlay loop muted playsInline 
                    />
                  ) : (
                    <img 
                      src={hoveredProject?.img} 
                      className="object-cover w-full h-full grayscale contrast-110" 
                      alt={hoveredProject?.title} 
                    />
                  )}
                  <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-white/10 via-transparent to-black/10" />
                </div>

                <div className="flex flex-col flex-grow pt-4 text-black md:pt-6">
                  <div className="flex items-start justify-between pb-2 border-b border-black/30">
                    <h4 className="text-xl font-black leading-none tracking-tighter uppercase md:text-3xl">
                      {hoveredProject?.title}
                    </h4>
                    <span className="font-mono text-[9px] md:text-[10px] font-bold bg-black text-[#cdc69c] px-2 py-0.5">
                      {hoveredProject ? `OP_0${projects.indexOf(hoveredProject) + 1}` : 'OP_00'}
                    </span>
                  </div>

                  <p className="mt-4 font-serif text-sm italic font-medium leading-tight md:text-lg opacity-90">
                    "{hoveredProject?.desc}"
                  </p>

                  <div className="flex flex-wrap pt-4 mt-auto gap-x-3 gap-y-1">
                    <span className="w-full font-mono text-[8px] md:text-[9px] uppercase font-black text-[#8e2b27] mb-1 tracking-widest">
                        Technical Stack:
                    </span>
                    {hoveredProject?.tech?.map((t, i) => (
                      <span key={i} className="font-mono text-[10px] md:text-[11px] uppercase font-black border-b border-black/20">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
            
            <div className="absolute hidden w-full h-full -translate-y-1/2 border rounded-full lg:block -z-10 top-1/2 left-1/2 -translate-x-1/4 bg-neutral-900 border-white/5" />
          </div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 2px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #8e2b27; }
      `}</style>
    </section>
  );
}