import { defineConfig } from "eslint/config";
import preact from "eslint-config-preact";
import eslintConfigPrettier from "eslint-config-prettier";

export default defineConfig([
  {
    extends: {
      preact,
      eslintConfigPrettier,
    },
  },
]);
