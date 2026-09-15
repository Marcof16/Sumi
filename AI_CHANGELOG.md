# Historial de Cambios de IA

## 2026-09-14 — Preparación para GitHub

### Realizado

- Corregidos el idioma, título y descripción de `index.html` para eliminar referencias de plantilla.
- Fijada la versión de pnpm en `package.json`.
- Actualizado `README.md` con estado, requisitos, estructura y flujo de verificación.
- Añadida CI de frontend en `.github/workflows/ci.yml` para pushes y pull requests.
- Inicializado el repositorio Git local sin añadir artefactos generados ni archivos de entorno.

### Verificación

- `pnpm typecheck`, `pnpm lint`, `pnpm test` (37 pruebas) y `pnpm build`: correctos.
- La build conserva únicamente el warning informativo del tamaño del chunk principal.

## 2026-08-19 — Inicialización del entorno

### Realizado

- Creada la base Tauri 2 + React + TypeScript + Vite en `sumi_nobel_0`.
- Configurados pnpm, Tailwind, componentes UI base, filesystem de Tauri, Tiptap, React Flow, ESLint, Prettier, Vitest y Testing Library.
- Reemplazada la demo genérica por una pantalla temporal de SUMI.
- Añadidos README, AGENTS y memoria persistente del proyecto.

### Archivos importantes modificados

- `package.json`, `pnpm-lock.yaml`, `pnpm-workspace.yaml`
- `src/App.tsx`, `src/components/ui/`, `src/styles/globals.css`
- `vite.config.ts`, `tsconfig.json`, `eslint.config.js`, `vitest.config.ts`
- `src-tauri/Cargo.toml`, `src-tauri/src/lib.rs`, `src-tauri/tauri.conf.json`, `src-tauri/capabilities/default.json`
- `AGENTS.md`, `README.md`

### Decisiones

- Se mantiene el proyecto sin funcionalidades de producto ni integración con OpenCode.
- Se conservan permisos FS declarados mediante `fs:default` hasta definir carpetas concretas.

### Problemas encontrados

- Windows bloquea la ejecución de binarios Rust recién compilados con Control de aplicaciones, error 4551.
- Git está disponible en el sistema, pero el repositorio local aún no está inicializado.

## 2026-08-19 — Verificación del estado base

### Realizado

- Ejecutados `pnpm typecheck`, `pnpm lint`, `pnpm test` y `pnpm build`; todos terminaron correctamente.
- Ejecutado `pnpm tauri:build` con `C:\Users\garci\.cargo\bin` añadido al PATH de la sesión.

### Resultado

- La build de frontend terminó correctamente.
- La build Tauri sigue bloqueada por la política de Control de aplicaciones de Windows al ejecutar scripts Rust de `serde_core` y `proc-macro2` (error 4551).

### Decisiones

- No se cambiaron políticas de seguridad de Windows ni se añadieron funcionalidades de producto no definidas.

## 2026-08-19 — Diagnóstico de bloqueo Code Integrity

### Realizado

- Comprobada la existencia de `CiTool.exe`; `CiTool.exe -lp` devolvió acceso denegado (`0x80070005`), sin modificar nada.
- Consultados eventos recientes 3077, 3076, 3089 y 3099 de `Microsoft-Windows-CodeIntegrity/Operational`.
- Confirmado que `VerifiedAndReputableDesktop` bloquea ejecutables Rust/Cargo no firmados en `src-tauri\target` y `%TEMP%`.
- Comprobado el estado de unión del dispositivo con `dsregcmd /status` sin registrar identificadores personales.

### Resultado

- Diagnóstico provisional: caso A, Smart App Control / política de reputación de aplicaciones. La lista completa de políticas requiere repetir `CiTool -lp` desde una consola con permisos suficientes.
- No se ejecutaron builds Tauri, soluciones de foros ni cambios de seguridad.

## 2026-08-19 — Verificación Tauri posterior al cambio manual del usuario

### Resultado

- `pnpm typecheck`, `pnpm lint`, `pnpm test` y `pnpm build` terminaron correctamente.
- Rust y Cargo estuvieron disponibles desde `C:\Users\garci\.cargo\bin`.
- `pnpm tauri:dev` compiló y abrió la ventana `SUMI`; se cerró normalmente.
- `pnpm tauri:build` compiló `src-tauri\target\release\sumi_nobel_0.exe` sin 4551.
- El bundle instalable no terminó porque Tauri quedó en la fase de descarga/verificación de WiX; no se generó la carpeta `target\release\bundle`.

