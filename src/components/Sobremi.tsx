import { motion, type Variants } from "framer-motion";
import { Link } from "react-router-dom";

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
      className="relative min-h-screen w-full px-6 md:px-20 py-20 flex items-center justify-center bg-[#8e2b27] overflow-hidden"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.1 }} 
    >
      <div 
        className="absolute inset-0 pointer-events-none z-[1] opacity-40 mix-blend-multiply" 
        style={{ 
          backgroundImage: "url('/images/texturas/textura2.jpg')", 
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }} 
      />

      <span className="absolute bottom-10 right-10 text-[15vw] font-black text-black/10 select-none pointer-events-none uppercase leading-none z-[2]">
        Profile
      </span>

      <div className="relative z-20 flex flex-col w-full gap-12 mx-auto max-w-7xl lg:flex-row lg:items-center"> 
        
        <motion.div
          className="relative flex justify-center flex-shrink-0 lg:w-5/12 lg:justify-start"
          variants={imageEntry}
        >
          <div className="relative p-2 bg-[#cdc69c] shadow-[20px_20px_0px_0px_rgba(23,23,23,0.4)] md:shadow-[30px_30px_0px_0px_rgba(23,23,23,0.4)]">
           
            <div className="relative overflow-hidden border-2 border-black bg-[#0f0f0f] w-[240px] h-[300px] md:w-[380px] md:h-[500px]">
              <img
                src="/IMG_6012_byn.png" 
                alt="Rafa Dorado"
                className="object-cover object-bottom w-full h-full transition-all duration-1000 grayscale contrast-125 hover:grayscale-0" 
                loading="lazy"
              />
              <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%)] bg-[length:100%_4px]" />
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-black text-[#cdc69c] px-4 py-2 font-mono text-[10px] font-black uppercase border border-[#cdc69c]">
              R_DORADO // RDISQUETE
            </div>
          </div>
        </motion.div>
        
        <div className="flex flex-col flex-1 text-[#cdc69c]">
          <motion.h2
            className="text-6xl sm:text-7xl md:text-[8.5rem] font-black leading-[0.85] md:leading-[0.8] uppercase tracking-tighter"
            variants={textReveal}
          >
            RAFA<br />
            <span className="italic text-black" style={{ WebkitTextStroke: "1.5px #8e2b27", color: "#cdc69c" }}>DORADO</span>
          </motion.h2>

          <motion.h3
            className="mt-6 text-lg md:text-2xl font-light tracking-[0.2em] uppercase opacity-90"
            variants={textReveal}
          >
            <span className="font-bold text-black">&gt;</span> Frontend Developer
          </motion.h3>

          <motion.div
            className="w-24 h-1 mt-6 mb-8 bg-black"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          />

          <motion.div
            className="max-w-xl font-mono text-sm leading-relaxed md:text-lg"
            variants={textReveal}
          >
            <p>
              Soy <strong>Frontend Developer</strong>. Mi código huye de lo <strong>genérico y aburrido</strong>.
            </p>
            <p className="mt-4">
              Me especializo en <strong>experiencias de usuario</strong> que se salen del molde: interfaces <strong>jugadas, robustas</strong> y con ese <strong>toque diferenciador</strong>.
            </p>
            
            <p className="mt-6 font-bold text-black bg-[#cdc69c] inline-block px-2 uppercase text-xs md:text-sm">
              Si buscabas algo diferente, aquí está.
            </p>
          </motion.div>
          
          <motion.div className="mt-8 md:mt-12" variants={textReveal}>
            <Link
              to="/contacto"
              className="group relative inline-flex items-center gap-6 px-8 md:px-10 py-3 md:py-4 overflow-hidden border-2 border-black bg-black text-[#cdc69c] font-black tracking-[0.3em] uppercase transition-all hover:bg-[#cdc69c] hover:text-black shadow-xl active:scale-95"
            >
              <span className="relative z-10 text-inherit">¿HABLAMOS?</span>
              <div className="absolute inset-0 bg-[#cdc69c] translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
            </Link>
          </motion.div>
        </div>
      </div>

      <div 
        className="absolute inset-0 z-[30] pointer-events-none opacity-[0.05] mix-blend-overlay" 
        style={{ backgroundImage: "url('/images/texturas/textura2.jpg')" }} 
      />
    </motion.section> 
  );
}