# Spec 001 — Visibilidad en buscadores y sistemas de IA

Estado: implementada

## Contexto y objetivo

El portfolio `rdisquete.es` es una aplicación que se renderiza en el navegador: el HTML
entregado contiene los metadatos básicos y un resumen de respaldo, pero el contenido real
llega después, al ejecutarse JavaScript. Los buscadores clásicos pueden ejecutar ese
JavaScript, pero los rastreadores de los sistemas de IA (asistentes conversacionales y
motores de respuesta) normalmente no lo hacen, por lo que solo ven el resumen de respaldo.

El objetivo es que tanto los buscadores como los sistemas de IA puedan descubrir,
entender y citar correctamente el contenido del portfolio, sin cambiar la experiencia
visual ni la interacción para las personas.

## Usuarios

- **Reclutadores y empresas**: buscan perfiles frontend y evalúan candidatos a través de
  Google y de asistentes de IA.
- **Clientes potenciales**: llegan desde búsquedas o desde respuestas de IA.
- **Rafa Dorado (propietario)**: quiere que su web sea encontrada y citada correctamente.
- **Sistemas de búsqueda e IA**: consumen el contenido para indexarlo o responder.

## Historias de usuario

- HU-1. Como reclutador, quiero encontrar el portfolio al buscar un perfil frontend React
  y TypeScript en España, para evaluar al candidato.
- HU-2. Como usuario de un asistente de IA, quiero que el asistente conozca y cite el
  portfolio al preguntar por Rafael Dorado o RDisquete, para obtener información fiable.
- HU-3. Como propietario, quiero que cada página pública se indexe con su propio título,
  descripción y dirección canónica, para no competir contra mí mismo en los resultados.
- HU-4. Como propietario, quiero compartir la web en redes y mensajería y que la
  previsualización muestre una imagen correcta.
- HU-5. Como propietario, quiero que los sistemas de IA dispongan de un resumen del sitio
  coherente con el contenido real, para que lo usen como fuente.

## Definiciones

- **Rastreador sin JavaScript**: cliente que descarga el HTML y no ejecuta scripts para
  construir la página.
- **Página pública**: inicio, proyectos, conóceme y contacto.
- **Metadatos por página**: título, descripción y dirección canónica propios de cada
  página, presentes en el HTML entregado.
- **Datos estructurados**: información legible por máquinas que describe a la persona, al
  sitio y a la ubicación de cada página.
- **Contenido principal**: el texto que describe quién es la persona, sus proyectos y cómo
  contactarla.

## Requisitos funcionales

- RF-1. EL SISTEMA expone, para cada página pública, un título único, una descripción
  única y una dirección canónica que apunte a la dirección de esa página.
- RF-2. EL SISTEMA declara explícitamente directivas de rastreo e indexación que permiten
  indexar las páginas públicas y ampliar los fragmentos e imágenes de resultado.
- RF-3. CUANDO un rastreador sin JavaScript solicita el sitio, EL SISTEMA entrega el
  contenido principal de todas las páginas públicas de forma legible.
- RF-4. EL SISTEMA expone datos estructurados que identifican a la persona, al sitio web y
  la ubicación de cada página dentro de la jerarquía del sitio.
- RF-5. EL SISTEMA proporciona una imagen de previsualización social en un formato
  compatible con las principales plataformas de redes y mensajería.
- RF-6. EL SISTEMA entrega un manifiesto de aplicación web válido y accesible.
- RF-7. EL SISTEMA publica un mapa del sitio con todas las páginas públicas y lo referencia
  desde el fichero de directrices de rastreo.
- RF-8. EL SISTEMA publica un resumen del sitio legible por sistemas de IA que sea
  coherente con el contenido real de las páginas.
- RF-9. SI una dirección no corresponde a ninguna página pública, ENTONCES EL SISTEMA
  declara esa página como no indexable.
- RF-10. EL SISTEMA mantiene disponibles la imagen de previsualización y el manifiesto en
  todas las respuestas, incluso cuando se solicita una página interna.
