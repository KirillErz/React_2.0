import js from '@eslint/js';
import { defineConfig, globalIgnores } from 'eslint/config';
import tseslint from 'typescript-eslint';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import reactPlugin from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import fsdEslintConfig from '@zh2s/eslint-config-fsd';
import globals from 'globals';

export default defineConfig([
    globalIgnores(['build', 'node_module']),
    tseslint.configs.recommended,
    reactPlugin.configs.flat.recommended,
    reactPlugin.configs.flat['jsx-runtime'],
    reactHooks.configs.flat.recommended,
    fsdEslintConfig.flatConfig,
    eslintPluginPrettierRecommended,
    eslintConfigPrettier,
    {
        files: ['**/*.{ts,tsx}'],
        extends: [js.configs.recommended],
        plugins: {
            js,
        },
        settings: {
            react: {
                version: 'detect',
            },
        },
        languageOptions: {
            globals: {
                ...globals.browser,
                ...globals.node,
            },
        },
        rules: {
            semi: ['error', 'always'],
            'no-unused-vars': 'off',
            'no-redeclare': 'off',
            'no-restricted-imports': [
                'error',
                {
                    patterns: [
                        {
                            group: ['@siburkit/inputs'],
                            message:
                                'Импорт из "@siburkit/inputs" запрещён. Используйте "@sibur/dsr-inputs" вместо этого.',
                        },
                    ],
                },
            ],
            'react-hooks/refs': 0,
            '@typescript-eslint/no-explicit-any': 0,
            '@typescript-eslint/ban-ts-comment': 0,
            'no-console': [1, { allow: ['error', 'groupCollapsed', 'groupEnd', 'info'] }],
            'react/display-name': 'off',
            '@typescript-eslint/no-unused-vars': [
                'warn',
                {
                    argsIgnorePattern: '^_',
                    varsIgnorePattern: '^_',
                    caughtErrorsIgnorePattern: '^_',
                },
            ],
        },
    },
]);