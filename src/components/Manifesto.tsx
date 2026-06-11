import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

export default function Manifesto() {
  const sectionRef = useRef<HTMLDivElement>(null);

  const [cafeCount, setCafeCount] = useState(10);
  const [isDone, setIsDone] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });

  const cafeValue = useTransform(scrollYProgress, [0.4, 0.8], [10, 0]);

  useEffect(() => {
    const unsubscribe = cafeValue.on("change", (v) => {
      const rounded = Math.ceil(v);

      setCafeCount((prev) => (prev !== rounded ? rounded : prev));
    });

    return () => unsubscribe();
  }, [cafeValue]);

  return (
    <section
      ref={sectionRef}
      id="manifesto-section"
      className="relative block w-full px-6 py-10 md:py-24 overflow-hidden bg-[#cdc69c]"
      style={{ position: 'relative' }}
    >
      {/* Texturas */}
      <picture className="absolute inset-0 z-[50] pointer-events-none">
        <source
          srcSet="/images/texturas/old-paper-grunge-dark-mobile.webp"
          media="(max-width: 767px)"
        />

        <source
          srcSet="/images/texturas/old-paper-grunge-dark.webp"
          media="(min-width: 768px)"
        />

        <img
          src="/images/texturas/old-paper-grunge-dark.webp"
          alt=""
          role="presentation"
          loading="lazy"
          className="absolute inset-0 object-cover w-full h-full opacity-15 grayscale contrast-150 mix-blend-multiply"
        />
      </picture>

      <motion.div
        className="relative z-10 max-w-3xl mx-auto font-mono text-[#171717]"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
      >
        <div
          className="w-full h-px mb-8 opacity-60 bg-[#8e2b27]"
          aria-hidden="true"
        />

        {/* Manifest */}
        <div className="pl-4 border-l-4 md:pl-6 border-[#8e2b27]">
          <div className="text-base leading-snug md:text-lg font-mono">
            <div>
              <span className="text-[#8e2b27]">if</span> (
              <span className="font-bold uppercase">soloEsVisual</span>)
              <span className="opacity-70">{" {"}</span>
            </div>

            <p className="ml-4 italic opacity-40">
              // falta estructura
            </p>

            <div className="ml-4">
              console.log("
              <span className="text-xl font-bold uppercase">
                construir mejor
              </span>
              ");
            </div>

            <div>
              <span className="opacity-70">{"}"}</span>{" "}
              <span className="text-[#8e2b27]">else</span>{" "}
              <span className="opacity-70">{"{"}</span>
            </div>

            <p className="ml-4 text-2xl uppercase font-bold text-[#8e2b27]">
              ahora tiene sentido
            </p>

            <p className="opacity-70">{"}"}</p>
          </div>
        </div>

        {/* CTA */}
        <div className="w-full my-12 text-right">
          <button
            onClick={() => setIsDone(true)}
            disabled={isDone}
            className="relative inline-block outline-none cursor-pointer group bg-transparent border-none p-0"
          >
            <div className="relative px-4 py-2">
              <AnimatePresence>
                {isDone && (
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    className="absolute inset-0 bg-[#8e2b27] z-0 origin-left"
                    transition={{ duration: 0.3 }}
                  />
                )}
              </AnimatePresence>

              <span
                className={`relative z-10 text-5xl font-black uppercase md:text-7xl transition-colors duration-300 ${
                  isDone
                    ? "text-[#cdc69c]"
                    : "text-[#8e2b27] group-hover:text-black"
                }`}
              >
                BUILD
              </span>

              <span
                className={`relative z-10 text-4xl md:text-6xl font-black transition-colors duration-300 ${
                  isDone ? "text-[#cdc69c]" : "text-[#8e2b27]"
                }`}
              >
                ();
              </span>
            </div>
          </button>
        </div>

        <div
          className="w-full h-1 my-8 bg-[#8e2b27]"
          aria-hidden="true"
        />

        {/* Bottom Block */}
        <div className="relative pl-4 text-right md:pl-6">
          <AnimatePresence>
            {isDone && (
              <motion.div
                initial={{ scale: 3, opacity: 0, rotate: 25 }}
                animate={{ scale: 1, opacity: 1, rotate: -12 }}
                className="absolute -top-10 right-10 z-[40] pointer-events-none"
              >
                <div className="px-4 py-1 border-4 border-[#8e2b27] text-[#8e2b27] font-bold text-4xl md:text-6xl uppercase tracking-tighter bg-[#cdc69c] border-double shadow-lg">
                  KEEP BUILDING
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="relative inline-block text-base leading-snug text-left font-mono">
            <div>
              <span className="text-[#8e2b27]">while</span> (cafe{" "}
              <span className="text-[#8e2b27]">&gt;</span> 0){" "}
              <span className="text-[#8e2b27]">{"{"}</span>
            </div>

            <p className="text-sm opacity-50 ml-4">
              cafe = {cafeCount > 0 ? cafeCount : 0};
            </p>

            <div>
              <span className="text-[#8e2b27]">{"}"}</span>
            </div>

            <div className="mt-6">
              <div>
                <span className="text-[#8e2b27]">const</span> disquete ={" "}
                <span className="text-[#8e2b27]">{"{"}</span>
              </div>

              <div className="ml-4">
                <span className="opacity-80">focus:</span>

                <span className="ml-2 text-xl font-black md:text-2xl">
                  "PRODUCTO · UX · FRONTEND"
                </span>
              </div>

              <div>
                <span className="text-[#8e2b27]">{"}"}</span>;
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  );
}