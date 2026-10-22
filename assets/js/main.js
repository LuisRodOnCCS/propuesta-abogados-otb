/* Bufete Rodea — comportamiento de la página.
   Vanilla JS, sin dependencias. Ver DESIGN.md §9 (movimiento) y §10 (accesibilidad). */

(function () {
  'use strict';

  /* ===================================================================
     1. WHATSAPP — el canal principal del sitio
     =================================================================== */

  /* CAMBIA AQUÍ EL NÚMERO REAL.
     Formato: clave de país + número, sin +, sin espacios, sin guiones.
     Ejemplo: 5218123456789
     Es el único lugar que hay que editar: todos los enlaces de la página
     se reconstruyen con este valor al cargar. */
  var WHATSAPP_NUMERO = '5210000000000';

  /* Reemplaza el número en todos los enlaces sin tocar los mensajes
     precargados. Se hace por cadena, no con URL(), para que también
     funcione con el sitio abierto desde el disco (file://). */
  function aplicarNumeroWa() {
    var enlaces = document.querySelectorAll('a[href*="wa.me"]');

    Array.prototype.forEach.call(enlaces, function (enlace) {
      enlace.href = enlace.href.replace(/wa\.me\/\d+/, 'wa.me/' + WHATSAPP_NUMERO);
    });
  }

  /* Medición del clic. El sitio no trae analítica, pero si el despacho
     instala GTM o gtag más adelante, cada clic queda con su lugar de origen
     (hero, una fila de trámites, el FAQ, etc.). */
  function registrarClicWa(enlace) {
    var lugar = enlace.getAttribute('data-wa-lugar') || 'sin-lugar';

    if (Array.isArray(window.dataLayer)) {
      window.dataLayer.push({ event: 'clic_whatsapp', lugar: lugar });
    }

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'clic_whatsapp', { lugar: lugar });
    }
  }

  document.addEventListener('click', function (evento) {
    var destino = evento.target;
    if (!destino || !destino.closest) return;

    var enlace = destino.closest('a[data-wa]');
    if (enlace) registrarClicWa(enlace);
  });

  /* ===================================================================
     2. CTA PERSISTENTE — botón flotante (escritorio) y barra fija (móvil)
     =================================================================== */

  var flotante = document.querySelector('.wa-flotante');
  var barra = document.querySelector('.barra-wa');
  var hero = document.getElementById('inicio');
  var seccionContacto = document.getElementById('contacto');
  var pie = document.querySelector('.pie');
  var pendiente = false;

  /* Un elemento "entra en pantalla" cuando su borde superior queda por encima
     de la fracción indicada del alto de la ventana y su borde inferior sigue
     dentro de la vista. */
  function entraEnPantalla(elemento, fraccion) {
    if (!elemento) return false;
    var caja = elemento.getBoundingClientRect();
    return caja.top < window.innerHeight * fraccion && caja.bottom > 0;
  }

  function refrescarWa() {
    if (!flotante && !barra) return;

    var alto = window.innerHeight || document.documentElement.clientHeight;
    var desplazamiento = window.pageYOffset || document.documentElement.scrollTop || 0;

    /* El CTA persistente aparece cuando el hero ya salió de pantalla. */
    var heroSalio = hero
      ? hero.getBoundingClientRect().bottom <= 0
      : desplazamiento > 600;

    /* Se esconde cuando la sección de contacto ya está a la vista (ahí el
       usuario tiene el formulario y el número delante) o cuando aparece el
       pie. El contacto se mide al 40% del alto: mientras el usuario sigue
       leyendo el FAQ, el botón sigue disponible. */
    var haySalidaCercana = entraEnPantalla(seccionContacto, 0.4) || entraEnPantalla(pie, 1);

    var visible = heroSalio && !haySalidaCercana;
    var esMovil = window.innerWidth <= 900;

    var mostrarFlotante = visible && !esMovil;
    var mostrarBarra = visible && esMovil;

    if (flotante) flotante.hidden = !mostrarFlotante;
    if (barra) barra.hidden = !mostrarBarra;

    /* La barra ocupa espacio fijo: el body cede ese alto para que nunca
       tape el contenido. */
    document.body.classList.toggle('con-barra-wa', mostrarBarra);
  }

  function alDesplazar() {
    if (pendiente) return;
    pendiente = true;

    window.requestAnimationFrame(function () {
      pendiente = false;
      refrescarWa();
    });
  }

  /* ------------------------- Menú en móvil ------------------------- */
  var botonMenu = document.querySelector('.menu-boton');
  var nav = document.getElementById('nav-principal');
  var textoBoton = botonMenu ? botonMenu.querySelector('.visualmente-oculto') : null;

  function cerrarMenu() {
    if (!botonMenu || !nav) return;
    botonMenu.setAttribute('aria-expanded', 'false');
    nav.classList.remove('abierta');
    if (textoBoton) textoBoton.textContent = 'Abrir menú';
  }

  function alternarMenu() {
    if (!botonMenu || !nav) return;
    var abierto = botonMenu.getAttribute('aria-expanded') === 'true';
    botonMenu.setAttribute('aria-expanded', String(!abierto));
    nav.classList.toggle('abierta', !abierto);
    if (textoBoton) textoBoton.textContent = abierto ? 'Abrir menú' : 'Cerrar menú';
  }

  if (botonMenu && nav) {
    cerrarMenu();

    botonMenu.addEventListener('click', alternarMenu);

    nav.addEventListener('click', function (evento) {
      if (evento.target.closest('a')) cerrarMenu();
    });

    document.addEventListener('keydown', function (evento) {
      if (evento.key === 'Escape') cerrarMenu();
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 900) cerrarMenu();
    });
  }

  /* ------------------------ Formulario ---------------------------- */
  var formulario = document.getElementById('form-consulta');

  if (formulario) {
    var avisoExito = document.getElementById('exito');

    function errorDe(campo) {
      var destino = document.getElementById('error-' + campo.id);
      return destino ? destino.textContent.trim() : '';
    }

    function mostrarError(campo, mensaje) {
      var destino = document.getElementById('error-' + campo.id);
      if (destino) destino.textContent = mensaje;
      campo.setAttribute('aria-invalid', mensaje ? 'true' : 'false');
    }

    function validarCampo(campo) {
      var valor = campo.value.trim();
      var mensaje = '';

      if (campo.id === 'nombre') {
        if (!valor) {
          mensaje = 'Escribe tu nombre para saber cómo llamarte.';
        } else if (valor.length < 2) {
          mensaje = 'El nombre parece incompleto.';
        }
      }

      if (campo.id === 'correo') {
        if (!valor) {
          mensaje = 'Necesitamos un correo para responderte.';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valor)) {
          mensaje = 'Revisa el correo: le falta el @ o el dominio.';
        }
      }

      if (campo.id === 'telefono') {
        if (valor && !/^[0-9+\-\s()]{7,}$/.test(valor)) {
          mensaje = 'El teléfono solo puede tener números, espacios y guiones.';
        }
      }

      if (campo.id === 'mensaje') {
        if (!valor) {
          mensaje = 'Cuéntanos qué necesitas, aunque sea con una línea.';
        } else if (valor.length < 20) {
          mensaje = 'Agrega un poco más de detalle: qué trámite, desde cuándo y en qué estado está.';
        }
      }

      mostrarError(campo, mensaje);
      return !mensaje;
    }

    var campos = Array.prototype.slice.call(
      formulario.querySelectorAll('.campo__control[required]')
    );

    campos.forEach(function (campo) {
      campo.addEventListener('blur', function () {
        if (campo.value.trim()) validarCampo(campo);
      });
      campo.addEventListener('input', function () {
        if (campo.getAttribute('aria-invalid') === 'true') validarCampo(campo);
      });
    });

    formulario.addEventListener('submit', function (evento) {
      evento.preventDefault();

      var validos = campos.map(validarCampo).every(Boolean);
      var primerError = campos.find(function (campo) {
        return errorDe(campo).length > 0;
      });

      if (!validos) {
        if (primerError) primerError.focus();
        return;
      }

      // Sin backend: aquí se enviaría al correo del despacho o a la API.
      if (avisoExito) {
        avisoExito.hidden = false;
        avisoExito.textContent =
          'Consulta agendada. Un abogado te escribe para confirmar día y hora.';
        avisoExito.focus();
      }

      formulario.reset();
    });
  }

  /* -------------------------- Arranque ---------------------------- */
  aplicarNumeroWa();
  refrescarWa();

  window.addEventListener('scroll', alDesplazar, { passive: true });
  window.addEventListener('resize', alDesplazar);
  window.addEventListener('load', refrescarWa);
})();