- RF-11. EL SISTEMA publica un manifiesto de descubrimiento de recursos agénticos (ARD) en
  `/.well-known/ard.json`, con el espejo heredado `/.well-known/ai-catalog.json`, y lo
  señala desde `robots.txt` (directiva `Agentmap:`) y desde el HTML (`rel="ard"`).
  *(Enmienda 2026-11-11)*

## Requisitos no funcionales

- RNF-1. Sin cambios visuales ni de interacción perceptibles para las personas.
- RNF-2. La compilación y el lint del proyecto deben pasar sin errores.
- RNF-3. Las pruebas existentes deben seguir en verde y se añadirán pruebas para la lógica
  nueva.
- RNF-4. Sin dependencias nuevas salvo justificación explícita en el plan.
- RNF-5. Se mantiene la paridad de contenido entre español e inglés.
- RNF-6. No se empeora la accesibilidad: las comprobaciones de accesibilidad del proyecto
  siguen sin errores.
- RNF-7. El contenido de respaldo entregado a rastreadores sin JavaScript incluye el
  contenido principal de todas las páginas públicas, no solo el de la página de inicio.
- RNF-8. El manifiesto ARD es JSON válido y cumple el esquema ARD v0.91: cada entrada
  declara `identifier` con URN `urn:air:<dominio>:<namespace>:<nombre>`, `displayName`,
  `type`, exactamente uno de `url` o `data`, y entre 2 y 5 `representativeQueries`.
  *(Enmienda 2026-11-11)*

## Casos límite

- Ruta inexistente: no debe invitarse a indexarla.
- Rastreador sin JavaScript solicitando una página interna: debe recibir el contenido de
  respaldo completo del sitio (todas las páginas públicas).
- Cambio de idioma entre español e inglés: los metadatos deben ser coherentes con el
  idioma activo.
- Enlaces a perfiles externos (GitHub, LinkedIn): deben declararse como perfiles de la
  misma persona.
- Solicitud del manifiesto o de la imagen de previsualización: debe existir y servirse
  correctamente.

## Fuera de alcance

- Cualquier cambio de diseño, estilos, tipografías o animaciones.
- Backend, cuentas de usuario o envío de datos a terceros.
- Campañas de enlaces entrantes, contenidos editoriales o estrategia de marketing.
- Migración de dominio o de proveedor de alojamiento.
- Creación de un blog o de páginas nuevas que no existan hoy.
- Traducción completa del sitio a más idiomas que español e inglés.

## Criterios de finalización

- Cada página pública muestra su propio título, descripción y dirección canónica en el
  HTML entregado, verificable sin ejecutar JavaScript.
- Un rastreador sin JavaScript obtiene el contenido principal de todas las páginas
  públicas.
- Las herramientas de validación de datos estructurados no reportan errores.
- La imagen de previsualización y el manifiesto responden correctamente.
- El mapa del sitio y el resumen para IA son coherentes con las páginas públicas.
- El manifiesto ARD se sirve como `application/json` en `/.well-known/ard.json` y no lo
  absorbe el fallback de la SPA.
- La página de ruta inexistente no se ofrece para indexación.
- Compilación, lint y pruebas en verde.

## Decisiones de alcance

- Se mantiene la aplicación actual (sin prerenderizado ni renderizado en servidor); el
  trabajo se centra en metadatos por página y en el contenido de respaldo.
- El recurso agéntico publicado es una *agent skill* del portfolio (perfil, proyectos,
  experiencia y contacto), no un servidor MCP: el sitio no expone herramientas invocables.
  *(Enmienda 2026-11-11)*
- Dirección canónica definitiva: `https://rdisquete.es` (sin `www`).
- El español es el idioma principal; el inglés se ofrece con el selector de idioma y no se
  indexa de forma independiente.
- Prioridad: primero las señales para sistemas de IA y después el SEO clásico.

## Dudas abiertas

Ninguna.
