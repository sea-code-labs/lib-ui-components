import angularEslint from '@angular-eslint/eslint-plugin';
import typescriptEslint from '@typescript-eslint/eslint-plugin';
import simpleImportSort from 'eslint-plugin-simple-import-sort';
import globals from 'globals';
import parser from '@angular-eslint/template-parser';
import tsParser from '@typescript-eslint/parser';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import js from '@eslint/js';
import { FlatCompat } from '@eslint/eslintrc';
import { includeIgnoreFile } from '@eslint/compat';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const gitignorePath = path.resolve(__dirname, '.gitignore');
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default [
  includeIgnoreFile(gitignorePath),
  {
    ignores: ['!projects/**/*.ts', '!projects/**/*.spec.ts', '!projects/**/*.html'],
    plugins: {
      '@angular-eslint': angularEslint,
      '@typescript-eslint': typescriptEslint,
      'simple-import-sort': simpleImportSort,
    },
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parser: parser,
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
      },
    },
  },
  ...compat.extends('plugin:@angular-eslint/template/recommended').map((config) => ({
    ...config,
    files: ['projects/**/*.html'],
  })),
  {
    files: ['projects/**/*.html'],
    languageOptions: {
      parser: parser,
      ecmaVersion: 5,
      sourceType: 'module',
      parserOptions: {
        project: ['./tsconfig.eslint.json'],
      },
    },
    rules: {
      '@angular-eslint/template/attributes-order': [
        'error',
        {
          alphabetical: false,
          order: ['STRUCTURAL_DIRECTIVE', 'TEMPLATE_REFERENCE', 'ATTRIBUTE_BINDING', 'INPUT_BINDING', 'TWO_WAY_BINDING', 'OUTPUT_BINDING'],
        },
      ],
    },
  },
  {
    files: ['projects/**/*.ts', 'projects/**/*.spec.ts'],
    languageOptions: {
      parser: tsParser,
    },
    rules: {
      'comma-spacing': 'error',
      'simple-import-sort/imports': [
        'error',
        {
          groups: [
            ['^@angular*'],
            ['^@sc*'],
            [
              '^@agm*',
              '^@ngrx*',
              '^@ngx*',
              '^@sentry*',
              '^date*',
              '^file*',
              '^lodash*',
              '^ng2*',
              '^ngx*',
              '^node*',
              '^path*',
              '^rxjs*',
              '^uuid*',
            ],
            ['^@*'],
            ['^@src*'],
            ['^@common*'],
            ['^\\.'],
            ['^'],
          ],
        },
      ],
      '@angular-eslint/component-class-suffix': 'error',
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'sc',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/directive-class-suffix': 'error',
      '@angular-eslint/no-host-metadata-property': 'error',
      '@angular-eslint/no-input-rename': 'error',
      '@angular-eslint/no-inputs-metadata-property': 'error',
      '@angular-eslint/no-output-on-prefix': 'off',
      '@angular-eslint/no-output-rename': 'error',
      '@angular-eslint/no-outputs-metadata-property': 'error',
      '@angular-eslint/use-pipe-transform-interface': 'error',
      '@typescript-eslint/consistent-type-definitions': 'error',
      '@typescript-eslint/typedef': [
        'error',
        {
          parameter: true,
          propertyDeclaration: true,
          variableDeclaration: true,
          memberVariableDeclaration: true,
        },
      ],
      '@typescript-eslint/dot-notation': 'error',
      '@typescript-eslint/explicit-member-accessibility': [
        'error',
        {
          accessibility: 'explicit',
          overrides: {
            constructors: 'off',
          },
        },
      ],
      '@typescript-eslint/member-ordering': [
        'error',
        {
          default: ['public-field', 'protected-field', 'private-field', 'public-method', 'protected-method', 'private-method'],
        },
      ],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: ['variableLike', 'memberLike', 'property', 'method'],
          leadingUnderscore: 'allow',
          format: ['camelCase', 'UPPER_CASE'],
        },
        {
          selector: ['typeLike'],
          format: ['PascalCase'],
        },
        {
          selector: ['enumMember'],
          format: ['UPPER_CASE'],
        },
        {
          selector: 'variable',
          modifiers: ['global'],
          format: ['UPPER_CASE', 'camelCase'],
        },
        {
          selector: ['property'],
          modifiers: ['static'],
          format: ['UPPER_CASE', 'camelCase'],
        },
      ],
      '@typescript-eslint/no-empty-function': [
        'error',
        {
          allow: ['overrideMethods'],
        },
      ],
      '@typescript-eslint/no-empty-interface': 'error',
      '@typescript-eslint/no-inferrable-types': [
        'off',
        {
          ignoreParameters: true,
        },
      ],
      '@typescript-eslint/no-misused-new': 'error',
      '@typescript-eslint/no-non-null-assertion': 'off',
      '@typescript-eslint/no-shadow': [
        'error',
        {
          hoist: 'all',
        },
      ],
      'no-unused-expressions': 'off',
      '@typescript-eslint/no-unused-expressions': 'warn',
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          ignoreRestSiblings: true,
        },
      ],
      '@typescript-eslint/no-use-before-define': [
        'error',
        {
          variables: true,
          functions: false,
          classes: false,
        },
      ],
      '@typescript-eslint/prefer-function-type': 'error',
      '@typescript-eslint/explicit-function-return-type': [
        'error',
        {
          allowExpressions: true,
        },
      ],
      '@/quotes': ['error', 'single'],
      '@/semi': ['error', 'always'],
      'arrow-body-style': ['warn', 'as-needed'],
      'brace-style': ['error', '1tbs'],
      'constructor-super': 'error',
      curly: 'error',
      'eol-last': 'error',
      eqeqeq: ['error', 'smart'],
      'guard-for-in': 'error',
      'id-blacklist': 'off',
      'id-match': 'off',
      'linebreak-style': ['error', 'unix'],
      'max-len': [
        'off',
        {
          code: 200,
        },
      ],
      'no-bitwise': 'error',
      'no-console': [
        'error',
        {
          allow: [
            'warn',
            'dir',
            'timeLog',
            'assert',
            'clear',
            'count',
            'countReset',
            'group',
            'groupEnd',
            'table',
            'dirxml',
            'error',
            'groupCollapsed',
            'Console',
            'profile',
            'profileEnd',
            'timeStamp',
            'context',
          ],
        },
      ],
      'no-debugger': 'error',
      'no-duplicate-case': 'error',
      'no-duplicate-imports': 'error',
      'no-empty': 'error',
      'no-empty-function': 'off',
      'no-eval': 'error',
      'no-fallthrough': 'error',
      'no-new-wrappers': 'error',
      'no-redeclare': 'error',
      'no-restricted-imports': [
        'error',
        {
          patterns: ['^lodash$', '^rxjs/internal/.*$'],
        },
      ],
      'no-throw-literal': 'error',
      'no-trailing-spaces': 'warn',
      'keyword-spacing': 'error',
      'space-before-blocks': 'error',
      'no-undef-init': 'error',
      'no-underscore-dangle': 'error',
      'no-unused-labels': 'error',
      'no-var': 'error',
      'prefer-const': 'error',
      radix: 'error',
      'spaced-comment': [
        'error',
        'always',
        {
          markers: ['/'],
        },
      ],
    },
  },
];
