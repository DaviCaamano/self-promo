import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';

/**
 * Flat config, because ESLint 10 no longer reads `.eslintrc.js`, and the CLI
 * directly, because Next 16 no longer ships `next lint`.
 *
 * `eslint-config-next` provides these as flat arrays already, so no compat
 * shim is needed. `eslint-plugin-prettier` is gone with the old file: its one
 * rule was switched off there anyway, and `eslint-config-prettier` — which
 * turns off the formatting rules that would fight Prettier — is what was
 * actually doing the work. Prettier still runs on its own.
 *
 * The rule list below is the one from `.eslintrc.js`, minus entries for plugins
 * this project does not load: `security/*`, `import/no-unresolved`, and a
 * handful of typescript-eslint rules that no longer exist under v8.
 */
const config = [
  { ignores: ['.next/**', 'node_modules/**', 'out/**', 'next-env.d.ts'] },
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettier,
  {
    rules: {
      '@next/next/no-html-link-for-pages': 'off',
      '@next/next/no-img-element': 'off',
      'react/jsx-key': 'off',
      'react/no-unescaped-entities': 'off',
      quotes: ['warn', 'single', 'avoid-escape'],
      'prefer-const': 'off',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/ban-ts-comment': 'off',
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-inferrable-types': 'off',
      '@typescript-eslint/no-empty-function': 'off',
      '@typescript-eslint/no-namespace': 'off',
      '@typescript-eslint/no-require-imports': 'off',
      '@typescript-eslint/no-unused-vars': 'warn',
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      /**
       * Warnings, not errors. These two arrived with the React Compiler rules
       * in eslint-plugin-react-hooks 6 and between them flag eight places that
       * have been running in production for months — most of them the ordinary
       * `useState(false)` plus `useEffect(() => setMounted(true), [])` guard
       * that keeps a portal off the server render. Rewriting all of them is
       * real work on load bearing code and belongs in its own change, not in a
       * dependency bump. Left visible so that work does not get forgotten.
       */
      'react-hooks/set-state-in-effect': 'warn',
      'react-hooks/purity': 'warn',
    },
  },
];

export default config;
