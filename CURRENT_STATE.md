# Estado Actual

## Preview web Cloudflare — 2026-09-20

- Wrangler `4.135.0` quedó instalado como dependencia de desarrollo local.
- `wrangler.jsonc` sirve `dist/` mediante Workers Static Assets con fallback SPA.
- La allowlist de pnpm 11 autoriza únicamente los scripts existentes de `esbuild` y `workerd`; la instalación congelada ejecuta `workerd` sin `ERR_PNPM_IGNORED_BUILDS`.
- Se añadieron `build:web`, `preview:cloudflare` y `deploy:cloudflare` sin modificar `build`, `dev` ni los comandos Tauri.
- No se modificó `vite.config.ts`, `src-tauri` ni la detección de entorno Tauri. Las funciones nativas ya degradan de forma segura en navegador.
- Verificación: `pnpm install --frozen-lockfile`, `pnpm run build:web`, `pnpm run build`, `pnpm test` (37 pruebas), `pnpm lint` y `pnpm exec wrangler deploy --dry-run` correctos.

## Estado actual

SUMI administra una biblioteca local en `Documentos/SUMI/Novelas`, donde crea y descubre proyectos de novela basados en Markdown. Puede mantener un único proyecto abierto y volver a la Biblioteca sin borrar archivos. La información narrativa vive en Markdown; `sumi.json` solo identifica el proyecto y contiene metadatos mínimos.

## Herramientas detectadas

- OpenCode: `1.18.4`
- Git: `2.52.0.windows.1`
- Node.js: `v24.18.0`
- npm: `11.16.0`
- pnpm: `11.22.0`
- rustup: `1.29.0`
- Rust/cargo/rustc: `1.97.1` (`stable-x86_64-pc-windows-msvc`)
- Tauri CLI: `2.11.4`
- Microsoft Visual Studio Build Tools 2022: `17.14.37614.0`, workload VC Tools instalado y completo
- Microsoft Edge WebView2 Runtime detectado: `151.0.4129.86` y `151.0.4129.93`

Rust está instalado en `C:\Users\garci\.cargo\bin`, pero esa ruta no está disponible en el `PATH` persistente de algunas sesiones nuevas.

## Dependencias principales

React, React DOM, `@tauri-apps/api`, `@tauri-apps/plugin-fs`, `@tauri-apps/plugin-opener`, Tiptap (`@tiptap/react`, `@tiptap/starter-kit`), `@xyflow/react`, Lucide, Tailwind CSS, Radix UI, `class-variance-authority`, `clsx` y `tailwind-merge`.

Herramientas de desarrollo: TypeScript, Vite, ESLint, Prettier, Vitest, jsdom y Testing Library para React.

## Archivos importantes

- `src/App.tsx`: estado de proyecto y selección entre Biblioteca y shell.
- `src/features/projects/`: manifiesto, plantillas, servicios de biblioteca, contexto y UI de proyectos.
- `src/components/ui/`: Button, Card, Input, Textarea, Dialog, Sheet, Tabs, ScrollArea, Separator, Badge, Tooltip y DropdownMenu.
- `src/styles/globals.css`, `vite.config.ts` y `tsconfig.json`: estilos, Tailwind, alias `@/*` y configuración frontend.
- `src-tauri/tauri.conf.json`: aplicación visible como SUMI e identificador `com.sumi.app`.
- `src-tauri/Cargo.toml`, `src-tauri/src/lib.rs`: Tauri y plugins opener/fs.
- `src-tauri/capabilities/default.json`: permisos filesystem limitados a Documentos y operaciones de biblioteca.
- `package.json`, `pnpm-lock.yaml` y `pnpm-workspace.yaml`: dependencias, lockfile y autorización de build de esbuild.
- `AGENTS.md`, `README.md` y los documentos de memoria de esta raíz.

## Preparación para GitHub — 2026-09-14

- Se corrigieron el idioma, título y descripción de la página HTML para mostrar la identidad de SUMI.
- Se fijó `pnpm@11.22.0` en `package.json` para instalaciones reproducibles.
- Se actualizó el README con el estado real del MVP, estructura actual, requisitos y comandos de verificación.
- Se añadió `.github/workflows/ci.yml` para ejecutar typecheck, lint, tests y build en pushes y pull requests.
- `dist`, `src-tauri/target`, `node_modules` y archivos `.env` permanecen excluidos por Git.
- Las verificaciones locales pasan: typecheck, lint, 37 tests y build; la build mantiene solo el warning informativo del chunk grande.

