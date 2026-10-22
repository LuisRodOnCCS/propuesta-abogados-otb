# AGENTS.md — Instrucciones del proyecto

> Sitio informativo del despacho. Se lee en cada sesión: **no lo saltes.**

---

## Qué es este proyecto

Página web informativa (landing de una sola página) para un bufete de abogados
especializado en atender a personas mexicanas en Estados Unidos que necesitan
regularizar o actualizar su situación legal en México, o realizar trámites en México
sin viajar.

## Regla principal

**Antes de tocar cualquier UI, lee `DESIGN.md` y aplica la skill `frontend-design`.**

```
- Skill: .agents/skills/frontend-design/SKILL.md
- Sistema de diseño: ./DESIGN.md   ← tokens, layout, voz, anti-patrones
```

`DESIGN.md` es la fuente de verdad. Si una decisión visual no está ahí, **primero se
agrega a `DESIGN.md`, después se implementa**. No improvises hex, tipografías ni
espaciado en el momento.

## Anti-patrones (checklist obligatorio antes de dar algo por terminado)

Ver la sección 7 de `DESIGN.md`. En resumen, **no** usar:

- crema `#F4F1EA` + serif high-contrast + terracota `#D97757`
- casi-negro `#0B0B0B` / `#111` → usar `tinta` `#16302A`
- tarjetas idénticas con el mismo radio y sombra gris difusa (`rgba(0,0,0,.1)`)
- etiquetas ALL-CAPS con tracking, cadenas con punto medio (`A · B · C`), etiquetas
  `PALABRA — fragmento`, monoespaciada para datos, `→` pegado a un botón
- degradados decorativos, glows, sombras blandas
- resaltar **una sola palabra** dentro de un titular
- fade-and-slide-up por sección al hacer scroll
- bandera, papel picado, calaveras, cactus, marigold, tequila ni nada de folclore

## Stack

- HTML5 + CSS (custom properties) + JS vanilla. **Sin framework, sin build step.**
- Fuentes vía Google Fonts con `preconnect` y `font-display: swap`, y fallback de sistema.
- Laragon sirve el proyecto en `http://localhost/designtestai/`.

## Mapa de archivos

```
index.html              página única
assets/css/main.css     tokens + sistema + componentes (custom properties al inicio)
assets/js/main.js       menú móvil, validación del formulario, sello
DESIGN.md               sistema de diseño (tokens, layout, voz, anti-patrones)
AGENTS.md               este archivo
skills-lock.json        lockfile de la skill frontend-design
.captura/               capturas de revisión (efímero, ignorado por git)
```

## Convenciones

- Todo el espaciado sale de variables `--space-1 … --space-9`. Nada de números sueltos.
- Los selectores de elemento se usan **solo** en el reset, al principio de la hoja.
  Después, solo clases. Sin `!important` (salvo el reset de `margin`/`box-sizing`).
- La UI está en **español de México**, voz activa, sin jerga. Ver sección 8 de `DESIGN.md`.
- Todo el texto de la interfaz es **placeholder** hasta que el despacho entregue el
  contenido real. Los testimonios son copy de ejemplo: **no publicar testimonios
  inventados** (están marcados con `<!-- TESTIMONIO PENDIENTE -->`).
- Accesibilidad: foco visible en todo interactivo, skip link, `prefers-reduced-motion`
  respetado, contraste ≥ 4.5:1, `<details>` nativo para el acordeón.

## Flujo de trabajo

1. Leer `DESIGN.md` + la skill.
2. Si el pedido cambia la dirección visual → actualizar `DESIGN.md` primero.
3. Implementar con los tokens existentes.
4. Autocrítica: revisar contra la sección 7 de `DESIGN.md` y tomar capturas de pantalla
   para comparar. Una captura vale más que mil tokens.
5. Si sobra un adorno, quitarlo. (Regla de Chanel: *antes de salir de casa, quita un accesorio.*)

## Notas de sync

`.agents/` y `.claude/` contienen la skill instalada con symlinks. Si se inicializa git
en este proyecto, añade ambas rutas a `.gitignore` y versiona solo `DESIGN.md`,
`AGENTS.md` y el código.

## Cómo levantar el sitio

Laragon sirve el proyecto en `http://localhost/designtestai/`. Si Apache no está
corriendo, enciéndelo desde Laragon antes de revisar en el navegador.
