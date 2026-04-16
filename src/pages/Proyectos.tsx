import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import {
    SiReact, SiTailwindcss, SiTypescript, SiVite, SiFramer,
    SiHtml5, SiJavascript, SiReactrouter, SiAxios, SiZod, SiCss3, SiGooglemaps, SiSupabase
} from "react-icons/si";

// --- CONFIGURACIÓN DE ESTILOS ---
const COLORS = {
    bg: "#cdc69c",
    text: "#0f0f0f",
    accent: "#8e2b27",
    cardLight: "#f5f3e7",
};

const TEXTURE_URL = "/images/texturas/paperproject.webp";
const TEXTURE_MOBILE_URL = "/images/texturas/paperproject-mobile.webp";

const COLLAGE_ROTATIONS = [
    "rotate-[-1deg]", "rotate-[2deg] -translate-y-1",
    "-rotate-1.5 translate-y-3", "rotate-2.5 -translate-y-2",
];

// --- INTERFACES ---
export interface Proyecto {
    title: string;
    img: string;
    url: string;
    github?: string;
    desc: string;
    video?: string;

    techStack?: string;
    techIcons?: React.ReactNode[];

    pressingType?: 'First' | 'Remaster' | 'Bootleg';
    context: string;
    problem: string;
    solution: string[];
    result: string;
}

