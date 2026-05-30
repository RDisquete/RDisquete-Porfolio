import React from "react";
import {
    SiReact, SiTailwindcss, SiTypescript, SiVite, SiFramer,
    SiHtml5, SiSupabase, SiVitest, SiGooglemaps, SiCss3,
} from "react-icons/si";

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

export const PROJECTS: Proyecto[] = [
    {
        title: "Wedding Album System",
        url: "https://rdisquetesevadeboda.netlify.app/",
        img: "/images/invitacionboda.webp",
        github: "https://github.com/RDisquete/InvitacionDemo",
        video: "/images/invitacionboda.mp4",
        techStack: "React, Supabase, Framer Motion, Tailwind",
        techIcons: [<SiReact key="re" />, <SiSupabase key="su" />, <SiFramer key="fr" />, <SiTailwindcss key="tw" />],
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
        desc: "Plataforma de reservas para servicios de drones con autenticación, panel admin y gestión de disponibilidad en tiempo real.",
        context: "Aplicación desplegada y en uso con backend real en Supabase. Gestiona el ciclo completo de una reserva de dron: desde que un cliente solicita un vuelo hasta que el piloto completa la misión. Los datos persisten en base de datos, la autenticación protege las rutas y los roles determinan qué puede ver cada usuario.",
        problem: "Gestionar reservas de servicios de dron de forma manual generaba confusiones en horarios, solapamiento de misiones y falta de control sobre el estado de cada operación.",
        solution: [
            "Backend real en Supabase: auth, base de datos y Row Level Security",
            "Autenticación con roles: admin ve todo, piloto ve sus misiones, cliente ve sus reservas",
            "Calendario de disponibilidad con slots bloqueados en tiempo real al reservar",
            "Estados de misión con transiciones: planificada → confirmada → en vuelo → completada",
            "Estado global con Zustand para sincronización entre paneles",
            "Tests unitarios y de integración con Vitest",
            "Despliegue en Netlify con build optimizado"
        ],
        result: "Aplicación en producción que sustituye la gestión manual por un sistema donde el cliente reserva online, el admin asigna piloto/drone, y el estado se actualiza en tiempo real. Sin emails, sin WhatsApp, sin confusión.",
        impact: "Arquitectura frontend con backend real, auth, roles y persistencia — no es un CRUD de tutorial, es un producto con lógica de negocio."
    },
    {
        title: "The Pueblo",
        url: "https://thepueblo.es/",
        img: "/images/ThePueblo.webp",
        github: "https://github.com/RDisquete/ThePuebloStudio",
        video: "/images/thePueblo%20Hover.mp4",
        techStack: "React, Vite, Tailwind CSS",
        techIcons: [<SiReact key="re" />, <SiVite key="vi" />, <SiTailwindcss key="tw" />],
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
        impact: "Permite mostrar contenido audiovisual de alta calidad sin sacrificar rendimiento, algo crítico en proyectos donde lo visual es el producto."
    },
    {
        title: "Nor3xtrem",
        url: "https://nor3xtrem.es/",
        img: "/Nor3xtreme.webp",
        github: "https://github.com/RDisquete/Nor3Xtrem-2026",
        video: "/Nor3xtremeHover.mp4",
        techStack: "React, Vite, Tailwind CSS",
        techIcons: [<SiReact key="re" />, <SiVite key="vi" />, <SiTailwindcss key="tw" />],
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
        techIcons: [<SiReact key="re" />, <SiTypescript key="ts" />, <SiTailwindcss key="tw" />],
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
        techIcons: [<SiReact key="re" />, <SiTypescript key="ts" />, <SiTailwindcss key="tw" />, <SiSupabase key="su" />],
        pressingType: 'First',
        desc: "Sistema de observabilidad que monitoriza múltiples servicios web, detectando caídas y alertando automáticamente por email.",
        context: "Herramienta interna para supervisar el estado de endpoints de forma continua. Cada 60 segundos ejecuta health-checks contra los servicios configurados y almacena los resultados en Supabase.",
        problem: "Sin monitorización centralizada, una caída de servicio podía pasar desapercibida durante horas hasta que un usuario la reportaba manualmente.",
        solution: [
            "Health-checks automatizados cada 60 segundos mediante cron jobs",
            "Registro histórico de latencia y estado en Supabase",
            "Sistema de alertas automáticas por email ante fallos críticos",
            "Simulación de escenarios (OK / DOWN / TIMEOUT) para testing",
            "Dashboard con lectura rápida: uptime, latencia media y estado actual",
            "Arquitectura desacoplada: motor de monitorización separado de la UI"
        ],
        result: "Detecta y notifica incidencias en menos de 60 segundos, eliminando la dependencia de la comprobación manual y reduciendo el tiempo de reacción ante fallos.",
        impact: "Pasa de detectar caídas por reportes de usuarios a detectarlas automáticamente antes de que impacten al negocio."
    },
    {
        title: "Matter & Sound",
        url: "https://mattersoundrdisquete.netlify.app/",
        img: "/MatterSound.webp",
        github: "https://github.com/RDisquete/MatterSound",
        video: "/MattersoundHover.mp4",
        techStack: "React, TypeScript, Web Audio API, HTML5 Canvas, Tailwind CSS",
        techIcons: [<SiReact key="re" />, <SiTypescript key="ts" />, <SiHtml5 key="h5" />],
        pressingType: 'First',
        desc: "Visualizador de audio en tiempo real que transforma frecuencias en sistemas de partículas generativas en Canvas.",
        context: "Proyecto experimental que conecta el microfono del navegador con un motor de renderizado visual. El audio se procesa en cliente mediante Web Audio API y se representa como partículas que reaccionan al ritmo.",
        problem: "Procesar señal de audio en tiempo real y renderizar partículas en Canvas sin bloquear el hilo principal de React, manteniendo una animación fluida.",
        solution: [
            "Análisis de frecuencias mediante FFT con Web Audio API",
            "Renderizado de partículas en HTML5 Canvas fuera del ciclo de React",
            "Uso de useRef para aislar el loop de animación del renderizado",
            "Separación completa entre capa de audio y motor visual",
            "Gestión de memoria para evitar filtraciones en sesiones largas"
        ],
        result: "Motor de visualización que procesa audio en tiempo real y renderiza estructuras visuales dinámicas sin caídas de rendimiento perceptibles.",
        impact: "Demuestra dominio de APIs del navegador por debajo del nivel de React, traitemento de señal y renderizado de bajo nivel."
    },
    {
        title: "ED Movil",
        url: "https://edmovil.netlify.app",
        img: "/images/edmovil.webp",
        github: "https://github.com/RDisquete/EDmovil",
        video: "/images/edHover.mp4",
        techStack: "React, TypeScript, Tailwind CSS",
        techIcons: [<SiReact key="re" />, <SiTypescript key="ts" />, <SiTailwindcss key="tw" />],
        pressingType: 'First',
        desc: "Web de telecomunicaciones encargada por un cliente real para comparar y contratar servicios de fibra, móvil y televisión.",
        context: "Encargo real para un proveedor de telecomunicaciones que necesitaba reemplazar su web anterior por una experiencia más clara y directa. El objetivo: que el usuario compare, decida y contacte sin fricción.",
        problem: "La web anterior perdía clientes porque la información estaba desordenada y el proceso de contacto era confuso. Los usuarios abandonaban sin contactar.",
        solution: [
            "Estructura de comparación visual con planes y precios destacados",
            "Formularios de contacto con validación en cliente",
            "Diseño mobile-first para uso intensivo en smartphone",
            "Tests automatizados con Vitest y Testing Library",
            "CI/CD configurado para detectar regresiones antes de desplegar"
        ],
        result: "Web desplegada y en producción que el cliente utiliza activamente para captar leads. Flujo de comparación → decisión → contacto reducido a 3 pasos claros.",
        impact: "Encargo real con cliente pagador. El proyecto se evaluó por su capacidad de conversión, no por su complejidad técnica."
    },
    {
        title: "AM Movil Repair",
        url: "https://ammovilrepair.com",
        img: "/am movil repair.webp",
        video: "/amhover.mp4",
        techStack: "React, Tailwind, Google Maps",
        techIcons: [<SiReact key="re" />, <SiTailwindcss key="tw" />, <SiGooglemaps key="gm" />],
        pressingType: 'First',
        desc: "Web de servicio técnico encargada por un negocio real para digitalizar su presencia y captar clientes.",
        context: "Encargo real para un servicio técnico de reparación de móviles que no tenía presencia digital. El cliente necesitaba una web donde los usuarios pudieran encontrar el local, ver qué reparan y contactar directamente.",
        problem: "Sin web, los clientes potenciales dependían de Google Maps o el passa-palabra para encontrar el servicio. Muchos clientes no llegaban a contactar.",
        solution: [
            "Mapa interactivo con localización exacta del negocio (Google Maps API)",
            "Formulario de contacto simplificado con campos esenciales",
            "Diseño responsive optimizado para búsquedas desde móvil",
            "Estructura centrada en una única acción: contactar",
            "Carga rápida para no perder usuarios con poca paciencia"
        ],
        result: "Web desplegada en ammovilrepair.com y en uso activo. El cliente recibe contactos directos a través del formulario sin depender de redes sociales.",
        impact: "Encargo real con dominio propio. Transforma búsquedas dispersas en contactos directos con una interfaz que no da tiempo a irse."
    },
    {
        title: "Web RDisquete Photo",
        url: "https://rdisquetephoto.netlify.app/",
        img: "/images/rdisquetePhoto.webp",
        video: "/RPhotoHover.mp4",
        techStack: "React, TypeScript, CSS3",
        techIcons: [<SiReact key="re" />, <SiTypescript key="ts" />, <SiCss3 key="cs" />],
        pressingType: 'First',
        desc: "Portfolio fotográfico personal con galerías de series propias y navegación inmersiva.",
        context: "Portfolio propio de fotografía con imágenes reales propias. Cada serie es un proyecto visual distinto (bodas, retratos, naturaleza) y la interfaz está diseñada para desaparecer y dejar que la imagen ocupe toda la pantalla.",
        problem: "Mostrar series fotográficas extensas sin que la interfaz compita por la atención ni rompa el ritmo de navegación entre imágenes.",
        solution: [
            "Galerías reutilizables con navegación por teclado y touch",
            "Carruseles con transiciones suaves y control manual",
            "CSS puro para animaciones de transición entre fotos",
            "Lazy loading de imágenes para carga progresiva",
            "Layout minimalista que elimina toda distracción visual"
        ],
        result: "Portfolio desplegado y activo que funciona como vitrina profesional del trabajo fotográfico, con series organizadas por proyecto.",
        impact: "Combina mi background audiovisual con desarrollo frontend — demuestra que no solo escribo código, sino que entiendo composición visual y narrativa."
    }
];