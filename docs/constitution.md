# Constitución — RDisquete Portfolio

Principios innegociables. Toda spec, plan y tarea debe cumplirlos.

1. **Simplicidad primero**: React 19 + TypeScript + Vite + Tailwind. Ninguna dependencia
   nueva sin una spec que la justifique, y solo si `npm run build` y `npm run lint` siguen
   pasando.
2. **La spec manda**: nada se implementa si no está en la spec activa (`specs/NNN-*/`). Si
   falta una decisión, se para y se pregunta.
3. **Lógica separada de la interfaz**: los cálculos y transformaciones (proyectos
   traducidos, fechas, orden, filtros) viven en funciones puras o hooks testeables; los
   componentes solo pintan y no leen el DOM directamente.
4. **Tests como puerta**: la lógica y las páginas se prueban con Vitest + jsdom en una
   pasada (`npx vitest run`; `npm test` es modo watch y no sirve para agentes). Prohibido
   dar una tarea por hecha con tests en rojo o con `npm run build` fallando.
5. **Los datos del usuario son sagrados**: sin backend ni cuentas. `localStorage` solo para
   idioma y consentimiento; nada se envía a terceros (Formspree, Google Analytics) sin
   consentimiento explícito previo.
6. **Idioma y accesibilidad**: todo texto visible vive en `src/i18n/es.json` y `en.json`
   con estructura idéntica, nada hardcodeado en componentes. HTML semántico, `alt` en
   imágenes y foco visible: `jsx-a11y` sin errores.
