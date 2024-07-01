// babel-preset-taro 更多选项和默认值：
// https://github.com/NervJS/taro/blob/next/packages/babel-preset-taro/README.md
module.exports = {
  presets: [
    ['taro', {
      framework: 'react',
      ts: true
    }]
  ],

  plugins: [
    [
      'import',
      {
        libraryName: '@zing-kit/core',
        style: true
      },
      '@zing-kit/core'
    ]
  ]
}
