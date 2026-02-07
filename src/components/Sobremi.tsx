import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react"; 

const textReveal: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { 
      type: "spring", 
      stiffness: 70, 
      damping: 15, 
      duration: 0.6 
    }
  }
};

const imageEntry: Variants = {
  hidden: { opacity: 0, scale: 0.9, rotate: -2 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    rotate: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

export default function SobreMi() {
  return (
    <motion.section 
      id="sobre-mi"
      className="relative min-h-screen w-full px-6 md:px-20 py-20 flex items-center justify-center bg-[#8e2b27] overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }} 
    >
      {/* Textura de fondo optimizada a WebP */}
      <div 
        className="absolute inset-0 pointer-events-none z-[1] opacity-40 mix-blend-multiply will-change-transform" 
        style={{ 
          backgroundImage: "url('/images/texturas/textura2.webp')", 
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} 
        aria-hidden="true"
      />

      <span className="absolute bottom-10 right-10 text-[15vw] font-black text-black/10 select-none pointer-events-none uppercase leading-none z-[2]">
        Profile
      </span>

      <div className="relative z-20 flex flex-col w-full gap-12 mx-auto max-w-7xl lg:flex-row lg:items-center"> 
        
        {/* Lado de la Imagen */}
        <motion.div
          className="relative flex justify-center flex-shrink-0 lg:w-5/12 lg:justify-start"
          variants={imageEntry}
        >
          <div className="relative p-2 bg-[#cdc69c] shadow-[20px_20px_0px_0px_rgba(23,23,23,0.4)] md:shadow-[30px_30px_0px_0px_rgba(23,23,23,0.4)]">
           
            <div className="relative overflow-hidden border-2 border-black bg-[#0f0f0f] w-[240px] h-[300px] md:w-[380px] md:h-[500px]">
              <img
                src="/images/IMG_6012_byn.webp" 
                alt="Retrato de Rafa Dorado"
                width="380"
                height="500"
                className="object-cover object-bottom w-full h-full transition-all duration-1000 grayscale contrast-125 hover:grayscale-0" 
                loading="lazy"
              />
              {/* Scanlines effect */}
              <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" aria-hidden="true" />
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-black text-[#cdc69c] px-4 py-2 font-mono text-[10px] font-black uppercase border border-[#cdc69c]">
              RAFA DORADO // RDISQUETE
            </div>
          </div>
        </motion.div>
        
        {/* Lado del Texto */}
        <div className="flex flex-col flex-1 text-[#cdc69c]">
          <header>
            <motion.h2
              className="text-6xl sm:text-7xl md:text-[8.5rem] font-black leading-[0.85] md:leading-[0.8] uppercase tracking-tighter"
              variants={textReveal}
            >
              RAFA<br />
              <span 
                className="text-black italic" 
                style={{ 
                  WebkitTextStroke: "2px #cdc69c",
                  paintOrder: "stroke fill" 
                }}
              >
                DORADO
              </span>
            </motion.h2>

            <motion.p
              className="mt-6 text-lg md:text-2xl font-light tracking-[0.2em] uppercase opacity-90"
              variants={textReveal}
            >
              <span className="font-bold text-black" aria-hidden="true">&gt;</span> Frontend Developer
            </motion.p>
          </header>

          <motion.div
            className="w-24 h-1 mt-6 mb-8 bg-black origin-left"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            aria-hidden="true"
          />

          <motion.article
            className="max-w-xl font-mono text-sm leading-relaxed md:text-lg"
            variants={textReveal}
          >
            <p>
              No solo escribo código; <strong>masterizo experiencias</strong>. Mi enfoque huye de los layouts predecibles y las interfaces <strong>sin alma</strong>.
            </p>
            <p className="mt-4">
              Me especializo en transformar ideas en <strong>interfaces de alto impacto</strong>: visualmente jugadas, técnicamente <strong>robustas</strong> y con ritmo propio.
            </p>
            
            <p className="mt-6 font-bold text-black bg-[#cdc69c] inline-block px-2 uppercase text-xs md:text-sm">
              LEVEL: UNCONVENTIONAL_CODE
            </p>
          </motion.article>
          
          <motion.div className="mt-8 md:mt-12" variants={textReveal}>
            <Link
              to="/Feedback"
              className="flex items-center gap-4 group w-fit"
              aria-label="Ir a la página de contacto"
            >
              <div className="flex items-center gap-4 cursor-pointer">
                <div className="flex items-center justify-center w-12 h-12 transition-all duration-300 border-2 border-black rounded-full group-hover:bg-black">
                  <ArrowRight className="w-6 h-6 text-black group-hover:text-[#cdc69c] transition-colors" />
                </div>
                <div className="flex flex-col">
                  <span className="font-mono text-[10px] font-black uppercase tracking-[0.3em] text-[#cdc69c]">
                    Let's connect
                  </span>
                  <span className="text-2xl md:text-3xl font-black uppercase tracking-tighter text-[#cdc69c] group-hover:text-black transition-colors">
                    ¿HABLAMOS?
                  </span>
                </div>
              </div>
            </Link>
          </motion.div>
        </div>
      </div>

      <div 
        className="absolute inset-0 z-[30] pointer-events-none opacity-[0.05] mix-blend-overlay" 
        style={{ backgroundImage: "url('/images/texturas/textura2.webp')" }} 
        aria-hidden="true"
      />
    </motion.section> 
  );
}