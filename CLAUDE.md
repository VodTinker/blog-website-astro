# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Comandos principales

```bash
pnpm dev          # Servidor de desarrollo en localhost:4321
pnpm build        # Build completo: bangumi + astro build + pagefind + compress-fonts
pnpm preview      # Previsualizar el build
pnpm format       # Formatear con Prettier (solo src/)
pnpm lint         # ESLint con autofix en src/
pnpm check        # Astro type check
pnpm type-check   # TypeScript sin emitir archivos
pnpm new-post     # Crear nuevo post (script interactivo)
```

**Importante:** Solo se permite `pnpm` (enforced via `preinstall`). No usar `npm` ni `bun`.

El build completo incluye pasos secuenciales: `update-bangumi.mjs` → `astro build` → `pagefind --site dist` → `compress-fonts.js`. En desarrollo (`pnpm dev`), hay un `predev` que ejecuta `sync-content.js`.

## Arquitectura del proyecto

Basado en el template [Mizuki](https://github.com/matsuzaka-yuki/mizuki) (fork de Fuwari). Stack: **Astro 5 + Svelte 5 + TailwindCSS 3 + TypeScript**.

### Configuración central

Todo el comportamiento del sitio se controla desde **`src/config.ts`**:
- `siteConfig` — URL, idioma (es), timezone, feature pages, banner, TOC, fonts
- `navBarConfig` / `profileConfig` — navegación y perfil
- `sidebarLayoutConfig` — componentes de sidebar (posición, orden, animaciones)
- `featurePages` — toggles para activar/desactivar páginas (anime, diary, friends desactivadas; projects y skills activas)

### Contenido

- `src/content/posts/` — Posts en Markdown/MDX. Cada post en su propia carpeta `nombre/index.md` con imágenes co-ubicadas.
- `src/content/spec/` — Páginas especiales (about.md, etc.)
- `src/content.config.ts` — Schema Zod de los posts

**Frontmatter de posts:**
```yaml
title: "Título"
published: 2026-01-13   # fecha requerida
description: "..."
tags: ["Tag1"]
category: Tecnología
draft: false
pinned: false
```

### Plugins personalizados

En `src/plugins/`:
- `remark-reading-time.mjs`, `remark-excerpt.js`, `remark-mermaid.js` — procesado de markdown
- `rehype-component-admonition.mjs`, `rehype-component-github-card.mjs` — componentes en markdown
- `rehype-image-width.mjs`, `rehype-wrap-table.mjs`, `rehype-mermaid.mjs` — transformaciones HTML
- `expressive-code/` — plugins custom para bloques de código (language badge, copy button)

### Pages desactivadas

Las páginas `anime.astro`, `diary.astro`, `friends.astro`, `timeline.astro`, `albums.astro`, `devices.astro` existen en el código pero están desactivadas via `featurePages` en `config.ts`. No eliminarlas.

### Despliegue

Configurado para **Cloudflare Pages** con el adapter `@astrojs/cloudflare` en modo `directory`. El `wrangler.jsonc` apunta a `dist/_worker.js/index.js`. El output es `static`.

La búsqueda usa **Pagefind** — requiere build previo para funcionar (no disponible en `pnpm dev`).

### Fuentes personalizadas

La compresión de fuentes (`scripts/compress-fonts.js`) solo funciona en producción. En dev se muestra la fuente del navegador. Fuentes en `src/assets/` o `public/`. La fuente ASCII (`ZenMaruGothic-Medium`) tiene `enableCompress: false` para preservar caracteres acentuados del español.

### Banners e imágenes

- Desktop banners: `public/assets/desktop-banner/` (WebP)
- Mobile banners: `public/assets/mobile-banner/` (WebP)
- Avatar: `src/assets/images/avatar.webp`

### Variables de entorno

Ver `.env.example`. Las principales:
- `ENABLE_CONTENT_SYNC` — separación de repositorio de contenido (false por defecto)
- `UMAMI_API_KEY` — analytics
- `INDEXNOW_KEY` / `INDEXNOW_HOST` — SEO submission
