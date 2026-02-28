---
title: "Claude y Claude Code: El inicio de una nueva era"
published: 2026-02-28
description: "Mi experiencia real usando Claude Code de Anthropic para construir proyectos en Astro. Comparativa con Cursor y GitHub Copilot, pros, contras y opinión sin filtros."
image: "/claude_code_logo.png"
tags: ["Claude", "Claude Code", "IA", "Desarrollo", "Anthropic", "Opinión", "Astro", "Terminal"]
category: Tecnología
draft: false
pinned: false
---

Lo primero que hice con Claude Code fue pedirle que entendiera un codebase que yo mismo no entendía del todo. Era el template de este blog — unas 15.000 líneas de Astro, Svelte, TypeScript y Stylus con comentarios en chino. En menos de dos minutos me dio un resumen arquitectural que me habría llevado horas reconstruir solo.

Eso fue hace poco. Desde entonces lo he usado en dos proyectos: este blog y [takizen.xyz](https://takizen.xyz). Y tengo opiniones.

## Qué es Claude Code 

Es un agente que vive en tu terminal — o en tu editor. No un autocomplete, no un chatbot — un agente que lee tu código, ejecuta comandos reales en tu máquina, hace commits, abre PRs y trabaja en tareas que abarcan múltiples archivos a la vez.

```bash
npm install -g @anthropic-ai/claude-code
claude
```

Lo lanzó Anthropic en febrero de 2025. Desde entonces no ha parado: en agosto añadió integración con GitHub Actions y `/security-review`; en noviembre llegó **Claude Opus 4.5** con mejoras significativas en SWE-bench; y en diciembre Anthropic adquirió Bun para acelerar su infraestructura justo cuando Claude Code alcanzaba **$1B de run-rate anualizado**.

El modelo actual alcanza un **77.2% en SWE-bench Verified** — el benchmark estándar de resolución de issues reales de GitHub. No es número de marketing. Es el más alto de la industria en este momento.

:::note
Si quieres la comparativa técnica detallada contra GitHub Copilot y Cursor, al final del post tienes una tabla. Pero la diferencia fundamental es esta: Copilot completa mientras escribes; Claude Code trabaja mientras tú no estás mirando.
:::

## Cómo funciona realmente

Lo que no dice la documentación oficial de forma clara: Claude Code no es solo la CLI. Hay un **plugin para VS Code** que muestra diffs inline y comparte contexto con el editor, y otro para JetBrains con diff interactivo. Me enteré de esto bastante tarde y me habría ahorrado tiempo haberlo sabido antes.

Lo que lo hace distinto a nivel arquitectural es el **Agent SDK** (Python y TypeScript): permite lanzar múltiples agentes que trabajan en paralelo sobre distintas partes del repositorio usando `git worktrees`. Imagina dividir un refactor grande entre tres agentes que trabajan simultáneamente y luego une los resultados. No es un concepto de roadmap — ya funciona.

También soporta **MCP servers** (Model Context Protocol) para conectar herramientas externas con credenciales: Playwright para tests de UI automáticos, Figma para flujos de diseño a código, lo que necesites. La CLI está diseñada para ser scriptable en pipelines CI, algo que Copilot no ofrece de forma nativa.

El contexto por defecto es **200k tokens** — suficiente para proyectos medianos sin dividir en múltiples llamadas. Hay variantes de Opus 4.5 en preview con hasta 1M.

## Mi experiencia real: este blog

Este blog está construido sobre [Mizuki](https://github.com/matsuzaka-yuki/mizuki), un template de Astro con bastante complejidad interna. Cuando empecé a personalizarlo, tenía por delante cosas como cambiar el sistema de fuentes, adaptar estilos, ajustar componentes en Svelte que nunca había tocado.

Claude Code no solo ejecutó los cambios. *Entendió por qué* el sistema de fuentes funcionaba de una manera específica — que había un `Layout.astro` que construía el `font-family` dinámicamente desde `config.ts`, que los `@import` de CSS debían ir antes que los locales para no ser ignorados por PostCSS. Detectó un bug de orden de `@import` que yo habría tardado horas en encontrar.

Lo que más me sorprendió no fue la velocidad. Fue que **preguntó antes de actuar** en las decisiones importantes. "¿Quieres trabajar directamente en master o creamos una rama?" No asumió. Eso marca una diferencia cuando estás en producción.

Lo que no fue tan bonito: a veces genera código correcto que no encaja del todo con el estilo existente del proyecto. Tienes que revisarlo. No es un `git commit` y a dormir — es un `git diff` y a pensar.

## Mi experiencia real: takizen.xyz

[Takizen](https://takizen.xyz) es un proyecto diferente: una web con su propia identidad visual, logo, estructura de páginas y animaciones GSAP. El stack incluye Astro, CSS custom con glassmorphism y un sistema de animaciones scroll que coordinaba mal con las clases de visibilidad del CSS.

El problema concreto: las animaciones GSAP que yo había añadido entraban en conflicto con las transiciones CSS del template. Los elementos aparecían y desaparecían de forma inconsistente según el navegador. Le pasé el componente `Layout.astro`, le expliqué el conflicto, y en lugar de reescribir el CSS me propuso una solución quirúrgica: hacer que GSAP ScrollTrigger añadiera y quitara clases CSS (`.visible`, `.sr-visible`) en vez de animar propiedades directamente — respetando así las transiciones del template en lugar de pelear contra ellas.

Eso es razonamiento, no predicción de tokens. Entendió la arquitectura, vio el conflicto real y no tomó el camino fácil de sobreescribir todo. Lo que sí salió mal: cuando el proyecto crecía en sesiones largas, el contexto se saturaba y las últimas instrucciones perdían precisión. Hay que planificar bien las sesiones para proyectos grandes.

## Lo que me gusta de verdad

**El contexto completo.** La mayoría de las herramientas de IA trabajan con lo que ven en el editor ahora mismo. Claude Code trabaja con el proyecto entero. Cuando le pedí cambiar la tipografía del blog, no solo cambió el CSS — buscó todos los componentes donde había `font-bold`, entendió cuáles eran títulos y cuáles eran etiquetas UI, y aplicó el criterio correcto a cada uno.

**Que reconoce cuando se equivoca.** Aplicó un `@import` de Google Fonts en el lugar incorrecto dentro del CSS. Cuando el revisor de calidad lo señaló, lo corrigió sin drama, explicando por qué el error tenía consecuencias reales en producción. Eso es más de lo que hacen algunos compañeros de trabajo.

**El modo agéntico para tareas largas.** Hay tareas que en otro contexto habrían sido media tarde: "refactoriza estos tres componentes para que usen el mismo sistema de colores". Con Claude Code son una instrucción y una taza de café.

**El plugin de VS Code.** Para los que no son 100% terminal-first, el plugin con diffs inline cambia bastante la experiencia. No tienes que salir del editor para ver qué hizo.

## Lo que no me gusta

:::caution
Los límites de uso cambian sin mucho aviso. En julio de 2025 Anthropic endureció los límites del plan de $200/mes sin comunicarlo bien — usuarios reportaron reducciones de hasta el 60% en tokens disponibles. Si construyes flujos de trabajo que dependen de Claude Code en producción, ten un plan B.
:::

**Privacidad, un dato que la mayoría pasa por alto.** Anthropic retiene datos de usuarios para entrenamiento de modelos durante cinco años si no has hecho opt-out. Hubo una ventana de opt-out hasta octubre de 2025. Si esto te importa (y debería), revisa la configuración de tu cuenta y las políticas de tu plan Enterprise antes de usarlo con código sensible.

**Solo Claude.** No puedes cambiar de modelo. Si para una tarea específica GPT-4 o Gemini funcionaran mejor, no importa — es Claude o nada. Puede ser un problema o puede ser una ventaja según cómo lo veas.

**La integración con IDEs es limitada comparada con Cursor.** Aunque el plugin de VS Code ha mejorado mucho, si tu flujo de trabajo es 100% visual con ratón, Cursor sigue siendo más fluido en ese contexto. Claude Code brilla si te sientes cómodo en el terminal o entiendes cómo funciona por dentro.

**El código generado necesita revisión.** El 48% del código AI-generado en general contiene vulnerabilidades de seguridad — no he auditado el de Claude Code específicamente, pero la estadística del sector invita a no bajar la guardia. El comando `/security-review` ayuda, pero no sustituye a que leas lo que se va a hacer un commit.

## La pregunta que me hago

Hay un [estudio de METR](https://byteiota.com/ai-coding-tools-slow-developers-metr-study) que encontró que las herramientas de IA **incrementaron el tiempo de completar tareas un 19%** entre desarrolladores experimentados en codebases que ya conocían bien. Lo entiendo. Cuando el código no es tuyo, depurarlo tarda más. Cuando la arquitectura la decidió otra cosa, entenderla cuesta.

Pero creo que esa estadística mide la herramienta mal aplicada. Claude Code no me ahorra tiempo en tareas donde ya soy rápido. Me ahorra tiempo — y energía mental — en tareas donde sería lento: explorar codebases desconocidos, hacer refactorizaciones que afectan a veinte archivos, recordar la sintaxis exacta de algo que uso una vez al mes.

La herramienta correcta para el problema correcto. No magia.

## ¿Nueva era o hype?

![Claudi, la mascota de Anthropic](/Claudi.png)

*Por cierto, el logo de Claude Code es muy mono, una combinación de un cangrejo y un ajolote en mi opinión.*

Nueva era, con matices.

No porque Claude Code sea perfecto — no lo es. Sino porque el paradigma es diferente. Por primera vez tengo una herramienta que **entiende lo que estoy construyendo** en lugar de solo predecir el siguiente token. Que mantiene contexto entre sesiones. Que puede trabajar en una tarea mientras yo hago otra cosa. Que puede lanzar varios agentes en paralelo sobre partes distintas del proyecto.

Eso no es una mejora incremental sobre el autocompletado. Es un cambio de cómo se puede trabajar.

Si eres administrador de sistemas o desarrollador web y todavía no lo has probado, pruébalo en un proyecto pequeño donde no haya presión. No para que te asombre — para que veas dónde encaja y dónde no. Este blog y [takizen.xyz](https://takizen.xyz) son el resultado de haberlo hecho así.

## Comparativa rápida

|  | Claude Code | GitHub Copilot | Cursor |
|---|---|---|---|
| **Modelo** | Solo Claude (Opus/Sonnet/Haiku) | Multi-modelo (GPT-4o, Claude, Gemini…) | Multi-modelo |
| **Interfaz** | Terminal CLI + plugins VS Code/JetBrains | IDE nativo (VS Code, JetBrains, Neovim…) | IDE propio |
| **Autocompletado en tiempo real** | ✗ | ✓ | ✓ |
| **Contexto del proyecto completo** | ✓ (200k, beta 1M) | Limitado | ✓ |
| **Operación agéntica** | ✓ — su fuerte (Agent SDK, paralelo) | Limitada (GitHub Actions) | Parcial (Cloud Agents en VMs) |
| **MCP / herramientas externas** | ✓ (Playwright, Figma…) | ✗ nativo | ✓ (MCP) |
| **Precio de entrada** | $20/mes | $10/mes | $20/mes |
| **Retención de datos** | 5 años si no opt-out | Según plan | Privacy Mode configurable |

## El repositorio

Si quieres probarlo, el punto de entrada oficial es:

:::github
anthropics/claude-code
:::

*¿Lo estás usando en algún proyecto? Me interesa saber cómo te va — especialmente si tienes comparativas con otras herramientas.*
