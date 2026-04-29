import js from "@eslint/js";
import globals from "globals";
import css from "@eslint/css";
import preact from "eslint-config-preact";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"],
    plugins: { js },
    extends: [ "js/recommended", preact, eslintConfigPrettier ],
    languageOptions: { globals: globals.browser },
  },
  { files: ["**/*.css"], plugins: { css }, language: "css/css", extends: ["css/recommended"] },
]);
