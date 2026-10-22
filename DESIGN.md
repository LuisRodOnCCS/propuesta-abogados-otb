# DESIGN.md — Sistema de diseño

> Fuente de verdad de la dirección visual y de voz de este proyecto.
> Si una decisión no está aquí, no la inventes: créala aquí primero.
> Este archivo implementa la skill `frontend-design` (`.agents/skills/frontend-design`).

---

## 1. El brief

**Qué es.** Página informativa de un bufete de abogados que atiende a personas
mexicanas que viven en Estados Unidos y necesitan (a) regularizar o actualizar su
situación legal en México, o (b) realizar trámites en México sin poder viajar.

**Para quién.** Persona mexicana en EE.UU., muchas veces con un trámite a medias, un
plazo que se le viene encima y desconfianza de las instituciones. Suele tener su
caso enredado entre dos países y dos idiomas administrativos.

**Trabajo principal de la página.** Conseguir una **consulta agendada**. Segundo
trabajo: que la persona reconozca su propio trámite en la lista y conclude que
"esto lo puede hacer alguien desde aquí".

**Lo que el visitante siente al llegar.** "Esto se siente como un trámite infinito y
frío; quiero sentir que alguien que entiende mi caso lo va a hacer por mí, y que me
va a hablar claro, no en idioma de abogado."

**Tono visual pedido.** Fresco y cercano, con raíz en la cultura mexicana latina,
**sin caer en estereotipos**.

### Qué significa "sin estereotipos" (restricción dura)

