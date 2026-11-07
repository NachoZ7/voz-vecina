/* ==========================================================================
   VozVecina · Registro e inicio de sesión (prototipo con localStorage)
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

  function destinoSeguro() {
    // ?next=perfil | tablero | metricas | alertas | reportar (solo claves conocidas)
    var next = new URLSearchParams(window.location.search).get("next");
    var rutas = window.vvRutas || {};
    return next && next !== "login" && next !== "registro" && rutas[next] ? rutas[next] : (rutas.inicio || "../../index.html");
  }

  function iniciarSesion(usuario) {
    sessionStorage.setItem("isLoggedIn", "true");
    sessionStorage.setItem("userName", usuario.username);
    sessionStorage.setItem("displayName", usuario.nombre);
  }

  function marcarError(input, mensaje) {
    input.classList.add("is-invalid");
    input.setAttribute("aria-invalid", "true");
    var campo = input.closest(".field");
    var aviso = campo.querySelector(".field-error");
    if (!aviso) {
      aviso = document.createElement("span");
      aviso.className = "field-error";
      campo.appendChild(aviso);
    }
    aviso.textContent = mensaje;
  }

  function limpiarErrores(form) {
    form.querySelectorAll(".is-invalid").forEach(function (el) {
      el.classList.remove("is-invalid");
      el.removeAttribute("aria-invalid");
    });
    form.querySelectorAll(".field-error").forEach(function (el) { el.remove(); });
    var alerta = form.querySelector(".form-alert");
    if (alerta) alerta.hidden = true;
  }

  function mostrarAlerta(form, mensaje) {
    var alerta = form.querySelector(".form-alert");
    if (!alerta) return;
    alerta.querySelector("span").textContent = mensaje;
    alerta.hidden = false;
  }

  /* ------------------------------ Registro ------------------------------ */
  var formRegistro = document.getElementById("form-registro");
  if (formRegistro) {
    formRegistro.addEventListener("submit", function (e) {
      e.preventDefault();
      limpiarErrores(formRegistro);

      var f = function (id) { return document.getElementById(id); };
      var valores = {
        nombre: f("reg-nombre").value.trim(),
        apellido: f("reg-apellido").value.trim(),
        username: f("reg-username").value.trim(),
        email: f("reg-email").value.trim(),
        documento: f("reg-documento").value.trim(),
        localidad: f("reg-localidad").value.trim(),
        password: f("reg-password").value
      };
      var errores = 0;
      function error(id, msg) { marcarError(f(id), msg); errores++; }

      if (valores.nombre.length < 2) error("reg-nombre", "Ingresá tu nombre.");
      if (valores.apellido.length < 2) error("reg-apellido", "Ingresá tu apellido.");
      if (!/^[A-Za-z0-9_.]{3,20}$/.test(valores.username)) {
        error("reg-username", "De 3 a 20 caracteres: letras, números, punto o guion bajo.");
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(valores.email)) error("reg-email", "Ingresá un email válido.");
      if (!/^\d{7,9}$/.test(valores.documento)) error("reg-documento", "Ingresá tu DNI, solo números (7 a 9 dígitos).");
      if (valores.localidad.length < 2) error("reg-localidad", "Indicá tu localidad o barrio.");
      if (valores.password.length < 6) error("reg-password", "La contraseña debe tener al menos 6 caracteres.");
      if (f("reg-password2").value !== valores.password) error("reg-password2", "Las contraseñas no coinciden.");

      var usuarios = leerUsuarios();
      if (!f("reg-username").classList.contains("is-invalid") && usuarios.some(function (u) {
        return u.username.toLowerCase() === valores.username.toLowerCase();
      })) error("reg-username", "Ese nombre de usuario ya está en uso.");
      if (!f("reg-email").classList.contains("is-invalid") && usuarios.some(function (u) {
        return u.email.toLowerCase() === valores.email.toLowerCase();
      })) error("reg-email", "Ya existe una cuenta con ese email.");

      if (errores) {
        mostrarAlerta(formRegistro, "Revisá los campos marcados y volvé a intentarlo.");
        return;
      }

      usuarios.push(valores);
      localStorage.setItem("usuariosRegistrados", JSON.stringify(usuarios));
      iniciarSesion(valores);
      toast("¡Cuenta creada!", "Ya estás conectado, " + valores.nombre + ".", "success");
      window.setTimeout(function () { window.location.href = (window.vvRutas && window.vvRutas.inicio) || "../../index.html"; }, 900);
    });
  }

  /* ------------------------------- Login -------------------------------- */
  var formLogin = document.getElementById("form-login");
  if (formLogin) {
    if (new URLSearchParams(window.location.search).get("next")) {
      toast("Conectate para continuar", "Necesitás iniciar sesión para acceder a esa sección.", "info");
    }

    formLogin.addEventListener("submit", function (e) {
      e.preventDefault();
      limpiarErrores(formLogin);

      var inUser = document.getElementById("login-user");
      var inPass = document.getElementById("login-password");
      var ident = inUser.value.trim().toLowerCase();
      var errores = 0;

      if (!ident) { marcarError(inUser, "Ingresá tu usuario o email."); errores++; }
      if (!inPass.value) { marcarError(inPass, "Ingresá tu contraseña."); errores++; }
      if (errores) return;

      var usuario = leerUsuarios().find(function (u) {
        return (u.username.toLowerCase() === ident || u.email.toLowerCase() === ident) && u.password === inPass.value;
      });

      if (!usuario) {
        mostrarAlerta(formLogin, "Usuario o contraseña incorrectos. Si todavía no tenés cuenta, registrate.");
        return;
      }

      iniciarSesion(usuario);
      toast("¡Bienvenido/a de nuevo!", "Hola, " + usuario.nombre + ".", "success");
      window.setTimeout(function () { window.location.href = destinoSeguro(); }, 700);
    });
  }
})();
