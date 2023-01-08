const path = require('path');// 경로 조작하기 위함
const RefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');


module.exports = {
  name: 'word-relay-setting',
  mode: 'development', // 실 서비스 : production
  devtool: 'eval', // 빠르게
  resolve: {  // 확장자
    extensions: ['.js','.jsx']
  },
  
  // 입력
  entry: {
    app: ['./client'] // client.jsx에서 WordRelay.jsx를 불러오고 있기 때문에 적어줄 필요 없음 // 확장자도 안 넣어도 됨 
  },

  // entry읽어서 모듈화 시킨후  output으로 뺀다 라고 생각하면 편함
  // test 정규 표현식으로 jsx파일을 모두 거름
  // 걸러진 jsx파일을 loader를 통해 전부 변환 시켜줌
  // presets을 통하여 
  module: {
    rules: [{
      test: /\.jsx?$/,
      loader: 'babel-loader',
      options: {
        presets: [
          ['@babel/preset-env', {
            targets: {
              browsers: ['> 1% in KR'], // browserslist
            },
            debug: true,
          }],
          '@babel/preset-react',
        ],
        plugins: [
          '@babel/plugin-proposal-class-properties',
          'react-refresh/babel'
        ],
      },
    }],
  },

  plugins: [
    new RefreshWebpackPlugin()
  ],
  // 출력
  output: {
    path: path.join(__dirname, 'dist'), // 현재 폴더 dist폴더
    filename: 'app.js',
    publicPath: '/dist/',
  },

  devServer: {
    devMiddleware: { publicPath: '/dist' },
    static: { directory: path.resolve(__dirname) },
    hot: true
  }
};