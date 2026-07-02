import React from "react";
import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import type { Proyecto } from "../data/projectsData";
import { useTranslation } from "react-i18next";

export default function ProjectModal({ project, onClose }: { project: Proyecto, onClose: () => void }) {
  const { t } = useTranslation();
  const closeRef = useRef<HTMLButtonElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    closeRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== 'Tab' || !containerRef.current) return;
      const focusable = containerRef.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])'
      );
      if (focusable.length === 0) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

    return (
        <motion.div
            ref={containerRef}
            role="dialog"
            aria-modal="true"
            aria-label={project.title}
            className="fixed inset-0 bg-black/95 flex items-start justify-center z-[9999] overflow-y-auto px-4 py-8"
            onClick={onClose}
        >
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="bg-[#f5f3e7] max-w-5xl w-full flex flex-col md:flex-row border-2 border-black shadow-[20px_20px_0px_#8e2b27]"
            >
              <div className="w-full md:w-3/5 bg-black flex-shrink-0 relative overflow-hidden">
                <img
                    src={project.img}
                    alt=""
                    aria-hidden="true"
                    className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-60"
                />
                <div className="relative w-full aspect-video md:aspect-auto md:h-full flex items-center justify-center p-4">
                    <div className="absolute inset-3 border border-white/20 z-10 pointer-events-none" />
                    <img
                        src={project.img}
                        alt={project.title}
                        className="relative z-[1] w-full h-full object-contain"
                    />
                </div>
              </div>

                <div className="p-6 md:p-8 md:w-2/5 space-y-5 text-black relative flex flex-col">
                    <button
                        ref={closeRef}
                        onClick={onClose}
                        aria-label={t("projectModal.aria.closeModal")}
                        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-black text-white text-sm font-bold hover:bg-[#8e2b27] transition z-20"
                    >
                        ✕
                    </button>

                    <h2 className="text-3xl md:text-4xl font-black uppercase leading-[0.9] pr-8">
                        {project.title}
                    </h2>

                    <div className="flex items-center justify-between border-b border-black/10 pb-3">
                        <span className="font-mono text-[9px] font-black uppercase tracking-widest text-black/40">
                            {project.pressingType === 'First' ? t("projectModal.firstPress") : project.pressingType === 'Remaster' ? t("projectModal.remastered") : t("projectModal.bootleg")}
                        </span>
                        <div className="flex gap-2 text-base text-[#8e2b27]">
                            {project.techIcons?.map((icon, i) => (
                                <span key={i} aria-hidden="true">{icon}</span>
                            ))}
                        </div>
                    </div>

                    <p className="text-xs font-mono text-black/60 italic leading-relaxed border-l-2 border-[#8e2b27] pl-3">
                        "{project.desc}"
                    </p>

                    {project.stats && project.stats.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                            {project.stats.map((stat, i) => (
                                <span key={i} className="bg-black text-[#f5f3e7] font-mono text-[9px] font-black px-2 py-1 uppercase tracking-wider">
                                    {stat}
                                </span>
                            ))}
                        </div>
                    )}

                    <div className="space-y-1">
                        <h3 className="text-[9px] font-black uppercase text-black/30 tracking-widest">{t("projectModal.contexto")}</h3>
                        <p className="text-xs font-mono text-black/80 leading-relaxed">{project.context}</p>
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-[9px] font-black uppercase text-black/30 tracking-widest">{t("projectModal.problema")}</h3>
                        <p className="text-xs font-mono text-black/80 leading-relaxed">{project.problem}</p>
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-[9px] font-black uppercase text-black/30 tracking-widest">{t("projectModal.solucion")}</h3>
                        <ul className="text-xs font-mono space-y-1 text-black/80">
                            {project.solution.map((item, i) => (
                                <li key={i} className="flex gap-2">
                                    <span className="text-[#8e2b27] shrink-0">→</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="border-t border-black/10 pt-3 space-y-1">
                        <h3 className="text-[9px] font-black uppercase text-black/30 tracking-widest">{t("projectModal.resultado")}</h3>
                        <p className="text-sm font-mono text-black/90 leading-relaxed">{project.result}</p>
                    </div>

                    {project.impact && (
                        <div className="bg-black/5 border border-black/10 p-3">
                            <p className="text-[10px] font-mono text-black/70 italic">{project.impact}</p>
                        </div>
                    )}

                    <div className="flex flex-col gap-2 pt-3 mt-auto pb-4">
                        {project.url && (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full text-center bg-[#8e2b27] text-white py-3 text-[10px] font-black tracking-[0.2em] uppercase hover:bg-black transition"
                            >
                                {t("projectModal.verProyecto")}
                            </a>
                        )}
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="w-full text-center border-2 border-black text-black py-3 text-[10px] font-black tracking-[0.2em] uppercase hover:bg-black hover:text-white transition"
                            >
                                {t("projectModal.verCodigo")}
                            </a>
                        )}
                        {project.apkUrl && (
                            <a
                                href={project.apkUrl}
                                target="_blank" rel="noopener noreferrer"
                                className="w-full text-center border-2 border-[#8e2b27] text-[#8e2b27] py-3 text-[10px] font-black tracking-[0.2em] uppercase hover:bg-[#8e2b27] hover:text-white transition"
                            >
                                {t("projectModal.descargarApk")}
                            </a>
                        )}
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}