// --- DATA ---
const PROJECTS: Proyecto[] = [
    {
        title: "Invitación R&M",
        url: "https://rdisquetesevadeboda.netlify.app/",
        img: "/images/invitacionboda.webp",
        github: "https://github.com/RDisquete/InvitacionDemo",

        video: "/images/invitacionboda.mp4",

        techStack: "React, Supabase, Framer Motion, Tailwind",

        techIcons: [
            <SiReact key="re" />,
            <SiSupabase key="su" />,
            <SiFramer key="fr" />,
            <SiTailwindcss key="tw" />
        ],

        pressingType: 'First',
        desc: "Sistema de invitación con acceso mediante QR que permite a los invitados subir y compartir fotos del evento en tiempo real sin aplicaciones externas.",

        context: "Proyecto desarrollado para un evento real con necesidad de compartir recuerdos de forma inmediata desde móvil.",

        problem: "Los invitados no tenían una forma sencilla de centralizar fotos sin usar apps externas ni registros complejos.",

        solution: [
            "Acceso mediante QR sin fricción",
            "Autenticación para contenido privado",
            "Subida de imágenes en tiempo real",
            "Storage con Supabase",
            "Optimización de imágenes en cliente",
            "Diseño mobile-first"
        ],

        result: "Plataforma usada en un evento real donde los invitados compartieron recuerdos en segundos desde el móvil."
    },

    {
        title: "The Pueblo",
        url: "https://thepueblo.es/",
        img: "/images/ThePueblo.webp",
        github: "https://github.com/RDisquete/ThePuebloStudio",
        video: "/images/thePueblo%20Hover.mp4",
        techStack: "React, Vite, Tailwind CSS",
        techIcons: [
            <SiReact key="re" />,
            <SiVite key="vi" />,
            <SiTailwindcss key="tw" />
        ],
        pressingType: 'First',
        desc: "Plataforma visual-first optimizada para contenido audiovisual pesado, combinando imágenes y video dinámico sin comprometer la velocidad de carga.",
        context: "Web desarrollada para una productora audiovisual con necesidad de mostrar contenido visual de alta calidad manteniendo una experiencia fluida.",
        problem: "El uso intensivo de imágenes y video (4K, galerías extensas) impactaba directamente en el rendimiento y la experiencia de usuario.",
        solution: [
            "Arquitectura SPA con React y routing dinámico",
            "Carga progresiva de contenido (imagen → video)",
            "Lazy loading de video optimizado",
            "Sistema híbrido de interacción para reducir consumo de recursos",
            "Optimización de tipografías para evitar layout shift",
            "Animaciones eficientes con CSS nativo y AOS"
        ],

        result: "Plataforma visual fluida capaz de manejar contenido multimedia pesado manteniendo tiempos de carga rápidos y una navegación sin fricción."
    },

    {
        title: "Nor3xtrem",
        url: "https://nor3xtrem.es/",
        img: "/Nor3xtreme.webp",
        github: "https://github.com/RDisquete/Nor3Xtrem-2026",

        video: "/Nor3xtremeHover.mp4",

        techStack: "React, Vite, Tailwind CSS",

        techIcons: [
            <SiReact key="re" />,
            <SiVite key="vi" />,
            <SiTailwindcss key="tw" />
        ],

        pressingType: 'First',
        desc: "Plataforma digital optimizada para una marcha cicloturista de alta exigencia, diseñada para funcionar en condiciones de baja conectividad y alto tráfico durante el evento.",
        context: "Plataforma desarrollada para una de las marchas cicloturistas más exigentes de España, con alta carga de usuarios en día de evento.",
        problem: "El acceso a información crítica (rutas, reglamento y clasificaciones) debía mantenerse rápido y estable incluso en zonas con baja cobertura móvil.",
        solution: [
            "Arquitectura SPA con React",
            "Optimización de build con Vite para carga ultrarrápida",
            "Diseño mobile-first orientado a uso en carretera",
            "Dark mode de alto contraste para exteriores",
            "Componentes modulares reutilizables",
            "Animaciones suaves con Framer Motion para UX fluida"
        ],
        result: "Plataforma estable y rápida utilizada en un entorno real de alta demanda durante el evento cicloturista."
    },

    {
        title: "Armario Escénico",
        url: "https://armarioescenico.netlify.app/",
        img: "/sambrona.webp",
        github: "https://github.com/RDisquete/ArmarioEscenico",

        video: "/sambronaHover.mp4",

        techStack: "React, TypeScript, Tailwind CSS",

        techIcons: [
            <SiReact key="re" />,
            <SiTypescript key="ts" />,
            <SiTailwindcss key="tw" />
        ],
        pressingType: 'First',
        desc: "Catálogo digital de vestuario histórico con filtrado avanzado y persistencia de selección para facilitar el alquiler sin fricción.",
        context: "Plataforma desarrollada para digitalizar el archivo de vestuario de una asociación cultural y facilitar su uso por figurinistas y productores.",
        problem: "El inventario físico dificultaba la búsqueda de prendas específicas, obligando a procesos manuales lentos y poco eficientes.",
        solution: [
            "Sistema de filtrado multi-criterio (época, tipo, materiales)",
            "Optimización de renders con useMemo",
            "Persistencia de selección con localStorage",
            "Arquitectura de componentes reutilizables",
            "Diseño mobile-first orientado a consulta rápida"
        ],
        result: "Herramienta digital que permite localizar y seleccionar vestuario de forma ágil, reduciendo el tiempo de búsqueda y mejorando la operativa del archivo."
    },

    {
        title: "Infra.RD",
        url: "https://rdisquetehealthmonitor.netlify.app/",
        img: "/infrard.webp",

        github: "https://github.com/RDisquete/health-monitor",

        video: "/infrard.mp4",

        techStack: "Next.js, TypeScript, Tailwind CSS, Supabase",

        techIcons: [
            <SiReact key="re" />,
            <SiTypescript key="ts" />,
            <SiTailwindcss key="tw" />,
            <SiSupabase key="su" />
        ],
        pressingType: 'First',
        desc: "Sistema de monitorización de servicios con alertas automáticas y análisis de latencia en tiempo real.",
        context: "Proyecto enfocado a monitorizar servicios web y detectar caídas o degradaciones sin intervención manual.",
        problem: "Necesidad de controlar múltiples endpoints y reaccionar automáticamente ante fallos sin depender de supervisión constante.",
        solution: [
            "Health-check automático mediante cron jobs",
            "Registro de latencia en base de datos",
            "Sistema de alertas por email ante caídas",
            "Testing de escenarios críticos (OK, DOWN, TIMEOUT)",
            "Dashboard técnico para visualización rápida",
            "Arquitectura desacoplada entre monitor y UI"
        ],
        result: "Sistema capaz de detectar fallos en servicios y notificar automáticamente, reduciendo el tiempo de reacción ante incidencias."
    },

    {
        title: "Matter & Sound",
        url: "https://mattersoundrdisquete.netlify.app/",
        img: "/MatterSound.webp",
        github: "https://github.com/RDisquete/MatterSound",

        video: "/MattersoundHover.mp4",

        techStack: "React, TypeScript, Web Audio API, HTML5 Canvas, Tailwind CSS",

        techIcons: [
            <SiReact key="re" />,
            <SiTypescript key="ts" />,
            <SiHtml5 key="h5" />
        ],
        pressingType: 'Bootleg',
        desc: "Visualizador de audio en tiempo real que transforma frecuencias en sistemas de partículas mediante FFT y renderizado en Canvas.",
        context: "Proyecto experimental enfocado en la visualización de señales de audio en tiempo real mediante procesamiento en cliente.",
        problem: "Representar datos de audio en tiempo real sin bloquear el renderizado ni generar re-renders innecesarios en React.",
        solution: [
            "Procesamiento de señal con Web Audio API",
            "Análisis de frecuencias mediante FFT",
            "Renderizado de partículas con HTML5 Canvas a 60 FPS",
            "Uso de useRef para evitar re-renderizados en React",
            "Separación entre lógica de audio y motor visual",
            "Gestión eficiente del loop de animación"
        ],
        result: "Sistema fluido de visualización en tiempo real capaz de procesar audio y renderizar múltiples partículas sin degradar el rendimiento."
    },

    {
        title: "ED Movil",
        url: "https://edmovil.netlify.app",
        img: "/images/edmovil.webp",
        github: "https://github.com/RDisquete/EDmovil",
        video: "/images/edHover.mp4",
        techStack: "React, TypeScript, Tailwind CSS",
        techIcons: [
            <SiReact key="re" />,
            <SiTypescript key="ts" />,
            <SiTailwindcss key="tw" />
        ],
        pressingType: 'First',
        desc: "Plataforma de contratación de servicios optimizada para comparar tarifas de forma rápida y guiar al usuario hacia la conversión.",
        context: "Web desarrollada para un servicio de telecomunicaciones centrada en facilitar la contratación de fibra, móvil y televisión.",
        problem: "Los usuarios necesitaban comparar múltiples tarifas de forma clara y rápida sin fricción en el proceso de decisión.",
        solution: [
            "Diseño centrado en conversión con CTAs estratégicos",
            "Estructura clara para comparación de tarifas",
            "Responsive design optimizado para móvil",
            "Validación de formularios de contacto",
            "Testing con Vitest y Testing Library",
            "Integración en flujo CI/CD para evitar regresiones"
        ],

        result: "Plataforma clara y accesible que facilita la comparación de servicios y mejora la experiencia de contratación del usuario."
    },

    {
        title: "Web RDisquete Photo",
        url: "https://rdisquetephoto.netlify.app/",
        img: "/images/rdisquetePhoto.webp",
        video: "/RPhotoHover.mp4",
        techStack: "React, TypeScript, CSS3",
        techIcons: [
            <SiReact key="re" />,
            <SiTypescript key="ts" />,
            <SiCss3 key="cs" />
        ],
        pressingType: 'Bootleg',
        desc: "Portfolio fotográfico enfocado en la presentación visual mediante carruseles fluidos y componentes reutilizables.",
        context: "Proyecto desarrollado para mostrar trabajos fotográficos con un enfoque visual limpio y navegación fluida.",
        problem: "Necesidad de presentar contenido visual de forma clara y atractiva sin sobrecargar la interfaz.",
        solution: [
            "Componentes reutilizables para galerías",
            "Carruseles optimizados para navegación fluida",
            "Uso de CSS tradicional para control visual detallado",
            "Estructura simple orientada a contenido visual",
            "Diseño responsive"
        ],
        result: "Portfolio visual ligero que permite recorrer colecciones fotográficas de forma fluida y sin distracciones."
    },

    {
        title: "AM Movil Repair",
        url: "https://ammovilrepair.com",
        img: "/images/ammovilrepair.webp",
        video: "/amhover.mp4",
        techStack: "React, Tailwind, Google Maps",
        techIcons: [
            <SiReact key="re" />,
            <SiTailwindcss key="tw" />,
            <SiGooglemaps key="gm" />
        ],
        pressingType: 'First',
        desc: "Web de servicio técnico optimizada para conversión, con formularios dinámicos y localización integrada.",
        context: "Proyecto desarrollado para un servicio técnico con el objetivo de captar clientes y facilitar el contacto directo.",
        problem: "El cliente necesitaba una presencia digital clara donde los usuarios pudieran localizar el servicio y solicitar reparación sin fricción.",
        solution: [
            "Integración de formularios de contacto optimizados",
            "Mapa interactivo para localización inmediata",
            "Estructura enfocada a conversión (CTA claros)",
            "Diseño responsive orientado a móvil",
            "Carga rápida y navegación simple"
        ],

        result: "Web funcional que permite a los usuarios encontrar el servicio rápidamente y contactar sin barreras."
    },

    {
        title: "Valle Escondido",
        url: "https://valleescondido.netlify.app/",
        img: "/valleescondido.webp",
        video: "/home_web.mp4",
        techStack: "React, Framer Motion, Tailwind CSS",
        techIcons: [
            <SiReact key="re" />,
            <SiFramer key="fr" />,
            <SiTailwindcss key="tw" />
        ],
        pressingType: 'Remaster',
        desc: "Iteración experimental centrada en animaciones y narrativa visual aplicada a eventos.",
        context: "Proyecto exploratorio basado en eventos, utilizado para experimentar con animaciones y narrativa visual.",
        problem: "Necesidad de explorar cómo mejorar la experiencia visual y el ritmo de navegación en webs de eventos.",
        solution: [
            "Uso intensivo de animaciones con Framer Motion",
            "Transiciones entre secciones para guiar al usuario",
            "Experimentación con narrativa visual",
            "Optimización de interacción en scroll",
            "Diseño enfocado en impacto visual"
        ],
        result: "Base experimental que permitió mejorar la calidad visual aplicada posteriormente en proyectos reales."
    },

    {
        title: "Rdisquete mk II",
        url: "https://rdisquetemk2.netlify.app/",
        img: "/rdisquetemk2.webp",
        video: "/rdisquetemk2.mp4",
        techStack: "React, TypeScript, Tailwind CSS",
        techIcons: [
            <SiReact key="re" />,
            <SiTypescript key="ts" />,
            <SiTailwindcss key="tw" />
        ],
        pressingType: 'Remaster',
        desc: "Versión anterior de mi portfolio, enfocada en estructura clásica y navegación más convencional.",
        context: "Iteración previa de mi portfolio personal antes de evolucionar hacia un enfoque más conceptual y visual.",
        problem: "La estructura tradicional limitaba la forma de presentar proyectos y diferenciar el perfil.",
        solution: [
            "Diseño basado en layout más convencional",
            "Organización clara de proyectos y contenido",
            "Uso de componentes reutilizables en React",
            "Base sólida para evolución posterior",
            "Implementación responsive"
        ],
        result: "Punto de partida que permitió evolucionar hacia un portfolio más diferencial y enfocado en narrativa."
    },
    {
        title: "Buscador de bebidas",
        url: "https://buscadordebebidasrafadz.netlify.app",
        img: "/images/buscadorbibidas.webp",
        video: "/CoctelHover.mp4",
        techStack: "Zod, React Router, Javascript",
        techIcons: [
            <SiZod key="zo" />,
            <SiReactrouter key="rr" />,
            <SiJavascript key="js" />
        ],
        pressingType: 'Bootleg',
        desc: "Ejercicio de aprendizaje centrado en validación de datos y consumo de APIs.",
        context: "Proyecto de formación enfocado en practicar consumo de APIs y validación de formularios.",
        problem: "Necesidad de entender cómo manejar datos externos y validar inputs del usuario correctamente.",
        solution: [
            "Consumo de API de recetas",
            "Validación de datos con Zod",
            "Gestión de rutas con React Router",
            "Manejo de estados de carga y error",
            "Estructura básica de componentes"
        ],
        result: "Base sólida para trabajar con APIs y validación de datos en proyectos posteriores."
    },
    //   {
    //     title: "Portfolio v1.0",
    //   url: "https://rafadz.netlify.app",
    // img: "/images/portfoliov1.webp",
    // desc: "Primera versión profesional optimizada para carga rápida.",
    // video: "/Portfolio1Hover.mp4",
    // techStack: "React, Vite, TypeScript",
    // techIcons: [<SiReact key="re" />, <SiVite key="vi" />, <SiTypescript key="ts" />],
    // pressingType: 'Remaster'
    // },
    {
        title: "CryptoApp",
        url: "https://cryptoapprafadz.netlify.app",
        img: "/images/appcrypto.webp",
        video: "/Criptoapp.mp4",
        techStack: "React, Zod, Vite",
        techIcons: [
            <SiReact key="re" />,
            <SiZod key="zo" />,
            <SiVite key="vi" />
        ],
        pressingType: 'Bootleg',
        desc: "Ejercicio de consumo de API para visualizar precios de criptomonedas en tiempo real.",
        context: "Proyecto de aprendizaje centrado en el consumo de APIs externas y gestión de estado en React.",
        problem: "Necesidad de entender cómo trabajar con datos dinámicos provenientes de una API externa.",
        solution: [
            "Consumo de API de criptomonedas",
            "Gestión de estado en React",
            "Validación básica de datos con Zod",
            "Renderizado dinámico de información financiera",
            "Manejo de estados de carga y error"
        ],
        result: "Aplicación funcional para practicar integración de APIs y renderizado de datos en tiempo real."
    },

    {
        title: "App de clima",
        url: "https://appclimardz.netlify.app",
        img: "/images/appclima.webp",
        video: "/ClimaApp.mp4",
        techStack: "React, TypeScript, Axios",
        techIcons: [
            <SiReact key="re" />,
            <SiTypescript key="ts" />,
            <SiAxios key="ax" />
        ],
        pressingType: 'Bootleg',
        desc: "Ejercicio de consumo de API para mostrar información meteorológica en tiempo real.",
        context: "Proyecto de aprendizaje centrado en consumo de APIs y gestión de estados asíncronos en React.",
        problem: "Necesidad de entender cómo trabajar con datos externos y gestionar estados de carga y error.",
        solution: [
            "Consumo de API meteorológica con Axios",
            "Gestión de estados de carga (loading / error / success)",
            "Renderizado dinámico de datos climáticos",
            "Manejo de respuestas asíncronas",
            "Interfaz responsive básica"
        ],
        result: "Aplicación funcional utilizada para practicar consumo de APIs y manejo de estados en React."
    },

{
    title: "Seguimiento de pacientes",
    url: "https://seguimientoclinicarafaeldorado.netlify.app",
    img: "/images/seguimientodepacientes.webp",
    video: "/PacienteHover.mp4",
    techStack: "React, Tailwind CSS, Javascript",
    techIcons: [
        <SiReact key="re" />,
        <SiTailwindcss key="tw" />,
        <SiJavascript key="js" />
    ],
    pressingType: 'Bootleg',
    desc: "Ejercicio de CRUD para gestión de pacientes con persistencia local de datos.",
    context: "Proyecto de aprendizaje enfocado en la creación de un sistema CRUD básico con persistencia en cliente.",
    problem: "Necesidad de entender cómo crear, editar y eliminar datos en una aplicación React.",
    solution: [
        "Implementación de operaciones CRUD",
        "Persistencia de datos en localStorage",
        "Gestión de estado en React",
        "Estructuración de formularios dinámicos",
        "Interfaz responsive básica"
    ],
    result: "Aplicación funcional para practicar lógica CRUD y manejo de estado persistente en el navegador."
},

{
    title: "Calculadora de gastos",
    url: "https://calculadordegastos-rafaeldorado.netlify.app",
    img: "/images/calculadoragastos.webp",
    video: "/GastosHover.mp4",
    desc: "Aplicación de control financiero personal con visualización circular de gastos y gestión por categorías.",
    context: "Proyecto desarrollado como ejercicio de arquitectura de estado en React, centrado en la gestión clara de finanzas personales.",
    problem: "La mayoría de usuarios no tiene una forma visual e intuitiva de entender en qué se distribuye su dinero mensual.",
    solution: [
        "Uso de Context API para gestión global de estado",
        "Componentes reutilizables para categorías de gasto",
        "Visualización circular para lectura rápida",
        "Persistencia de datos en estado de sesión",
        "UI enfocada en claridad y reducción de fricción"
    ],
    result: "Permite al usuario entender su distribución de gastos en segundos con una interfaz visual directa y sin complejidad innecesaria.",
    techStack: "Context API, CSS3, TypeScript",
    techIcons: [
        <SiReact key="re" />,
        <SiCss3 key="cs" />,
        <SiTypescript key="ts" />
    ],
    pressingType: 'Bootleg'
},

{
    title: "Contador de calorías",
    url: "https://calorietracker-rafadorado.netlify.app",
    img: "/images/contadorcalorias.webp",
    video: "/CaloriasHover.mp4",
    desc: "Aplicación de seguimiento nutricional para el control diario de calorías mediante lógica de reducción de estado.",
    context: "Proyecto orientado a practicar gestión de estado en React y manipulación de datos en tiempo real sin backend.",
    problem: "El control manual de calorías suele ser poco intuitivo y propenso a errores en aplicaciones simples o hojas de cálculo.",
    solution: [
        "Uso de reducers para gestión de estado compleja",
        "Componentización de entradas de alimentos",
        "Cálculo dinámico de calorías restantes",
        "Actualización en tiempo real del estado",
        "UI simplificada enfocada en rapidez de uso"
    ],
    result: "Permite registrar y controlar ingesta calórica diaria de forma rápida, visual y sin fricción técnica.",
    techStack: "React, Javascript, CSS3",
    techIcons: [
        <SiReact key="re" />,
        <SiJavascript key="js" />,
        <SiCss3 key="cs" />
    ],
    pressingType: 'Bootleg'
},

{
    title: "Calculadora de descuentos",
    url: "https://calculadoradescuentosrafadorado.netlify.app",
    img: "/images/calculadoradescuentos.webp",
    video: "/CalculadoraHover.mp4",
    desc: "Herramienta interactiva para el cálculo de descuentos y precios finales con una interfaz rápida y minimalista.",
    context: "Proyecto desarrollado para practicar reutilización de lógica mediante Custom Hooks en React y optimización de componentes.",
    problem: "Muchas herramientas de cálculo de descuentos son lentas, poco claras o están sobrecargadas de opciones innecesarias.",
    solution: [
        "Creación de Custom Hooks para lógica reutilizable",
        "Cálculo instantáneo de precios con actualización en tiempo real",
        "Separación clara entre lógica y UI",
        "Interfaz minimalista enfocada en rapidez",
        "Estructura ligera con Vite para carga rápida"
    ],
    result: "Permite calcular descuentos de forma instantánea con una experiencia fluida y sin distracciones.",
    techStack: "React, Vite, Javascript",
    techIcons: [
        <SiReact key="re" />,
        <SiVite key="vi" />,
        <SiJavascript key="js" />
    ],
    pressingType: 'Bootleg'
},

{
    title: "GuitarLa",
    url: "https://guitarlarafaeldorado.netlify.app",
    img: "/images/guitarlab.webp",
    video: "/GuitarHover.mp4",
    desc: "E-commerce de instrumentos musicales con sistema de carrito de compras y gestión básica de productos.",
    context: "Proyecto de práctica enfocado en la construcción de una tienda online funcional sin backend, simulando flujos reales de compra.",
    problem: "Muchos e-commerce educativos no implementan una experiencia de compra completa ni un flujo claro de selección de productos.",
    solution: [
        "Implementación de carrito de compras en frontend",
        "Gestión de estado para productos seleccionados",
        "Estructura de catálogo de instrumentos",
        "Interacción dinámica entre productos y carrito",
        "UI enfocada en simplicidad y navegación rápida"
    ],
    result: "Simula una experiencia de compra funcional permitiendo añadir y gestionar productos en un flujo de e-commerce básico pero completo.",
    techStack: "React, CSS3, Javascript",
    techIcons: [
        <SiReact key="re" />,
        <SiCss3 key="cs" />,
        <SiJavascript key="js" />
    ],
    pressingType: 'Bootleg'
}
];