### Decisiones

- Se considera resuelto el bloqueo de Smart App Control para el desarrollo local, por la desactivación manual realizada por el usuario.
- SUMI no modificó Defender, Firewall, políticas, registro ni ninguna otra configuración de seguridad.

## 2026-08-19 — Shell visual del MVP

### Realizado

- Reemplazada la pantalla temporal por el shell principal de SUMI.
- Añadidos sidebar contraíble, header, contenido central, panel de asistente visual y navegación tipada basada en estado React.
- Añadidas vistas de Inicio e Ideas y un componente reutilizable para estados vacíos.
- Añadidas pruebas de renderizado, navegación y visibilidad del asistente.

### Resultado

- `pnpm typecheck`: correcto.
- `pnpm lint`: correcto.
- `pnpm test`: correcto, 3 pruebas.
- `pnpm build`: correcto.
 - `pnpm tauri:dev`: correcto; ventana `SUMI` detectada y cerrada normalmente.

## 2026-08-28 — Corrección de actualizaciones Tiptap

### Realizado

- `WorkspaceEditor` comunica los cambios del usuario únicamente mediante el `onUpdate` oficial de Tiptap.
- Eliminado el `onInput` redundante del contenedor que volvía a llamar a `onContentChange`.
- Conservada la sincronización externa React → Tiptap con comparación de HTML y `emitUpdate: false` para evitar loops.
- Añadidas pruebas para la ruta única, sincronización externa silenciosa y conteo del HTML almacenado.

### Alcance

- No se modificaron diseño, toolbar, fases, modelo, persistencia, Markdown, OpenCode, Agent, Sidebar, Home, Biblioteca ni Status Bar.

## 2026-08-28 — Render seguro del borrador

### Realizado

- Sustituido `dangerouslySetInnerHTML` de `DraftReadOnly` por `ReadonlyTiptapContent`, usando Tiptap read-only y `StarterKit`.
- Conservados el HTML como formato de almacenamiento, el formato rico compatible, el estado vacío y la fuente `scene.draft.content`.
- Añadidas pruebas de formato, cambio de contenido externo, estado vacío y descarte de markup ejecutable/no soportado.

### Alcance

- No se añadió ninguna dependencia.
- No se modificaron persistencia, Markdown, OpenCode ni el modelo Workspace.

### Alcance

- No se implementaron almacenamiento, Markdown, OpenCode, IA, editor, diagramas, cronología funcional ni sincronización.

## 2026-08-19 — Temas visuales base

### Realizado

- Añadidos tokens CSS semánticos para que la interfaz no dependa de colores fijos.
- Añadidos los temas Pergamino, Noche, Bosque y Ciruela.
- Añadido selector de tema en Configuración con persistencia local.
- Añadidos acentos suaves por sección sin cambiar el layout principal.

### Resultado

- `pnpm typecheck`: correcto.
- `pnpm lint`: correcto.
- `pnpm test`: correcto, 4 pruebas.
- `pnpm build`: correcto.

### Alcance

- No se implementaron personalización libre, almacenamiento narrativo, Markdown, OpenCode ni IA real.

## 2026-08-20 — Proyectos de novela y modelo Markdown

### Realizado

- Definido el formato portable `sumi.json` versión 1.
- Añadido el servicio de proyectos para crear, abrir, leer y validar.
- Añadida la estructura Markdown inicial con plantillas breves y estados narrativos.
- Añadido el diálogo oficial de Tauri y permisos filesystem específicos.
- Implementadas bienvenida, Nueva novela, Abrir novela y Cerrar proyecto.
- El shell muestra el nombre real del manifiesto.
- Añadidas pruebas de validación y comportamiento visual.

### Verificación

- `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build` y `cargo check`: correctos.

### Alcance

- No se conectaron OpenCode, IA, editor Markdown, base de datos ni funciones narrativas avanzadas.

## 2026-08-20 — Fase 1: temas, contraste y accesibilidad visual

### Realizado

