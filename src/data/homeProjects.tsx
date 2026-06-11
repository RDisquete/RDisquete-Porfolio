import {
  SiReact, SiSupabase, SiFramer, SiTailwindcss,
  SiVite, SiTypescript, SiExpo
} from "react-icons/si";

export const projects = [
  {
    title: "Wedding Album System — R&M",
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
    apkUrl: "https://expo.dev/accounts/rdisquete/projects/sky-reserve-mobile/builds/0b78c454-2908-48b9-a726-4b33a3be22f7",
    video: "/images/skyReservehover.mp4",
    techStack: "React 19, React Native, Expo, TypeScript, Supabase, Zustand, Tailwind, Framer Motion, Vitest",
    techIcons: [<SiReact key="re" />, <SiExpo key="ex" />, <SiTypescript key="ts" />, <SiSupabase key="su" />, <SiTailwindcss key="tw" />, <SiFramer key="fr" />],
    pressingType: "First" as const,
    desc: "Plataforma de reservas para servicios de drones (web + app móvil) con autenticación, panel admin y disponibilidad en tiempo real.",
    context: "Sistema completo web y app móvil con backend real en Supabase. Gestiona el ciclo completo de una reserva de dron: desde que un cliente solicita un vuelo hasta que el piloto completa la misión. Los datos persisten en base de datos, la autenticación protege las rutas y los roles determinan qué puede ver cada usuario.",
    problem: "Gestionar reservas de servicios de dron de forma manual generaba confusiones en horarios, solapamiento de misiones y falta de control sobre el estado de cada operación.",
    solution: [
      "Backend real en Supabase: auth, base de datos y Row Level Security",
      "Autenticación con roles: admin ve todo, piloto ve sus misiones, cliente ve sus reservas",
      "Calendario de disponibilidad con slots bloqueados en tiempo real al reservar",
      "Estados de misión con transiciones: planificada → confirmada → en vuelo → completada",
      "Estado global con Zustand para sincronización entre paneles",
      "App móvil nativa (iOS/Android/Web) con React Native y Expo",
      "Tests unitarios y de integración con Vitest",
      "Despliegue en Netlify con build optimizado"
    ],
    result: "Aplicación en producción (web + app móvil) que sustituye la gestión manual por un sistema donde el cliente reserva online, el admin asigna piloto/drone, y el estado se actualiza en tiempo real. Sin emails, sin WhatsApp, sin confusión.",
    impact: "Arquitectura full-stack con backend real, auth, roles, persistencia y versión nativa móvil — no es un CRUD de tutorial, es un producto con lógica de negocio multiplataforma."
  },
  {
    title: "The Pueblo", url: "https://thepueblo.es/", img: "/images/ThePueblo.webp",
    github: "https://github.com/RDisquete/ThePuebloStudio", video: "/images/thePueblo%20Hover.mp4",
    techStack: "React, Vite, Tailwind CSS",
    techIcons: [<SiReact key="re" />, <SiVite key="vi" />, <SiTailwindcss key="tw" />],
    pressingType: 'First',
    desc: "Experiencia visual construida para soportar contenido audiovisual pesado sin romper la fluidez ni los tiempos de carga.",
    context: "Proyecto para una productora audiovisual donde el contenido (imagen y video) es el producto. La prioridad no era añadir funcionalidad, sino garantizar que la experiencia se mantuviera rápida incluso con assets pesados.",
    problem: "El contenido en alta calidad (video + galerías extensas) degrada rápidamente el rendimiento: tiempos de carga altos, bloqueos en render y pérdida de fluidez en navegación.",
    solution: ["Carga progresiva: imagen estática como placeholder antes del video", "Lazy loading de video activado solo en interacción", "Separación entre capas visuales y lógica para evitar re-renderizados innecesarios", "Optimización de tipografías para evitar layout shift", "Control manual de reproducción para evitar consumo innecesario", "Animaciones eficientes con CSS nativo y AOS"],
    result: "La web mantiene una sensación fluida incluso manejando contenido pesado, evitando bloqueos y reduciendo el tiempo percibido de carga."
  },
  {
    title: "Nor3xtrem", url: "https://nor3xtrem.es/", img: "/Nor3xtreme.webp",
    github: "https://github.com/RDisquete/Nor3Xtrem-2026", video: "/Nor3xtremeHover.mp4",
    techStack: "React, Vite, Tailwind CSS",
    techIcons: [<SiReact key="re" />, <SiVite key="vi" />, <SiTailwindcss key="tw" />],
    pressingType: 'First',
    desc: "Plataforma digital optimizada para una marcha cicloturista de alta exigencia, diseñada para funcionar en condiciones de baja conectividad y alto tráfico durante el evento.",
    context: "Plataforma desarrollada para una de las marchas cicloturistas más exigentes de España, con alta carga de usuarios en día de evento.",
    problem: "El acceso a información crítica (rutas, reglamento y clasificaciones) debía mantenerse rápido y estable incluso en zonas con baja cobertura móvil.",
    solution: ["Arquitectura SPA con React", "Optimización de build con Vite para carga ultrarrápida", "Diseño mobile-first orientado a uso en carretera", "Dark mode de alto contraste para exteriores", "Componentes modulares reutilizables", "Animaciones suaves con Framer Motion para UX fluida"],
    result: "Plataforma estable y rápida utilizada en un entorno real de alta demanda durante el evento cicloturista."
  },
  {
    title: "Armario Escénico", url: "https://armarioescenico.netlify.app/", img: "/sambrona.webp",
    github: "https://github.com/RDisquete/ArmarioEscenico", video: "/sambronaHover.mp4",
    techStack: "React, TypeScript, Tailwind CSS",
    techIcons: [<SiReact key="re" />, <SiTypescript key="ts" />, <SiTailwindcss key="tw" />],
    pressingType: 'First',
    desc: "Catálogo digital de vestuario histórico con filtrado avanzado y persistencia de selección para facilitar el alquiler sin fricción.",
    context: "Plataforma desarrollada para digitalizar el archivo de vestuario de una asociación cultural y facilitar su uso por figurinistas y productores.",
    problem: "El inventario físico dificultaba la búsqueda de prendas específicas, obligando a procesos manuales lentos y poco eficientes.",
    solution: ["Sistema de filtrado multi-criterio (época, tipo, materiales)", "Optimización de renders con useMemo", "Persistencia de selección con localStorage", "Arquitectura de componentes reutilizables", "Diseño mobile-first orientado a consulta rápida"],
    result: "Herramienta digital que permite localizar y seleccionar vestuario de forma ágil, reduciendo el tiempo de búsqueda y mejorando la operativa del archivo."
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
      "Health-checks automatizados cada 60 segundos",
      "Registro histórico de latencia y estado en Supabase",
      "Alertas automáticas por email ante fallos críticos",
      "Dashboard con uptime, latencia media y estado actual",
      "Arquitectura desacoplada: motor de monitorización separado de la UI"
    ],
    result: "Detecta y notifica incidencias en menos de 60 segundos, eliminando la dependencia de la comprobación manual.",
    impact: "Pasa de detectar caídas por reportes de usuarios a detectarlas automáticamente antes de que impacten al negocio."
  }
];
