module.exports = {
  env: {
    browser: true,
    commonjs: true,
    es2021: true,
    node: true,
    jest: true
  },
  globals: {
    moment: true
  },
  extends: ['standard'],
  parserOptions: {
    ecmaVersion: 'latest'
  },
  rules: {
    'prettier/prettier': 'off',
    semi: [2, 'always'],
    'comma-dangle': [
      'error',
      {
        arrays: 'never',
        objects: 'never',
        imports: 'never',
        exports: 'never',
        functions: 'never'
      }
    ],
    // 'no-console': 'error',
    'no-alert': 'error',
    // 'space-before-function-paren': ['error', 'always'],
    'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
    'array-element-newline': [
      'error',
      {
        ArrayExpression: 'consistent',
        ArrayPattern: {
          minItems: 3
        }
      }
    ],
    'array-bracket-spacing': ['error', 'never'],
    'no-mixed-operators': 'error',
    'no-empty': ['error', { allowEmptyCatch: true }],
    camelcase: 'off',
    'object-property-newline': ['error', { allowAllPropertiesOnSameLine: false }],
    'padded-blocks': ['error', 'never']
  }
};
