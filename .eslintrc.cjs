module.exports = {
  // 이 ESLint 설정은 이 설정 파일이 있는 디렉토리를 기준으로 모든 하위 디렉토리와 파일에 적용된다.
  root: true,

  // 실행 환경을 정의. 여기서는 브라우저(browser)와 Node.js 환경(node)에서 실행되는 코드를 대상으로 한다.
  // es2021 은 뭐지..?
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
   // TypeScript 코드를 분석하기 위한 파서(TypeScript 코드를 ESLint가 이해할 수 있도록 변환하는 역할을 한다.)
  parser: '@typescript-eslint/parser',
  // 파서에 전달되는 옵션들을 정의한다.
  parserOptions: {
    // ECMAScript 버전을 2021(ES12)으로 지정
    ecmaVersion: 2021,
    // 모듈 시스템을 사용하는 코드를 분석하도록 설정
    sourceType: 'module',
    // 타입 정보에 기반한 ESLint 규칙을 사용하기 위해 tsconfig.json 파일의 경로를 지정
    project: './tsconfig.json',
    // tsconfig.json 파일의 위치를 지정. __dirname은 현재 파일의 위치를 나타낸다.
    tsconfigRootDir: __dirname,
    // JSX 문법을 사용할 수 있도록 설정
    ecmaFeatures: {
      jsx: true,
    },
  },

  // ESLint에 추가적인 기능을 제공하는 플러그인들을 명시
  plugins: ['react', '@typescript-eslint', 'prettier'], // 'react-hooks', 왜 이게 추가가 안되어있지?

  extends: [
    'eslint:recommended', // ESLint의 기본 권장 규칙
    'plugin:react/recommended', // React를 위한 권장 규칙
    'plugin:@typescript-eslint/recommended', // TypeScript를 위한 권장 규칙
    'plugin:prettier/recommended', // Prettier와 ESLint를 함께 사용하기 위한 설정
    // 'plugin:react-hooks/recommended', // React Hooks를 위한 권장 규칙
  ],

  // 특정 규칙들을 오버라이드하거나 추가하는 섹션
  rules: {
     // React를 사용할 때 'React'를 import 하지 않아도 되게 설정
    'react/react-in-jsx-scope': 0,

    'no-unused-vars': 'warn',
    'no-console': 'off',
  },
  // ESLint가 파일을 무시하도록 하는 패턴들이다.
  ignorePatterns: ['node_modules/', 'build/', 'dist/', 'webpack.*.js'],
};
