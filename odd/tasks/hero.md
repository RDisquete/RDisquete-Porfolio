# hero — limpieza, claridad y reducción de elementos

## Objetivo

Conservar el aspecto visual actual del hero y mejorar de la forma: **menos elementos, más
claridad**, sin rediseño.

## Problema

- La única información textual del hero vivía en una **línea hardcodeada con prefijo de
  consola** (`console.log('Frontend Developer — React & TypeScript')`).
- Esa línea competía con el nombre protagonista y no estaba en i18n.
- Quedaba un movimiento (línea de barrido) sin información que aportar.
- El contraste del apellido («DORADO», `#8e2b27` sobre `#171717`) seguía sin cubrirse de forma
  explícita (2,16:1).

## Alcance

- Entra: aplanar la barra del rol, eliminar el movimiento sin información, corregir el
  contraste de «DORADO», checks finales.
- No entra: rediseño de composición, añadir bloques nuevos (propuesta de valor como bloque
  nuevo, disponibilidad como bloque nuevo), cambio de tipografía de identidad.

## Restricciones

- El aspecto visual se mantiene salvo los cambios que la claridad exija.
- No se añaden dependencias ni estilos nuevos fuera de la paleta.

## Tareas

- [x] **T1. Barra del rol: texto plano traducido, sin código, sin truncar.**
  Aceptación: el hero ya no contiene `console.log`; la barra usa la key `hero.role`; ES y EN
  definen su propio texto; sin `truncate` que pueda cortar.

- [x] **T2. Línea de barrido: eliminar o pausar.**
  Aceptación: la línea animada con movimiento puro desaparece o no se monta.

- [ ] **T3. Contraste de «DORADO».**
  Aceptación: relleno `#8e2b27` + contorno crema `#cdc69c` de `0,02em`; ≥ 3:1.

- [ ] **T4. Checks finales.**
  Aceptación: `npx vitest run`, `npm run build` y `npm run lint` en verde + captura 375/1440.

## Verificación

| Tarea | Evidencia | Commit |
| --- | --- | --- |
| T1 | `npx vitest run` → 16 passed · `npm run build` ✓ · `npm run lint` clean | `4ba4b02` |
| T2 | `npx vitest run` → 16 passed · `npm run build` ✓ · `npm run lint` clean | pendiente del commit actual |

## Progreso

- [x] T1 completada.
- [x] T2 completada (línea de barrido eliminada; cleanup de `prefersReducedMotion` incluido).
- [ ] T3 · T4 pendientes.

## Siguiente paso

**T3**: el contraste de «DORADO» (relleno + contorno crema de `0,02em`) → ≥ 3:1.
