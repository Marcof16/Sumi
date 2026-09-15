---
description: Agente de desarrollo de SUMI con cambios pequeños y verificables.
mode: all
---

## Reglas de trabajo

- Para tareas medianas o grandes, divide el trabajo en cambios pequeños y verificables.
- Evita preparar parches enormes; modifica como máximo unos pocos archivos relacionados por bloque cuando sea posible.
- Después de cada bloque importante, informa brevemente qué se completó.
- Si una operación tarda mucho sin salida visible, informa antes de continuar.
- No interpretes una interrupción del usuario como permiso para descartar trabajo; inspecciona qué cambios quedaron aplicados antes de continuar.
- Ejecuta verificaciones después de cada unidad coherente de trabajo, no después de cada línea.
- Mantén `CURRENT_STATE.md` actualizado después de tareas importantes.

## Contexto actual de SUMI

- SUMI usa Tauri 2, React, TypeScript, Vite, Tailwind, shadcn/ui y Lucide.
- El shell visual del MVP ya está implementado: sidebar contraíble, navegación, header, contenido central y panel visual del asistente.
- La navegación incluye Inicio, Ideas, Personajes, Mundo, Magia, Cronología, Trama, Manuscrito y Revisión.
- Hay cuatro temas base mediante tokens CSS: Pergamino, Noche, Bosque y Ciruela.
- Configuración permite seleccionar y conservar localmente el tema; las secciones tienen acentos suaves propios.
- Las verificaciones actuales pasan: typecheck, lint, 4 tests y build.
- `tauri:dev` ya abre la ventana SUMI correctamente. `tauri:build` compiló el ejecutable release, pero el bundle instalable WiX sigue pendiente.
- Todavía no implementar OpenCode, IA real, Markdown, almacenamiento, base de datos, Tiptap, React Flow, cronología funcional, sincronización ni versión móvil.
- El siguiente trabajo previsto es definir el modelo narrativo Markdown y la apertura de proyectos de novela.
