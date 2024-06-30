const path = require('path');

module.exports = {
  entry: './es/index.js',
  mode: 'production',
  output: {
    filename: 'ahooks.js',
    library: 'ahooks',
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
      taro: 'Taro',
    },
  ],
}
