const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')
const constants = require('./src/constants')
const DEBUG = constants.DEBUG

module.exports = {
  reactHotLoader: true,
  debug: DEBUG,
  hasServer: false,
  modifyWebpackConfig: (config, options) => {
    if (options.type === 'client') {
      config.plugins.push(
        new HtmlWebpackPlugin({
          template: 'src/index.ejs',
          // Sort the chunks so that the scripts are added in the correct order.
          chunksSortMode: (chunk1, chunk2) => {
            const orders = ['manifest', 'vendor', 'main']
            const order1 = orders.indexOf(chunk1.names[0])
            const order2 = orders.indexOf(chunk2.names[0])
            return order1 - order2
          }
        })
      )
    }

    config.resolve.extensions.push('.ts')
    config.resolve.extensions.push('.tsx')
    config.module.loaders.push({
      test: /\.tsx?$/,
      exclude: [/\.(spec|e2e)\.tsx?$/, /node_modules/],
      loaders: ['react-hot-loader/webpack', 'ts-loader']
    })

    return config
  }
}
