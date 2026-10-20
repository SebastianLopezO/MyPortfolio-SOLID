import js from "@eslint/js";
import globals from "globals";
import solid from "eslint-plugin-solid/configs/typescript";
import tseslint from "typescript-eslint";

export default tseslint.config(
    {ignores: ["dist", "dist-ssr", "public", "coverage", "playwright-report", "test-results", ".lighthouseci", ".vite"]},
    {
        extends: [js.configs.recommended, ...tseslint.configs.recommended],
        files: ["**/*.{ts,tsx}"],
        languageOptions: {
            ecmaVersion: 2022,
            globals: globals.browser,
        },
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    argsIgnorePattern: "^_",
                    varsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                    ignoreRestSiblings: true
                },
            ],
        },
    },
    {
        files: ["src/**/*.{ts,tsx}"],
        ...solid,
    },
    {
        files: ["src/entry-server.tsx", "src/**/*.test.{ts,tsx}", "scripts/**/*.ts", "e2e/**/*.ts", "tests/**/*.ts", "*.config.ts"],
        languageOptions: {globals: {...globals.browser, ...globals.node}},
    },
);
