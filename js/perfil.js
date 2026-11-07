/* ==========================================================================
   VozVecina · Perfil de usuario
   ========================================================================== */
(function () {
  "use strict";

  function toast(titulo, mensaje, tipo) {
    if (window.vvToast) window.vvToast(titulo, mensaje, tipo);
  }

  function leerUsuarios() {
    try {
      return JSON.parse(localStorage.getItem("usuariosRegistrados")) || [];
    } catch (e) {
      return [];
    }
  }

  function iniciales(nombre) {
    var p = String(nombre).trim().split(/\s+/).filter(Boolean);
    return p.length ? (p[0][0] + (p.length > 1 ? p[1][0] : "")).toUpperCase() : "?";
  }

  document.addEventListener("DOMContentLoaded", function () {
    var conectado = sessionStorage.getItem("isLoggedIn") === "true";
    var sesionUser = sessionStorage.getItem("userName");

    // Si alguien entra escribiendo la URL sin haber iniciado sesión
    if (!conectado || !sesionUser) {
      window.location.replace("login.html?next=perfil.html");
      return;
    }

    var usuarios = leerUsuarios();
    var datos = usuarios.find(function (u) {
      return u.username.toLowerCase() === sesionUser.toLowerCase();
    });
    var displayName = sessionStorage.getItem("displayName") || sesionUser;

    var $ = function (id) { return document.getElementById(id); };
    var zonaAvatar = $("perf-avatar");

    function pintarAvatar(src, nombre) {
      zonaAvatar.innerHTML = "";
      if (src) {
        var img = document.createElement("img");
        img.src = src;
        img.alt = "Foto de perfil";
        zonaAvatar.appendChild(img);
      } else {
        zonaAvatar.textContent = iniciales(nombre);
      }
    }

    if (datos) {
      $("perf-nombre-completo").textContent = datos.nombre + " " + datos.apellido;
      $("perf-username").textContent = datos.username;
      $("perf-email").textContent = datos.email;
      $("perf-doc").textContent = datos.documento;
      $("perf-localidad").textContent = datos.localidad;
      pintarAvatar(datos.avatar, datos.nombre + " " + datos.apellido);
    } else {
      $("perf-nombre-completo").textContent = displayName;
      $("perf-username").textContent = sesionUser;
      pintarAvatar(null, displayName);
    }

    /* Actividad vecinal: reclamos reportados por el usuario (localStorage["reclamosGuardados"]).
       Los apoyos dados siguen pendientes: hoy se guardan sin asociarse a un usuario. */
    var propios = [];
    try {
      propios = (JSON.parse(localStorage.getItem("reclamosGuardados")) || []).filter(function (r) {
        return r.username && r.username.toLowerCase() === sesionUser.toLowerCase();
      });
    } catch (e) {
      propios = [];
    }
    $("perf-reclamos").textContent = String(propios.length);
    $("perf-apoyos").textContent = "Según tu historial";

    // Cambiar foto
    var inputFoto = $("input-file-avatar");
    $("btn-cambiar-foto").addEventListener("click", function () { inputFoto.click(); });

    inputFoto.addEventListener("change", function (e) {
      var archivo = e.target.files[0];
      if (!archivo) return;

      if (!archivo.type.startsWith("image/")) {
        toast("Archivo no válido", "Elegí una imagen (JPG, PNG, etc.).", "error");
        return;
      }
      if (archivo.size > 1024 * 1024) {
        toast("La foto es demasiado grande", "Elegí una imagen menor a 1 MB.", "error");
        return;
      }
      if (!datos) {
        toast("No se pudo guardar", "No encontramos tu cuenta. Volvé a iniciar sesión.", "error");
        return;
      }

      var lector = new FileReader();
      lector.onload = function (ev) {
        datos.avatar = ev.target.result;
        try {
          localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));
        } catch (err) {
          toast("No se pudo guardar", "Falta espacio en el navegador. Probá con una foto más liviana.", "error");
          return;
        }
        pintarAvatar(datos.avatar, datos.nombre);
        if (window.vvRenderNavbar) window.vvRenderNavbar();
        toast("Foto actualizada", "Tu foto de perfil se guardó correctamente.", "success");
      };
      lector.readAsDataURL(archivo);
    });

    $("btn-perfil-logout").addEventListener("click", function (e) {
      e.preventDefault();
      if (window.vvLogout) window.vvLogout();
    });
  });
})();