- Ajustados los tokens semánticos de fondos, superficies, bordes y textos de los cuatro temas.
- Reforzada la separación visual de sidebar, header, AssistantPanel, cards, inputs, dialogs, dropdowns y textareas mediante tokens existentes.
- Eliminadas transparencias débiles en sidebar y AssistantPanel; el header usa una superficie diferenciada del fondo.
- Movido el selector rápido de tema al header con `SunMoon`, tooltip y `aria-label="Cambiar tema"`.
- Conservada `Configuración` en el sidebar como entrada independiente para futuras opciones.
- Añadida prueba para cambio desde Header y ausencia de duplicación.

### Alcance

- No se modificaron creación/apertura de novelas, Markdown, `sumi.json`, filesystem, navegación ni funcionalidades de producto.

### Verificación

- `pnpm typecheck`, `pnpm lint`, `pnpm test` y `pnpm build`: correctos.
- `pnpm tauri:dev`: inició la aplicación correctamente; se cerró después de la comprobación.

## 2026-08-20 — Fase 2: Biblioteca local de novelas

### Diagnóstico

- El error `Cannot read properties of undefined (reading 'invoke')` provenía de usar `@tauri-apps/plugin-dialog` desde Vite/browser, donde no existe el bridge nativo.
- También se reprodujo en un helper de escaneo que llamaba `@tauri-apps/api/path` sin un adaptador de test.

### Realizado

- Sustituido el flujo de selección de carpetas por una biblioteca en `Documentos/SUMI/Novelas`, resuelta con `documentDir()`.
- Añadidos `getLibraryRoot()`, `ensureLibraryExists()`, `scanLibrary()` y escaneo aislable mediante adaptadores.
- Crear novela valida nombres Windows, rechaza duplicados y genera la estructura Markdown dentro de la biblioteca.
- Biblioteca con vistas Biblioteca/Recientes, tarjetas de proyectos, apertura por clic y retorno desde el shell.
- Recientes almacenados solamente en `localStorage`; el descubrimiento real siempre proviene del filesystem.
- Eliminados plugin frontend/Rust de diálogo y permisos asociados.
- Añadida protección web para no invocar APIs nativas fuera de Tauri y mensajes amigables con `console.error` para diagnóstico.

### Verificación

- `pnpm typecheck`, `pnpm lint`, `pnpm test`, `pnpm build` y `cargo check`: correctos.
- `pnpm tauri:dev`: arrancó correctamente; el proceso fue cerrado después.
- No se pudo automatizar el clic completo dentro de la ventana nativa desde esta sesión, por lo que no se creó un proyecto temporal en Documentos.

## 2026-08-20 — Interfaz avanzada del Assistant

### Realizado

- Añadido `AssistantProvider` con estado central para modo, chats, preferencias y mensajes locales.
- Implementados modos `DOCKED`, `FLOATING`, `MAXIMIZED` y `HIDDEN` dentro de la ventana React.
- Añadido `react-rnd` como única dependencia nueva para mover y redimensionar el panel flotante.
- Añadidos límites de tamaño/posición, restauración del modo anterior y persistencia de preferencias.
- Implementados chats múltiples con General inicial, crear, cambiar, renombrar, eliminar con confirmación y respaldo automático de General.
- Composer funcional con Enter, Shift+Enter, botón desactivado en vacío y respuesta local sin IA.
- Añadido contexto actual derivado de la sección activa, sin cambiar el chat al navegar.
- Ajustados z-index de Dialog, Dropdown y Tooltip para convivir con el panel flotante.

### Decisiones

- Los chats son almacenamiento temporal de interfaz y no contienen el canon narrativo.
- Markdown y archivos de proyecto SUMI siguen siendo la fuente oficial.
- OpenCode, SDK, sesiones, proveedores, modelos y credenciales no fueron conectados.

### Verificación

- `pnpm typecheck`, `pnpm lint` y `pnpm test`: correctos, 19 pruebas.
- `pnpm build` y `cargo check`: correctos.
- `pnpm tauri:dev`: inició correctamente; los procesos de desarrollo fueron cerrados después.

## 2026-08-20 — UX del drawer de conversaciones

### Realizado

