# VozVecina

Prototipo web de una red ciudadana de reclamos vecinales. Cinco pantallas interactivas construidas con HTML5 semántico, CSS nativo y W3.CSS, con una identidad visual basada en verde oscuro (`#254c3e`) y naranja (`#f17832`).

## Cómo abrirlo

No requiere instalación ni servidor. Abrí `index.html` en un navegador moderno (Chrome, Edge, Firefox o Safari).

```
voz-vecina/
├── index.html          Home: hero, feed de reclamos y accesos rápidos
├── tickets.html        Tablero: filtros, búsqueda, vista grilla/lista
├── reportar.html       Formulario de reporte con mapa y fotos
├── metricas.html       KPIs, SLA, dona, tendencia y ranking
├── alertas.html        Centro de alertas, toasts y modales de estado
├── css/
│   ├── w3.css          Framework W3.CSS local
│   ├── fontawesome.min.css
│   └── style.css       Sistema de diseño y responsive
├── js/
│   └── app.js          Datos simulados e interacciones
├── assets/             Logo e ilustraciones SVG
└── webfonts/           Tipografías de Font Awesome
```

## Interacciones principales

- **Apoyos vecinales:** suman votos, elevan la prioridad y recalculan el SLA. Se guardan en `localStorage` (`vozvecina_apoyos_v1`).
- **Detalle de ticket:** modal con galería de evidencias, estado, SLA e hilo de comentarios.
- **Tablero:** búsqueda, filtros por categoría/estado/prioridad, orden y cambio de vista.
- **Reporte:** validación de campos, selección de ubicación en mapa simulado, carga de fotos con vista previa y confirmación con número de ticket.
- **Métricas:** selector de período (30/90/180 días) que actualiza KPIs, barras de SLA y tendencia.
- **Alertas:** estados success/error/warning/info, toasts flotantes y modales accesibles (Escape, foco y `aria-hidden`).

## Alcance

- Los datos son simulados y están centralizados en `js/app.js` (`TICKETS`, `COMMON_COMMENTS`, `PERIODOS`).
- El mapa y la geolocalización son una demostración visual; no se consultan servicios externos.
- Las fotos de evidencia son ilustraciones SVG locales que representan imágenes de referencia.
- El formulario no envía datos a un servidor: la confirmación y el borrador se resuelven en el navegador.
- El prototipo incluye navegación por teclado, textos alternativos, `aria-current`, enlace para saltar al contenido y diseño responsive desde 360 px.
