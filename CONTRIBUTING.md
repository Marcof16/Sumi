# Contribuir a SUMI

## Preparar el entorno

1. Instala Node.js, pnpm, Rust y las herramientas requeridas por Tauri 2.
2. Ejecuta `pnpm install --frozen-lockfile`.
3. Usa `pnpm tauri:dev` para ejecutar la aplicacion de escritorio.

## Antes de abrir una pull request

Ejecuta todas las comprobaciones del proyecto:

```text
pnpm typecheck
pnpm lint
pnpm test
pnpm build
```

Mantén los cambios enfocados, actualiza las pruebas cuando corresponda y no
incluyas credenciales, archivos `.env`, dependencias instaladas ni carpetas de
build.

## Commits

Usa mensajes breves y descriptivos, preferiblemente con un prefijo como
`feat:`, `fix:`, `docs:` o `chore:`.
