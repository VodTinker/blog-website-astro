# 🌟 Blog de VodTinker

![Node.js >= 20](https://img.shields.io/badge/node.js-%3E%3D20-brightgreen) 
![pnpm >= 9](https://img.shields.io/badge/pnpm-%3E%3D9-blue) 
![Astro](https://img.shields.io/badge/Astro-5.15.3-orange)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9.2-blue)

Blog personal de **Daniel Fonov** - Administrador de Sistemas Informáticos y Desarrollador Web.

**🔗 Sitio en vivo:** [blog.vodtinker.com](https://blog.vodtinker.com)  
**💼 Portfolio:** [vodtinker.dev](https://vodtinker.dev)

---

## 📝 Sobre este Blog

Blog técnico enfocado en:
- **Infraestructura y Sistemas**: Servidores, DNS, correo electrónico, automatización
- **Desarrollo Web**: Astro, TypeScript, TailwindCSS
- **Inteligencia Artificial**: Análisis técnico y crítica educativa
- **Proyectos personales**: Documentación y tutoriales

---

## ✨ Características

Este blog está construido con el template [Mizuki](https://github.com/matsuzaka-yuki/mizuki) para Astro, personalizado con:

### 🎨 Personalizaciones
- ✅ Traducción completa al español
- ✅ Información personal actualizada
- ✅ Proyectos reales destacados
- ✅ Artículos técnicos sobre IA, infraestructura y desarrollo
- ✅ Imágenes optimizadas en WebP
- ✅ Desactivadas páginas no utilizadas (Anime, Diary, Friends, etc.)

### 🛠 Tecnologías
- [Astro](https://astro.build) - Framework web
- [Tailwind CSS](https://tailwindcss.com) - Estilos
- [TypeScript](https://www.typescriptlang.org/) - Lenguaje
- [Pagefind](https://pagefind.app/) - Búsqueda
- [MDX](https://mdxjs.com/) - Markdown extendido

---

## 🚀 Desarrollo Local

### 📦 Instalación

1. **Clonar el repositorio:**
   ```bash
   git clone <tu-repo>
   cd blog-website-astro
   ```

2. **Instalar dependencias:**
   ```bash
   # Instalar pnpm si no lo tienes
   npm install -g pnpm
   
   # Instalar dependencias del proyecto
   pnpm install
   ```

3. **Iniciar servidor de desarrollo:**
   ```bash
   pnpm dev
   ```
   El blog estará disponible en `http://localhost:4321`

### 📝 Gestión de Contenido

- **Crear nuevo post:** Crea una carpeta en `src/content/posts/nombre-post/` con `index.md`
- **Editar posts existentes:** Modifica archivos en `src/content/posts/`
- **Personalizar "Sobre Mí":** Edita `src/content/spec/about.md`
- **Configuración general:** Modifica `src/config.ts`

### 🖼️ Añadir Imágenes

- **Para posts:** Coloca imágenes en la carpeta del post
- **Banners:** `public/assets/desktop-banner/` y `public/assets/mobile-banner/`
- **Avatar:** `src/assets/images/`

---

## 📚 Estructura de Posts

### Formato de Frontmatter

```yaml
---
title: "Título del Artículo"
published: 2026-01-13
description: "Descripción breve del contenido"
tags: ["Tag1", "Tag2", "Tag3"]
category: Tecnología
draft: false
pinned: false
---
```

### Estructura de Directorios

```
src/content/posts/
├── bienvenida/
│   ├── index.md
│   └── cover.png
├── ia/
│   └── index.md
└── ia-educacion/
    └── index.md
```

---

## ⚡ Comandos

| Comando                    | Acción                                   |
|:---------------------------|:-----------------------------------------|
| `pnpm install`             | Instalar dependencias                    |
| `pnpm dev`                 | Servidor local en `localhost:4321`       |
| `pnpm build`               | Construir sitio en `./dist/`             |
| `pnpm preview`             | Previsualizar build localmente           |
| `pnpm format`              | Formatear código con Prettier            |

---

## 🎯 Configuración Personalizada

### Información del Sitio (`src/config.ts`)

```typescript
export const siteConfig = {
  title: "VodTinker",
  subtitle: "Blog personal y portfolio",
  siteURL: "https://blog.vodtinker.com/",
  lang: "es",
  timezone: 1, // UTC+1 (España)
  // ... más configuración
};
```

### Perfil Personal

```typescript
export const profileConfig = {
  name: "Daniel Fonov",
  bio: "Administrador de Sistemas Informáticos",
  avatar: "assets/images/avatar.webp",
  links: [
    { name: "GitHub", url: "https://github.com/VodTinker" },
    { name: "Discord", url: "https://discord.gg/vodtinler" }
  ]
};
```

---

## 📂 Proyectos Destacados

Este blog documenta mis proyectos principales:

1. **Portfolio Personal** ([vodtinker.dev](https://vodtinker.dev))
2. **Infraestructura Autoalojada de Correo y DNS** - Con Stalwart Mail Server
3. **Discord Bot con OpenAI** - Bot interactivo
4. **Web Scraping con Selenium** - Scripts automatizados
5. **Automatización de Notificaciones** - Sistema con n8n

---

## 🚀 Despliegue

El blog puede desplegarse en cualquier plataforma de hosting estático:

- **Vercel** (Recomendado)
- **Netlify**
- **GitHub Pages**
- **Cloudflare Pages**

**Antes de desplegar:**
1. Actualiza `siteURL` en `src/config.ts`
2. Ejecuta `pnpm build` para generar el sitio estático
3. El contenido en `dist/` está listo para desplegar

---

## 📄 Licencia

Este proyecto está basado en [Mizuki](https://github.com/matsuzaka-yuki/mizuki), licenciado bajo Apache License 2.0.

### Créditos del Template Original

- **[Mizuki](https://github.com/matsuzaka-yuki/mizuki)** - Template Astro
- Basado en **[Fuwari](https://github.com/saicaca/fuwari)** (MIT)
- Construido con [Astro](https://astro.build) y [Tailwind CSS](https://tailwindcss.com)

---

## 🔗 Enlaces

- **Blog**: [blog.vodtinker.com](https://blog.vodtinker.com)
- **Portfolio**: [vodtinker.dev](https://vodtinker.dev)
- **GitHub**: [@VodTinker](https://github.com/VodTinker)
- **Discord**: vodtinler

---

*Blog personalizado por Daniel Fonov | Última actualización: Enero 2026*