- Cambiado el branding visible de `SUMI Assistant` a `Agent` sin renombrar tipos internos.
- Añadido botón hamburguesa con tooltip y estados accesibles para abrir/cerrar conversaciones.
- Refactorizada la lista de chats para funcionar como drawer React superpuesto, no como columna permanente.
- Añadida capa de fondo sutil y cierre por selección, Escape, clic exterior y cambio de modo.
- Eliminada la lógica `narrow` y el ancho fijo de `148px`; ChatView usa prácticamente todo el panel.
- Conservadas creación, selección, renombrado, eliminación y confirmación de chats.
- Conservado el contexto actual compacto y la funcionalidad docked/floating/maximized/hidden.

### Alcance

- No se conectó OpenCode ni se modificaron Biblioteca, proyectos, Markdown, temas o navegación principal.

### Verificación

- `pnpm typecheck`, `pnpm lint` y `pnpm test`: correctos, 21 pruebas.
- `pnpm build`: correcto.
- `pnpm tauri:dev`: inició correctamente con el puerto limpio; el proceso fue cerrado después.

## 2026-08-20 — UX del toggle del sidebar

### Realizado

- Unificado el control de expandir/contraer en un único botón absoluto situado en la cabecera derecha del sidebar.
- Añadidos iconos y labels accesibles dinámicos: `Contraer menú` y `Expandir menú`.
- Añadido tooltip correspondiente y foco visible.
- Eliminado el control duplicado del footer del sidebar contraído.
- Añadida prueba del ciclo expandir/contraer y ausencia del botón inferior.

### Alcance

- No se modificaron navegación, Assistant, Biblioteca, proyectos, temas, Markdown ni lógica narrativa.

### Verificación

- `pnpm typecheck`, `pnpm lint` y `pnpm test`: correctos, 22 pruebas.
- `pnpm build`: correcto.
- `pnpm tauri:dev`: inició correctamente y quedó cerrado después de la comprobación.

## 2026-08-20 — Acción de Biblioteca en sidebar contraído

### Realizado

- `Volver a biblioteca` ahora permanece visible como icono cuando el sidebar está contraído.
- Se conserva un único botón lógico y la misma acción `onCloseProject` en ambos estados.
- Añadidos `aria-label`, tooltip lateral y foco visible para el estado contraído.
- Configuración no fue modificada.
- Añadida prueba de retorno a Biblioteca desde el sidebar contraído.

### Alcance

- No se modificaron navegación, Assistant, Biblioteca, proyectos, temas, Markdown ni lógica narrativa.

### Verificación

- `pnpm typecheck`, `pnpm lint` y `pnpm test`: correctos, 23 pruebas.
- `pnpm build`: correcto.
- `pnpm tauri:dev`: inició correctamente y quedó cerrado después de la comprobación.

## 2026-08-20 — Fase: rediseño de Inicio

### Realizado

- Reorganizado Inicio como escritorio principal del escritor, con un hero que muestra el nombre real de la novela abierta.
- Añadidas acciones rápidas para Nueva idea, Personajes, Manuscrito y Área de trabajo.
- Convertidas las tarjetas de estado en accesos clicables y accesibles hacia Ideas, Personajes, Manuscrito y Revisión.
- Añadidos estados vacíos para Continuar trabajando, Pendientes narrativos y Actividad reciente sin inventar contenido.
- Añadido `HomeStats` con ceros temporales como punto de sustitución para datos Markdown futuros.
- Área de trabajo queda como placeholder: “Esta sección se implementará en una próxima fase.”

### Alcance

- No se conectaron Markdown, estadísticas reales, OpenCode, IA, editor ni funcionalidades de Área de trabajo, personajes o capítulos.

### Verificación

- `pnpm typecheck`, `pnpm lint`, `pnpm test` (25 pruebas), `pnpm build` y `pnpm tauri:dev`: correctos; Tauri inició y fue cerrado después de la comprobación.

## 2026-08-20 — Fase: Home de la novela

### Realizado

- Reorganizado Inicio como Home general de la novela, separado conceptualmente de la futura Área de trabajo.
- Simplificado el hero para mostrar el nombre real, la frase “Tu historia, de un vistazo.” y una única acción de Área de trabajo.
- Añadida Captura rápida con textarea editable, `Guardar idea` local y aviso explícito de que todavía no se escribe en Markdown/Inbox.
- Reducida la navegación redundante de Home; el resumen conserva solo Estado de la historia, Necesita tu atención y Actividad reciente.
- Dividido Home en `HomeHero`, `QuickCapture`, `StoryOverview`, `NeedsAttention` y `RecentActivity`.
- Conservados `HomeStats` y los cuatro valores placeholder `0`.

