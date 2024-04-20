module.exports = {
    root: true,
    env: {
        "browser": true, 
        "es2021": true,
        "node": true
    },
  
    parser: '@typescript-eslint/parser',
  
    parserOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      project: './tsconfig.json',
      tsconfigRootDir: __dirname,
      ecmaFeatures: {
        jsx: true,
      },
    },
  
    plugins: ['react', '@typescript-eslint', 'prettier'],
  
    extends: [
      'eslint:recommended',
      'plugin:react/recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:prettier/recommended',
    ],
  
    rules: {
      'react/react-in-jsx-scope': 0,
      'react-hooks/exhaustive-deps': 1,
      "no-unused-vars": "warn",
      "no-console": "off"
    },  
    ignorePatterns: ['node_modules/', 'build/', 'dist/', 'webpack.*.js'],
  };