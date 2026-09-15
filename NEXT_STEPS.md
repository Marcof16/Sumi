# Próximos Pasos

## Próxima tarea recomendada

Conectar las secciones de SUMI con la estructura Markdown del proyecto abierto, empezando por Ideas/Inbox y Personajes. Inicio mantiene sus estadísticas como placeholders hasta esa conexión.

## Pendientes

- Conectar Ideas/Inbox y Personajes con sus archivos Markdown.
- Sustituir `HomeStats` por datos derivados de Markdown cuando exista el lector narrativo.
- Mantener Home como visión general; desarrollar Área de trabajo en una fase independiente.
- Extender el Área de trabajo solo después de definir la conexión de sus elementos temporales con Markdown.
- Mantener `WorkspaceScene` temporal hasta definir el modelo narrativo persistente y su conexión con Markdown.
- Añadir lectura de índices Markdown sin introducir una base de datos.
- Mantener y ampliar la Biblioteca local sin implementar todavía importación externa, favoritos o nube.
- Completar/verificar el bundle instalable de `pnpm tauri:build` cuando WiX esté disponible.
- Mantener la rama `main` protegida y revisar las ejecuciones de CI después de cada pull request.
- Definir el modelo narrativo Markdown y las primeras funciones de producto.
- Revisar manualmente en `tauri:dev` el nuevo inicio del Área de trabajo y el editor en ventanas estrechas antes de conectar persistencia.

## Antes de continuar

Leer `AGENTS.md`, `PROJECT_CONTEXT.md`, `CURRENT_STATE.md` y este archivo. Verificar que `C:\Users\garci\.cargo\bin` esté en el PATH de la sesión antes de ejecutar comandos Tauri/Rust.

## No hacer todavía

- No diseñar funcionalidades que todavía no estén definidas.
- No implementar OpenCode dentro de SUMI todavía.
- No administrar API keys desde SUMI.
- No añadir infraestructura móvil salvo nueva instrucción.
- No agregar dependencias sin necesidad.
