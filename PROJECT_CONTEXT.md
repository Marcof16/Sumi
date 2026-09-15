# Contexto del Proyecto

## Identidad y objetivo

SUMI es una aplicación de escritorio para organizar y escribir novelas. El proyecto actual se llama `sumi_nobel_0` y prioriza escritorio, con posibilidad futura de una edición móvil llamada SUMI Pocket.

## Arquitectura y stack

- Tauri 2 como contenedor de escritorio y backend Rust.
- React, TypeScript y Vite para la interfaz.
- pnpm como único gestor de paquetes del proyecto.
- Tailwind CSS y componentes compatibles con shadcn/ui para la interfaz.
- Lucide para iconos.
- Tiptap para edición rica.
- `@xyflow/react` para futuros diagramas.
- Markdown será la futura fuente principal de los datos narrativos.
- OpenCode será posteriormente el motor agente de IA.

SUMI no administrará proveedores de IA, API keys ni autenticación. Esa responsabilidad seguirá siendo de OpenCode.

## Organización y filosofía

El código debe mantenerse modular, sencillo y legible. Se deben reutilizar librerías y componentes existentes antes de reinventarlos, evitar la sobreingeniería y priorizar la facilidad de mantenimiento y el vibe coding.

## Decisiones aún no tomadas

Todavía no están definidos el modelo exacto de datos narrativos, la estructura de carpetas Markdown, las funciones de producto, la estrategia de sincronización móvil ni la integración concreta con OpenCode. No asumir estas decisiones sin una instrucción explícita.