## Trabajo realizado

- Se creó el proyecto con `create-tauri-app` usando Tauri 2, React TypeScript, Vite, pnpm e identificador `com.sumi.app`.
- Se instaló y configuró pnpm, Rust estable MSVC, Microsoft C++ Build Tools y se verificó WebView2 existente.
- Se añadió el plugin oficial FS de Tauri y permisos declarados de alcance predeterminado.
- Se añadieron librerías base, componentes UI, ESLint, Prettier, Vitest y una prueba mínima.
- Se sustituyó la demo genérica por la pantalla temporal de SUMI.
- Se definió el formato `sumi-project` versión 1 y la estructura Markdown inicial.
- Se implementaron Nueva novela, Abrir novela, Cerrar proyecto y validación de `sumi.json`.
- Se añadió el nombre dinámico del proyecto al header y sidebar.
- Se implementó la Biblioteca local administrada en `Documentos/SUMI/Novelas`.
- Crear novela ya no solicita carpeta; la Biblioteca descubre automáticamente proyectos SUMI válidos.
- Se añadieron proyectos recientes en `localStorage`, tarjetas de novela y retorno a Biblioteca.

## Trabajo incompleto

- El repositorio Git local se inicializó el 2026-09-14 y está publicado en `https://github.com/Marcof16/Sumi.git` sobre la rama `main`.
- El empaquetado instalable de `pnpm tauri:build` todavía no está confirmado porque la fase WiX no terminó.
- Las secciones narrativas siguen siendo placeholders; todavía no leen ni editan sus archivos Markdown.
- La prueba manual de clics dentro de la ventana Tauri no pudo automatizarse desde esta sesión; el arranque nativo sí fue verificado.

## Errores actuales

El bloqueo 4551 de Code Integrity quedó resuelto después de que el usuario desactivó manualmente Smart App Control. SUMI no modificó ninguna configuración de seguridad de Windows.

## Git

Git está instalado y `sumi_nobel_0` ya es un repositorio Git local, sin remoto configurado todavía.

## Verificación histórica previa al diagnóstico

- TypeScript typecheck: ✅ correcto (`pnpm typecheck`).
- ESLint: ✅ correcto (`pnpm lint`).
- Tests: ✅ correcto, 1 prueba (`pnpm test`).
- Frontend build: ✅ correcto (`pnpm build`).
- Tauri/Rust: ✅ `cargo check` correcto usando un target temporal; el target predeterminado fue bloqueado por la misma política de Windows.
- `tauri dev`: ❌ compiló el ejecutable, pero Windows bloqueó su ejecución con error 4551.
- Tauri build: ❌ bloqueado durante la compilación de `serde_core` y `proc-macro2`; Windows impidió ejecutar sus scripts con error 4551.

## Verificación del 2026-08-19

- TypeScript typecheck: ✅ correcto (`pnpm typecheck`).
- ESLint: ✅ correcto (`pnpm lint`).
- Tests: ✅ correcto, 1 prueba (`pnpm test`).
- Frontend build: ✅ correcto (`pnpm build`).
- Tauri dev: ✅ compiló y abrió una ventana con título `SUMI`; la ventana se cerró normalmente después de la comprobación.
- Tauri release compilation: ✅ generó `src-tauri\target\release\sumi_nobel_0.exe`.
- Tauri installer bundle: ⚠️ no finalizado; Tauri llegó a la fase WiX y la herramienta agotó el tiempo mientras descargaba/verificaba WiX. No existe `src-tauri\target\release\bundle`.

## Diagnóstico de Code Integrity del 2026-08-19