Prohibido, en todo el sitio: banderas literales (verde/blanco/rojo como paleta),
papel picado, sombreros, cactus, calaveras, sagrario, víbora, piñata, tequila, marigold,
papel de colores, "Mexican restaurant", "¡Hola México!", eSpeak Spanglish con
"¿cómo le hacemos?", emojis de bandera, anglicismos de marketing ("level up your
trámite").

**Sí se permite — y es la fuente real de carácter:** el vernacular **institucional**
latinoamericano, que no es folclore sino burocracia real y es mucho más cercano al
usuario: expedientes, folios, sellos, actas, copias certificadas, fe pública,
juramentación, apostille, ventanilla, citatorio, plazo, folio.

### Lo que este sitio NO es

- No es un SaaS. No hay tarjetas, no hay sombras difusas, no hay degradados decorativos.
- No es una clínica. No hay fotos deRV stock, no hay azul+gold corporativo, no hay "soluciones integrales".
- No es un bufete de Wall Street. Nada de serif high-contrast, navy, marble, "elegante y discreto".

---

## 2. Dirección: **El Sello**

El concepto: el sitio se comporta como un **expediente bien impreso**. La metáfora no
es la textura de papel viejo — es el **sello de tinta**: el objeto que en México
significa "esto quedó asentado, esto es real, aquí está el comprobante".

**El elemento memorable (el único punto donde se gasta la boldness):** un **sello
de goma sobredimensionado**, rotado ~-6°, tinta irregular, en la portada.
Aparece **una sola vez**, grande. En el resto del sitio, quieto.

**Por qué funciona para este brief:** el usuario viene con el miedo a lo que no
está asentado. Un sello visible dice, sin decirlo, "esto va a quedar en papel".

### Lo que el sello NO es

No es un icono de escudo, ni un sello oficial del gobierno, ni un logo genérico de
"justicia". Es un sello de **despacho privado**: tipografía comprimida dentro de un
doble filete, con el borde roto y la tinta irregular.

---

## 3. Color

Paleta base: **verde jade profundo + papel frío + cacao**. Elegida por ser
institucional y cálida sin ser bandera, y por separarse de la estética crema+terracota
que la IA produce por defecto.

| Token | Hex | Rol |
|---|---|---|
| `papel` | `#EDEFEA` | Fondo base. Papel frío (no crema cálido) — evita el look "paper" genérico. |
| `tinta` | `#16302A` | Texto principal, secciones oscuras, tinta del sello. Verde-negro, no negro templatizado. |
| `jade` | `#0E7A5F` | Acento primario: CTA, enlaces, focus, subrayados de emphasis. |
| `salvia` | `#D8E5DD` | Superficies tintadas: panel de ficha, filas alternas, bloques de proceso. |
| `cacao` | `#5A3B2E` | Acento cálido secundario: tinta del sello, marcadores de sección. Tierra, no terracota. |
| `humo` | `#5A6B66` | Texto secundario, metadatos, meta descripciones. |

Derivados permitidos (nada fuera de esta lista):

```
--papel-alto   #F8F9F6   superficie elevada (formularios, campos, bloques)
--jade-oscuro  #0A6B53   texto jade sobre papel  (contraste 5.6:1)
--linea        #C6CFC8   filetes y divisores
--tinta-70     rgba(22,48,42,.70)
--papel-90     rgba(237,239,234,.90)
```

**Contrastes ya verificados:** `tinta`/`papel` ≈ 12:1 · `jade`/`papel-alto` ≈ 5.3:1 ·
`jade-oscuro`/`papel` ≈ 5.6:1 · `cacao`/`papel` ≈ 8.6:1 · `humo`/`papel` ≈ 4.9:1 ·
blanco sobre `jade` ≈ 5.3:1 · `papel` sobre `tinta` ≈ 12:1.

**Reglas de color**

- El verde de la bandera mexicana no aparece como bloque de color. `jade` es verde
  mineral, nunca saturado-nacional, y jamás aparece junto a rojo y blanco como tríada.
- `cacao` es el único cálido y se usa con mucha moderación (sello, un par de reglas).
- Nunca hay degradado como decoración. Si un bloque necesita profundidad, se usa
  `papel` vs `papel-alto` o un borde de 1px, no un `linear-gradient`.
- Nunca hay sombra difusa `rgba(0,0,0,.1)` bajo tarjetas. Si algo flota, se usa un
  borde de 1px `linea` o una banda `tinta` de 4px.

---

## 4. Tipografía

Dos familias, claramente distintas en voz: una grotesca con carácter de prensa
latinoamericana para|display, y un serif editorial de lectura para el cuerpo.

**`Archivo`** (variable, eje de ancho) — display, UI, botones, encabezados.
Archivo tiene eje de ancho: eso es la decisión deliberada. Display en
`Archivo Expanded` (width 112-125) con pesos 700-800, tracking −0.035em a −0.02em.
Archivo no es Inter ni Space Grotesk; no es la tipografía por defecto de la IA.

**`Newsreader`** (variable) — cuerpo, párrafos, citas, texto largo.
Serif de contraste medio (no high-contrast), 17-18px, line-height 1.6, medida 68ch.
Newsreader aporta calidez sin caer en el "editorial de lujo" cliché.

**Prohibido:** una tercera familia; monoespaciada para datos pequeños (sí usar
`font-variant-numeric: tabular-nums` sobre Archivo); ALL-CAPS para etiquetas; tracking
expansivo; itálicas decorativas.

### Escala

| Rol | Tamaño | Familia | Peso | Line-height | Tracking |
|---|---|---|---|---|---|
| Display (portada) | `clamp(2.5rem, 5vw, 3.75rem)` | Archivo 800 w118 | 800 | 0.95 | −0.03em |
| H1 | `clamp(2.25rem, 4.8vw, 3.75rem)` | Archivo 700 w115 | 700 | 0.98 | −0.03em |
| H2 | `clamp(1.7rem, 3.2vw, 2.5rem)` | Archivo 700 w108 | 700 | 1.05 | −0.02em |
| H3 | `1.25rem` | Archivo 600 w100 | 600 | 1.2 | −0.01em |
| Lead (intro) | `1.375rem` | Newsreader 400 | 400 | 1.45 | 0 |
| Body | `1.0625rem` | Newsreader 400 | 400 | 1.6 | 0 |
| Meta / etiquetas | `0.875rem` | Archivo 500 | 500 | 1.35 | 0 |

> El display **no puede pasar de 60px**: el titular vive en una columna de ~1070px y
> "Regulariza" (la palabra más larga) mide 642px a 104px. A 60px con stretch 118% mide
> 466px. Si se sube el tamaño, el titular desborda su columna.

**Excepción única a "sin ALL-CAPS":** el sello es un objeto físico, no una etiqueta.
Su texto va en mayúsculas y con tracking amplio, porque así se estampa. Es el único
lugar del sitio donde se permite.

**Reglas tipográficas**

- Todo el texto alineado a la izquierda. Nada centrado salvo el bloque de cierre.
- Medida máxima 68ch en párrafo (72ch en serif si hace falta).
- Cifras siempre con `tabular-nums`.
- Nunca se resalta **una sola palabra** dentro de un titular. Si un titular tiene
  énfasis, lo tiene entero, o nada.
- Los titulares de nivel 1–3 no llevan "eyebrow" encima. Sin etiquetas
  `TRÁMITES` / `CÓMO FUNCIONA` / `NUESTRO EQUIPO` sobre cada encabezado.
- **Regla de espaciado entre un encabezado y su contenido:** el hueco lo define el
  `margin-bottom` del encabezado; el elemento que va justo después **nunca** lleva
  `margin-top` (así no hay doble espacio). Ejemplos reales:
  `.titulo-portada` mb 32px → `.entradilla` mt 0 ·
  `.titulo-seccion` mb 48px → el bloque siguiente mt 0 ·
  `.tramite__titulo` mb 8px → `.tramite__desc` mt 0.

---

## 5. Layout

Concepto: **columna editorial con riel de ficha**. El contenido principal vive en
una columna ancha; a la izquierda, un riel estrecho con los datos duros del
expediente (trámite, jurisdicción, plazo típico, documentos). El riel **codifica
información**, no decora: por eso se llama "ficha".

### Wireframe A — Columna editorial con riel de ficha ✅ ELEGIDO

```
┌──────────────────────────────────────────────────────────────────────┐
│ Bufete Rodea   Trámites   Cómo funciona   Preguntas   Contacto     │
│                                                     [Agendar consulta]│
├──────────────────────────────────────────────────────────────────────┤
│                                                                      │
│   Regulariza tu situación en México        ← titular a ancho completo│
│   desde Estados Unidos.                     (display 60px, 2 líneas)  │
│                                                                      │
│   Un solo despacho lleva tu expediente      ╭─────────────╮          │
│   de ambos lados de la frontera.            │   S E L L O  │          │
│                                              │  (tinta, -6°)│          │
│   [Agendar una consulta]   [Ver trámites]    ╰─────────────╯          │
│   Un abogado revisa tu caso y te responde.                           │
│                                                                      │
├────────────────────────────────┬─────────────────────────────────────┤
│ FICHA DEL SERVICIO             │  Trámites                            │
│ Trámite:                      │  Apostille y legalización            │
│   Apostille y legalización     │  Actas y certificados de nacimiento  │
│ Jurisdicción:                 │  CURP y constancias                  │
│   México, cualquier estado    │  Fe pública y juramentación         │
│ Plazo típico:                  │  Permisos y licencias                │
│   3 a 5 semanas                │  Representation before consulates    │
│ Documentos:                    │                                     │
│   Pasaporte, acta original     │  ────────────────────────────────    │
│                                │  Cada fila lleva su ficha real      │
├────────────────────────────────┴─────────────────────────────────────┤
│  Cómo funciona                                                     │
│  1  Nos escribes y revisamos tu caso      ← sí es secuencia:        │
│  2  Armamos el expediente y lo enviamos      numeración justificada  │
│  3  Recibes el resultado y los documentos                             │
├──────────────────────────────────────────────────────────────────────┤
│  Testimonios — 2 citas grandes en Newsreader, sin avatar, sin rating  │
├──────────────────────────────────────────────────────────────────────┤
│  Preguntas frecuentes — acordeón <details> nativo                     │
├──────────────────────────────────────────────────────────────────────┤
│  Contacto: formulario a la izquierda, datos y oficinas a la derecha  │
│  Pie: aviso legal, aviso de privacidad, Collective bar                 │
└──────────────────────────────────────────────────────────────────────┘
```

### Wireframe B — Módulos de tarjeta ❌ RECHAZADO

```
┌──────────┐ ┌──────────┐ ┌──────────┐ ┌──────────┐
│  card    │ │  card    │ │  card    │ │  card    │   ← SaaS-card kit
└──────────┘ └──────────┘ └──────────┘ └──────────┘     (trait #4)
```

### Wireframe C — Periodico de columnas ❌ RECHAZADO

```
┌────────┬────────┬────────┬────────┐
│ col    │ col    │ col    │ col    │   ← broadsheet hairline, 0 radius,
│ dense  │ dense  │ dense  │ dense  │     columnas densas (trait #3)
└────────┴────────┴────────┴────────┘
```

### Reglas de layout

- Grid de 12 columnas, `gap: 24px`, contenedor máximo **1200px**, padding lateral
  `clamp(20px, 5vw, 64px)`.
- Contenido de texto en columna de **max 68ch**, no centrada en el grid.
- **Alineación:** todo a la izquierda, incluidos titulares y CTA. Solo el bloque de
  cierre ("Hablemos") se centra, y una sola vez.
- Bordes redondeados: **0px en casi todo**. Radio máximo 2px (solo campos de
  formulario). El sello es el único elemento con forma redondeada y es deliberado
  (un sello es redondo) — no se extiende como estilo.
- Filetes de 1px `linea` **solo** donde separan filas de datos (ficha, lista de
  trámites, FAQ). No como textura de fondo de cada bloque.
- Responsive: el riel de ficha **colapsa arriba** del contenido en < 900px; la
  lista de trámites pasa de 2 columnas a 1; el sello baja de 420px a 260px de ancho.
- Mobile: todo se lee bien a 360px. Botones a ancho completo en < 480px.

---

## 6. Principios

1. **El sello manda.** Un solo elemento memorable en toda la página. Todo lo demás
   es discreto y disciplinado.
2. **Papel, no pantalla.** Estética de expediente bien impreso: fondo `papel`, tinta
   `tinta`, filetes finos, tipografía con criterio. Sin skeuomorfismo, sin texturas
   de papel viejo, sin grunge.
3. **Burocracia real, folclore falso.** El carácter viene del archivo, la ventanilla,
   el folio, el citatorio — no de la bandera ni del sombrero.
4. **Hablar claro.** La interfaz dice lo que va a pasar, en español llano. "Recibe
   tus documentos", no "Se ha iniciado el procedimiento".
5. **Cercanía sin informalidad.** Cero jerga, cero emojis, cero "¡Hola!".
6. **Menos adorno.** Si un elemento no explica algo o no guía a la persona, se quita.

---

## 7. Anti-patrones (checklist de revisión)

Antes de dar por buena cualquier pantalla, verificar:

- [ ] ¿Es esto una **elección** para este brief, o lo haría igual para cualquier página?
- [ ] ¿Hay crema `#F4F1EA` + serif high-contrast + terracota `#D97757`? → fuera.
- [ ] ¿Hay casi-negro `#0B0B0B`/`#111`? → usar `tinta` `#16302A`.
- [ ] ¿Hay tarjetas idénticas con el mismo radio y la misma sombra gris? → fuera.
- [ ] ¿Hay etiquetado ALL-CAPS con tracking? → fuera.
- [ ] ¿Hay cadenas de metadatos con punto medio (`A · B · C`)? → fuera.
- [ ] ¿Hay etiquetas `PALABRA — fragmento` con em dash espaciado? → fuera.
- [ ] ¿Hay monoespaciada para datos pequeños? → fuera, usar Archivo tabular.
- [ ] ¿Hay `→` pegado al texto de un botón o enlace? → fuera.
- [ ] ¿Hay degradados decorativos o glows? → fuera.
- [ ] ¿Se resalta **una sola palabra** de un titular? → fuera.
- [ ] ¿Cada bloque tiene una "eyebrow" sobre su título? → fuera.
- [ ] ¿Hay fade-and-slide-up en cada sección al hacer scroll? → fuera.
- [ ] ¿Aparecen sombras `rgba(0,0,0,.1)`? → fuera.
- [ ] ¿Hay bandera, papel picado, calaveras, cactus, marigold, tequila? → fuera.
- [ ] ¿Los número `01/02/03` corresponden a algo que **realmente** es una secuencia? Si
      no, son decoración → fuera.

---

## 8. Voz y copy

- Idioma: **español de México**, plano y respetuoso. Sin español peninsular
  ("usted" vs "tú": "tú", con respeto, no familiaridad forzada).
- **Voz activa.** El CTA dice exactamente qué pasa: "Agendar una consulta", no
  "Enviar". "Ver trámites", no "Conocer más"+"→".
- **Un verbo por acción, coherente en todo el flujo.** Si el botón dice "Agendar
  una consulta", la confirmación dice "Consulta agendada". Mismo verbo, mismo
  objeto, de principio a fin.
- **Nombres desde el usuario.** "Citas en el consulado", no "Procedimientos
  consulares". "Tus documentos", no "Documentación requerida por el usuario".
- **Los errores no se disculpan ni son vagos.** "Faltó el acta de nacimiento. Súbela
  aquí o escríbenos para localizar una copia en el registro." El estado vacío es
  una invitación a actuar: "Todavía no has enviado documentos. Empieza por el
  pasaporte para calcular el costo."
- **Sin jerga legal en la interfaz.** Si un término técnico es inevitable
  (apostille, fe pública), se explica en una línea la primera vez que aparece.
- **Límite de Claims:** nada de "garantizado", "100% aprobado", "resultados
  inmediatos", "los mejores abogados". Se habla de proceso, tiempos y cobertura.

### Placeholders que el despacho debe sustituir antes de publicar

- `[NOMBRE_DEL_DESPACHO]` — el nombre real y su marca.
- Testimonios: hoy son **copy de ejemplo**, no reseñas reales. No publicar testimonios
  inventados. Marcar cada bloque con `<!-- TESTIMONIO PENDIENTE -->` hasta que el
  despacho entregue textos firmados y con autorización de uso.
- Tiempos "3 a 5 semanas": validar con el despacho por trámite (cambian por estado
  y por el trámite). El sitio debe mostrar tiempos **por servicio**, nunca genéricos.
- Datos de contacto, oficinas, años de ejercicio, número de abogados, cobertura
  por estado: son datos duros; colocar de `pendiente` hasta confirmarlos.
- Todo el contenido legal (listado de trámites, requisitos, plazos) debe ir
  validado por el despacho y con fecha de última revisión.

---

## 9. Movimiento

Solo donde responde a una acción o donde hay **un** momento orquestado.

| Momento | Comportamiento |
|---|---|
| Carga de portada | El sello se estampa: escala 1.06 → 1, opacidad 0 → 1, `420ms cubic-bezier(.2,.8,.2,1)`, con leve_rotation incluida. **Único** momento de entrada. |
| Hover de enlace | Subrayado que crece desde la izquierda, `160ms`. |
| Hover de botón | Se oscurece `jade` → `jade-oscuro`, `160ms`. SinGrow, sin translate. |
| Acordeón FAQ | Abre/cierre con `grid-template-rows: 0fr → 1fr`, `220ms`. |
| Foco | Anillo visible 2px `jade` + `outline-offset: 3px`, sin transición. |

**Prohibido:** fade-and-slide-up por sección al hacer scroll, parallax,counters
animados, cursor personalizado, confeti. Nada de animation on load salvo el sello.

`@media (prefers-reduced-motion: reduce)` → todo a 0.01ms, sin transformaciones,
el sello aparece ya estamado.

---

## 10. Suelo técnico (calidad mínima, sin anunciarlo)

- Responsive real hasta 360px.
- Foco de teclado visible en **todos** los interactivos.
- Skip link al contenido principal.
- Landmarks semánticos: `header`, `nav`, `main`, `section` con `aria-labelledby`, `footer`.
- Acordeón FAQ con `<details>/<summary>` nativo (accesible y sin JS).
- Formularios: `<label>` real, `autocomplete`, mensajes de error con `aria-live="polite"`,
  `aria-invalid` y `aria-describedby`.
- Contraste ≥ 4.5:1 en texto, ≥ 3:1 en bordes de control.
- `lang="es-MX"`.
- HTML semántico y CSS con custom properties. **Nada de framework ni build step.**
- Fuentes: Google Fonts con `preconnect` y `font-display: swap`, más fallback de
  sistema (`ui-sans-serif` / `Georgia`) para que la página se lea bien sin red.
- Si el sitio se va a servir sin internet (Laragon local), autoalojar las fuentes en
  `/assets/fonts/` y cambiar el `<link>` por `@font-face`.

### Cuidado con la especificidad CSS

Bug conocido y frecuente: un selector de clase de sección y uno de elemento se
anulan (`.servicio { padding-bottom: 64px }` vs `section { padding-bottom: 0 }`).
Regla del proyecto:

- Todo el espaciado vive en **variables** (`--space-1..--space-9`) y se aplica con
  `gap` en flex/grid o `padding-block` en la sección, nunca con selectores de elemento
  sueltos.
- Si hay que usar selectores de elemento, van **siempre** al principio de la hoja y
  solo para reset, nunca después de las clases de componente.
- Ningún `!important` salvo el reset de `margin`/`box-sizing`.

---

## 11. Stack

- **HTML5 + CSS (custom properties) + JS vanilla**, sin build, sin framework.
- Un solo `index.html` + `assets/css/main.css` + `assets/js/main.js`.
- Laragon sirve el proyecto en `http://localhost/designtestai/`.

---

## 12. Registro de decisiones

| # | Decisión | Razón |
|---|---|---|
| 1 | Verde jade + papel frío + cacao, en vez de azul/navy corporativo | El azul con oro es el cliché del bufete; el verde jade se siente institucional y latino sin invocar la bandera. |
| 2 | Sello como único elemento memorable | Es la metáfora real del usuario (lo que queda asentado) y es vernacular, no folclore. |
| 3 | Riel de ficha en vez de tarjetas | Codifica información real (plazo, jurisdicción, documentos) en vez de repetir la misma tarjeta 6 veces. |
| 4 | Archivo Expanded + Newsreader | Dos voces distintas, no la grotesca neutra por defecto. Archivo Expanded da carácter de prensa sin volverse broadsheet. |
| 5 | Sin sombras difusas, sin degradados | Es la señal más fiable de "generado por IA". |
| 6 | Numeración solo en "Cómo funciona" | Los trámites no son una secuencia; numerarlos sería decoración. |
| 7 | Copy en español de México, voz activa | El usuario tiene un problema real; la jerga lo expulsa. |
