import importPlugin from "eslint-plugin-import";
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
import reactPlugin from "eslint-plugin-react";
import reactHooksPlugin from "eslint-plugin-react-hooks";
import globals from "globals";

export default [
    {
        ignores: [
            "node_modules/",
            "public/",
            "vendor/",
            "storage/",
            "bootstrap/",
            "database/",
            "dist/",
            "build/",
            "**/*.min.js",
            "**/*.map",
            "vite.config.js",
            "tailwind.config.js",
            "postcss.config.js",
        ],
    },
    {
        files: ["**/*.{js,jsx}"],
        languageOptions: {
            ecmaVersion: "latest",
            sourceType: "module",
            globals: {
                ...globals.browser,
                ...globals.es2021,
                ...globals.node,
            },
            parserOptions: {
                ecmaFeatures: {
                    jsx: true,
                },
            },
        },
        plugins: {
            react: reactPlugin,
            "react-hooks": reactHooksPlugin,
            "jsx-a11y": jsxA11yPlugin,
            import: importPlugin,
        },
        settings: {
            react: {
                version: "detect",
            },
            "import/resolver": {
                alias: {
                    map: [["@", "./resources/js"]],
                    extensions: [".js", ".jsx", ".json"],
                },
            },
        },
        rules: {
            // React specific rules
            "react/react-in-jsx-scope": "off",
            "react/jsx-uses-react": "off",
            "react/prop-types": "warn",
            "react-hooks/rules-of-hooks": "error",
            "react-hooks/exhaustive-deps": "warn",
            "react/jsx-filename-extension": ["warn", { extensions: [".jsx"] }],

            // General JavaScript rules
            "no-unused-vars": ["warn", { argsIgnorePattern: "^_" }],
            "no-console": ["warn", { allow: ["warn", "error"] }],
            "no-debugger": "warn",

            // Import rules
            "import/no-unresolved": "error",
            "import/order": [
                "error",
                {
                    groups: [
                        "builtin",
                        "external",
                        "internal",
                        "parent",
                        "sibling",
                        "index",
                    ],
                    "newlines-between": "always",
                    alphabetize: { order: "asc", caseInsensitive: true },
                },
            ],
        },
    },
];
