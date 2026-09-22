# Auditoría SEO — LabStudio Media

Auditoría generada el **2026-09-21**. Reemplaza al antiguo `seo_todo.md`.
Score estimado actual: **~72 / 100** (línea base histórica: 42 / 100).

Alcance: repositorio, build (`dist/`) y sitio en vivo (`https://labstudiomedia.com`).
El JSON-LD de este sitio es estático (Astro SSG), por lo que fue verificado de forma confiable en el HTML servido.

> Todos los pendientes de abajo están sin resolver, listos para atacar en la próxima sesión.
> Marcar con `[x]` al completar.

---

## Resumen ejecutivo

Sprints 1 y 2 ya entregados: canonicals dinámicos, `robots.txt` saneado, JSON-LD `Organization` + `WebSite` + `BlogPosting` + `FAQPage`, página `/aviso-de-privacidad`, integración de sitemap y `defer` en JS.

Pendientes clave:
1. **Regresión crítica:** `robots.txt` apunta a un sitemap que devuelve **404**.
2. `og:url`, `og:type` y `og:image` están fijos al homepage en **todas** las subpáginas; no hay Twitter Cards.
3. Blog con contenido delgado (~520 palabras) y **cero enlaces internos**; el index del blog vende fotografía/video/drones como servicios actuales.
4. Performance: 709 KB de JS + 346 KB de CSS render-blocking, `font-display` ausente, 18 pesos de fuente sin usar desplegados, logo servido a 3229px.
5. Falta `/sobre-nosotros` y señales de autor/breadcrumbs → E-E-A-T débil.

---

## Prioridad 1 — Crítico

### 1. Corregir URL del sitemap en `robots.txt` (REGRESIÓN)
- [ ] `public/robots.txt:4` — cambiar `https://labstudiomedia.com/sitemap.xml` por `https://labstudiomedia.com/sitemap-index.xml`
- [ ] (Alternativa) agregar un 301/rewrite de `/sitemap.xml` → `/sitemap-index.xml`
- Evidencia: `curl` → `/sitemap.xml` = **404**, `/sitemap-index.xml` = 200
- Impacto: **Alto** — Google no puede autodescubrir ninguna URL

### 2. Arreglar Open Graph / Twitter en subpáginas
- [ ] `src/layouts/SubPageLayout.astro` — `og:url` dinámico: `https://labstudiomedia.com${Astro.url.pathname}` (hoy está fijo al homepage)
- [ ] Agregar prop `ogType` (default `website`); pasar `article` desde `BlogEntry.astro` (hoy los posts emiten `og:type=website`)
- [ ] `og:image` por página: usar la imagen real del post (hoy todas usan `pageView.webp`, e incluso difiere del `BlogPosting` schema)
- [ ] Agregar `og:image:width` / `og:image:height` absolutos
- [ ] Agregar Twitter Cards: `twitter:card`, `twitter:title`, `twitter:description`, `twitter:image` (hoy **no existe ninguno**)
- Evidencia: live `desarrollo-web/` y post del blog emiten `og:url content="https://labstudiomedia.com/"`
- Impacto: **Alto** — toda página compartida previsualiza el homepage

### 3. Corregir HTML inválido en el homepage
- [ ] `src/pages/index.astro:99` — `<di class="service-card">` → `<div class="service-card">`
- [ ] `src/pages/index.astro:107` — `</di>` → `</div>`
- Impacto: Medio — rompe el nesting de la tarjeta "Branding" (render, accesibilidad, parseo del crawler)

### 4. Corregir enlace de WhatsApp roto en el Footer
- [x] `src/components/shared/Footer.astro:168` — `https://wa.me/6681057964` → `https://wa.me/526681057964` (falta código de país 52)
- Impacto: Medio — CTA roto en todas las páginas + NAP inconsistente

---

## Prioridad 2 — Alto impacto

### 5. Expandir contenido del blog y crear enlaces internos
- [ ] Expandir los 10 posts a **1,200–1,500 palabras** (hoy ~520) con ejemplos originales
- [ ] Agregar 2–3 enlaces internos contextuales por post hacia `/desarrollo-web` y `/tarjetas-nfc`
- [ ] Agregar bloque CTA de servicios al final de cada post
- [ ] Agregar módulo de "posts relacionados"
- Evidencia: los 10 archivos en `src/pages/blog/*.astro` tienen `href=` count = **0**
- Impacto: **Alto** — sin clustering ni flujo de autoridad hacia páginas de servicio

### 6. Crear página `/sobre-nosotros`
- [x] Nueva ruta `src/pages/sobre-nosotros.astro`
- [x] Contenido: historia de la agencia, equipo y roles, años en operación, "Los Mochis, Sinaloa" en cuerpo visible
- [x] Agregar al Nav y al Footer
- [x] JSON-LD `Organization` (con `PostalAddress` + `founder`) + `AboutPage` + `BreadcrumbList`
- Impacto: Medio — brecha de E-E-A-T para negocio local

### 7. Performance de fuentes
- [ ] Agregar `font-display: swap` en las declaraciones `@font-face` **en el origen** (no editar `theme.bundle.css` a mano)
- [ ] Reducir a 2–3 pesos (Regular, Bold, opcional Medium)
- [ ] Eliminar archivos `.otf` y `.woff` de `public/fonts/HK Grotesk Pro/` — servir solo `.woff2`
- Evidencia: 54 archivos de fuente (18 pesos) desplegados; solo se referencian 3 pesos (400/600/700)
- Impacto: **Alto** — riesgo de FOIT en el LCP

