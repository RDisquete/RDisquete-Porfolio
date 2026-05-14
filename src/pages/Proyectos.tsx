import React, { useMemo, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import {
    SiReact, SiTailwindcss, SiTypescript, SiVite, SiFramer,
    SiHtml5, SiJavascript, SiReactrouter, SiAxios, SiZod, SiCss3, SiGooglemaps, SiSupabase, SiVitest, 
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
    impact?: string;
}

// --- DATA ---
const PROJECTS: Proyecto[] = [
    {
        title: "Wedding Album System",
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
        pressingType: "First" as const,

        desc: "Invitación digital interactiva para eventos que centraliza toda la información, la historia de la pareja y una galería colaborativa en tiempo real accesible mediante QR.",

        context: "Proyecto desarrollado para una boda real con la necesidad de centralizar información, gestionar invitados y compartir recuerdos sin depender de múltiples herramientas.",

        problem: "La información del evento, la gestión de invitados y las fotos estaban dispersas en distintos canales, generando fricción tanto para los novios como para los invitados.",

        solution: [
            "Invitación digital con toda la información del evento",
            "Enlaces directos a ubicaciones clave (Google Maps)",
            "Sección con historia de la pareja",
            "Galería donde los invitados pueden ver, subir y descargar fotos",
            "Acceso a zona privada mediante QR sin fricción",
            "Formulario de confirmación conectado a Google Sheets",
            "Compresión de imágenes en cliente para mejorar rendimiento",
            "Diseño pensado para uso rápido desde móvil"
        ],

        result: "Los invitados accedieron a toda la información desde un único lugar y compartieron fotos en tiempo real, mientras que los novios gestionaron confirmaciones automáticamente sin procesos manuales.",

        impact: "Validado en un entorno real con usuarios no técnicos."
    },
    {
        title: "skyRESERVE",
    
        url: "https://sky-reserve.netlify.app/",
    
        img: "/images/skyreserve.webp",
    
        github: "https://github.com/RDisquete/skyReserve",
    
        video: "/images/skyReservehover.mp4",
    
        techStack: "React 19, TypeScript, Supabase, Zustand, Tailwind, Framer Motion, Vitest",
    
        techIcons: [
            <SiReact key="re" />,
            <SiTypescript key="ts" />,
            <SiSupabase key="su" />,
            <SiTailwindcss key="tw" />,
            <SiFramer key="fr" />,
            <SiVitest key="vi" />
        ],
    
        pressingType: "First" as const,
    
        desc: "Plataforma de reservas para servicios de drones con autenticación, panel admin y gestión de disponibilidad.",
    
        context: "Proyecto enfocado en arquitectura frontend moderna, estado global y experiencia de usuario.",
    
        problem: "La idea era construir una aplicación escalable con lógica real de reservas, autenticación y gestión de estado.",
    
        solution: [
            "Sistema de reservas conectado a Supabase",
            "Autenticación y control de roles",
            "Panel de administración protegido",
            "Estado global con Zustand",
            "Hooks personalizados",
            "Responsive design y dark mode",
            "Animaciones con Framer Motion",
            "Testing con Vitest"
        ],
    
        result: "El proyecto evolucionó hacia una aplicación frontend con estructura cercana a un entorno profesional.",
    
        impact: "Proyecto utilizado para profundizar en frontend moderno y arquitectura de aplicaciones."
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
        desc: "Experiencia visual construida para soportar contenido audiovisual pesado sin romper la fluidez ni los tiempos de carga.",
        context: "Proyecto para una productora audiovisual donde el contenido (imagen y video) es el producto. La prioridad no era añadir funcionalidad, sino garantizar que la experiencia se mantuviera rápida incluso con assets pesados.",
        problem: "El contenido en alta calidad (video + galerías extensas) degrada rápidamente el rendimiento: tiempos de carga altos, bloqueos en render y pérdida de fluidez en navegación.",
        solution: [
            "Carga progresiva: imagen estática como placeholder antes del video",
            "Lazy loading de video activado solo en interacción",
            "Separación entre capas visuales y lógica para evitar re-renderizados innecesarios",
            "Optimización de fuentes para eliminar layout shift",
            "Control manual de reproducción para evitar consumo innecesario",
            "Uso de animaciones ligeras (CSS/AOS) en lugar de JS pesado"
        ],
        result: "La web mantiene una sensación fluida incluso manejando contenido pesado, evitando bloqueos y reduciendo el tiempo percibido de carga.",
        impact: "Permite mostrar contenido audiovisual de alta calidad sin sacrificar rendimiento, algo crítico en proyectos donde lo visual es el producto.",

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
        desc: "Plataforma de consulta en tiempo real para evento cicloturista, optimizada para funcionar bajo alta carga de usuarios y conectividad limitada.",
        context: "Sistema desarrollado para una marcha cicloturista de gran escala, donde miles de usuarios acceden simultáneamente a información crítica durante el evento.",
        problem: "En entornos de alta afluencia y cobertura irregular, el acceso a información clave (rutas, reglamento, clasificaciones) debía mantenerse estable, rápido y accesible sin depender de conexiones óptimas.",
        solution: [
            "Arquitectura SPA ligera con React para minimizar overhead",
            "Build optimizado con Vite para tiempos de carga mínimos",
            "Diseño mobile-first pensado para uso en carretera",
            "Interfaz de alto contraste para visibilidad en exteriores",
            "Estructura modular para evitar bloqueos en renderizado",
            "Animaciones suaves con Framer Motion sin afectar rendimiento"
        ],
        result: "Plataforma capaz de soportar picos de tráfico en condiciones reales de evento, manteniendo acceso estable a información crítica en todo momento.",
        impact: "Utilizada en un entorno real de alta demanda, demostrando fiabilidad bajo condiciones de conectividad limitada y uso masivo simultáneo."
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
        desc: "Sistema digital de consulta de vestuario escénico que reemplaza un archivo físico, optimizando la búsqueda y selección de prendas para uso profesional.",
        context: "Proyecto desarrollado para digitalizar un archivo real de vestuario utilizado en producciones escénicas, donde la consulta dependía de sistemas físicos y poco eficientes.",
        problem: "La gestión manual del inventario hacía que localizar una prenda específica requiriera búsquedas lentas, dependientes de memoria o revisión física del archivo.",
        solution: [
            "Sistema de filtrado avanzado por atributos (época, tipo, material)",
            "Optimización de renderizado con useMemo para grandes volúmenes de datos",
            "Persistencia de selección con localStorage para continuidad de trabajo",
            "Arquitectura modular de componentes para escalabilidad del catálogo",
            "Interfaz mobile-first pensada para consulta rápida en entorno de trabajo"
        ],
        result: "Transforma un archivo físico en una herramienta de consulta ágil, reduciendo significativamente el tiempo necesario para localizar y seleccionar vestuario en procesos de producción.",
        impact: "Convierte un proceso de búsqueda físico de vestuario en una consulta digital inmediata, agilizando el trabajo de producción y selección de prendas."
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
        desc: "Sistema de observabilidad y monitorización de servicios que detecta caídas, latencia y degradaciones en tiempo real con alertas automáticas.",
        context: "Proyecto orientado a supervisar el estado de múltiples servicios web de forma continua, eliminando la necesidad de comprobación manual.",
        problem: "La falta de visibilidad centralizada sobre el estado de varios endpoints hacía imposible detectar degradaciones o caídas de forma inmediata sin supervisión constante.",
        solution: [
            "Health-checks automatizados mediante cron jobs",
            "Registro histórico de latencia en base de datos",
            "Sistema de alertas automáticas por email ante fallos críticos",
            "Simulación de escenarios (OK / DOWN / TIMEOUT) para testing",
            "Dashboard técnico para lectura rápida del estado del sistema",
            "Arquitectura desacoplada entre monitorización y capa de visualización"
        ],
        result: "Permite detectar y notificar incidencias en servicios de forma automática, reduciendo drásticamente el tiempo de reacción ante fallos en producción.",
        impact: "Reduce el tiempo de detección de fallos de servicios al automatizar la monitorización y alertas, eliminando la necesidad de comprobación manual constante."
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
        desc: "Motor de visualización de audio en tiempo real que convierte frecuencias en sistemas de partículas generativas mediante análisis FFT.",
        context: "Proyecto experimental centrado en la interacción entre audio y visualización generativa en el navegador, procesando señal directamente en cliente.",
        problem: "La representación de audio en tiempo real implica procesar datos continuos sin bloquear el renderizado ni provocar re-renders en React, manteniendo 60 FPS estables.",
        solution: [
            "Procesamiento de audio en tiempo real con Web Audio API",
            "Análisis de frecuencias mediante FFT",
            "Renderizado de sistema de partículas en HTML5 Canvas a 60 FPS",
            "Uso de useRef para aislar el loop de animación de React",
            "Separación entre capa de audio y motor visual",
            "Optimización del render loop para evitar pérdida de frames"
        ],
        result: "Sistema estable de visualización reactiva capaz de transformar audio en estructuras visuales dinámicas sin degradación perceptible del rendimiento.",
        impact: "Permite explorar audio como experiencia visual en tiempo real sin necesidad de herramientas externas, manteniendo una interacción fluida incluso en dispositivos de gama media."
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
        desc: "Plataforma de comparación y contratación de servicios de telecomunicaciones optimizada para guiar al usuario en la toma de decisiones rápidas y claras.",
        context: "Proyecto desarrollado para un servicio de telecomunicaciones con el objetivo de centralizar la oferta de fibra, móvil y televisión en un flujo de decisión simple y directo.",
        problem: "Los usuarios enfrentaban dificultad para comparar tarifas de forma clara, lo que generaba fricción en el proceso de decisión y ralentizaba la contratación.",
        solution: [
            "Arquitectura de UI enfocada en conversión con CTAs jerarquizados",
            "Estructura clara de comparación de planes y tarifas",
            "Diseño responsive optimizado para uso intensivo en móvil",
            "Validación de formularios para reducir errores en contacto",
            "Testing con Vitest y Testing Library para estabilidad del flujo",
            "Integración en CI/CD para prevenir regresiones en producción"
        ],
        result: "Flujo de comparación y contacto más directo y comprensible, reduciendo la fricción en la toma de decisiones del usuario.",
        impact: "Reduce el tiempo necesario para comparar y contratar servicios al simplificar la información y eliminar pasos innecesarios en el proceso de decisión."
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
        desc: "Portfolio fotográfico centrado en la presentación de contenido visual mediante galerías fluidas y una experiencia de navegación minimalista.",
        context: "Proyecto desarrollado como portfolio fotográfico para priorizar la imagen por encima de la interfaz, reduciendo distracciones y mejorando la lectura visual del contenido.",
        problem: "La necesidad principal era mostrar series fotográficas de forma clara sin sobrecargar la interfaz ni romper el ritmo de navegación entre imágenes.",
        solution: [
            "Sistema de galerías basado en componentes reutilizables",
            "Carruseles optimizados para navegación continua y fluida",
            "Uso de CSS puro para control preciso del layout visual",
            "Estructura simplificada orientada exclusivamente a contenido visual",
            "Diseño responsive adaptado a consumo móvil y desktop"
        ],
        result: "Portfolio ligero y fluido que permite recorrer colecciones fotográficas sin interrupciones ni distracciones visuales, priorizando la experiencia de imagen.",
        impact: "Mejora significativa en la percepción del contenido visual al reducir fricción en la navegación, aumentando el tiempo de exploración de las galerías y la claridad en la presentación del trabajo fotográfico."
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
    context: "Proyecto desarrollado para un servicio técnico con el objetivo de digitalizar su presencia y facilitar la captación de clientes a través de una experiencia directa y sin fricción.",
    problem: "La ausencia de una estructura digital clara dificultaba que los usuarios localizaran el servicio o iniciaran una solicitud de reparación de forma rápida.",
    solution: [
        "Integración de formularios de contacto optimizados para conversión",
        "Mapa interactivo con localización inmediata del negocio",
        "Estructura centrada en CTAs claros y accesibles",
        "Diseño responsive optimizado para uso móvil",
        "Optimización de rendimiento para carga rápida y navegación fluida"
    ],
    result: "Plataforma funcional que reduce la fricción entre el usuario y el servicio, facilitando la localización y el contacto directo.",
    impact: "Mejora en la accesibilidad del servicio y en la conversión de usuarios, reduciendo pasos necesarios para contactar y aumentando la efectividad del canal digital como punto de entrada de clientes."
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
    desc: "Prototipo experimental de narrativa visual y animación, base conceptual previa a Nor3xtrem.",
    context: "Proyecto exploratorio desarrollado como prueba de concepto para sistemas de narrativa visual, animaciones y experiencia de usuario en webs de eventos.",
    problem: "Explorar cómo estructurar una experiencia web basada en ritmo visual, transiciones y guía del usuario sin depender de interfaces tradicionales.",
    solution: [
        "Experimentación con animaciones avanzadas en Framer Motion",
        "Diseño de transiciones entre secciones como herramienta narrativa",
        "Estructuración del scroll como eje de experiencia",
        "Pruebas de composición visual para impacto emocional",
        "Optimización de timing y ritmo de interacción"
    ],
    result: "Prototipo funcional que definió las bases de diseño y animación posteriormente aplicadas en Nor3xtrem.",
    impact: "Sirvió como base conceptual directa para Nor3xtrem, validando decisiones de animación, flujo de navegación y estructura narrativa antes de su implementación en un entorno real."
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
    desc: "Versión previa de mi portfolio centrada en una estructura más tradicional y funcional.",
    context: "Iteración anterior de mi portfolio personal antes de evolucionar hacia un enfoque más narrativo, visual y conceptual.",
    problem: "El enfoque clásico de estructura limitaba la diferenciación del perfil y la forma de presentar proyectos.",
    solution: [
        "Arquitectura de portfolio basada en layout tradicional",
        "Organización clara de secciones y proyectos",
        "Componentización en React para escalabilidad",
        "Diseño responsive funcional",
        "Base técnica para iteraciones posteriores"
    ],
    result: "Portfolio funcional que sirvió como base estructural para la evolución hacia un enfoque más conceptual y diferenciado.",
    impact: "Actuó como punto de transición en la evolución del portfolio, definiendo la base técnica y de organización que permitió desarrollar una versión posterior más avanzada y diferenciada."
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
    desc: "Proyecto de aprendizaje centrado en el consumo de APIs y validación de datos de usuario.",
    context: "Ejercicio formativo orientado a comprender el flujo completo de datos desde APIs externas y su validación en el cliente.",
    problem: "La necesidad de gestionar datos externos y validar inputs del usuario de forma fiable sin depender de backend.",
    solution: [
        "Consumo de API de recetas de bebidas",
        "Validación de esquemas de datos con Zod",
        "Gestión de rutas con React Router",
        "Control de estados de carga, éxito y error",
        "Estructuración modular de componentes"
    ],
    result: "Aplicación funcional que consolida conceptos clave de consumo de APIs y validación de datos en frontend.",
    impact: "Base de aprendizaje que permitió entender flujos reales de datos externos, sentando las bases para proyectos posteriores más complejos con APIs y validación estructurada."
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
        desc: "Proyecto de aprendizaje centrado en el consumo de APIs para la visualización de datos financieros en tiempo real.",
        context: "Ejercicio formativo enfocado en la integración de APIs externas y la gestión de estado en aplicaciones React.",
        problem: "La necesidad de manejar datos dinámicos provenientes de APIs externas y representarlos de forma consistente en la UI.",
        solution: [
            "Consumo de API de criptomonedas en tiempo real",
            "Gestión de estado en React para datos dinámicos",
            "Validación de datos con Zod",
            "Renderizado dinámico de métricas financieras",
            "Control de estados de carga y error"
        ],
        result: "Aplicación funcional que permite visualizar información de criptomonedas en tiempo real de forma estructurada.",
        impact: "Refuerzo de conceptos clave en consumo de APIs y gestión de datos dinámicos, consolidando la base técnica para aplicaciones con información en tiempo real."
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
        desc: "Proyecto de aprendizaje centrado en el consumo de APIs para la visualización de datos meteorológicos en tiempo real.",
        context: "Ejercicio formativo orientado a trabajar con APIs externas y gestión de estados asíncronos en React.",
        problem: "La necesidad de manejar datos meteorológicos en tiempo real y controlar correctamente los estados derivados de peticiones asíncronas.",
        solution: [
            "Consumo de API meteorológica mediante Axios",
            "Gestión de estados asíncronos (loading / error / success)",
            "Renderizado dinámico de datos climáticos",
            "Manejo de respuestas en tiempo real",
            "Interfaz responsive orientada a usabilidad básica"
        ],
        result: "Aplicación funcional que permite consultar información meteorológica en tiempo real con una estructura clara y control de estados.",
        impact: "Consolidación de patrones de manejo de asincronía en frontend, reforzando la base para integración de APIs externas con estados complejos en React."
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
        desc: "Proyecto de aprendizaje centrado en la implementación de un sistema CRUD con persistencia de datos en el cliente.",
        context: "Ejercicio formativo orientado a la construcción de una aplicación CRUD completa en React sin backend.",
        problem: "La necesidad de gestionar creación, edición y eliminación de datos de forma persistente en una aplicación frontend.",
        solution: [
            "Implementación completa de operaciones CRUD",
            "Persistencia de datos mediante localStorage",
            "Gestión de estado en React",
            "Formularios dinámicos para edición y creación",
            "Interfaz responsive básica orientada a usabilidad"
        ],
        result: "Aplicación funcional que permite gestionar pacientes con persistencia local sin necesidad de backend.",
        impact: "Consolidación de lógica CRUD en frontend y comprensión de persistencia en cliente, base fundamental para aplicaciones con gestión de datos más complejas."
    },

    {
        title: "Calculadora de gastos",
        url: "https://calculadordegastos-rafaeldorado.netlify.app",
        img: "/images/calculadoragastos.webp",
        video: "/GastosHover.mp4",
        techStack: "Context API, CSS3, TypeScript",
        techIcons: [
            <SiReact key="re" />,
            <SiCss3 key="cs" />,
            <SiTypescript key="ts" />
        ],
        pressingType: 'Bootleg',
        desc: "Aplicación de control financiero personal con visualización circular de gastos y gestión por categorías.",
        context: "Proyecto de aprendizaje enfocado en la arquitectura de estado en React aplicada a la gestión de finanzas personales.",
        problem: "La dificultad de representar la distribución de gastos de forma clara, visual e intuitiva para el usuario.",
        solution: [
            "Gestión global de estado con Context API",
            "Componentes reutilizables para categorías de gasto",
            "Visualización circular para interpretación rápida",
            "Persistencia de datos en estado de sesión",
            "Interfaz optimizada para claridad y reducción de fricción"
        ],
        result: "Aplicación funcional que permite visualizar la distribución de gastos de forma clara e inmediata mediante representación visual directa.",
        impact: "Mejora en la comprensión de patrones de estado global en React y en la construcción de interfaces orientadas a datos visuales complejos de forma simplificada."
    },

    {
        title: "Contador de calorías",
        url: "https://calorietracker-rafadorado.netlify.app",
        img: "/images/contadorcalorias.webp",
        video: "/CaloriasHover.mp4",
        techStack: "React, Javascript, CSS3",
        techIcons: [
            <SiReact key="re" />,
            <SiJavascript key="js" />,
            <SiCss3 key="cs" />
        ],
        pressingType: 'Bootleg',
        desc: "Aplicación de seguimiento nutricional centrada en el control diario de calorías mediante gestión avanzada de estado.",
        context: "Proyecto orientado a practicar manejo de estado complejo en React y actualización de datos en tiempo real sin backend.",
        problem: "La dificultad de realizar un seguimiento preciso de la ingesta calórica de forma manual y sin herramientas visuales claras.",
        solution: [
            "Gestión de estado mediante useReducer",
            "Componentización de entradas de alimentos",
            "Cálculo dinámico de calorías restantes",
            "Actualización en tiempo real del estado de la aplicación",
            "Interfaz optimizada para uso rápido y directo"
        ],
        result: "Aplicación funcional que permite registrar y controlar la ingesta calórica diaria de forma visual e inmediata.",
        impact: "Refuerzo de patrones avanzados de gestión de estado en React mediante reducers, mejorando la capacidad de estructurar lógica compleja en interfaces interactivas."
    },

    {
        title: "Calculadora de descuentos",
        url: "https://calculadoradescuentosrafadorado.netlify.app",
        img: "/images/calculadoradescuentos.webp",
        video: "/CalculadoraHover.mp4",
        techStack: "React, Vite, Javascript",
        techIcons: [
            <SiReact key="re" />,
            <SiVite key="vi" />,
            <SiJavascript key="js" />
        ],
        pressingType: 'Bootleg',
        desc: "Herramienta interactiva para el cálculo de descuentos y precios finales con una interfaz rápida y minimalista.",
        context: "Proyecto enfocado en la optimización de lógica reutilizable mediante Custom Hooks en React.",
        problem: "La existencia de herramientas de cálculo de descuentos poco eficientes, lentas o sobrecargadas de funcionalidades innecesarias.",
        solution: [
            "Implementación de Custom Hooks para lógica reutilizable",
            "Cálculo en tiempo real de precios con actualizaciones instantáneas",
            "Separación clara entre lógica de negocio y UI",
            "Interfaz minimalista orientada a velocidad de uso",
            "Optimización de estructura con Vite para carga rápida"
        ],
        result: "Aplicación funcional que permite calcular descuentos de forma instantánea con una experiencia fluida y sin distracciones.",
        impact: "Consolidación del uso de Custom Hooks como patrón de reutilización de lógica en React, mejorando la separación entre lógica y presentación en aplicaciones frontend."
    },

    {
        title: "GuitarLa",
        url: "https://guitarlarafaeldorado.netlify.app",
        img: "/images/guitarlab.webp",
        video: "/GuitarHover.mp4",
        techStack: "React, CSS3, Javascript",
        techIcons: [
            <SiReact key="re" />,
            <SiCss3 key="cs" />,
            <SiJavascript key="js" />
        ],
        pressingType: 'Bootleg',
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
        impact: "Refuerza la comprensión de flujos de compra reales en frontend sin backend, aplicando lógica de estado compleja en un entorno de e-commerce simulado."
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
            className="fixed inset-0 bg-black/95 flex items-start justify-center z-[9999] overflow-y-auto px-4 py-8"
            onClick={onClose}
        >
            <motion.div
                onClick={(e) => e.stopPropagation()}
                className="bg-[#f5f3e7] max-w-5xl w-full flex flex-col md:flex-row border-2 border-black shadow-[20px_20px_0px_#8e2b27]"
            >
              {/* IMAGEN */}
<div className="w-full md:w-3/5 bg-black flex-shrink-0 relative overflow-hidden">
    {/* Blurred background */}
    <img
        src={project.img}
        alt=""
        aria-hidden
        className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-60"
    />
    {/* Imagen principal sin recortes */}
    <div className="relative w-full aspect-video md:aspect-auto md:h-full flex items-center justify-center p-4">
        <div className="absolute inset-3 border border-white/20 z-10 pointer-events-none" />
        <img
            src={project.img}
            alt={project.title}
            className="relative z-[1] w-full h-full object-contain"
        />
    </div>
</div>

                {/* CONTENIDO */}
                <div className="p-6 md:p-8 md:w-2/5 space-y-5 text-black relative flex flex-col">

                    {/* CLOSE */}
                    <button
                        onClick={onClose}
                        className="absolute top-3 right-3 w-8 h-8 flex items-center justify-center bg-black text-white text-sm font-bold hover:bg-[#8e2b27] transition z-20"
                    >
                        ✕
                    </button>

                    {/* TITLE */}
                    <h2 className="text-3xl md:text-4xl font-black uppercase leading-[0.9] pr-8">
                        {project.title}
                    </h2>

                    {/* META: pressing type + stack icons */}
                    <div className="flex items-center justify-between border-b border-black/10 pb-3">
                        <span className="font-mono text-[9px] font-black uppercase tracking-widest text-black/40">
                            {project.pressingType === 'First' ? 'FIRST PRESS' : project.pressingType === 'Remaster' ? 'REMASTERED' : 'BOOTLEG'}
                        </span>
                        <div className="flex gap-2 text-base text-[#8e2b27]">
                            {project.techIcons?.map((icon, i) => (
                                <span key={i}>{icon}</span>
                            ))}
                        </div>
                    </div>

                    {/* DESC */}
                    <p className="text-xs font-mono text-black/60 italic leading-relaxed border-l-2 border-[#8e2b27] pl-3">
                        "{project.desc}"
                    </p>

                    {/* CONTEXT */}
                    <div className="space-y-1">
                        <h3 className="text-[9px] font-black uppercase text-black/30 tracking-widest">Contexto</h3>
                        <p className="text-xs font-mono text-black/80 leading-relaxed">{project.context}</p>
                    </div>

                    {/* PROBLEM */}
                    <div className="space-y-1">
                        <h3 className="text-[9px] font-black uppercase text-black/30 tracking-widest">Problema</h3>
                        <p className="text-xs font-mono text-black/80 leading-relaxed">{project.problem}</p>
                    </div>

                    {/* SOLUTION */}
                    <div className="space-y-1">
                        <h3 className="text-[9px] font-black uppercase text-black/30 tracking-widest">Solución</h3>
                        <ul className="text-xs font-mono space-y-1 text-black/80">
                            {project.solution.map((item, i) => (
                                <li key={i} className="flex gap-2">
                                    <span className="text-[#8e2b27] shrink-0">→</span>
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* RESULT */}
                    <div className="border-t border-black/10 pt-3 space-y-1">
                        <h3 className="text-[9px] font-black uppercase text-black/30 tracking-widest">Resultado</h3>
                        <p className="text-sm font-mono text-black/90 leading-relaxed">{project.result}</p>
                    </div>

                    {/* IMPACT */}
                    {project.impact && (
                        <div className="bg-black/5 border border-black/10 p-3">
                            <p className="text-[10px] font-mono text-black/70 italic">{project.impact}</p>
                        </div>
                    )}

                    {/* BOTONES */}
                    <div className="flex flex-col gap-2 pt-3 mt-auto">
                        {project.url && (
                            <a
                                href={project.url}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full text-center bg-[#8e2b27] text-white py-3 text-[10px] font-black tracking-[0.2em] uppercase hover:bg-black transition"
                            >
                                Ver proyecto
                            </a>
                        )}
                        {project.github && (
                            <a
                                href={project.github}
                                target="_blank"
                                rel="noreferrer"
                                className="w-full text-center border-2 border-black text-black py-3 text-[10px] font-black tracking-[0.2em] uppercase hover:bg-black hover:text-white transition"
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