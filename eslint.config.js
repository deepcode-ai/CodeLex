// @ts-check
import antfu from '@antfu/eslint-config'

export default antfu(
  {
    type: 'lib',
    pnpm: true,
    formatters: {
      html: false,
      markdown: true,
      css: true,
    },
    markdown: {
      overrides: {
        'unicorn/prefer-node-protocol': 'off',
        'import/first': 'off',
        'ts/explicit-function-return-type': 'off',
      },
    },
    vue: {
      overrides: {
        'ts/explicit-function-return-type': 'off',
      },
    },
    ignores: [
      '**/fixtures/**',
      '**/vendor/**',
      '**/test/out/**',
      'docs/languages.md',
      'docs/themes.md',
      'packages/codelex/src/langs/**',
      'packages/codelex/src/themes/**',
      'packages/codelex/src/langs-bundle-full.ts',
      'packages/codelex/src/langs-bundle-web.ts',
      'packages/codelex/src/themes.ts',
    ],
  },

  // Global rule overrides
  {
    rules: {
      'no-restricted-syntax': 'off',
      'ts/no-invalid-this': 'off',
    },
  },

  // Docs-specific override
  {
    files: ['docs/**/*.{js,cjs,mjs,ts,cts,mts,jsx,tsx}'],
    rules: {
      'ts/explicit-function-return-type': 'off',
    },
  },

  // Specific package rules
  {
    files: [
      'packages/codelex/**/*.ts',
      'packages/core/**/*.ts',
      'packages/engine-javascript/**/*.ts',
      'packages/engine-oniguruma/**/*.ts',
    ],
    ignores: ['**/*.test.ts'],
    rules: {
      'no-restricted-imports': [
        'error',
        {
          paths: [
            {
              name: 'codelex',
              message: 'Avoid importing the root "codelex" package directly in these files.',
            },
          ],
        },
      ],
    },
  },
)