- `CiTool.exe` existe en `C:\Windows\System32\CiTool.exe`.
- `CiTool.exe -lp` no pudo listar las políticas porque devolvió `0x80070005` (acceso denegado). No se ejecutó ninguna acción de modificación.
- En las últimas 24 horas se encontraron 17 eventos 3077, 34 eventos 3089 y 12 eventos 3099. No se encontraron eventos 3076.
- Los eventos 3077 identifican como política bloqueadora `VerifiedAndReputableDesktop`, Policy ID `27555.1000.240208`, con estado `0xc0e90002`.
- El proceso padre registrado es `cargo.exe` del toolchain Rust estable.
- Los archivos bloqueados son ejecutables no firmados generados durante la compilación: scripts `build-script-build.exe` de `anyhow`, `tauri-plugin-fs`, `tauri-plugin-opener`, `proc-macro2`, `serde_core` y el paquete raíz de SUMI.
- También fue bloqueado el ejecutable `SUMI` generado en una carpeta temporal de Cargo bajo `%TEMP%`.
- Los eventos 3089 asociados muestran editor desconocido, cero firmas y nivel de firma validado `0`; esto confirma que los binarios generados no cumplen el nivel requerido por la política.
- Las rutas observadas están dentro de `src-tauri\target\debug`, `src-tauri\target\release` y `%TEMP%\opencode\sumi-cargo-target`; no se observaron bloqueos en `.cargo`.
- `dsregcmd /status` informó `AzureAdJoined: NO`, `EnterpriseJoined: NO`, `DomainJoined: NO` y `WorkplaceJoined: NO`; no informó URL MDM. La clave local de inscripciones existe y contiene 35 subclaves, pero ese hecho aislado no demuestra administración organizativa activa.
- Diagnóstico provisional: los eventos son compatibles principalmente con Smart App Control / política de reputación de aplicaciones (caso A), no con una política administrada por organización. La clasificación no puede considerarse absoluta hasta listar las políticas con `CiTool -lp` desde una consola con permisos suficientes.

## Verificación posterior a la desactivación manual de Smart App Control

- TypeScript typecheck: ✅ correcto (`pnpm typecheck`).
- ESLint: ✅ correcto (`pnpm lint`).
- Tests: ✅ correcto, 1 prueba (`pnpm test`).
- Frontend build: ✅ correcto (`pnpm build`).
- PATH de Rust: ✅ `cargo 1.97.1` y `rustc 1.97.1` disponibles desde `C:\Users\garci\.cargo\bin`.
- `pnpm tauri:dev`: ✅ compiló sin error 4551, abrió la ventana `SUMI` y se cerró normalmente.
- `pnpm tauri:build`: ⚠️ compiló el ejecutable release, pero no terminó el bundle instalable al quedar en la fase WiX.

## Shell visual del MVP — 2026-08-19

- Se sustituyó la pantalla temporal por la estructura principal de SUMI: sidebar, contenido central y panel visual del asistente.
- La navegación React incluye Inicio, Ideas, Personajes, Mundo, Magia, Cronología, Trama, Manuscrito y Revisión.
- El sidebar puede contraerse y muestra tooltips cuando está en modo compacto.
- Cada sección tiene una vista placeholder reutilizable; Inicio e Ideas tienen estados vacíos propios.
- El panel `SUMI Assistant` muestra el contexto de la sección activa, el badge `No conectado` y un textarea desactivado.
- No se implementaron OpenCode, IA, Markdown, almacenamiento, base de datos, Tiptap, React Flow ni lógica narrativa.
- Verificación frontend: ✅ typecheck, lint, 3 tests y build.
- Verificación Tauri: ✅ `tauri:dev` abrió la ventana `SUMI` y se cerró normalmente; no se ejecutó `tauri:build`.

## Temas visuales — 2026-08-19

- Se añadió un sistema de tokens mediante variables CSS para superficies, texto, bordes, acciones y acentos.
- Se añadieron los temas base Pergamino, Noche, Bosque y Ciruela.
- Configuración incluye un selector de tema en un diálogo accesible; la elección se conserva localmente.
- Ideas, Personajes, Mundo, Magia, Cronología, Trama, Manuscrito y Revisión tienen acentos suaves independientes que respetan el tema activo.
- Se conservaron el layout principal, el sidebar, el contenido placeholder y el panel asistente; no se añadió personalización libre.
- Verificación: ✅ typecheck, lint, 4 tests y build.

## Proyectos de novela y Markdown — 2026-08-20

- Se añadió el formato `sumi.json` con `format`, `version`, `name` y `createdAt`.
- Los proyectos nuevos generan la estructura Markdown solicitada y plantillas breves.
- La apertura valida formato, versión compatible, nombre y fecha sin modificar carpetas inválidas.
- La interfaz muestra bienvenida sin proyecto, permite crear/abrir, muestra el nombre del manifiesto y permite cerrar.
- Verificación: ✅ typecheck, lint, 10 tests, build y `cargo check`.

