# Propuesta de sitio — Bufete de abogados (OTB)

Sitio informativo de una sola página para un despacho que atiende a personas
mexicanas en Estados Unidos y lleva trámites en México sin que tengan que viajar.

La página está montada como **embudo de contacto**: el canal principal es WhatsApp
y el formulario es la vía secundaria. Todo el copy, los tiempos y los datos de
contacto son **placeholder** hasta que el despacho entregue el contenido real.

---

## Ver el sitio

El proyecto es HTML + CSS + JS puro. **No hay build, no hay dependencias, no hay
framework.** Se abre el `index.html` y ya.

Con Laragon corriendo:

```
http://localhost/designtestai/
```

Si prefieres revisar los enlaces de `wa.me` con el número real, configura el
número primero (ver abajo) y usa el servidor, no `file://`.

---

## Estructura

```
index.html              la página completa (marcado)
assets/css/main.css     tokens + sistema + componentes (custom properties al inicio)
assets/js/main.js       menú móvil, formulario, módulo de WhatsApp
DESIGN.md               el sistema de diseño: tokens, layout, voz, anti-patrones
AGENTS.md               reglas del proyecto (léelo antes de tocar la UI)
skills-lock.json        lockfile de la skill de diseño
README.md               este archivo
```

`.agents/` y `.claude/` contienen la skill `frontend-design` instalada con
symlinks; están fuera de git y se restauran con:

```
npx.cmd skills experimental_install
```

> En Windows usa `npx.cmd`, nunca `npx` ni `npx.ps1` (la ExecutionPolicy de
> PowerShell está en Restricted).

---

## El sistema de diseño

`DESIGN.md` es la fuente de verdad. Si una decisión visual no está ahí, primero
se agrega a `DESIGN.md` y después se implementa. No se improvisan hex,
tipografías ni espaciado en el momento.

Lo mínimo que hay que saber antes de tocar CSS:

- **Todo el espaciado** sale de `--space-1 … --space-9`. No hay números sueltos.
- **Los selectores de elemento** se usan solo en el reset. Después, solo clases.
- **No hay sombras, ni degradados decorativos, ni radios mayores a 2px** (el sello
  es el único elemento redondeado, y es deliberado).
- **`wa`** es el verde de WhatsApp. Es un *color de canal*, no parte de la
  paleta: solo aparece en sus propios componentes, para que signifique
  "este botón te manda a WhatsApp" y nada más.
- **El verbo nunca cambia**: la acción se llama *Escríbenos* en los siete puntos
  de conversión. El botón del formulario dice *Agendar una consulta*, nunca
  *Enviar*.

Antes de dar algo por terminado, revisar contra la lista de anti-patrones de
`DESIGN.md` §7 y tomar capturas para comparar.

---

## Cómo cambiar el número de WhatsApp

Hay **un solo lugar** que hay que editar:

```
assets/js/main.js   →   var WHATSAPP_NUMERO = '5210000000000';
```

Formato: clave de país + número, sin `+`, sin espacios, sin guiones.
Ejemplo: `5218123456789`.

El JS reescribe los 12 enlaces de la página al cargar, conservando los mensajes
precargados de cada trámite. Los `href` del HTML traen `5210000000000` como
valor de reserva para que los enlaces funcionen aunque el JS no cargue; el JS
siempre tiene la última palabra.

Si se cambia el número en el HTML y no en el JS, el JS lo sobrescribe. Si se
cambia en el JS, todo el sitio se actualiza solo.

---

## Pendiente antes de publicar (lo tiene que dar el despacho)

Nada de esto se puede inventar. Cada punto necesita una respuesta del despacho.

### Bloqueante

| # | Qué falta | Dónde |
|---|---|---|
| 1 | **Número de WhatsApp real** | `assets/js/main.js` → `WHATSAPP_NUMERO` |
| 2 | **Nombre real del despacho** (y si "Bufete Rodea" existe o es inventado) | `<title>`, `.marca__nombre`, texto del sello, `.pie__marca`, `meta description` |
| 3 | Dirección, colonia, código postal | `index.html` → `.contacto__linea` |
| 4 | Teléfono fijo y correo | `index.html` → `.contacto__datos` |
| 5 | Número de cédula profesional y bar ante el Colegio del Estado | `.pie__legal` |
| 6 | Fecha de última revisión del contenido legal | `.pie__legal` |
| 7 | **Testimonios reales**, firmados y con autorización de uso escrita | `.testimonios` (hoy son copy de ejemplo, marcados como `<!-- TESTIMONIO PENDIENTE -->`; **no publicar testimonios inventados**) |
| 8 | Validación de los plazos y costos por trámite | `.tramite__plazo` y `.ficha` |

### Affirmaciones que hay que confirmar (o quitar)

El sitio promete cosas. Cada una tiene que ser cierto antes de publicar:

