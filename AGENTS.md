# SUMI

SUMI es una aplicación de escritorio para organizar y escribir novelas.

- Stack: Tauri 2, React, TypeScript y Vite. Gestor: pnpm.
- Usar componentes reutilizables antes que reinventar componentes; usar shadcn/ui y Lucide.
- Usar Tiptap para edición rica y React Flow (`@xyflow/react`) para diagramas.
- OpenCode será posteriormente el motor agente de IA. Credenciales, proveedores y modelos pertenecen a OpenCode, no a SUMI.
- Preferir código sencillo, modular y legible; no crear abstracciones innecesarias ni añadir dependencias sin razón clara.
- Leer el código antes de modificarlo y ejecutar typecheck, lint y tests relevantes tras cambios importantes.
- No destruir archivos o configuraciones existentes ni implementar funciones que el usuario no haya pedido.

## Memoria persistente del proyecto

Antes de tareas importantes, consultar `PROJECT_CONTEXT.md`, `CURRENT_STATE.md` y `NEXT_STEPS.md`. Después de cambios importantes, mantener actualizados `CURRENT_STATE.md`, `AI_CHANGELOG.md` y `NEXT_STEPS.md`.

## Reglas de trabajo de SUMI

- Para tareas medianas o grandes, dividir el trabajo en cambios pequeños y verificables.
- Evitar parches enormes; modificar como máximo unos pocos archivos relacionados por bloque cuando sea posible.
- Informar brevemente después de cada bloque importante.
- Si una operación tarda mucho sin salida visible, informar antes de continuar.
- Una interrupción del usuario no autoriza a descartar trabajo; inspeccionar primero qué cambios quedaron aplicados.
- Ejecutar verificaciones después de cada unidad coherente de trabajo, no después de cada línea.
- Mantener `CURRENT_STATE.md` actualizado después de tareas importantes.