## Temas y contraste — 2026-08-20

- Reforzada la jerarquía de tokens de fondo, superficies, bordes y textos en Pergamino, Noche, Bosque y Ciruela.
- Sidebar, header y AssistantPanel usan superficies opacas y bordes distinguibles para mantener límites claros en pantallas de bajo contraste.
- El selector rápido de tema se movió al header con tooltip y `aria-label`; Configuración permanece en el sidebar sin duplicar el selector.
- No se modificaron proyectos, Markdown, filesystem, navegación ni layout general.
- Verificación: ✅ typecheck, lint, 10 tests, build y `tauri:dev`; la ventana inició correctamente y quedó cerrada tras la comprobación.

## Biblioteca local — 2026-08-20

- La raíz de biblioteca se resuelve con la API Tauri `documentDir()` y `join(documentDir, "SUMI", "Novelas")`.
- `ensureLibraryExists()` crea la raíz y `scanLibrary()` solo muestra subdirectorios con manifiestos válidos.
- Carpetas inválidas o corruptas se ignoran y se registran con `console.warn`; no se modifican.
- Crear novela valida nombres Windows, rechaza duplicados y genera la estructura Markdown existente dentro de la biblioteca.
- La interfaz web no llama APIs nativas y muestra una indicación para ejecutar `pnpm tauri:dev`.
- Verificación: ✅ typecheck, lint, 13 tests, build, `cargo check` y arranque de `tauri:dev`.

## Assistant IA — 2026-08-20

- `SUMI Assistant` soporta modos `DOCKED`, `FLOATING`, `MAXIMIZED` y `HIDDEN`.
- El modo flotante usa `react-rnd`, con mínimo de 320x380, límites relativos al workspace, posición acotada y arrastre únicamente desde el header.
- El Assistant soporta múltiples chats locales, con `General` inicial, creación, cambio, renombrado, eliminación confirmada y un chat de respaldo.
- Los chats y preferencias visuales se guardan temporalmente en `localStorage` mediante `assistantStorage.ts`.
- El contexto visible cambia con la sección activa sin cambiar el chat seleccionado.
- Los mensajes de prueba solo guardan el mensaje del usuario y muestran que OpenCode todavía no está conectado.
- El historial del chat no es fuente de verdad narrativa; Markdown continúa siendo la fuente oficial.
- OpenCode no está integrado.
- Verificación: ✅ typecheck, lint, 19 tests, build, `cargo check` y `tauri:dev`; la ventana inició correctamente y quedó cerrada después.

## Assistant UX — 2026-08-20

- El nombre visible provisional del asistente es `Agent`; los tipos y providers internos conservan sus nombres actuales.
- La lista de conversaciones está oculta por defecto y se abre mediante el botón hamburguesa `Conversaciones`.
- El drawer se superpone a la conversación, usa un ancho adaptable de 220–300px y no consume ancho permanentemente.
- El drawer se cierra al seleccionar una conversación, pulsar Escape, hacer clic fuera o cambiar de modo.
- El contexto actual permanece visible de forma compacta y la conversación ocupa todo el ancho disponible.
- Verificación: ✅ typecheck, lint, 21 tests, build y `tauri:dev`; la ventana inició correctamente y quedó cerrada después.

## Sidebar UX — 2026-08-20

- El control de expandir/contraer es único y permanece en la zona superior derecha del sidebar en ambos estados.
- Cambia entre `PanelLeftClose`/`PanelLeftOpen` y los labels `Contraer menú`/`Expandir menú`.
- Se eliminó el botón inferior que aparecía al contraer el sidebar.
- Verificación: ✅ typecheck, lint, 22 tests, build y `tauri:dev`; la ventana inició correctamente y quedó cerrada después.

## Sidebar library action — 2026-08-20

- `Volver a biblioteca` permanece disponible en sidebar expandido y contraído mediante la misma acción `onCloseProject`.
- En modo contraído muestra solo `LogOut`, `aria-label="Volver a biblioteca"` y tooltip lateral.
- Configuración conserva su comportamiento expandido/contraído.
- Verificación: ✅ typecheck, lint, 23 tests, build y `tauri:dev`; la ventana inició correctamente y quedó cerrada después.