### Alcance

- No se implementaron Área de trabajo, editor, escenas, capítulos funcionales, Markdown real, OpenCode, IA, estadísticas reales, base de datos ni actividad real.

### Verificación

- `pnpm typecheck`, `pnpm lint`, `pnpm test` (26 pruebas), `pnpm build` y `pnpm tauri:dev`: correctos; Tauri inició y fue cerrado después de la comprobación.

## 2026-08-28 — Refactor interno del Área de trabajo

### Realizado

- Dividido `WorkspaceSection` por responsabilidades: estado/orquestación, componentes compartidos, sheets y stages.
- Conectados los componentes `WorkspaceStart`, `WorkspaceHeader`, `WorkspaceStageTabs`, `WorkspaceNavigator` y `WorkspaceStatusBar` al orquestador.
- Extraídas y conectadas las fases Idea, Planificación, Borrador, Revisión y Final con props específicas.
- Centralizadas las actualizaciones de idea, beats y checklist sin cambiar el modelo local.
- Compartido `StageFrame` entre las cinco fases para eliminar duplicación estructural.

### Alcance

- Se conservó el comportamiento público y la UI existente, incluida la estructura corregida del scroll y el modo concentración.
- Los datos siguen siendo temporales en estado React; no se añadió persistencia, funcionalidad narrativa, conexión Markdown ni OpenCode.

## 2026-08-25 — Status bar estructural del Área de trabajo

### Causa

- El `main` de `MainLayout` era el scroll vertical exterior y el Workspace colocaba el footer después de un contenido con `min-h-full`, por lo que el Status Bar podía desplazarse con el documento o quedar visualmente en una posición incorrecta.

### Solución

- `MainLayout` permite desactivar su scroll exterior únicamente para Workspace.
- El Workspace ahora usa una columna de altura disponible con `min-h-0` y `overflow-hidden`.
- La fase se renderiza dentro de un `main[data-testid="workspace-scroll-area"]` con el único `overflow-y-auto` del Workspace.
- El Status Bar queda fuera de ese nodo como `shrink-0`, después del área de contenido, sin `fixed`, `sticky`, `absolute` ni z-index especial.
- Se añadieron tests estructurales y de conteo para confirmar que el Status Bar queda fuera del scroll y que el conteo usa solo el borrador.

### Verificación

- `pnpm typecheck`: correcto.
- `pnpm lint`: correcto.
- `pnpm test -- --run --pool=threads --maxWorkers=1`: correcto, 30 pruebas.
- `pnpm build`: correcto; permanece el warning informativo del chunk grande de Tiptap.
- `pnpm tauri:dev`: compiló y abrió la ventana `SUMI`; la sesión de terminal terminó por timeout al ser un proceso interactivo.

## 2026-08-25 — Navegador de escenas del Área de trabajo

### Realizado

- Cambiado el estado inicial del navegador a cerrado en todas las ventanas.
- Consolidado el control de escenas en un único botón del encabezado con `Mostrar escenas` y `Ocultar escenas`.
- Añadido tooltip nativo y soporte accesible para el toggle.
- Añadido breadcrumb `Área de trabajo` para volver al menú inicial sin confundirse con `Inicio`.
- El panel conserva escenas, selección y creación, pero reduce su ancho y elimina el botón duplicado de cierre.
- Añadidas pruebas de estado inicial, toggle, regreso al menú y reentrada cerrada.

### Verificación

- `pnpm typecheck`: correcto.
- `pnpm lint`: correcto.
- `pnpm test -- --run --pool=threads --maxWorkers=1`: correcto, 30 pruebas.
- `pnpm build`: correcto; permanece el warning informativo del chunk grande de Tiptap.

## 2026-08-25 — Segunda pasada UX/UI del Área de trabajo

### Realizado

- Reemplazada la entrada vacía del workspace por cuatro caminos de inicio no obligatorios.
- Ajustado el microcopy de Idea, Planificación, Borrador, Revisión y Final hacia un tono cálido, claro y sin presión.
- Presentado el contexto narrativo secundario como opcional y reducido el peso visual de tarjetas, bordes y controles de planificación.
- Ampliado el espacio respirable del editor y conservadas sus herramientas básicas de formato.
- Conservados navegación, fases libres, escenas temporales, modo concentración, Agent y scroll independiente.
- Actualizadas las pruebas del flujo de workspace para cubrir el nuevo lenguaje.