- "En menos de 24 horas hábiles te decimos si podemos ayudarte" (paso 1).
- "Sin costo adicional para ti" en la respuesta en inglés (FAQ).
- "Te entregamos el costo y el plazo por escrito antes de empezar" (aparece en
  la barra superior, en la ficha y en el FAQ). Es la promesa central: si no se
  cumple, el sitio pierde su argumento.
- Que el despacho tiene cobertura en México **y** en Estados Unidos.

### Enlaces y paperwork

- "Aviso de privacidad" y "Términos" apuntan a `#`. Necesitan destino real.
- El aviso legal del pie de la sección de contacto debe ir redactado por el
  despacho, no por diseño.

---

## Sugerencias para la siguiente iteración

Ordenadas por impacto sobre la conversión.

### Producto / conversión

1. **Acortar el formulario.** Tiene 6 campos. En conversión de formularios, cada
   campo extra cuesta. Como WhatsApp ya cubre el caso largo, el formulario podría
   bajar a 4 campos (nombre, correo, estado, qué necesitas) y pedir el detalle
   en el chat.
2. **Versión en inglés** (`/en/`). El público objetivo vive en Estados Unidos y
   muchos leen más rápido en inglés. Es el siguiente salto de conversión más
   probable que un rediseño. El copy ya está listo para traducirse tal cual.
3. **Poner el número de WhatsApp a la vista** en la sección de contacto, con
   formato legible (+52 1 …). Ver el número en grande sube la confianza.
4. **Probar el CTA de la barra superior contra el CTA del hero.** La barra es un
   punto de contacto temprano; se puede medir si resta atención al hero.
5. **Mensaje precargado por estado.** Hoy el mensaje es por trámite. Si el
   despacho capta volumen por estado, se puede precargar también el estado.

### Técnico

6. **El formulario no envía nada.** No hay backend. Necesita un endpoint real
   (Formspree, Netlify Forms, API propia) o, en el peor caso, un `mailto:` con
   validación del lado del servidor. Hoy el "éxito" es solo visual.
7. **Instalar la analítica.** El código ya está listo: cada clic a WhatsApp
   dispara `clic_whatsapp` con un atributo `lugar` (`hero`, `tramite-curp`,
   `faq`, `barra-movil`, …) a `dataLayer` y a `gtag`. Solo falta poner el ID de
   GTM y definir la conversión. Los `lugar` ya sirven para armar un heatmap.
8. **SEO social:** faltan `og:title`, `og:description`, `og:image` y `twitter:card`.
   Sin `og:image`, el enlace que se comparte en WhatsApp se ve como texto pelado.
9. **`favicon`, `sitemap.xml` y `robots.txt`.** Los tres son de diez minutos.
10. **Peso tipográfico.** Archivo es variable y con eje de ancho; se está
    cargando todo el rango. Fijar los pesos usados (`400,600,700,800` y
    `wdth 108–120`) reduce la descarga.
11. **Cache busting.** Los assets no llevan versión en la URL. Cuando se itere
    sobre producción, conviene versionarlos (`main.css?v=2`) o servir con
    `Cache-Control` desde el CDN.

### Legal y de marca

12. **Verificar que "Bufete Rodea" no choca** con un nombre o despacho existente
    antes de que el dominio del despacho entre en producción.
13. **Si el sitio va a estar en el dominio del despacho**, actualizar
    `theme-color`, el `canonical` y la URL de los enlaces legales.

---

## Verificación hecha

Corrido en Chrome headless sobre la versión actual:

- 0 sombras, 0 radios > 2.5px, 0 degradados (fuera del `select`), 0 monoespaciada.
- Sin mayúsculas, sin punto medio, sin flechas en el texto de la interfaz.
- Sin dos botones verdes juntos en pantalla.
- Todos los contrastes ≥ 4.5:1 en texto y ≥ 3:1 en bordes de control
  (el botón de WhatsApp: texto 7.6:1, filete 3.6:1 contra el papel).
- Sin desbordamiento horizontal a 375 / 430 / 768 / 1440 px.
- 0 errores de consola.
- Formulario: envío vacío → 3 errores + foco al primer inválido; envío válido →
  "Consulta agendada…" + reset.
- El botón flotante solo aparece cuando el hero sale de pantalla; la barra fija
  móvil solo ≤ 900px, nunca coexiste con el flotante y nunca tapa contenido.

---

## Git

Rama principal: `master`. Commits con mensaje en español describiendo el
**por qué**, no el qué.

```
git log --oneline
```

El repositorio remoto es público: `github.com/LuisRodOnCCS/propuesta-abogados-otb`.

---

## Nota de método

Antes de cerrar, el sitio se lee contra la lista de anti-patrones de
`DESIGN.md` §7. Si sobra un adorno, se quita.
*(Regla de Chanel: antes de salir de casa, quita un accesorio.)*
