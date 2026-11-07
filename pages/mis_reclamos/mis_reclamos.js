/* ==========================================================================
   VozVecina · Mis reclamos
   Lee localStorage["reclamosGuardados"] (lo escribe la página Reportar)
   y muestra los reclamos del usuario conectado en acordeones.
   ========================================================================== */
(function () {
  "use strict";

  var URGENCIAS = { alta: "Alta", media: "Media", baja: "Baja" };
  var ESTADOS = {
    "Nuevo": "pill-nuevo",
    "En curso": "pill-curso",
    "Elevado": "pill-elevado",
    "Resuelto": "pill-resuelto"
  };

  /* ------------------------------ Utilidades ------------------------------ */
  function esc(texto) {
    return String(texto == null ? "" : texto).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function formatearFecha(iso) {
    var fecha = new Date(iso);
    if (isNaN(fecha.getTime())) return "—";
    return fecha.toLocaleDateString("es-AR", { day: "2-digit", month: "long", year: "numeric" }) +
      " · " + fecha.toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" }) + " h";
  }

  function leerReclamos() {
    try {
      var datos = JSON.parse(localStorage.getItem("reclamosGuardados"));
      return Array.isArray(datos) ? datos : [];
    } catch (e) {
      return [];
    }
  }

  function reclamosDelUsuario(usuario) {
    return leerReclamos().filter(function (r) {
      return r.username && r.username.toLowerCase() === usuario.toLowerCase();
    });
  }

  /* ------------------------------ HTML ------------------------------ */
  function htmlFila(etiqueta, valor) {
    return '<div class="mr-fila"><h3>' + etiqueta + "</h3><p>" + esc(valor) + "</p></div>";
  }

  function htmlAcordeon(r, indice) {
    var estado = r.estado || "Nuevo";
    var clasePill = ESTADOS[estado] || "pill-nuevo";
    var urgencia = URGENCIAS[r.urgencia] || "Media";

    var fotos = (r.fotos && r.fotos.length)
      ? '<div class="mr-fotos">' + r.fotos.map(function (src, i) {
        return '<img src="' + esc(src) + '" alt="Foto ' + (i + 1) + " del reclamo " + esc(r.id) + '" loading="lazy">';
      }).join("") + "</div>"
      : "";

    var referencias = r.referencias ? htmlFila("Referencias", r.referencias) : "";

    return '' +
      '<div class="mr-acordion">' +
      '<button type="button" class="mr-header" data-acordion="' + indice + '" aria-expanded="false" aria-controls="mr-content-' + indice + '">' +
      '<span class="mr-titulo"><span class="mr-id">' + esc(r.id) + '</span><span class="mr-nombre">' + esc(r.titulo) + "</span></span>" +
      '<span class="mr-meta"><span class="pill ' + clasePill + '">' + esc(estado) + "</span>" +
      '<i class="fa-solid fa-chevron-down mr-flecha" aria-hidden="true"></i></span>' +
      "</button>" +
      '<div class="mr-content" id="mr-content-' + indice + '">' +
      '<div class="mr-detalle">' +
      htmlFila("Categoría", r.categoriaTexto || r.categoria) +
      htmlFila("Ubicación", r.direccion + " · " + r.barrio) +
      referencias +
      htmlFila("Reportado", formatearFecha(r.fecha)) +
      '<p class="mr-descripcion">' + esc(r.descripcion) + "</p>" +
      fotos +
      '<div class="mr-badges">' +
      '<span class="badge-naranja">Urgencia ' + esc(urgencia) + "</span>" +
      "<span>SLA estimado " + esc(r.sla || "48 h") + "</span>" +
      "<span>" + esc(r.apoyos || 0) + " apoyos</span>" +
      "</div>" +
      "</div></div></div>";
  }

  function htmlVacio() {
    var rutas = window.vvRutas || {};
    return '<div class="mr-vacio">' +
      '<i class="fa-regular fa-folder-open" aria-hidden="true"></i>' +
      "<h2>Todavía no reportaste ningún reclamo</h2>" +
      "<p>Cuando publiques un problema de tu barrio, lo vas a ver acá con su estado y su SLA.</p>" +
      '<a class="btn btn-orange" href="' + (rutas.reportar || "../../reportar.html") + '"><i class="fa-solid fa-plus" aria-hidden="true"></i> Reportar un problema</a>' +
      "</div>";
  }

  /* ------------------------------ Acordeones ------------------------------ */
  function abrir(indice) {
    var header = document.querySelector('[data-acordion="' + indice + '"]');
    var contenido = document.getElementById("mr-content-" + indice);
    if (header) {
      header.classList.add("active");
      header.setAttribute("aria-expanded", "true");
    }
    if (contenido) contenido.classList.add("active");
  }

  function cerrarTodos() {
    document.querySelectorAll(".mr-header").forEach(function (h) {
      h.classList.remove("active");
      h.setAttribute("aria-expanded", "false");
    });
    document.querySelectorAll(".mr-content").forEach(function (c) { c.classList.remove("active"); });
  }

  function alternar(indice) {
    var header = document.querySelector('[data-acordion="' + indice + '"]');
    var estabaAbierto = header.classList.contains("active");
    cerrarTodos();
    if (!estabaAbierto) abrir(indice);
  }

  /* ------------------------------ Init ------------------------------ */
  document.addEventListener("DOMContentLoaded", function () {
    var conectado = sessionStorage.getItem("isLoggedIn") === "true";
    var usuario = sessionStorage.getItem("userName");

    // Acceso protegido: solo usuarios conectados
    if (!conectado || !usuario) {
      var login = (window.vvRutas && window.vvRutas.login) || "../registro_y_login/login.html";
      window.location.replace(login + "?next=misReclamos");
      return;
    }

    var contenedor = document.getElementById("mr-lista");
    var reclamos = reclamosDelUsuario(usuario);

    if (!reclamos.length) {
      contenedor.innerHTML = htmlVacio();
      return;
    }

    contenedor.innerHTML = reclamos.map(htmlAcordeon).join("");

    contenedor.querySelectorAll(".mr-header").forEach(function (header) {
      header.addEventListener("click", function () {
        alternar(this.getAttribute("data-acordion"));
      });
    });

    abrir(0); // el reclamo más reciente abierto por defecto
  });
})();
