/* Bufete Rodea — comportamiento de la página.
   Vanilla JS, sin dependencias. Ver DESIGN.md §9 (movimiento) y §10 (accesibilidad). */

(function () {
  'use strict';

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

  if (!formulario) return;

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
})();
