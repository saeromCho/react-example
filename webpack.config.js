const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin'); // 생성된 html 파일에 필요한 플러그인
// const TerserPlugin = require("terser-webpack-plugin");

module.exports = {
  entry: './src/index.tsx', // webpack 빌드의 시작점을 지정한다. 
  output: { // webpack 빌드 결과물의 설정을 지정한다.
    filename: '[name].[contenthash].js',  // 번들화 한 파일 export할 파일명 설정. 빌드 결과물의 파일 이름을 지정한다.
    path: path.join(__dirname, '/dist'), // 번들화 한 파일 export할 경로 설정. 빌드 결과물이 저장될 디렉터리를 지정한다.
    clean: true, // webpack 빌드 이전에 생성된 결과물을 자동으로 삭제한다.
    publicPath: '/', // 번들링된 파일들이 참조될 때 사용될 기본 경로를 설정합니다. 
    // 여기서 '/'로 설정된 것은 서버의 루트 경로를 기준으로 리소스를 제공하겠다는 의미입니다. 
    // 예를 들어, 서버의 루트 URL이 http://example.com/이라면, 번들링된 파일들은 http://example.com/bundle.js와 같은 방식으로 접근될 것입니다.
  },

  optimization: {
    // 코드 분할을 설정합니다. 여기서는 모든 청크(chunks: 'all')를 대상으로 합니다.
    splitChunks: {
      chunks: 'all',
      // cacheGroups: 특정 모듈 그룹을 별도의 청크로 분리하여 캐싱을 최적화합니다.
      cacheGroups: {
        // react: react 및 react-dom 모듈을 별도의 청크로 분리합니다.
        react: {
          test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
          name: 'react',
          chunks: 'all',
          priority: 10, // 높은 우선순위 설정
        },
        // vendors: node_modules 디렉토리의 모듈들을 별도의 청크로 분리합니다.
        vendors: {
          test: /\/node_modules\//i,
          chunks: 'all',
          priority: -10, // 낮은 우선순위 설정
        },
      },
    },
    // minimize: true,
    // minimizer: [new TerserPlugin()],
    // providedExports: true,
    // usedExports: true,
    // runtimeChunk: 런타임 청크를 별도로 분리하여 캐싱을 최적화합니다. 여기서는 이름을 runtime으로 지정했습니다.
    runtimeChunk: { name: 'runtime' },
  },
  resolve: { // webpack에서 파일 경로를 해석하는 방법을 설정한다.
    // 모듈을 해석할 때 확장자를 생략할 수 있도록 합니다. .tsx, .ts, .js 파일을 자동으로 해석합니다. 
    // 웹팩은 순서대로 찾기 때문에, 많이 사용되는 확장자를 앞에 쓰는 것이 유리하다.
    extensions: ['.tsx', '.ts',  '.js'], // webpack이 해석할 수 있는 파일 확장자를 나열한다.
    // 절대경로 설정. 설정한 경로의 별칭을 지정한다. 이를 사용해 코드 내에서 짧은 경로로 참조할 수 있다.
    // @/components는 ./src/components를 참조
    alias: {
      '@': path.resolve(__dirname, './src'),
      '@apis': path.resolve(__dirname, './src/apis'),
      '@assets': path.resolve(__dirname, './src/assets'),
      '@common': path.resolve(__dirname, './src/common'),
      '@contexts': path.resolve(__dirname, './src/contexts'),
      '@domain': path.resolve(__dirname, './src/domain'),
      '@lib': path.resolve(__dirname, './src/lib'),
    },
  },
  module: { // 로더를 설정한다.
    rules: [ // 로더를 설정하는 배열이다.
      {
        test: /\.(ts|tsx|js)$/, // 로더가 처리할 파일 유형을 지정한다. TypeScript 파일(.ts 및 .tsx)을 JavaScript로 컴파일합니다.
        exclude: /node_modules/, // 로더에서 제외할 파일 또는 폴더를 지정한다.
        use: [ // 사용할 로더를 지정하는 배열이다.
          {
            loader: 'ts-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'images/[hash][ext][query]', // 이미지 파일의 저장 위치와 이름 설정. 이미지 파일을 처리하고, 결과 파일을 images/ 디렉토리에 저장합니다.
        },
      },
    ],
  },
  plugins: [ // webpack 플러그인을 설정하는 배열이다.
    // new BundleAnalyzerPlugin(),
    // index.html 파일을 생성하고, 번들된 자바스크립트 파일을 자동으로 포함시킵니다.
    new HtmlWebpackPlugin({ // webpack 번들(번들된 자바스크립트 파일)을 자동으로 HTML 파일에 주입해 준다.
      template: './public/index.html', // 번들링 파일을 주입하여 번들링 폴더로 복사할 대상 HTML 파일을 설정.
      title: 'Caching',
    }),
  ],
  // webpack에서 sourceMap을 생성하는 방식을 설정하는 옵션이다. sourceMap은 빌드된 코드와 원본 소스 코드 사이의 매핑을 제공하여 디버깅을 더 쉽게 할 수 있도록 도와준다. 
  // 프로덕션 환경에서의 devtool은 hidden-source-map으로 되어있는데,(dev 환경에서는 보통 eval 로 설정)
  // 이는 빌드 결과물에 sourceMap이 포함되지 않게 해 사용자에게 노출되지 않게 해준다.
  // 또한, HtmlWebapckPlugin collapseWhitespace와 removeCommnets 설정을 통해 빌드 시 공백과 주석을 제거해 준다.
  // 'hidden-source-map': 소스 맵을 생성하여 디버깅을 가능하게 하되, 브라우저 개발자 도구에서 직접 노출되지 않도록 합니다.
  devtool: 'hidden-source-map', // 소스맵은 우리가 빌드용으로 배포한 파일과 원본 파일을 연결해주는 기능이다.
  cache: { 
    type: 'filesystem', // 파일 시스템 캐싱을 활성화하여 빌드 속도를 개선합니다.
    buildDependencies: {
      config: [__filename], // 캐시의 빌드 의존성을 설정합니다. 여기서는 tsconfig.json을 의존성으로 추가하여, 설정 파일이 변경되면 캐시를 무효화합니다.
    },
  },
  // webpack 개발 서버의 설정을 지정. webpack-dev-server 설정하는 부분. 핫리로딩 기능을 갖춘 개발 서버. 프록시 설정기능을 제공해서 CORS문제 등 브라우저 및 서버에러를 처리 가능.
  devServer: {
    historyApiFallback: true, // SPA 개발 시 설정, SPA에서 404 응답을 index.html로 리다이렉션 하도록 설정한다.
    port: 3000, // 접속 시 포트
    open: true, // 개발 서버 시작 시 브라우저를 자동으로 엽니다.
    hot: true, // 핫 리로딩 기능 (webpack의 HMR 기능 활성화). 개발 서버에서 Hot Module Replacement를 활성화한다. 변경 사항이 발생하면 페이지 전체를 새로고침하지 않고 특정 모듈만 변경하여 개발 효율성을 높인다.
    static: path.resolve(__dirname, 'dist'),
    client: {
      reconnect: false,
    },
  },
};
