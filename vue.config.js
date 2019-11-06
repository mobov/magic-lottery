module.exports = {
  publicPath: './',
  assetsDir: 'static',
  chainWebpack: config => {
    // GraphQL Loader
    config.module
      .rule('xlsx')
      .test(/\.xlsx$/)
      .use('webpack-xlsx-loader')
      .loader('webpack-xlsx-loader')
      .end()
  },
  configureWebpack: {
    externals: {

    }
  }
}
