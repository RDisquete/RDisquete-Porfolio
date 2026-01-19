import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

const TEXTURE_2 = "/images/texturas/old-paper-grunge-dark-photo-grungy-black-textur-2025-10-15-04-48-44-utc.jpg";

export default function Manifesto() {
  const sectionRef = useRef<HTMLElement>(null);
  const [cafeCount, setCafeCount] = useState(10);
  const [isDone, setIsDone] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const cafeValue = useTransform(scrollYProgress, [0.4, 0.8], [10, 0]);

  useEffect(() => {
    const unsubscribe = cafeValue.on("change", (v) => {
      setCafeCount(Math.ceil(v));
    });
    return () => unsubscribe();
  }, [cafeValue]);

  return (
    <motion.section
      ref={sectionRef}
      id="manifesto-section"
      style={{ position: 'relative', display: 'block' }} 
      className="w-full px-6 py-10 md:py-24 overflow-hidden bg-[#cdc69c]"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.1 }}
    >
      <div 
        className="absolute inset-0 pointer-events-none opacity-10 contrast-125 saturate-110" 
        style={{ 
          backgroundImage: `url(${TEXTURE_2})`, 
          backgroundSize: 'cover', 
          mixBlendMode: 'multiply' 
        }} 
      />

      <div className="relative z-10 max-w-3xl mx-auto font-mono text-[#171717]">
        <div className="w-full h-px mb-8 opacity-60 bg-[#8e2b27]" />

        <div className="pl-4 border-l-4 md:pl-6 border-[#8e2b27]">
          <pre className="text-base leading-snug whitespace-pre-wrap md:text-lg">
            <span className="text-[#8e2b27]">if</span> (
            <span className="tracking-wider uppercase font-display-impact">todoEsPredecible</span>
            ) <span className="opacity-70">{`{`}</span>
              {'\n'} <span className="ml-4 italic opacity-40">// boring...</span>
              {'\n'} <span className="ml-4">console.log("</span>
              <span className="text-xl font-bold">HACER OTRA COSA</span> 
              <span>");</span>
            {'\n'}<span className="opacity-70">{`}`}</span> <span className="text-[#8e2b27]">else</span> <span className="opacity-70">{`{`}</span>
              {'\n'} <span className="ml-4 text-2xl uppercase font-display-impact text-[#8e2b27]">esto promete</span>
            {'\n'}<span className="opacity-70">{`}`}</span>
          </pre>
        </div>
        
        <div className="w-full my-12 text-right">
            <button 
                onClick={() => setIsDone(true)} 
                disabled={isDone}
                className="relative inline-block outline-none cursor-pointer group"
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

                    <motion.span 
                        className={`relative z-10 text-5xl font-extrabold uppercase font-display-impact md:text-7xl transition-colors duration-300 ${
                          isDone ? 'text-[#cdc69c]' : 'text-[#8e2b27] group-hover:text-black'
                        }`}
                    >
                        CREAR
                    </motion.span>
                    <span className={`relative z-10 text-4xl md:text-6xl font-black transition-colors duration-300 ${isDone ? 'text-[#cdc69c]' : 'text-[#8e2b27]'}`}>();</span>

                    <AnimatePresence>
                        {isDone && (
                            <motion.div 
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="absolute -inset-1 border-2 border-[#8e2b27] z-20 pointer-events-none"
                                style={{ 
                                  clipPath: "polygon(2% 0%, 98% 1%, 100% 98%, 1% 100%)" 
                                }}
                            />
                        )}
                    </AnimatePresence>
                </div>
            </button>
        </div>

        <div className="w-full h-1 my-8 bg-[#8e2b27]" />
   
        <div className="relative pl-4 text-right md:pl-6">
            <AnimatePresence>
                {isDone && (
                    <motion.div 
                        initial={{ scale: 3, opacity: 0, rotate: 25 }}
                        animate={{ scale: 1, opacity: 0.9, rotate: -12 }}
                        className="absolute -top-10 right-10 z-[100] pointer-events-none"
                    >
                        <div className="px-4 py-1 border-4 border-[#8e2b27] text-[#8e2b27] font-display-impact text-4xl md:text-6xl uppercase tracking-tighter bg-[#cdc69c] border-double shadow-lg">
                         AL LÍO!
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <pre className={`relative inline-block text-base leading-snug text-left transition-all duration-700 ${
              isDone ? 'opacity-100' : 'opacity-100'
            }`}>
                <span className="text-[#8e2b27]">while</span> (cafe <span className="text-[#8e2b27]">&gt;</span> 0) <span className="text-[#8e2b27]">{`{`}</span>
                {'\n'} <span className="text-sm opacity-50">cafe = {cafeCount > 0 ? cafeCount : 0};</span>
                {'\n'}<span className="text-[#8e2b27]">{`}`}</span>
                
                {'\n\n'}
                <span className="text-[#8e2b27]">const</span> disquete = <span className="text-[#8e2b27]">{`{`}</span>
                {'\n '} <span className="opacity-80">status:</span> 
                <span className="ml-2 text-xl font-extrabold font-display-impact md:text-2xl">
                    "ALGO QUE PARECE ARTE"
                </span>
                {'\n'}<span className="text-[#8e2b27]">{`}`}</span>;
            </pre>

            {isDone && (
                <motion.div 
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mt-4 text-left font-mono text-xs text-[#8e2b27] font-bold"
                >
                    &gt; Menos hablar, más crear!
                </motion.div>
            )}
        </div>
      </div>
    </motion.section>
  );
}