## Rediseño de Inicio — 2026-08-20

- Inicio fue reorganizado como el escritorio principal del escritor, con hero, acciones rápidas, estado del proyecto y estados vacíos orientados a escritura.
- El hero muestra el nombre real del proyecto abierto desde el manifiesto y ofrece Área de trabajo como próxima función.
- Las acciones rápidas y las tarjetas de estado navegan mediante el estado React existente hacia Ideas, Personajes, Manuscrito y Revisión.
- Área de trabajo solo muestra un placeholder local; no implementa etapas, escenas, borradores, kanban ni editor.
- Las estadísticas usan `HomeStats` con valores placeholder `0` hasta conectar Markdown; no se inventan datos narrativos.
- Verificación: ✅ typecheck, lint, 25 tests, build y `tauri:dev`; Tauri compiló, ejecutó la aplicación y quedó cerrado después de la comprobación.

## Home de la novela — 2026-08-20

- Inicio es el Home general de la novela: una visión breve del estado, atención, captura e historial vacío.
- El hero contiene una única entrada principal a Área de trabajo, que sigue mostrando un placeholder provisional.
- Área de trabajo queda definida como una sección distinta y futura para desarrollar escenas, capítulos y borradores.
- Home muestra Captura rápida con textarea local; `Guardar idea` solo informa que el guardado en Inbox se conectará en una próxima fase y no escribe Markdown.
- Estado de la historia continúa usando `HomeStats` con cuatro valores placeholder `0`.
- Pendientes narrativos y actividad reciente siguen siendo estados vacíos sin datos reales.
 - Verificación: ✅ typecheck, lint, 26 tests, build y `tauri:dev`; Tauri compiló, inició la aplicación y fue cerrado después de la comprobación.

## Corrección de actualizaciones Tiptap — 2026-08-28

- `WorkspaceEditor` utiliza una única ruta de actualización Tiptap → React mediante `onUpdate`.
- Se eliminó el `onInput` DOM redundante que podía notificar dos veces una misma edición.
- La sincronización externa React → Tiptap conserva la comparación previa y `setContent(..., { emitUpdate: false })`.
- No se modificaron el modelo `WorkspaceScene`, la UI, persistencia, Markdown ni OpenCode.

## Render seguro del borrador — 2026-08-28

- `DraftReadOnly` utiliza un componente Tiptap read-only con `StarterKit` para interpretar el HTML almacenado mediante el schema permitido.
- El render de lectura ya no inyecta HTML narrativo con `dangerouslySetInnerHTML`.
- Se conservaron `scene.draft.content`, el formato rico visible y el estado vacío; no se añadió persistencia.
- Markdown y OpenCode continúan sin conectarse.

## Refactor interno del Área de trabajo — 2026-08-28

- `WorkspaceSection` fue reducido a un orquestador de estado local, selección de escena/fase, concentración y composición del layout.
- Header, tabs, navegador, pantalla inicial, sheets, status bar y las cinco fases viven ahora en módulos separados por responsabilidad.
- Se conservaron el modelo temporal `WorkspaceScene`, el conteo desde el borrador, la estructura de scroll y el comportamiento público existente.
- No se añadió persistencia, funcionalidad narrativa, conexión Markdown ni integración con OpenCode.

## Status bar estructural del Área de trabajo — 2026-08-25

- El Workspace usa una estructura vertical con `h-full`, `min-h-0` y `overflow-hidden` en su raíz.
- Únicamente el contenido de la fase dentro de `workspace-scroll-area` es scrollable; el navegador de escenas queda fuera de ese scroll lateral.
- `workspace-status-bar` es un elemento `shrink-0` posterior al área scrollable y permanece estructuralmente anclado abajo, sin `fixed`, `sticky`, `absolute` ni overlay.
- `MainLayout` desactiva solo su scroll exterior mientras `workspaceOpen` está activo para evitar doble scroll; las demás secciones conservan su comportamiento.
- El contador continúa leyendo exclusivamente `activeScene.draft.content` mediante `countWordsFromHtml`; Idea, Planificación y Revisión no se suman.
- Verificación: ✅ typecheck, lint, 30 tests, build y arranque de `tauri:dev`.

