# AGENTS.md — LabStudio Media

Static marketing site for LabStudio Media, a digital solutions agency (Los Mochis, Sinaloa). Astro + Bootstrap, all user-facing copy in **Spanish**.

## Commands

- Package manager is **pnpm 12** (`pnpm-lock.yaml`); Node **24.x** (pinned in `package.json` `engines`).
- `pnpm dev` → http://localhost:4321 · `pnpm build` → `dist/` · `pnpm preview`
- There are **no test, lint, typecheck, or format scripts**, and `@astrojs/check` is not installed. Do not invent them — `pnpm build` is the only verification step.

## Stack facts

- **Astro 7.3.3**. Static output, no adapter, `site: https://labstudiomedia.com`.
- Bootstrap 5.2.3, AOS, Sharp (`astro:assets`), Partytown (forwards `dataLayer.push`), `@astrojs/sitemap`.
- `public/js/*.bundle.js` and `public/styles/{theme,libs}.bundle.css` are **precompiled — do not edit**. Only `public/styles/shared.css` is hand-editable.

## Layouts & routing

- `IndexLayout.astro` = homepage only; embeds static `Organization` + `WebSite` JSON-LD.
- `SubPageLayout.astro` = every other page; exposes `<slot name="head" />` for per-page JSON-LD.
- Both require `title`, `ogTitle`, `description`, `ogDescription`, `keywords` (TS-enforced); canonical URL is dynamic.
- Blog posts use `BlogEntry.astro`, which auto-generates `BlogPosting` JSON-LD and converts Spanish dates ("Mayo 29, 2024") to ISO.

## Conventions

- New images use `<Image>` from `astro:assets` — never a new raw `<img>`. (Legacy raw `<img>` remains in `404.astro`, `index.astro`, `PricingCard`, `ClientCard`, `PhotographyCard`.)
- Conditional rendering via `<Show show={bool}>`; CTAs via `<CustomBtn isPrimary href blank extraClasses aos>`.
- Bootstrap utilities; theme extends spacing to scale 12 (`.pt-10`, `.pt-12`, `.mb-8` are valid). Custom classes prefixed `.lab-*` / `.labs-*`.
- Brand colors in `public/styles/shared.css`: purple `#633fb9`, accent `#9554fd`; use `text-labs-gradient` / `labs-btn-gradient`.
- Commits follow Conventional Commits (`feat:`, `fix:`, `docs:`, `update:`, `chore:`); branch from `main` as `feat/<slug>`.

## Content constraints (easy to get wrong)

- Positioning is **"Soluciones Digitales"**, not "marketing digital".
- The agency does **not** offer photography or video. Old blog posts about photo/video/drones stay published as historical content, but never present them as current services on `index`, layouts, `desarrollo-web`, or `tarjetas-nfc`.
- NFC copy: **LabStudio** configures cards, never the client. Write "Nosotros configuramos tu tarjeta…", not imperative "Configura tu tarjeta".

## Nav, Footer, integrations

- Nav order: Inicio · Desarrollo Web · Tarjetas NFC · Blog. Links use `data-astro-reload` + staggered `data-aos-delay` (50ms steps); active link gets `text-labs-gradient` via inline script. Footer "Enlaces" mirrors Nav.
- `Footer.astro` requires `useMap: boolean` — pass `false` on map-less pages.
- Sitemap is auto-generated at build, `/links` excluded via `astro.config.mjs`. Never edit `public/sitemap.xml` manually.
- GTM is injected by `Gtm.astro` / `GtmBody.astro`; do not add GTM snippets by hand.
- WhatsApp CTA `https://wa.me/526681057964`; Maps pin lat `25.8055853`, lng `-108.9964254`, mapId `ebec91dda5c2b1c2`.
- No physical location → use `Organization` schema, not `LocalBusiness`. `auditoria-seo.md` is the living SEO audit checklist.

## Pendientes conocidos (retomar próxima sesión)

Errores de tipos preexistentes reportados por el LSP. No bloquean `pnpm build`, pero deben corregirse puntualmente:

- [ ] `src/pages/desarrollo-web.astro:361,380,401,435` — se pasa `price={null}` a `PricingCard`, cuyo prop `image` espera `ImageMetadata`. Ajustar el tipo del prop a `ImageMetadata | null` (y el render interno ya contempla `null`).
- [ ] `src/components/shared/Footer.astro:29` — `<Image height="auto">` no es asignable a `number | \`${number}\``. Usar una altura numérica o quitar el atributo.
- [ ] `src/components/blog/BlogEntryCard.astro:44` — `image` es opcional (`ImageMetadata | undefined`) pero `<Image>` exige valor definido. Renderizar condicionalmente (`<Show show={!!image}>`) o tipar el prop como requerido.