// --- COMPONENTES AUXILIARES ---

function ProjectCard({ project, index, onOpen, isFeatured }: { project: Proyecto, index: number, onOpen: (p: Proyecto) => void, isFeatured?: boolean }) {
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
                <img src={project.img} alt={project.title} className="object-cover w-full h-full contrast-[1.1] grayscale-[20%]" />
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

function ProjectModal({ project, onClose }: { project: Proyecto, onClose: () => void }) {
    return (
        <motion.div
            className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 z-[9999]"
            onClick={onClose}
        >
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="bg-[#f5f3e7] max-w-5xl w-full flex flex-col md:flex-row border-2 border-black shadow-[20px_20px_0px_#8e2b27]"
            >
                {/* IMAGE */}
                <div className="w-full md:w-3/5 bg-black">
                    <img src={project.img} className="w-full h-full object-cover" />
                </div>

                {/* CONTENT */}
                <div className="p-8 md:w-2/5 space-y-6 text-black relative">

                    {/* CLOSE */}
                    <button
                        onClick={onClose}
                        className="absolute top-4 right-4 text-xl hover:text-[#8e2b27] transition"
                    >
                        ✕
                    </button>

                    {/* TITLE */}
                    <h2 className="text-4xl font-black uppercase leading-[0.9]">
                        {project.title}
                    </h2>

                    {/* CONTEXT */}
                    <div>
                        <h3 className="text-[10px] font-black uppercase text-black/40 mb-1">
                            Contexto
                        </h3>
                        <p className="text-xs font-mono text-black/80">
                            {project.context}
                        </p>
                    </div>

                    {/* PROBLEM */}
                    <div>
                        <h3 className="text-[10px] font-black uppercase text-black/40 mb-1">
                            Problema
                        </h3>
                        <p className="text-xs font-mono text-black/80">
                            {project.problem}
                        </p>
                    </div>

                    {/* SOLUTION */}
                    <div>
                        <h3 className="text-[10px] font-black uppercase text-black/40 mb-2">
                            Solución
                        </h3>

                        <ul className="text-xs font-mono space-y-1">
                            {project.solution.map((item, i) => (
                                <li key={i}>• {item}</li>
                            ))}
                        </ul>
                    </div>

                    {/* RESULT */}
                    <div>
                        <h3 className="text-[10px] font-black uppercase text-black/40 mb-1">
                            Resultado
                        </h3>
                        <p className="text-xs font-mono text-black/80">
                            {project.result}
                        </p>
                    </div>

                    {/* STACK */}
                    <div className="pt-4 border-t border-black/10">
                        <div className="flex flex-wrap gap-2 text-2xl text-[#8e2b27]">
                            {project.techIcons?.map((icon, i) => (
                                <span key={i}>{icon}</span>
                            ))}
                        </div>
                    </div>

                    {/* 🔥 ACTION BUTTONS (IMPORTANTE) */}
                    <div className="flex flex-col gap-3 pt-4">

                        {project.url && (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full text-center bg-[#8e2b27] text-white py-3 text-[11px] font-black tracking-[0.2em] uppercase hover:bg-black transition"
                            >
                                Ver proyecto
                            </a>
                        )}

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

                    </div>

                </div>
            </motion.div>
        </motion.div>
    );
}

// --- MAIN COMPONENT ---

export default function Proyectos() {
    const [selected, setSelected] = useState<Proyecto | null>(null);
    const [filter, setFilter] = useState('ALL');

    const categories = ['ALL', 'REACT', 'TYPESCRIPT', 'TAILWIND', 'VITE', 'FRAMER', 'ZOD', 'AXIOS', 'SUPABASE', 'GOOGLE MAPS', 'CSS3', 'NEXT.JS'];

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

                {/* --- NUEVO FILTRO APLICADO --- */}
                <nav className="mt-20 mb-22 relative z-10 flex flex-col items-center">
                    <span className="text-[9px] font-mono text-black/30 mb-4 tracking-[0.5em] uppercase">Select_Frequency:</span>
                    <div className="flex items-center gap-8 md:gap-16">
                        {categories.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setFilter(tag)}
                                className="group relative flex flex-col items-center"
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
                    <Link to="/Feedback" className="flex items-center gap-4 group w-fit">
                        <motion.div whileHover={{ x: 10 }} className="flex items-center gap-4 cursor-pointer">
                            <div className="flex items-center justify-center w-10 h-10 border-2 border-black rounded-full group-hover:bg-black transition-colors">
                                <FaArrowRight className="w-4 h-4 text-black group-hover:text-[#cdc69c] transition-colors" />
                            </div>
                            <span className="text-xl md:text-3xl font-black uppercase tracking-tighter text-[#8e2b27] group-hover:text-black">¿GRABAMOS EL PRÓXIMO HIT?</span>
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