### Verificación

- `pnpm typecheck`: correcto.
- `pnpm lint`: correcto.
- `pnpm test -- --run --pool=threads --maxWorkers=1`: correcto, 29 pruebas.
- `pnpm build`: correcto; permanece el warning informativo del chunk grande de Tiptap.

## 2026-08-20 — Fase: primera interfaz del Área de trabajo

### Realizado

- Sustituido el placeholder de Área de trabajo por una interfaz propia accesible desde Home.
- Añadido el tipo `WritingStage` con cinco fases: `IDEA`, `PLANNING`, `DRAFT`, `REVISION` y `FINAL`.
- Añadido navegador interno temporal para Manuscrito, escenas locales y colapsado independiente del sidebar principal.
- Añadidos formularios locales de Idea, beats editables de Planificación, checklist de Revisión y vista previa Final.
- Integrado Tiptap con toolbar mínima de negrita, cursiva, encabezado, deshacer y rehacer.
- Añadidos panel de Herramientas mediante Sheet, barra de estado temporal y conteo local de palabras.
- Añadido Modo concentración que oculta temporalmente sidebar, header global y Agent sin modificar su estado.

### Alcance

- Todo el contenido es local y temporal. No se conectaron Markdown, capítulos reales, filesystem narrativo, OpenCode, IA, continuidad, personajes reales, exportación ni estadísticas reales.

### Verificación

- `pnpm typecheck`, `pnpm lint`, `pnpm test` (28 pruebas), `pnpm build` y `pnpm tauri:dev`: correctos. Build muestra únicamente el warning de tamaño de chunk de Tiptap; Tauri inició y fue cerrado después de la comprobación.

## 2026-08-20 — Fase 2: flujo coherente del Área de trabajo

### Realizado

- Reemplazados los estados independientes por el modelo local `WorkspaceScene`, con idea, planificación, borrador y revisión compartidos.
- Añadido inicio del workspace sin escena activa, creación de escenas temporales y selección de múltiples escenas de la sesión.
- Añadida edición local del título y contexto persistente de POV, lugar y personajes sin inventar valores.
- Planificación muestra el objetivo de Idea como referencia y usa beats con IDs estables.
- Borrador y Revisión pueden consultar el mismo plan mediante Sheet; Revisión muestra el borrador en modo lectura junto al checklist y notas.
- Tiptap sincroniza `activeScene.draft.content` al montar, cambiar de escena y editar, sin crear un contenido final duplicado.
- Herramientas refleja si objetivo/notas están definidos y concentración conserva su comportamiento previo.
- Eliminada de la interfaz visible la etiqueta `Demo de interfaz`.

### Alcance

- Todo sigue en memoria React durante la sesión. No se conectaron Markdown, filesystem narrativo, capítulos reales, persistencia, OpenCode, IA, base de datos ni exportación.

### Verificación

- `pnpm typecheck`, `pnpm lint`, `pnpm test` (29 pruebas), `pnpm build` y `pnpm tauri:dev`: correctos; build conserva únicamente el warning informativo de chunk grande de Tiptap y Tauri inició y fue cerrado después de la comprobación.

## 2026-08-20 — Fase: scrollbars y scroll del layout

### Realizado

- El contenido principal conserva un scroll vertical independiente dentro de `main`.
- Añadida la clase global `sumi-scrollbar` con scrollbar fina de 7px, track transparente, thumb redondeado y hover ligeramente más visible.
- Añadidos tokens `--sumi-scrollbar` y `--sumi-scrollbar-hover`, derivados de los tokens existentes de borde y texto para funcionar en los cuatro temas.
- Añadido `overflow-x-hidden` y `overscroll-contain` únicamente al contenedor central para evitar overflow horizontal y scroll chaining.
- Sidebar y Agent no fueron rediseñados ni mezclados con el scroll principal.

### Alcance

- No se modificaron Home, Sidebar, Agent, Biblioteca, proyectos, navegación, Markdown, IA ni OpenCode.

### Verificación

- `pnpm typecheck`, `pnpm lint`, `pnpm test` (26 pruebas), `pnpm build` y `pnpm tauri:dev`: correctos; Tauri inició y fue cerrado después de la comprobación.