### 8. Reducir payload render-blocking
- [ ] `theme.bundle.css` (346 KB) + `libs.bundle.css` (31 KB) + `shared.css` en `<head>` de todas las páginas (incluido `/links`)
- [ ] Auditar `public/js/vendor.bundle.js` (709 KB)
- [ ] Considerar critical-CSS y cargar el resto de forma diferida
- [ ] Servir solo los libs necesarios por página
- Impacto: **Alto**

### 9. Arreglar alt text de imágenes en blog
- [ ] `src/components/blog/BlogEntry.astro:81` — reemplazar `alt="linea"` por patrón dinámico (`'Imagen sobre: ' + title`)

### 10. Resolver canibalización de keywords
- [ ] Homepage title compite con `/desarrollo-web` por "desarrollo web"
- [ ] Acotar el title del homepage a marca + término local primario
- [ ] Dejar los términos específicos de servicio solo en las páginas de servicio

---

## Prioridad 3 — Medio

### 11. Fechas de blog con `<time datetime>`
- [ ] `src/components/blog/BlogEntry.astro:78` — envolver la fecha en `<time datetime={isoDate}>{date}</time>` (la función `toISODate` ya existe, solo se usa en el schema)

### 12. Corregir posicionamiento del index del blog
- [ ] `src/pages/blog.astro:23-25` — reescribir title/description/keywords alrededor de **"Soluciones Digitales"** (hoy vende fotografía, video y drones como foco actual)
- Nota: los posts antiguos de foto/video/dron se conservan como contenido histórico, pero el index no debe presentarlos como servicios actuales

### 13. Schema faltante
- [ ] Agregar `BreadcrumbList` en subpáginas
- [ ] Agregar schema `Service` en `/desarrollo-web` y `/tarjetas-nfc`
- [ ] Agregar `ItemList` en `/blog`
- [ ] Agregar `PostalAddress` (localidad/región/país) al `Organization` (sin calle, no hay ubicación física)

### 14. Señales locales en páginas de servicio
- [ ] `/tarjetas-nfc` — agregar "Los Mochis, Sinaloa" en texto visible (hoy solo en meta)
- [ ] `/desarrollo-web` — reforzar mención local (hoy aparece una vez, dentro de un FAQ)

### 15. Autores / E-E-A-T
- [ ] Agregar bloque de bio de autor en los posts (`BlogPosting.author` = "Manuel Samaniego" sin página de autor)

---

## Prioridad 4 — Quick wins / Bajo

### 16. Correcciones puntuales
- [ ] `src/pages/index.astro:59` — typo "por que" → "porque"
- [ ] Cambiar `name="og:author"` y `name="og:site_name"` por `property=`
- [ ] Reducir meta keywords de 25+ términos a 8–10 enfocados (homepage y `desarrollo-web`)
- [ ] Acortar meta description del homepage (~178 caracteres hoy)
- [ ] Agregar `hreflang="es-mx"` autorreferencial (y opcional `x-default`)

### 17. Logo sobredimensionado
- [ ] Navbar sirve logo con `width="3229" height="865"` y CSS `width:200px`
- [ ] Servir variante ~300px con `<Image width={300}>`

### 18. Headers de seguridad y caché
- [ ] Agregar `Strict-Transport-Security`
- [ ] Cache-Control inmutable de larga duración para `/_astro/*`
- [ ] `X-Frame-Options`, `Content-Security-Policy`, `Referrer-Policy` en el hosting

### 19. 404
- [ ] `SubPageLayout` fija `robots=index`; la página 404 devuelve status 404 (correcto), considerar `noindex` explícito para esa ruta

---

## Backlog / Continuo

- [ ] Publicar mínimo 2 posts por mes
- [ ] Priorizar queries con intención local:
  - "agencia de desarrollo web Los Mochis"
  - "desarrollo web para negocios en Sinaloa"
  - "tarjetas NFC para negocios México"
- [ ] Agregar `<lastmod>` al sitemap (opcional, Google lo usa poco pero ayuda)
- [ ] Corregir orden de columnas hero en mobile (H1 antes que la imagen)
- [ ] Convertir logos de clientes en testimonios con nombre, industria y resultado
- [ ] Evaluar página `/casos-de-exito` con 2–3 casos estructurados
- [ ] `/sobre-nosotros`: agregar fotos reales del equipo (hoy usa monogramas de iniciales; los perfiles de LinkedIn ya están enlazados)

---

## Estado de verificación (PASS)

- Canonical dinámico y autorreferencial con trailing slash consistente
- `www` → no-www 301 confirmado; HTTPS forzado
- JSON-LD: 2 bloques en homepage (`Organization` + `WebSite`), `BlogPosting` en posts, `FAQPage` en páginas de servicio
- Hero del homepage con `width/height` explícitos + `loading="eager"` + `fetchpriority="high"` (CLS bajo en el LCP)
- `@astrojs/sitemap` genera `/sitemap-index.xml` + `/sitemap-0.xml` y excluye `/links`

---

## Score objetivo

| Hito | Score estimado |
|------|---------------|
| Actual | ~72 / 100 |
| Prioridad 1 completa | ~80 / 100 |
| Prioridad 1 + 2 completa | ~88 / 100 |
| Todo el documento | ~93 / 100 |