## Navegador de escenas y regreso al workspace — 2026-08-25

- El navegador de escenas inicia oculto para que el editor sea el espacio principal.
- Un único toggle del encabezado muestra u oculta escenas, con icono, `aria-label` y tooltip nativo dinámicos.
- El panel abierto conserva un ancho moderado de 13rem a 14rem y no añade un control duplicado dentro del panel.
- El breadcrumb `Área de trabajo` devuelve al menú inicial y cierra el navegador; al crear o elegir una escena desde ese menú vuelve a iniciar cerrado.
- Abrir/cerrar el panel no modifica la fase ni el contenido de la escena.
- Verificación: ✅ typecheck, lint, 30 tests y build.

## Segunda pasada UX/UI del Área de trabajo — 2026-08-25

- La entrada al Área de trabajo ofrece cuatro caminos opcionales: Escribir, Desarrollar una idea, Ordenar mi historia y Revisar.
- Las fases siguen siendo pestañas libres; la interfaz comunica que se puede cambiar de fase sin seguir un orden obligatorio.
- Idea usa lenguaje de acompañamiento y presenta POV, Personajes y Lugar como contexto opcional.
- Planificación usa momentos editables y un estado vacío que permite escribir primero y ordenar después.
- Borrador tiene más espacio visual; Revisión y Final explican su propósito sin sugerir que la novela está terminada.
- Se conservan navegador, modo concentración, Agent, modelo temporal y estructura de scroll del shell.
- Verificación: ✅ typecheck, lint, 29 tests y build.

## Primera interfaz del Área de trabajo — 2026-08-20

- Área de trabajo reemplaza el placeholder anterior y se abre desde Home sin añadir una entrada permanente al sidebar.
- El workspace usa cinco fases locales: `IDEA`, `PLANNING`, `DRAFT`, `REVISION` y `FINAL`.
- Incluye elemento temporal `Sin título · Escena · Demo de interfaz`, navegador interno colapsable y panel de herramientas futuro.
- Idea, planificación, borrador Tiptap, revisión, vista final, checklist, beats, notas y conteo de palabras son estado React local.
- Modo concentración oculta temporalmente sidebar, header global y Agent sin cambiar ni eliminar su estado.
- Markdown, filesystem narrativo, capítulos reales, IA, OpenCode y persistencia siguen desconectados.
- Verificación: ✅ typecheck, lint, 28 tests, build y `tauri:dev`; Tauri compiló, inició la aplicación y fue cerrado después de la comprobación.

## Fase 2 — Flujo coherente del Área de trabajo — 2026-08-20

- El Área de trabajo opera sobre escenas; las cinco fases son vistas del mismo objeto narrativo `WorkspaceScene`.
- El modelo local incluye identidad, fase, idea, planificación con `WorkspaceBeat` estable, borrador y revisión.
- La entrada muestra una pantalla inicial sin escena activa; Nueva escena crea una escena temporal `Sin título` en fase Idea.
- Workspace soporta múltiples escenas temporales locales y selección independiente durante la sesión.
- Los datos de una escena permanecen entre cambios de fase y el contenido Tiptap se sincroniza desde/hacia `activeScene.draft.content`.
- Planificación y Revisión pueden consultar el objetivo/beats mediante un panel temporal; Herramientas refleja los datos locales definidos.
- Todo sigue siendo temporal y no persistente; Markdown, filesystem narrativo y OpenCode no están conectados.
- Verificación: ✅ typecheck, lint, 29 tests, build y `tauri:dev`; Tauri compiló, inició la aplicación y fue cerrado después de la comprobación.

## Scroll del layout — 2026-08-20

- El contenido principal usa scroll vertical independiente dentro de `main`; el shell completo mantiene `overflow-hidden`.
- La scrollbar central usa la clase reutilizable `sumi-scrollbar`, tokens visuales de SUMI y un thumb fino con hover discreto.
- Sidebar y Agent permanecen independientes del scroll principal; Agent docked conserva su panel fijo y su scroll interno de conversación.
- El contenido central corta únicamente su overflow horizontal con `overflow-x-hidden` y usa `overscroll-contain` para evitar propagación del scroll.
- Verificación: ✅ typecheck, lint, 26 tests, build y `tauri:dev`; Tauri compiló, inició la aplicación y fue cerrado después de la comprobación.
