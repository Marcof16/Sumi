# SUMI

Aplicación de escritorio para organizar y escribir novelas. SUMI se encuentra en una
fase inicial de desarrollo.

## Estado

El MVP incluye una biblioteca local de novelas, creación y apertura de proyectos,
temas visuales, navegación por secciones y un Área de trabajo temporal. El contenido
narrativo y el asistente todavía no están conectados a Markdown ni a OpenCode.

## Tecnologías

- Tauri 2 proporciona la aplicación de escritorio y su backend Rust.
- React y TypeScript construyen la interfaz; Vite sirve y empaqueta el frontend.
- Tailwind CSS y componentes base compatibles con shadcn/ui forman la capa visual.
- Tiptap queda preparado para edición rica y `@xyflow/react` para diagramas futuros.
- Vitest y Testing Library proporcionan pruebas básicas.

## Carpetas principales

- `src/`: código React (`components/ui` contiene componentes reutilizables).
- `src-tauri/`: configuración, permisos y código Rust de Tauri.
- `tests/`: configuración y pruebas del frontend.
- `public/`: recursos estáticos públicos.
- `src/features/`: funcionalidades organizadas por dominio.
- `src/components/`: componentes compartidos y componentes UI reutilizables.
- `src/lib/` y `src/styles/`: utilidades y estilos globales.

## Comandos

Instala dependencias con `pnpm install`.

- `pnpm dev`: servidor web de Vite.
- `pnpm tauri:dev`: ejecuta SUMI como aplicación Tauri.
- `pnpm lint`: comprueba ESLint.
- `pnpm typecheck`: comprueba TypeScript.
- `pnpm test`: ejecuta las pruebas.
- `pnpm build`: genera la build del frontend.
- `pnpm tauri:build`: genera la build de escritorio.
- `pnpm preview`: previsualiza la build web.
- `pnpm format`: aplica Prettier.

## Desarrollo

Requisitos: Node.js, pnpm, Rust y las herramientas de compilación necesarias para
Tauri 2. Usa `pnpm install --frozen-lockfile` para instalar exactamente las
dependencias del lockfile.

Antes de abrir una pull request, ejecuta:

```text
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

La compilación del instalador de escritorio puede requerir WiX en Windows.
