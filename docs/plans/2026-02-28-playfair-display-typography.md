# Playfair Display Typography Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Reemplazar la fuente actual (ZenMaruGothic-Medium, local) por Playfair Display (Google Fonts) en todo el sitio: títulos, cuerpo, navbar y banner.

**Architecture:** La fuente se aplica globalmente vía `siteConfig.font.asciiFont.fontFamily` en `config.ts`, que `Layout.astro` convierte en un `font-family` inline en el `<body>`. Basta con cambiar el import CSS y la configuración; no hay que tocar componentes individuales.

**Tech Stack:** Astro, TailwindCSS, Google Fonts API v2, `src/config.ts`, `src/styles/main.css`, `tailwind.config.cjs`

---

### Task 1: Reemplazar el import de fuente en main.css

**Files:**
- Modify: `src/styles/main.css:13-27`

**Step 1: Abrir el archivo y localizar el bloque @font-face de ZenMaruGothic**

Líneas 13–18 en `src/styles/main.css`:
```css
/* 导入 ZenMaruGothic-Medium 字体 */
@font-face {
  font-family: "ZenMaruGothic-Medium";
  src: url("/assets/font/ZenMaruGothic-Medium.woff2") format("woff2");
  font-weight: 500;
  font-display: swap;
}
```

**Step 2: Reemplazar ese bloque con el import de Google Fonts**

Sustituir las líneas 12–18 (el bloque `@font-face` de ZenMaruGothic) por:
```css
/* Importar Playfair Display desde Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,700&display=swap');
```

> **Nota:** Mantener intacto el `@font-face` de `萝莉体 第二版` (líneas 20–27), ya que sigue siendo el fallback CJK.

**Step 3: Verificar que el archivo quede correcto**

El inicio del archivo debe verse así:
```css
/* ... imports de otros CSS ... */

/* Importar Playfair Display desde Google Fonts */
@import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400;1,700&display=swap');

/* 导入 萝莉体 第二版 字体 */
@font-face {
  font-family: "萝莉体 第二版";
  ...
}

@tailwind base;
...
```

> **IMPORTANTE:** Los `@import` deben ir **antes** de `@tailwind base`. El archivo ya tiene otros `@import` al inicio, así que colocar este justo antes del `@font-face` de 萝莉体.

**Step 4: Commit**

```bash
git add src/styles/main.css
git commit -m "style: replace ZenMaruGothic with Playfair Display Google Fonts import"
```

---

### Task 2: Actualizar config.ts para usar Playfair Display

**Files:**
- Modify: `src/config.ts:185-192`

**Step 1: Localizar el bloque asciiFont en src/config.ts**

Líneas 185–192:
```typescript
asciiFont: {
    fontFamily: "ZenMaruGothic-Medium",
    fontWeight: "400",
    localFonts: ["ZenMaruGothic-Medium.ttf"],
    enableCompress: false,
},
```

**Step 2: Sustituirlo por la configuración de Playfair Display**

```typescript
asciiFont: {
    fontFamily: "Playfair Display",
    fontWeight: "400",
    localFonts: [],
    enableCompress: false,
},
```

> **Nota:** `localFonts: []` porque la fuente viene de Google Fonts, no hay archivo local. `enableCompress: false` porque no hay TTF que comprimir.

**Step 3: Commit**

```bash
git add src/config.ts
git commit -m "style: configure Playfair Display as primary font in siteConfig"
```

---

### Task 3: Añadir Playfair Display al stack serif de Tailwind

**Files:**
- Modify: `tailwind.config.cjs`

**Step 1: Localizar el bloque fontFamily en tailwind.config.cjs**

```js
fontFamily: {
    sans: ["Roboto", "sans-serif", ...defaultTheme.fontFamily.sans],
},
```

**Step 2: Añadir la familia serif**

```js
fontFamily: {
    sans: ["Roboto", "sans-serif", ...defaultTheme.fontFamily.sans],
    serif: ["Playfair Display", ...defaultTheme.fontFamily.serif],
},
```

Esto permite usar `font-serif` en clases de Tailwind y en el plugin `@tailwindcss/typography` (prose).

**Step 3: Commit**

```bash
git add tailwind.config.cjs
git commit -m "style: add Playfair Display to Tailwind serif font stack"
```

---

### Task 4: Verificar en desarrollo

**Step 1: Arrancar el servidor de desarrollo**

```bash
pnpm dev
```

**Step 2: Abrir http://localhost:4321 en el navegador**

Verificar que:
- [ ] Los títulos del blog usan Playfair Display (serif con alto contraste)
- [ ] El cuerpo del texto usa Playfair Display
- [ ] El nombre "VodTinker" en la navbar usa Playfair Display
- [ ] El texto del banner ("Bienvenido" y las frases del typewriter) usa Playfair Display
- [ ] Los bloques de código siguen usando JetBrains Mono (monospace)
- [ ] Los acentos (á, é, ó, ú, ñ) se muestran correctamente

**Step 3: Verificar modo oscuro**

Activar el toggle de modo oscuro y confirmar que la fuente no cambia (solo los colores).

**Step 4: Verificar en móvil (DevTools)**

Redimensionar a 375px y comprobar que los títulos y el cuerpo siguen usando Playfair Display.
