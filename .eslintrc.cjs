module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'standard-with-typescript',
    'plugin:@next/next/recommended',
    'next/core-web-vitals',
    'plugin:tailwindcss/recommended',
  ],
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json'],
  },
  parser: '@typescript-eslint/parser',
  plugins: [
    'react',
  ],
  rules: {
    '@typescript-eslint/comma-dangle': ['error', {
      arrays: 'always-multiline',
      objects: 'always-multiline',
      imports: 'always-multiline',
      exports: 'always-multiline',
      functions: 'only-multiline',
      generics: 'ignore',
    }],
    '@typescript-eslint/explicit-function-return-type': ['off'],
    '@typescript-eslint/no-misused-promises': ['off'],
    '@typescript-eslint/strict-boolean-expressions': ['off'],
    '@typescript-eslint/no-unsafe-argument': ['off'],
    '@typescript-eslint/consistent-type-assertions': ['off'],
    'react/jsx-indent': ['warn', 2, {
      checkAttributes: true,
      indentLogicalExpressions: true,
    }],
    'react/prop-types': ['off'],
    'react/jsx-indent-props': ['warn', 2],
    'react/jsx-closing-bracket-location': ['warn', 'tag-aligned'],
    'jsx-quotes': ['warn', 'prefer-double'],
    'react/jsx-curly-spacing': ['warn', { when: 'never', children: true }],
    'react/jsx-tag-spacing': ['warn', {
      closingSlash: 'never',
      beforeSelfClosing: 'always',
      afterOpening: 'never',
      beforeClosing: 'never',
    }],
    'react/self-closing-comp': 'warn',
    'react/jsx-fragments': 'warn',
    'react/jsx-equals-spacing': [2, 'never'],
    'react/jsx-sort-props': ['warn', {
      callbacksLast: true,
      shorthandFirst: true,
      reservedFirst: true,
    }],
  },
}
