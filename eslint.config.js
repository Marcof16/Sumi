import js from "@eslint/js";
import tseslint from "typescript-eslint";
import reactRefresh from "eslint-plugin-react-refresh";

export default tseslint.config(
  { ignores: ["dist", "src-tauri", "node_modules"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  { files: ["**/*.{ts,tsx}"], plugins: { "react-refresh": reactRefresh }, rules: { "react-refresh/only-export-components": "warn" } },
  { files: ["src/components/ui/**/*.{ts,tsx}"], rules: { "react-refresh/only-export-components": "off" } },
);
