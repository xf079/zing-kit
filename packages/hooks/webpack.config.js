const path = require('path');

module.exports = {
  entry: './es/index.js',
  mode: 'production',
  output: {
    filename: 'index.js',
    library: 'index',
    libraryTarget: 'umd',
    globalObject: 'this',
    path: path.resolve(__dirname, './dist'),

  },
  resolve: {
    extensions: ['.json', '.js'],
  },
  externals: [
    {
      react: 'React',
      taro: '@tarojs/taro',
      lodash: 'lodash',
    },
  ],
}
