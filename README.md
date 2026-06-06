# 🖥️ LabStudio Media — Website

> Corporate website for **LabStudio Media**, a digital solutions agency based in Los Mochis, Sinaloa. Built with Astro v6 as a fully static site, content in Spanish.

![Astro](https://img.shields.io/badge/Astro-6.4.4-BC52EE?logo=astro&logoColor=white)
![Node](https://img.shields.io/badge/Node-22.x-339933?logo=node.js&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-5.2.3-7952B3?logo=bootstrap&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)

---

## Table of Contents

- [Description](#description)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Available Scripts](#available-scripts)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Contact](#contact)

---

## Description

LabStudio Media's website serves as the main digital presence for the agency, showcasing services such as web development, NFC business cards, branding, online stores, Google My Business, and WhatsApp Business setup. The site is generated as a fully static build (SSG) for optimal performance and SEO.

---

## Tech Stack

- **[Astro v6](https://astro.build)** — Static site framework (SSG)
- **Bootstrap 5.2.3** — Layout and utility classes (extended spacing scale)
- **TypeScript** — Type-safe components and interfaces
- **[AOS](https://michalsnik.github.io/aos/)** — Scroll-triggered animations
- **Sharp** — Image optimization at build time via `astro:assets`
- **Partytown** — Offloads Google Tag Manager to a web worker
- **`@astrojs/sitemap`** — Auto-generates `/sitemap-index.xml` on every build

---

## Prerequisites

| Tool | Version |
|------|---------|
| Node.js | `22.x` |
| pnpm | `>= 9` |

> [!NOTE]
> The project uses **pnpm** as the package manager. Install it with `npm install -g pnpm` if you don't have it.

---

## Installation

```bash
# 1. Clone the repository
git clone https://github.com/ManuelsSaNt/labStudio
cd labStudio

# 2. Install dependencies
pnpm install

# 3. Start the dev server
pnpm dev
```

Open `http://localhost:4321` in your browser.

---

## Available Scripts

| Command | Description |
|---------|-------------|
| `pnpm dev` | Start the development server at `http://localhost:4321` |
| `pnpm build` | Build the production site to `dist/` |
| `pnpm preview` | Preview the production build locally |
| `pnpm astro` | Run Astro CLI commands directly |

---

## Project Structure

```
src/
├── pages/            # File-based routes (.astro)
│   ├── index.astro
│   ├── desarrollo-web.astro
│   ├── tarjetas-nfc.astro
│   ├── blog/         # Individual blog posts
│   └── 404.astro
├── layouts/
│   ├── IndexLayout.astro     # Homepage (SEO + GTM)
│   └── SubPageLayout.astro   # Secondary pages
├── components/
│   ├── shared/       # Nav, Footer, WhatsApp button, Maps…
│   ├── index/        # Homepage sections
│   └── blog/         # BlogEntry, BlogEntryCard
├── interfaces/       # TypeScript interfaces
├── enums/            # Enums (e.g. JobSkills)
└── img/              # Source images (optimized at build time)

public/
├── styles/
│   ├── theme.bundle.css   # Bootstrap + overrides
│   ├── libs.bundle.css    # AOS and other libs
│   └── shared.css         # Brand colors and utilities
└── js/
    ├── theme.bundle.js    # Bootstrap wrappers + AOS init
    └── vendor.bundle.js   # Third-party libs
```

---

## Contributing

1. Branch from `main` using the convention `feat/<slug>`, `fix/<slug>`, or `docs/<slug>`.
2. Commit messages follow **Conventional Commits**: `feat:`, `fix:`, `docs:`, `update:`, `chore:`.
3. All user-facing copy must be in **Spanish**.
4. Do not use `<img>` tags — always use `<Image>` from `astro:assets`.
5. Do not introduce new npm/pnpm dependencies without first checking if Bootstrap or Astro already provides the feature.
6. The sitemap is auto-generated — never edit `public/sitemap.xml` manually.

---

## Contact

- **Email**: [contacto@labstudiomedia.com](mailto:contacto@labstudiomedia.com)
- **Website**: [labstudiomedia.com](https://labstudiomedia.com)
