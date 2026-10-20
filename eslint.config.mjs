import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactPlugin from 'eslint-plugin-react';
import prettierPlugin from 'eslint-plugin-prettier';
import sonarjs from 'eslint-plugin-sonarjs';
import globals from 'globals';

export default [
  js.configs.recommended,

  ...tseslint.configs.recommended,

  {
    files: ['**/*.{js,jsx,ts,tsx}'],

    plugins: {
      react: reactPlugin,
      prettier: prettierPlugin,
      sonarjs,
    },

    rules: {
      'prettier/prettier': 'error',
      'react/react-in-jsx-scope': 'off',
      'sonarjs/cognitive-complexity': 'warn',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['./*', '../*'],
              message: "Use the '@/' absolute import path instead of a relative import.",
            },
          ],
        },
      ],
    },

    settings: {
      react: {
        version: 'detect',
      },
    },
  },

  {
    files: ['src/__mocks__/**/*.js'],
    languageOptions: {
      globals: {
        module: 'writable',
      },
    },
  },

  {
    files: ['*.config.{js,cjs,mjs}'],
    languageOptions: {
      globals: globals.node,
    },
  },
];
