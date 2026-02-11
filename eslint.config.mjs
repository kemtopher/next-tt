import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';


import unusedImports from 'eslint-plugin-unused-imports';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
    ...compat.extends('next/core-web-vitals'),
 
    {
      plugins: {
        'unused-imports': unusedImports,
        'simple-import-sort': simpleImportSort,
      },
      rules: {
        'unused-imports/no-unused-imports': 'error',
        'unused-imports/no-unused-vars': ['warn', { vars: 'all', varsIgnorePattern: '^_', args: 'after-used', argsIgnorePattern: '^_' }],
        'simple-import-sort/imports': 'error',
        'simple-import-sort/exports': 'error',
        'prefer-const': 'error',
        'no-console': 
          process.env.NODE_ENV === 'production'
            ? 'error' 
            : 'warn',
        'consistent-return': 'warn',
      },
    }
]
