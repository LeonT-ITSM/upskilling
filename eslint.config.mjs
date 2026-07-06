import js from "@eslint/js";
import tseslint from "typescript-eslint";
import security from "eslint-plugin-security";
import prettier from "eslint-config-prettier";

export default tseslint.config(
  js.configs.recommended,
  ...tseslint.configs.recommended,
  security.configs.recommended,
  prettier,
  {
    files: ["server/**/*.ts"],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
  },
  {
    ignores: ["dist/**", "node_modules/**", "public/**"],
  }
);
