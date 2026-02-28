---
title: "Claude Code: consejos prácticos para sacarle todo el partido"
published: 2026-02-28
description: "MCPs, CLAUDE.md, subagentes paralelos, plugins de VS Code y más. Todo lo que ojalá hubiera sabido antes de empezar a usar Claude Code en serio."
image: "/claude_code_logo.png"
tags: ["Claude Code", "IA", "Desarrollo", "Terminal", "Productividad", "Anthropic"]
category: Tecnología
draft: false
pinned: false
---

Si llegaste aquí desde mi [post anterior sobre Claude Code](/posts/claude-code-nueva-era/), ya sabes qué es y qué opino. Este post es diferente: es la lista de cosas que ojalá hubiera sabido antes de las primeras horas de uso. Sin rodeos.

## 1. CLAUDE.md: dale contexto permanente a tu proyecto

El fichero más infrautilizado de Claude Code. Si lo pones en la raíz del proyecto, Claude lo lee automáticamente al inicio de cada sesión. Es tu forma de decirle "esto es lo que estás construyendo, así funciona, esto no toques".

```markdown
# Mi Proyecto

## Stack
- Astro 5 + Svelte + TypeScript
- Stylus para CSS (NO uses Tailwind)
- pnpm como gestor de paquetes

## Convenciones
- Los componentes van en `src/components/`
- Los estilos globales en `src/styles/global.styl`
- Commits en inglés, mensajes descriptivos

## Lo que NO debes hacer
- No instales dependencias sin preguntarme
- No toques `src/content/spec/` sin confirmar
- No hagas commits directamente a `main`
```

Cuanto más específico seas, menos correcciones tendrás que hacer. Un buen `CLAUDE.md` ahorra el 30% de los vaivenes de instrucciones repetidas.

:::tip
Puedes usar el comando `/init` para crear un `CLAUDE.md` básico en el proyecto en base a lo que ya existe.
:::

:::tip
Puedes tener varios `CLAUDE.md` anidados: uno en la raíz del repo con las reglas generales, y otro dentro de una subcarpeta con instrucciones específicas para ese módulo. Claude los combina automáticamente.
:::

## 2. MCPs: conecta herramientas externas

MCP (Model Context Protocol) es el sistema que permite a Claude Code usar herramientas externas con credenciales reales. La idea básica: en lugar de copiar y pegar resultados, Claude llama directamente a la herramienta.

Algunos MCPs que vale la pena conocer:

**Playwright** — Claude ejecuta y valida tests de UI de forma autónoma. Le dices "asegúrate de que el formulario de contacto funciona en móvil" y lo hace sin que toques el navegador.

**Figma** — Flujo diseño → código. Claude lee los tokens de diseño del archivo de Figma y los implementa directamente en el código. Útil si trabajas con un diseñador.

**GitHub** — Crear PRs, consultar issues, revisar comentarios sin salir del contexto de Claude.

Para configurar un MCP, añádelo al fichero de configuración de Claude Code:

```json
{
  "mcpServers": {
    "playwright": {
      "command": "npx",
      "args": ["@playwright/mcp@latest"],
      "env": {}
    }
  }
}
```

:::note
Los MCPs se configuran por proyecto o globalmente. Si son credenciales de trabajo (tokens de GitHub, claves de API), ponlos en el nivel de usuario, no en el repositorio para evitar commits accidentales.
:::

## 3. Subagentes: paralelismo real

Esto cambia cómo piensas el trabajo con Claude Code. En lugar de una tarea larga y secuencial, puedes dividir el trabajo entre varios agentes que corren en paralelo usando `git worktrees`.

El concepto:

```bash
# Creas un worktree separado para cada rama de trabajo
git worktree add ../proyecto-feature-auth feature/auth
git worktree add ../proyecto-refactor-css refactor/css-tokens

# Lanzas un agente en cada uno
cd ../proyecto-feature-auth && claude "implementa el sistema de auth con JWT"
cd ../proyecto-refactor-css && claude "refactoriza todos los tokens de color al nuevo sistema"
```

Mientras el agente A trabaja en autenticación, el agente B está refactorizando estilos. Cuando terminan, haces merge. El tiempo de un refactor que afecta a cuatro módulos distintos pasa de ser secuencial a casi paralelo.

El Agent SDK (Python/TypeScript) te da control más fino sobre esto si quieres orquestar desde código:

