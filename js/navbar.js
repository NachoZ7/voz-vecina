/* ==========================================================================
   VozVecina · Navbar interactivo
   - Desconectado: Inicio, Tablero, Métricas, Alertas, Conectarse, Registrarse
   - Conectado: mismos enlaces + botón Reportar + menú de usuario (avatar)
   Sesión: sessionStorage (isLoggedIn, userName, displayName)
   Usuarios: localStorage["usuariosRegistrados"]
   ========================================================================== */
(function () {
  "use strict";

  if (sessionStorage.getItem("isLoggedIn") === null) {
    sessionStorage.setItem("isLoggedIn", "false");
    sessionStorage.setItem("userName", "");
  }

  function esc(texto) {
    return String(texto).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function leerUsuarios() {
    try {
      return JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
    } catch (e) {
      return [];
    }
  }

  function iniciales(nombre) {
    var partes = String(nombre).trim().split(/\s+/).filter(Boolean);
    if (!partes.length) return "?";
    return (partes[0][0] + (partes.length > 1 ? partes[1][0] : "")).toUpperCase();
  }

  function paginaActual() {
    return window.location.pathname.split("/").pop() || "index.html";
  }

  // Rutas según la carpeta: las páginas dentro de /pages/ están a 2 niveles de la raíz
  var enSubcarpeta = window.location.pathname.indexOf("/pages/") !== -1;
  var raiz = enSubcarpeta ? "../../" : "./";
  var RUTAS = {
    inicio: raiz + "index.html",
    tablero: raiz + "tickets.html",
    metricas: raiz + "metricas.html",
    alertas: raiz + "alertas.html",
    reportar: raiz + "reportar.html",
    login: raiz + "pages/registro_y_login/login.html",
    registro: raiz + "pages/registro_y_login/registro.html",
    perfil: raiz + "pages/perfil_de_usuario/perfil.html",
    misReclamos: raiz + "pages/mis_reclamos/mis_reclamos.html"
  };

  function enlace(href, texto, clase, icono) {
    var actual = href.split("/").pop() === paginaActual() ? ' aria-current="page"' : "";
    var cls = clase ? ' class="' + clase + '"' : "";
    var i = icono ? '<i class="fa-solid ' + icono + '" aria-hidden="true"></i> ' : "";
    return '<a href="' + href + '"' + cls + actual + ">" + i + texto + "</a>";
  }

  function cerrarMenuUsuario() {
    var menu = document.getElementById("userMenu");
    var btn = document.getElementById("userTrigger");
    if (menu) menu.classList.remove("show");
    if (btn) btn.setAttribute("aria-expanded", "false");
  }

  function cerrarSesion() {
    sessionStorage.setItem("isLoggedIn", "false");
    sessionStorage.setItem("userName", "");
    sessionStorage.removeItem("displayName");
    window.location.href = RUTAS.inicio;
  }

  function renderNavbar() {
    var nav = document.getElementById("main-nav");
    var contenedor = document.getElementById("user-container");
    if (!nav || !contenedor) return;

    var conectado = sessionStorage.getItem("isLoggedIn") === "true";
    var userName = sessionStorage.getItem("userName") || "";

    var base =
      enlace(RUTAS.inicio, "Inicio") +
      enlace(RUTAS.tablero, "Tablero") +
      enlace(RUTAS.metricas, "Métricas") +
      enlace(RUTAS.alertas, "Alertas");

    if (!conectado) {
      nav.innerHTML =
        base +
        enlace(RUTAS.login, "Conectarse") +
        enlace(RUTAS.registro, "Registrarse", "nav-cta", "fa-user-plus");
      contenedor.innerHTML = "";
      return;
    }

    var datos = leerUsuarios().find(function (u) {
      return u.username && u.username.toLowerCase() === userName.toLowerCase();
    });
    var nombre = sessionStorage.getItem("displayName") || (datos && datos.nombre) || userName;
    var avatar = datos && datos.avatar
      ? '<img class="user-avatar" src="' + esc(datos.avatar) + '" alt="">'
      : '<span class="user-avatar" aria-hidden="true">' + esc(iniciales(nombre)) + "</span>";

    nav.innerHTML = base + enlace(RUTAS.reportar, "Reportar", "nav-cta", "fa-plus");

    contenedor.innerHTML =
      '<button type="button" class="user-trigger" id="userTrigger" aria-haspopup="true" aria-expanded="false" aria-controls="userMenu">' +
      avatar +
      '<span class="user-name">Hola, ' + esc(nombre) + "</span>" +
      '<i class="fa-solid fa-chevron-down user-chevron" aria-hidden="true"></i>' +
      "</button>" +
      '<div class="user-menu" id="userMenu">' +
      '<a href="' + RUTAS.perfil + '"><i class="fa-solid fa-user" aria-hidden="true"></i>Mi perfil</a>' +
      '<a href="' + RUTAS.misReclamos + '"><i class="fa-solid fa-ticket" aria-hidden="true"></i>Mis reclamos</a>' +
      "<hr>" +
      '<a href="#" id="logoutBtn" class="logout-link"><i class="fa-solid fa-right-from-bracket" aria-hidden="true"></i>Cerrar sesión</a>' +
      "</div>";

    document.getElementById("userTrigger").addEventListener("click", function (e) {
      e.stopPropagation();
      var abierto = document.getElementById("userMenu").classList.toggle("show");
      this.setAttribute("aria-expanded", abierto ? "true" : "false");
    });

    document.getElementById("logoutBtn").addEventListener("click", function (e) {
      e.preventDefault();
      cerrarSesion();
    });
  }

  // Cerrar el menú al hacer clic afuera o con Escape
  document.addEventListener("click", function (e) {
    if (!e.target.closest(".user-nav")) cerrarMenuUsuario();
  });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") cerrarMenuUsuario();
  });

  // API mínima para otras páginas (perfil, login, registro)
  window.vvRenderNavbar = renderNavbar;
  window.vvLogout = cerrarSesion;
  window.vvRutas = RUTAS;

  // Páginas protegidas: <body data-requiere-login="clave"> (clave = una de RUTAS, ej. "reportar")
  // Si no hay sesión, se redirige al login y luego se vuelve a la página pedida.
  var paginaProtegida = document.body && document.body.getAttribute("data-requiere-login");
  if (paginaProtegida && sessionStorage.getItem("isLoggedIn") !== "true") {
    window.location.replace(RUTAS.login + "?next=" + encodeURIComponent(paginaProtegida));
    return;
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", renderNavbar);
  } else {
    renderNavbar();
  }
})();
