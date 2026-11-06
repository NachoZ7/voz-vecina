/* ==========================================================================
   VOZ VECINA — Interacciones del prototipo
   Sin dependencias. JavaScript nativo + APIs del navegador.
   ========================================================================== */
(function () {
  "use strict";

  var $ = function (selector, context) {
    return (context || document).querySelector(selector);
  };

  var $$ = function (selector, context) {
    return Array.prototype.slice.call((context || document).querySelectorAll(selector));
  };

  /* ------------------------------------------------------------------------
     Datos de demostración
     ------------------------------------------------------------------------ */
  var TICKETS = {
    "VV-2041": {
      id: "VV-2041",
      title: "Bache profundo en Av. San Martín",
      category: "Baches",
      slug: "baches",
      status: "Elevado",
      statusClass: "pill-elevado",
      location: "Av. San Martín 1200 · Centro",
      time: "hace 2 h",
      image: "assets/bache.svg",
      gallery: ["assets/vereda.svg", "assets/basural.svg"],
      votes: 128,
      comments: 14,
      photos: 3,
      slaLabel: "SLA 48 h",
      priority: "Alta",
      priorityClass: "fill-alta",
      slaPct: 82,
      recency: 2,
      near: true,
      desc: "El bache ocupa casi toda la mano derecha de la calzada, justo antes del semáforo. Los colectivos lo esquivan invadiendo el carril contrario y ya provocó la caída de un ciclista. La situación empeora cada vez que llueve."
    },
    "VV-2038": {
      id: "VV-2038",
      title: "Luminaria apagada en pasaje Los Álamos",
      category: "Luminarias",
      slug: "luminarias",
      status: "En curso",
      statusClass: "pill-curso",
      location: "Pasaje Los Álamos 300 · Los Aromos",
      time: "hace 5 h",
      image: "assets/luminaria.svg",
      gallery: ["assets/vereda.svg", "assets/luminaria.svg"],
      votes: 96,
      comments: 8,
      photos: 2,
      slaLabel: "SLA 72 h",
      priority: "Media",
      priorityClass: "fill-media",
      slaPct: 64,
      recency: 5,
      near: false,
      desc: "Hace más de dos semanas que la luminaria del pasaje no enciende. La cuadra queda completamente a oscuras desde las 19 y los vecinos evitamos pasar solos. Ya hubo intentos de robo en la zona."
    },
    "VV-2035": {
      id: "VV-2035",
      title: "Basural en la esquina de Rivadavia",
      category: "Residuos",
      slug: "residuos",
      status: "En curso",
      statusClass: "pill-curso",
      location: "Rivadavia y Sarmiento · Barrio Norte",
      time: "hace 7 h",
      image: "assets/basural.svg",
      gallery: ["assets/basural.svg", "assets/vereda.svg"],
      votes: 214,
      comments: 31,
      photos: 4,
      slaLabel: "SLA 24 h",
      priority: "Alta",
      priorityClass: "fill-alta",
      slaPct: 93,
      recency: 7,
      near: false,
      desc: "La esquina se convirtió en un basural a cielo abierto. Hay bolsas, escombros y restos de poda que nadie retira desde hace diez días. El olor es insoportable y aparecieron ratas en los patios de las casas linderas."
    },
    "VV-2031": {
      id: "VV-2031",
      title: "Vereda rota frente a la escuela 12",
      category: "Veredas",
      slug: "veredas",
      status: "Nuevo",
      statusClass: "pill-nuevo",
      location: "Mitre 450 · Centro",
      time: "hace 9 h",
      image: "assets/vereda.svg",
      gallery: ["assets/vereda.svg", "assets/bache.svg"],
      votes: 42,
      comments: 3,
      photos: 1,
      slaLabel: "SLA 96 h",
      priority: "Media",
      priorityClass: "fill-media",
      slaPct: 38,
      recency: 9,
      near: true,
      desc: "Las baldosas frente a la escuela están rotas y levantadas. Los chicos tropiezan al salir y una mamá se lastimó la semana pasada. Necesitamos una reparación urgente antes del inicio de clases."
    },
    "VV-2028": {
      id: "VV-2028",
      title: "Luminaria intermitente en la plaza",
      category: "Luminarias",
      slug: "luminarias",
      status: "Resuelto",
      statusClass: "pill-resuelto",
      location: "Plaza San Vicente · San Martín",
      time: "hace 1 día",
      image: "assets/luminaria.svg",
      gallery: ["assets/luminaria.svg", "assets/vereda.svg"],
      votes: 67,
      comments: 12,
      photos: 2,
      slaLabel: "SLA 72 h",
      priority: "Media",
      priorityClass: "fill-media",
      slaPct: 100,
      recency: 24,
      near: true,
      desc: "La luz de la plaza parpadea toda la noche. Los vecinos reportamos el problema hace un mes y el movimiento vecinal logró que el municipio programe la reparación. Compartimos la actualización con el barrio."
    },
    "VV-2024": {
      id: "VV-2024",
      title: "Bache que inunda los garajes",
      category: "Baches",
      slug: "baches",
      status: "En curso",
      statusClass: "pill-curso",
      location: "Los Cedros 88 · Los Aromos",
      time: "hace 1 día",
      image: "assets/bache.svg",
      gallery: ["assets/bache.svg", "assets/vereda.svg"],
      votes: 53,
      comments: 6,
      photos: 2,
      slaLabel: "SLA 48 h",
      priority: "Media",
      priorityClass: "fill-media",
      slaPct: 58,
      recency: 26,
      near: false,
      desc: "Bache de un metro de ancho en la calle interna. Entra agua en los garajes cuando llueve y los autos sufren daños en la suspensión. Solicitamos que se repare antes del invierno."
    },
    "VV-2021": {
      id: "VV-2021",
      title: "Microbasural recurrente en la costanera",
      category: "Residuos",
      slug: "residuos",
      status: "Elevado",
      statusClass: "pill-elevado",
      location: "Costanera y Almirante Brown · Costanera",
      time: "hace 2 días",
      image: "assets/basural.svg",
      gallery: ["assets/basural.svg", "assets/basural.svg"],
      votes: 176,
      comments: 24,
      photos: 5,
      slaLabel: "SLA 24 h",
      priority: "Alta",
      priorityClass: "fill-alta",
      slaPct: 88,
      recency: 48,
      near: false,
      desc: "A pesar de las campañas de limpieza, el microbasural vuelve cada semana. Necesitamos contenedores fijos y una solución definitiva, no solo un operativo puntual. Adjuntamos fotos actualizadas por los vecinos."
    },
    "VV-2017": {
      id: "VV-2017",
      title: "Poste de luz caído",
      category: "Luminarias",
      slug: "postes",
      status: "Nuevo",
      statusClass: "pill-nuevo",
      location: "Isidoro Cañones 2025 · San Justo",
      time: "hace 2 días",
      image: "assets/foto poste de luz caido.jpeg",
      gallery: [],
      votes: 31,
      comments: 4,
      photos: 1,
      slaLabel: "SLA 24 h",
      priority: "Alta",
      priorityClass: "fill-alta",
      slaPct: 74,
      recency: 50,
      near: false,
      desc: "El poste de luz de la esquina se cayó tras la tormenta y quedó atravesado sobre la vereda, con los cables cortados y expuestos. Los vecinos colocamos una soga y una señal provisoria para que nadie pase, pero de noche la zona queda a oscuras y el riesgo es mayor. Pedimos que lo retiren y restituyan el alumbrado con urgencia."
    }
  };

  var COMMON_COMMENTS = {
    baches: [
      { name: "María Paz", initials: "MP", time: "hace 45 min", badge: "Vecina verificada", text: "Confirmo que sigue igual. Ayer pasé en bici y tuve que frenar de golpe. Ya sumé mi apoyo para que lo prioricen." },
      { name: "Julián Ríos", initials: "JR", time: "hace 1 h", badge: "", text: "El problema empeora con cada lluvia. Sería bueno que el municipio ponga una señalización provisoria mientras tanto." },
      { name: "Equipo VozVecina", initials: "VV", time: "hace 20 min", badge: "Moderación", text: "Recibimos el reporte y lo derivamos al área de Obras Públicas. Con 150 apoyos, el reclamo pasa a prioridad crítica." }
    ],
    luminarias: [
      { name: "Carla Méndez", initials: "CM", time: "hace 40 min", badge: "Vecina verificada", text: "La cuadra está muy oscura y da miedo volver tarde. Gracias por reportarlo, me sumo." },
      { name: "Diego Sosa", initials: "DS", time: "hace 2 h", badge: "", text: "Ayer vi una cuadrilla revisando la zona. Ojalá lo resuelvan esta semana." },
      { name: "Equipo VozVecina", initials: "VV", time: "hace 25 min", badge: "Moderación", text: "Actualizamos el estado a En curso. El municipio informó que el recambio está programado." }
    ],
    residuos: [
      { name: "Andrea Ledesma", initials: "AL", time: "hace 1 h", badge: "Vecina verificada", text: "Hoy pasa el camión y no se llevó nada. Por favor, necesitamos una solución urgente, hay mal olor en toda la cuadra." },
      { name: "Vecinos de la esquina", initials: "VE", time: "hace 2 h", badge: "", text: "Sumamos fotos nuevas. Los contenedores están desbordados y aparecieron roedores. Ya no alcanza con barrer." },
      { name: "Equipo VozVecina", initials: "VV", time: "hace 30 min", badge: "Moderación", text: "Con más de 200 apoyos el ticket fue elevado. Compartimos el reclamo con la Secretaría de Ambiente." }
    ],
    veredas: [
      { name: "Sofía Ferreyra", initials: "SF", time: "hace 35 min", badge: "Vecina verificada", text: "Mi mamá usa bastón y no puede pasar por ahí. Es un riesgo concreto, necesitamos una rampa y reparación." },
      { name: "Pablo G.", initials: "PG", time: "hace 1 h", badge: "", text: "Mandé la foto que sacamos esta mañana. La baldosa está levantada casi 10 centímetros." },
      { name: "Equipo VozVecina", initials: "VV", time: "hace 15 min", badge: "Moderación", text: "Sugerimos sumar la mayor cantidad de apoyo posible para que entre en el plan de reparaciones del próximo mes." }
    ],
    postes: [
      { name: "Lucía Benítez", initials: "LB", time: "hace 2 h", badge: "Vecina verificada", text: "El poste quedó tirado sobre la vereda y los cables están a la altura de los chicos. Avisé a Defensa Civil, pero necesitamos que vengan urgente." },
      { name: "Martín Aguirre", initials: "MA", time: "hace 50 min", badge: "", text: "Ya cortaron la luz en media cuadra. Puse una soga para que nadie pase por abajo, pero de noche no se ve nada." },
      { name: "Sandra Rojas", initials: "SR", time: "hace 20 min", badge: "", text: "Desde ayer no tenemos luz y el poste sigue ahí. Los chicos pasan por al lado para ir a la escuela." },
      { name: "Equipo VozVecina", initials: "VV", time: "hace 10 min", badge: "Moderación", text: "El reclamo fue derivado a Alumbrado Público y a Defensa Civil por riesgo eléctrico. Evitá acercarte al poste hasta que lo aseguren." }
    ]
  };

  /* ------------------------------------------------------------------------
     Utilidades generales
     ------------------------------------------------------------------------ */
  function formatoNumero(valor, decimales) {
    var numero = decimales ? valor.toFixed(decimales) : Math.round(valor).toString();
    return numero.replace(".", ",");
  }

  function toast(titulo, mensaje, tipo) {
    var stack = $("#toastStack");
    if (!stack) {
      stack = document.createElement("div");
      stack.id = "toastStack";
      stack.className = "toast-stack";
      stack.setAttribute("aria-live", "polite");
      document.body.appendChild(stack);
    }

    var icon = tipo === "error" ? "fa-triangle-exclamation" : (tipo === "info" ? "fa-circle-info" : "fa-circle-check");
    var el = document.createElement("div");
    el.className = "toast";

    var i = document.createElement("i");
    i.className = "fa-solid " + icon;

    var content = document.createElement("div");
    var strong = document.createElement("strong");
    strong.textContent = titulo;
    content.appendChild(strong);

    if (mensaje) {
      var p = document.createElement("p");
      p.textContent = mensaje;
      content.appendChild(p);
    }

    el.appendChild(i);
    el.appendChild(content);
    stack.appendChild(el);

    window.setTimeout(function () {
      el.classList.add("is-leaving");
      window.setTimeout(function () {
        el.remove();
      }, 250);
    }, 4200);
  }

  /* ------------------------------------------------------------------------
     Navegación móvil
     ------------------------------------------------------------------------ */
  function initNav() {
    var toggle = $(".nav-toggle");
    var nav = $("#main-nav");

    if (!toggle || !nav) return;

    function close() {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      toggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
      toggle.setAttribute("aria-label", "Abrir menú");
      document.body.classList.remove("menu-abierto");
    }

    toggle.addEventListener("click", function () {
      var isOpen = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
      toggle.innerHTML = isOpen ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
      toggle.setAttribute("aria-label", isOpen ? "Cerrar menú" : "Abrir menú");
      document.body.classList.toggle("menu-abierto", isOpen);
    });

    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) close();
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape") close();
    });

    window.addEventListener("resize", function () {
      if (window.innerWidth > 980) close();
    });
  }

  /* ------------------------------------------------------------------------
     Modales accesibles (W3.CSS + refuerzo de teclado)
     ------------------------------------------------------------------------ */
  var ultimoFoco = null;

  function abrirModal(id) {
    var modal = document.getElementById(id);
    if (!modal) return;

    ultimoFoco = document.activeElement;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";

    var focusable = modal.querySelector("[data-close], button, a[href], input, textarea, select");
    if (focusable) {
      window.setTimeout(function () {
        focusable.focus();
      }, 60);
    }
  }

  function cerrarModal(modal) {
    if (!modal) return;

    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");

    if (!$(".vv-modal-wrap.is-open")) {
      document.body.style.overflow = "";
    }

    if (ultimoFoco && typeof ultimoFoco.focus === "function") {
      ultimoFoco.focus();
    }
  }

  function initModales() {
    $$("[data-open-modal]").forEach(function (trigger) {
      trigger.addEventListener("click", function () {
        abrirModal(trigger.getAttribute("data-open-modal"));
      });
    });

    $$(".vv-modal-wrap").forEach(function (modal) {
      modal.setAttribute("aria-hidden", modal.classList.contains("is-open") ? "false" : "true");

      modal.addEventListener("click", function (event) {
        if (event.target === modal) cerrarModal(modal);
      });

      $$("[data-close]", modal).forEach(function (boton) {
        boton.addEventListener("click", function () {
          cerrarModal(modal);
        });
      });
    });

    document.addEventListener("keydown", function (event) {
      var abierto = $(".vv-modal-wrap.is-open");
      if (!abierto) return;

      if (event.key === "Escape") {
        cerrarModal(abierto);
        return;
      }

      if (event.key !== "Tab") return;

      var focusables = $$(
        'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
        abierto
      ).filter(function (el) {
        return el.offsetParent !== null;
      });

      if (!focusables.length) return;

      var primero = focusables[0];
      var ultimo = focusables[focusables.length - 1];

      if (event.shiftKey && document.activeElement === primero) {
        event.preventDefault();
        ultimo.focus();
      } else if (!event.shiftKey && document.activeElement === ultimo) {
        event.preventDefault();
        primero.focus();
      }
    });
  }

  /* ------------------------------------------------------------------------
     Apoyos vecinales (persistencia local)
     ------------------------------------------------------------------------ */
  var CLAVE_VOTOS = "vozvecina_apoyos_v1";
  var apoyos = {};

  try {
    apoyos = JSON.parse(window.localStorage.getItem(CLAVE_VOTOS)) || {};
  } catch (error) {
    apoyos = {};
  }

  function guardarApoyos() {
    try {
      window.localStorage.setItem(CLAVE_VOTOS, JSON.stringify(apoyos));
    } catch (error) {
      /* El prototipo sigue funcionando sin almacenamiento. */
    }
  }

  function sincronizarVotos(ticketId) {
    var ticket = TICKETS[ticketId];
    if (!ticket) return;

    var extra = apoyos[ticketId] ? 1 : 0;
    var total = ticket.votes + extra;

    $$('[data-vote="' + ticketId + '"]').forEach(function (boton) {
      var contador = $("[data-vote-count]", boton);
      if (contador) contador.textContent = total;
      boton.classList.toggle("is-voted", Boolean(apoyos[ticketId]));
      boton.setAttribute("aria-pressed", apoyos[ticketId] ? "true" : "false");
    });

    var votosDetalle = $("#detailVotes");
    if (votosDetalle && $("#detailVoteBtn") && $("#detailVoteBtn").getAttribute("data-vote") === ticketId) {
      votosDetalle.textContent = total;
    }
  }

  function initVotos() {
    $$("[data-vote]").forEach(function (boton) {
      var id = boton.getAttribute("data-vote");
      if (id) sincronizarVotos(id);
    });

    document.addEventListener("click", function (event) {
      var boton = event.target.closest("[data-vote]");
      if (!boton) return;

      var id = boton.getAttribute("data-vote");
      var ticket = TICKETS[id];
      if (!ticket) return;

      if (apoyos[id]) {
        delete apoyos[id];
        toast("Apoyo retirado", "Puedes volver a apoyar este reclamo cuando quieras.", "info");
      } else {
        apoyos[id] = true;
        toast("¡Apoyo registrado!", "Tu reacción eleva la prioridad y el SLA de " + id + ".", "success");
      }

      guardarApoyos();
      sincronizarVotos(id);
    });
  }

  /* ------------------------------------------------------------------------
     Detalle de ticket
     ------------------------------------------------------------------------ */
  var ticketActual = null;

  function construirComentario(comentario) {
    var article = document.createElement("article");
    article.className = "comment";

    var avatar = document.createElement("span");
    avatar.className = "comment-avatar";
    avatar.textContent = comentario.initials;
    avatar.setAttribute("aria-hidden", "true");

    var body = document.createElement("div");
    body.className = "comment-body";

    var head = document.createElement("div");
    head.className = "comment-head";

    var nombre = document.createElement("strong");
    nombre.textContent = comentario.name;
    head.appendChild(nombre);

    if (comentario.badge) {
      var badge = document.createElement("span");
      badge.className = "comment-badge";
      badge.textContent = comentario.badge;
      head.appendChild(badge);
    }

    var tiempo = document.createElement("time");
    tiempo.textContent = comentario.time;
    head.appendChild(tiempo);

    var texto = document.createElement("p");
    texto.textContent = comentario.text;

    body.appendChild(head);
    body.appendChild(texto);
    article.appendChild(avatar);
    article.appendChild(body);

    return article;
  }

  function renderizarTicket(ticket) {
    ticketActual = ticket;

    var setText = function (selector, value) {
      var el = $(selector);
      if (el) el.textContent = value;
    };

    setText("#detailId", ticket.id);
    setText("#detailCategory", ticket.category);
    setText("#ticketModalTitle", ticket.title);
    setText("#detailLocation", ticket.location);
    setText("#detailTime", ticket.time);
    setText("#detailDesc", ticket.desc);
    setText("#detailSlaLabel", ticket.slaLabel);
    setText("#detailSlaPct", ticket.slaPct + "%");
    setText("#detailPriority", ticket.priority);
    setText("#detailMetaCategory", ticket.category);
    setText("#detailMetaPhotos", ticket.photos + (ticket.photos === 1 ? " foto vecinal" : " fotos vecinales"));

    var estado = $("#detailStatus");
    if (estado) {
      estado.className = "pill " + ticket.statusClass;
      estado.innerHTML = '<i class="fa-solid fa-circle"></i> ' + ticket.status;
    }

    var imagen = $("#detailImage");
    if (imagen) {
      imagen.src = ticket.image;
      imagen.alt = "Evidencia fotográfica: " + ticket.title;
    }

    var galeria = $("#detailGallery");
    if (galeria) {
      galeria.innerHTML = "";
      var rutas = [ticket.image].concat(ticket.gallery || []);
      rutas.slice(0, 3).forEach(function (ruta, indice) {
        var figure = document.createElement("figure");
        var img = document.createElement("img");
        img.src = ruta;
        img.alt = "Foto " + (indice + 1) + " del reclamo " + ticket.id;
        img.loading = "lazy";

        var caption = document.createElement("figcaption");
        caption.textContent = indice === 0 ? "Actual" : "Hace " + (indice + 1) + " días";

        figure.appendChild(img);
        figure.appendChild(caption);
        galeria.appendChild(figure);
      });
    }

    var rellenoSla = $("#detailSlaFill");
    if (rellenoSla) {
      rellenoSla.style.width = "0%";
      window.setTimeout(function () {
        rellenoSla.style.width = ticket.slaPct + "%";
      }, 100);
    }

    var botonVoto = $("#detailVoteBtn");
    if (botonVoto) {
      botonVoto.setAttribute("data-vote", ticket.id);
      sincronizarVotos(ticket.id);
    }

    setText("#detailVotes", ticket.votes + (apoyos[ticket.id] ? 1 : 0));

    setText("#detailCommentCount", ticket.comments);

    var listaComentarios = $("#detailComments");
    if (listaComentarios) {
      listaComentarios.innerHTML = "";
      var comentarios = COMMON_COMMENTS[ticket.slug] || COMMON_COMMENTS.baches;
      comentarios.forEach(function (comentario) {
        listaComentarios.appendChild(construirComentario(comentario));
      });
    }

    var compartir = $("#detailShare");
    if (compartir) compartir.setAttribute("data-share", ticket.id);

    sincronizarVotos(ticket.id);
  }

  function abrirDetalle(ticketId) {
    var ticket = TICKETS[ticketId];
    var modal = $("#ticketModal");
    if (!ticket || !modal) return;

    renderizarTicket(ticket);
    abrirModal("ticketModal");
  }

  function initDetalle() {
    document.addEventListener("click", function (event) {
      var trigger = event.target.closest("[data-detail]");
      if (!trigger) return;
      event.preventDefault();
      abrirDetalle(trigger.getAttribute("data-detail"));
    });

    var formComentario = $("#commentForm");
    if (formComentario) {
      formComentario.addEventListener("submit", function (event) {
        event.preventDefault();
        var campo = $("#commentInput");
        if (!campo) return;

        var texto = campo.value.trim();
        if (texto.length < 3) {
          toast("Comentario vacío", "Escribe al menos unas palabras para sumar a la conversación.", "error");
          campo.focus();
          return;
        }

        var lista = $("#detailComments");
        if (lista) {
          var comentario = {
            name: "Vos",
            initials: "VO",
            time: "ahora",
            badge: "Vecino",
            text: texto
          };
          lista.appendChild(construirComentario(comentario));
          lista.scrollTop = lista.scrollHeight;
        }

        if (ticketActual) {
          ticketActual.comments += 1;
          var contador = $("#detailCommentCount");
          if (contador) contador.textContent = ticketActual.comments;
        }

        campo.value = "";
        toast("Comentario publicado", "Tu aporte ya forma parte del hilo vecinal.", "success");
      });
    }

    document.addEventListener("click", function (event) {
      var trigger = event.target.closest("[data-share]");
      if (!trigger) return;

      var id = trigger.getAttribute("data-share");
      var texto = "VozVecina · Reclamo " + id + " — " + window.location.href;

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(texto).then(function () {
          toast("Enlace copiado", "Comparte el reclamo para sumar más apoyos.", "success");
        }).catch(function () {
          toast("Compartir", "El enlace del reclamo está listo para copiar.", "info");
        });
      } else {
        toast("Compartir", "El enlace del reclamo está listo para copiar.", "info");
      }
    });
  }

  /* ------------------------------------------------------------------------
     Filtros y orden del tablero
     ------------------------------------------------------------------------ */
  function initFiltros() {
    var grid = $("#ticketsGrid");
    if (!grid) return;

    var cards = $$(".ticket-card", grid);
    var search = $("#ticketSearch");
    var status = $("#statusFilter");
    var sort = $("#sortFilter");
    var chips = $$(".chip[data-category]");
    var countEl = $("#resultsCount");
    var empty = $("#emptyState");
    var categoriaActiva = "todas";

    function ordenar() {
      var modo = sort ? sort.value : "recientes";
      var copia = cards.slice();

      copia.sort(function (a, b) {
        if (modo === "apoyados") {
          return parseInt(b.getAttribute("data-votes"), 10) - parseInt(a.getAttribute("data-votes"), 10);
        }
        if (modo === "prioridad") {
          var jerarquia = { alta: 3, media: 2, baja: 1 };
          return (jerarquia[b.getAttribute("data-priority")] || 0) - (jerarquia[a.getAttribute("data-priority")] || 0);
        }
        return parseInt(a.getAttribute("data-recency"), 10) - parseInt(b.getAttribute("data-recency"), 10);
      });

      copia.forEach(function (card) {
        grid.appendChild(card);
      });
    }

    function aplicarFiltros() {
      var consulta = search ? search.value.trim().toLowerCase() : "";
      var estado = status ? status.value : "todos";
      var visibles = 0;

      cards.forEach(function (card) {
        var categoria = card.getAttribute("data-category");
        var estadoCard = card.getAttribute("data-status");
        var texto = (
          (card.getAttribute("data-title") || "") + " " +
          (card.getAttribute("data-location") || "") + " " +
          card.textContent
        ).toLowerCase();

        var coincide =
          (categoriaActiva === "todas" || categoria === categoriaActiva) &&
          (estado === "todos" || estadoCard === estado) &&
          (!consulta || texto.indexOf(consulta) !== -1);

        card.style.display = coincide ? "" : "none";
        if (coincide) visibles += 1;
      });

      if (countEl) countEl.textContent = visibles;
      if (empty) empty.classList.toggle("is-visible", visibles === 0);
      ordenar();
    }

    chips.forEach(function (chip) {
      chip.addEventListener("click", function () {
        chips.forEach(function (otro) {
          otro.classList.remove("is-active");
          otro.setAttribute("aria-pressed", "false");
        });
        chip.classList.add("is-active");
        chip.setAttribute("aria-pressed", "true");
        categoriaActiva = chip.getAttribute("data-category");
        aplicarFiltros();
      });
    });

    if (search) search.addEventListener("input", aplicarFiltros);
    if (status) status.addEventListener("change", aplicarFiltros);
    if (sort) sort.addEventListener("change", aplicarFiltros);

    var limpiar = $("#clearFilters");
    if (limpiar) {
      limpiar.addEventListener("click", function () {
        if (search) search.value = "";
        if (status) status.value = "todos";
        if (sort) sort.value = "recientes";
        categoriaActiva = "todas";
        chips.forEach(function (chip, indice) {
          chip.classList.toggle("is-active", indice === 0);
          chip.setAttribute("aria-pressed", indice === 0 ? "true" : "false");
        });
        aplicarFiltros();
      });
    }

    var botonGrilla = $("#viewGrid");
    var botonLista = $("#viewList");

    if (botonGrilla && botonLista) {
      botonGrilla.addEventListener("click", function () {
        grid.classList.remove("is-list");
        botonGrilla.setAttribute("aria-pressed", "true");
        botonLista.setAttribute("aria-pressed", "false");
      });

      botonLista.addEventListener("click", function () {
        grid.classList.add("is-list");
        botonGrilla.setAttribute("aria-pressed", "false");
        botonLista.setAttribute("aria-pressed", "true");
      });
    }

    var cargarMas = $("#loadMore");
    if (cargarMas) {
      cargarMas.addEventListener("click", function () {
        toast("Estás al día", "Este prototipo muestra 8 de los 48 reclamos activos del barrio.", "info");
      });
    }

    aplicarFiltros();
  }

  /* ------------------------------------------------------------------------
     Tabs del feed de inicio
     ------------------------------------------------------------------------ */
  function initHomeFeed() {
    var grid = $("#feedGrid");
    if (!grid) return;

    var tabs = $$(".feed-tab");
    var cards = $$(".ticket-card", grid);

    tabs.forEach(function (tab) {
      tab.addEventListener("click", function () {
        tabs.forEach(function (otro) {
          otro.setAttribute("aria-selected", "false");
        });
        tab.setAttribute("aria-selected", "true");

        var modo = tab.getAttribute("data-sort");
        var copia = cards.slice();

        copia.sort(function (a, b) {
          if (modo === "apoyados") {
            return parseInt(b.getAttribute("data-votes"), 10) - parseInt(a.getAttribute("data-votes"), 10);
          }
          if (modo === "cerca") {
            var cercaA = a.getAttribute("data-near") === "true" ? 1 : 0;
            var cercaB = b.getAttribute("data-near") === "true" ? 1 : 0;
            if (cercaA !== cercaB) return cercaB - cercaA;
            return parseInt(a.getAttribute("data-recency"), 10) - parseInt(b.getAttribute("data-recency"), 10);
          }
          return parseInt(a.getAttribute("data-recency"), 10) - parseInt(b.getAttribute("data-recency"), 10);
        });

        copia.forEach(function (card) {
          grid.appendChild(card);
        });
      });
    });
  }

  /* ------------------------------------------------------------------------
     Formulario de nuevo reporte
     ------------------------------------------------------------------------ */
  function initFormulario() {
    var form = $("#reportForm");
    if (!form) return;

    var titulo = $("#titulo");
    var descripcion = $("#descripcion");

    function actualizarContador(input, selector) {
      if (!input) return;
      var contador = $(selector);
      if (!contador) return;
      contador.textContent = input.value.length + " / " + input.maxLength;
      contador.classList.toggle("is-over", input.value.length >= input.maxLength * 0.95);
    }

    if (titulo) {
      titulo.addEventListener("input", function () {
        actualizarContador(titulo, "#tituloCounter");
        titulo.classList.remove("is-invalid");
      });
      actualizarContador(titulo, "#tituloCounter");
    }

    if (descripcion) {
      descripcion.addEventListener("input", function () {
        actualizarContador(descripcion, "#descripcionCounter");
        descripcion.classList.remove("is-invalid");
      });
      actualizarContador(descripcion, "#descripcionCounter");
    }

    $$(".input", form).forEach(function (campo) {
      campo.addEventListener("input", function () {
        campo.classList.remove("is-invalid");
      });
      campo.addEventListener("change", function () {
        campo.classList.remove("is-invalid");
      });
    });

    var privacidad = $("#privacidad");
    if (privacidad) {
      privacidad.addEventListener("change", function () {
        var contenedor = privacidad.closest(".check-row");
        if (contenedor) contenedor.style.color = "";
      });
    }

    /* Carga de evidencia fotográfica */
    var dropzone = $("#dropzone");
    var fileInput = $("#fotoInput");
    var previews = $("#photoPreviews");
    var archivos = [];
    var MAX_FOTOS = 3;
    var urls = [];

    function liberarUrls() {
      urls.forEach(function (url) {
        URL.revokeObjectURL(url);
      });
      urls = [];
    }

    function renderizarPreviews() {
      if (!previews) return;
      liberarUrls();
      previews.innerHTML = "";

      archivos.forEach(function (archivo, indice) {
        var url = URL.createObjectURL(archivo);
        urls.push(url);

        var item = document.createElement("div");
        item.className = "preview-item";

        var img = document.createElement("img");
        img.src = url;
        img.alt = "Vista previa de " + archivo.name;

        var quitar = document.createElement("button");
        quitar.type = "button";
        quitar.className = "preview-remove";
        quitar.setAttribute("aria-label", "Quitar foto " + archivo.name);
        quitar.innerHTML = '<i class="fa-solid fa-xmark"></i>';
        quitar.addEventListener("click", function () {
          archivos.splice(indice, 1);
          renderizarPreviews();
        });

        item.appendChild(img);
        item.appendChild(quitar);
        previews.appendChild(item);
      });

      var texto = $("#dropzoneHint");
      if (texto) {
        texto.textContent = archivos.length
          ? archivos.length + " de " + MAX_FOTOS + " fotos adjuntas"
          : "Hasta 3 fotos · JPG, PNG o WEBP · Máx. 5 MB";
      }
    }

    function agregarArchivos(lista) {
      var nuevos = Array.prototype.slice.call(lista).filter(function (archivo) {
        return archivo.type.indexOf("image/") === 0;
      });

      if (!nuevos.length) {
        toast("Formato no válido", "Adjuntá imágenes JPG, PNG o WEBP.", "error");
        return;
      }

      if (archivos.length + nuevos.length > MAX_FOTOS) {
        nuevos = nuevos.slice(0, MAX_FOTOS - archivos.length);
        toast("Límite de fotos", "Puedes adjuntar hasta 3 imágenes por reporte.", "info");
      }

      archivos = archivos.concat(nuevos);
      renderizarPreviews();
      if (fileInput) fileInput.value = "";
    }

    if (fileInput) {
      fileInput.addEventListener("change", function () {
        agregarArchivos(fileInput.files);
      });
    }

    if (dropzone) {
      ["dragenter", "dragover"].forEach(function (evento) {
        dropzone.addEventListener(evento, function (event) {
          event.preventDefault();
          dropzone.classList.add("is-drag");
        });
      });

      ["dragleave", "drop"].forEach(function (evento) {
        dropzone.addEventListener(evento, function (event) {
          event.preventDefault();
          dropzone.classList.remove("is-drag");
        });
      });

      dropzone.addEventListener("drop", function (event) {
        if (event.dataTransfer && event.dataTransfer.files) {
          agregarArchivos(event.dataTransfer.files);
        }
      });
    }

    /* Acciones */
    var guardarBorrador = $("#saveDraft");
    if (guardarBorrador) {
      guardarBorrador.addEventListener("click", function () {
        var borrador = {
          titulo: titulo ? titulo.value : "",
          categoria: $("#categoria") ? $("#categoria").value : "",
          descripcion: descripcion ? descripcion.value : "",
          direccion: $("#direccion") ? $("#direccion").value : ""
        };
        try {
          window.localStorage.setItem("vozvecina_borrador_v1", JSON.stringify(borrador));
        } catch (error) {
          /* Sin persistencia, el prototipo sigue funcionando. */
        }
        toast("Borrador guardado", "Puedes retomarlo más tarde desde este navegador.", "success");
      });
    }

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      var errores = [];
      var primerInvalido = null;

      function validar(campo, condicion, mensaje) {
        if (!campo) return;
        campo.classList.toggle("is-invalid", !condicion);
        if (!condicion) {
          errores.push(mensaje);
          if (!primerInvalido) primerInvalido = campo;
        }
      }

      validar(titulo, titulo && titulo.value.trim().length >= 8, "El título debe tener al menos 8 caracteres.");
      validar($("#categoria"), $("#categoria") && $("#categoria").value !== "", "Elegí una categoría para el reclamo.");
      validar(descripcion, descripcion && descripcion.value.trim().length >= 20, "La descripción debe tener al menos 20 caracteres.");
      validar($("#direccion"), $("#direccion") && $("#direccion").value.trim().length >= 5, "Ingresá la dirección del problema.");
      validar($("#barrio"), $("#barrio") && $("#barrio").value !== "", "Seleccioná el barrio donde ocurre.");

      var acepta = $("#privacidad");
      if (acepta && !acepta.checked) {
        errores.push("Tenés que aceptar la publicación de datos para enviar el reporte.");
        var fila = acepta.closest(".check-row");
        if (fila) fila.style.color = "#b94216";
        if (!primerInvalido) primerInvalido = acepta;
      }

      if (errores.length) {
        var lista = $("#formErrorList");
        if (lista) {
          lista.innerHTML = "";
          errores.forEach(function (error) {
            var item = document.createElement("li");
            item.textContent = error;
            lista.appendChild(item);
          });
        }

        if (primerInvalido) {
          primerInvalido.focus();
        }

        abrirModal("formErrorModal");
        return;
      }

      var numero = "VV-" + Math.floor(2050 + Math.random() * 90);
      var categoria = $("#categoria");
      var urgencia = form.querySelector('input[name="urgencia"]:checked');
      var sla = urgencia && urgencia.value === "alta" ? "24 h" : (urgencia && urgencia.value === "media" ? "48 h" : "96 h");

      var exitoId = $("#successTicketId");
      if (exitoId) exitoId.textContent = numero;

      var exitoCategoria = $("#successCategory");
      if (exitoCategoria && categoria) {
        exitoCategoria.textContent = categoria.options[categoria.selectedIndex].text;
      }

      var exitoSla = $("#successSla");
      if (exitoSla) exitoSla.textContent = "SLA estimado " + sla;

      abrirModal("formSuccessModal");
      toast("Reporte enviado", "El ticket " + numero + " ya está visible para el barrio.", "success");
    });
  }

  /* ------------------------------------------------------------------------
     Mapa simulado
     ------------------------------------------------------------------------ */
  function initMapa() {
    var mapa = $("#mapBox");
    var pin = $("#mapPin");
    var coords = $("#mapCoords");
    if (!mapa || !pin) return;

    function moverPin(x, y) {
      var xFinal = Math.min(94, Math.max(6, x));
      var yFinal = Math.min(92, Math.max(8, y));
      pin.style.left = xFinal + "%";
      pin.style.top = yFinal + "%";

      var lat = (-34.615 - (yFinal - 50) * 0.0004).toFixed(5);
      var lng = (-58.385 + (xFinal - 50) * 0.0005).toFixed(5);
      if (coords) {
        coords.innerHTML = '<i class="fa-solid fa-location-crosshairs"></i> Lat <strong>' +
          lat + '</strong> · Lng <strong>' + lng + '</strong> · Zona Centro';
      }
    }

    mapa.addEventListener("click", function (event) {
      if (event.target.closest("button")) return;
      var rect = mapa.getBoundingClientRect();
      var x = ((event.clientX - rect.left) / rect.width) * 100;
      var y = ((event.clientY - rect.top) / rect.height) * 100;
      moverPin(x, y);
    });

    var detectar = $("#mapLocate");
    if (detectar) {
      detectar.addEventListener("click", function (event) {
        event.stopPropagation();
        moverPin(62, 37);
        var direccion = $("#direccion");
        if (direccion && !direccion.value.trim()) {
          direccion.value = "Av. San Martín 1450";
        }
        toast("Ubicación aproximada detectada", "Verificá que el pin coincida con el lugar del problema.", "success");
      });
    }
  }

  /* ------------------------------------------------------------------------
     Alertas y toasts de demostración
     ------------------------------------------------------------------------ */
  function initAlertasDemo() {
    $$("[data-demo-toast]").forEach(function (boton) {
      boton.addEventListener("click", function () {
        toast(
          boton.getAttribute("data-title") || "Notificación de prueba",
          boton.getAttribute("data-message") || "",
          boton.getAttribute("data-type") || "success"
        );
      });
    });
  }

  /* ------------------------------------------------------------------------
     Año actual y animaciones de entrada
     ------------------------------------------------------------------------ */
  function initAnio() {
    var anios = $$("[data-year]");
    anios.forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });
  }

  function initReveal() {
    var elementos = $$(".reveal");
    if (!elementos.length) return;

    if (!("IntersectionObserver" in window)) {
      elementos.forEach(function (el) {
        el.classList.add("is-visible");
      });
      return;
    }

    var observer = new IntersectionObserver(function (entries, obs) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    elementos.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* ------------------------------------------------------------------------
     Panel de métricas y SLA
     ------------------------------------------------------------------------ */
  var PERIODOS = {
    "30": {
      etiqueta: "Últimos 30 días",
      sla: 72,
      respuesta: 3.4,
      resueltos: 412,
      curso: 96,
      pendientes: 211,
      categorias: [78, 64, 86, 55, 69],
      prioridades: {
        alta: { valor: 2.1, ancho: 78 },
        media: { valor: 4.8, ancho: 58 },
        baja: { valor: 9.2, ancho: 34 }
      }
    },
    "90": {
      etiqueta: "Últimos 90 días",
      sla: 76,
      respuesta: 2.9,
      resueltos: 1180,
      curso: 210,
      pendientes: 382,
      categorias: [81, 72, 89, 63, 75],
      prioridades: {
        alta: { valor: 1.9, ancho: 82 },
        media: { valor: 4.2, ancho: 64 },
        baja: { valor: 8.1, ancho: 41 }
      }
    },
    "365": {
      etiqueta: "Últimos 12 meses",
      sla: 68,
      respuesta: 4.1,
      resueltos: 4310,
      curso: 480,
      pendientes: 1280,
      categorias: [73, 60, 82, 49, 66],
      prioridades: {
        alta: { valor: 2.6, ancho: 71 },
        media: { valor: 5.6, ancho: 50 },
        baja: { valor: 11.4, ancho: 28 }
      }
    }
  };

  function animarValor(el, destino, decimales) {
    if (!el) return;

    var reducido = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    var desde = parseFloat((el.textContent || "0").replace(",", ".")) || 0;

    if (reducido) {
      el.textContent = formatoNumero(destino, decimales);
      return;
    }

    var inicio = null;
    var duracion = 650;

    function paso(tiempo) {
      if (!inicio) inicio = tiempo;
      var avance = Math.min((tiempo - inicio) / duracion, 1);
      var suavizado = 1 - Math.pow(1 - avance, 3);
      var actual = desde + (destino - desde) * suavizado;
      el.textContent = formatoNumero(actual, decimales);

      if (avance < 1) {
        window.requestAnimationFrame(paso);
      } else {
        el.textContent = formatoNumero(destino, decimales);
      }
    }

    window.requestAnimationFrame(paso);
  }

  function initMetricas() {
    var dona = $("#donut");
    if (!dona) return;

    var botones = $$(".period-btn");
    var aplicado = false;

    function aplicarPeriodo(clave, avisar) {
      var datos = PERIODOS[clave];
      if (!datos) return;

      var total = datos.resueltos + datos.curso + datos.pendientes;
      var pctResueltos = (datos.resueltos / total) * 100;
      var pctCurso = (datos.curso / total) * 100;
      var pctPendientes = 100 - pctResueltos - pctCurso;

      animarValor($('[data-kpi="sla"]'), datos.sla, 0);
      animarValor($('[data-kpi="respuesta"]'), datos.respuesta, 1);
      animarValor($('[data-kpi="resueltos"]'), datos.resueltos, 0);
      animarValor($('[data-kpi="pendientes"]'), datos.pendientes, 0);

      dona.style.background = "conic-gradient(var(--verde) 0% " + pctResueltos.toFixed(1) +
        "%, #d9cdb8 " + pctResueltos.toFixed(1) + "% " + (pctResueltos + pctCurso).toFixed(1) +
        "%, var(--naranja) " + (pctResueltos + pctCurso).toFixed(1) + "% 100%)";

      var donaTotal = $("#donutTotal");
      if (donaTotal) donaTotal.textContent = total.toLocaleString("es-AR");

      var leyendaResueltos = $("#legendResueltos");
      if (leyendaResueltos) leyendaResueltos.textContent = datos.resueltos.toLocaleString("es-AR");

      var leyendaCurso = $("#legendCurso");
      if (leyendaCurso) leyendaCurso.textContent = datos.curso.toLocaleString("es-AR");

      var leyendaPendientes = $("#legendPendientes");
      if (leyendaPendientes) leyendaPendientes.textContent = datos.pendientes.toLocaleString("es-AR");

      var porcentajes = $("#donutPercentages");
      if (porcentajes) {
        porcentajes.textContent = "Resueltos " + Math.round(pctResueltos) + "% · Pendientes " + Math.round(pctPendientes) + "%";
      }

      var barras = $$("[data-sla-cat]");
      var etiquetas = $$("[data-sla-pct]");
      barras.forEach(function (barra, indice) {
        var valor = datos.categorias[indice];
        if (typeof valor === "undefined") return;
        barra.setAttribute("data-width", valor);
        barra.style.width = valor + "%";

        if (etiquetas[indice]) {
          etiquetas[indice].textContent = valor + "%";
          var contenedor = etiquetas[indice].closest("strong");
          if (contenedor) contenedor.classList.toggle("is-warn", valor < 70);
        }
      });

      Object.keys(datos.prioridades).forEach(function (prioridad) {
        var info = datos.prioridades[prioridad];
        var barraPrioridad = $('[data-prio-bar="' + prioridad + '"]');
        if (barraPrioridad) barraPrioridad.style.width = info.ancho + "%";

        var valorPrioridad = $('[data-prio-value="' + prioridad + '"]');
        if (valorPrioridad) valorPrioridad.textContent = formatoNumero(info.valor, 1);
      });

      $$("[data-period-label]").forEach(function (el) {
        el.textContent = datos.etiqueta;
      });

      botones.forEach(function (boton) {
        boton.setAttribute("aria-pressed", boton.getAttribute("data-period") === clave ? "true" : "false");
      });

      if (avisar) {
        toast("Período actualizado", "Mostrando métricas de " + datos.etiqueta.toLowerCase() + ".", "info");
      }

      aplicado = true;
    }

    botones.forEach(function (boton) {
      boton.addEventListener("click", function () {
        aplicarPeriodo(boton.getAttribute("data-period"), true);
      });
    });

    window.setTimeout(function () {
      aplicarPeriodo("30", false);
    }, 180);

    /* Observador de respaldo para navegadores sin transiciones inmediatas */
    if ("IntersectionObserver" in window && !aplicado) {
      var observer = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            aplicarPeriodo("30", false);
            observer.disconnect();
          }
        });
      }, { threshold: 0.1 });
      observer.observe(dona);
    }
  }

  function init() {
    initNav();
    initModales();
    initVotos();
    initDetalle();
    initFiltros();
    initHomeFeed();
    initFormulario();
    initMapa();
    initAlertasDemo();
    initAnio();
    initReveal();
    initMetricas();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