```python
import anthropic

client = anthropic.Anthropic()

# Lanza múltiples tareas de forma programática
tasks = [
    "Refactoriza el módulo de autenticación",
    "Añade tests unitarios al módulo de pagos",
    "Documenta la API pública del módulo de usuarios"
]

for task in tasks:
    # Cada uno corre en su propio worktree/contexto
    result = client.messages.create(
        model="claude-opus-4-5",
        max_tokens=8096,
        messages=[{"role": "user", "content": task}]
    )
```

## 4. El plugin de VS Code (y por qué importa)

Si tu flujo de trabajo no es 100% terminal, el plugin oficial de VS Code cambia bastante la experiencia. Lo que añade respecto a la CLI pura:

- **Diffs inline**: ves qué cambió directamente en el editor, con la misma interfaz de `git diff` que ya conoces
- **Context sharing**: Claude ve qué archivo tienes abierto y en qué línea está el cursor, sin que se lo digas
- **Aceptar/rechazar cambios** con un clic, por bloque o por fichero

Instalación:

```bash
# Desde la terminal de VS Code o el marketplace
code --install-extension anthropic.claude-code
```

El plugin de JetBrains funciona igual de bien si tu editor principal es IntelliJ, WebStorm o similar. Ambos muestran el diff interactivo antes de aplicar cambios.

## 5. Gestiona el contexto en sesiones largas

Este es el mayor punto ciego cuando empiezas: el contexto tiene límite. Cuando una sesión larga empieza a perder precisión en las últimas instrucciones, es síntoma de que el contexto se saturó.

Estrategias que funcionan:

**Sesiones cortas y orientadas.** En lugar de una sesión de dos horas, varias sesiones de 30 minutos con objetivos claros. "Sesión 1: refactoriza los componentes de navegación. Sesión 2: adapta los estilos al nuevo sistema de tokens."

**Usa `/compact`** cuando el contexto empiece a crecer. Es el comando que resume la conversación manteniendo el contexto esencial.

**Puntos de control.** Al final de cada sesión, pídele a Claude que resuma qué hizo y qué queda pendiente. Guarda ese resumen en el `CLAUDE.md` como sección de "Estado actual del proyecto" y bórrala cuando ya no la necesites.

```bash
# Al final de una sesión larga
claude "Resume qué cambios hemos hecho hoy y qué tareas quedan pendientes, \
en formato bullet points para pegar en CLAUDE.md"
```

## 6. `/security-review` antes de cualquier commit importante

Claude Code tiene un comando específico para revisar el código generado desde el punto de vista de seguridad:

```bash
/security-review
```

Analiza el código de la sesión actual buscando vulnerabilidades comunes: inyecciones, secretos hardcodeados, dependencias con CVEs conocidos, permisos excesivos. No es infalible, pero es una capa más antes del `git push`.

El 48% del código generado por IA en general contiene algún tipo de vulnerabilidad según estudios del sector. `/security-review` no cuesta nada y puede evitar un incidente.

## 7. Modos de operación: cuándo usar cuál

Claude Code tiene dos modos principales de trabajo:

**Modo interactivo** (el por defecto) — Pregunta antes de actuar en decisiones importantes. Ideal para desarrollo activo donde quieres mantener el control.

**Modo no interactivo / headless** — Para pipelines CI/CD y scripts automatizados:

```bash
# Sin interfaz interactiva, ideal para CI
claude --headless "ejecuta los tests y corrije los que fallen, sin preguntar"

# Con aprobación automática de acciones seguras
claude --auto-approve-safe "refactoriza según el estilo del proyecto"
```

Úsalo para tareas repetitivas: generar documentación, actualizar dependencias, ejecutar suites de tests y reparar los que fallen.

## 8. Pídale que explique, no solo que cambie

El error más común con Claude Code es usarlo como una caja negra que genera código. Cuando algo falla o no entiendes por qué tomó una decisión, pregunta:

```
¿Por qué pusiste el @import de Google Fonts aquí y no antes del CSS local?
¿Qué consecuencias tendría hacer X en lugar de Y?
Explícame qué hace este componente antes de modificarlo.
```

La diferencia entre usarlo como autocomplete inteligente y como colega que razona es cómo preguntas. Cuanto más hagas que explique su razonamiento, más entiendes el código que genera y mejor puedes detectar cuando se equivoca.

---

El post anterior tenía razón en algo: no es magia. Pero con estos ocho puntos aplicados, empieza a parecerse bastante.

:::github
anthropics/claude-code
:::
