const path = require('path')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

// only two modes, default to production
const isProd = () => process.env.WEBPACK_ENV !== 'dev'
const root = (...filesOrDirs) => path.resolve(__dirname, ...filesOrDirs)
const src = (...filesOrDirs) => path.join(root(), 'src', ...filesOrDirs)
const dist = (...filesOrDirs) => path.join(root(), 'dist', ...filesOrDirs)

let config = {
  mode: isProd() ? 'production' : 'development',
  entry: src('index.jsx'),
  target: 'web',
  context: root(),
  output: {
    path: dist(),
    filename: isProd() ? '[name].[hash].js' : '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.svg'],
    alias: {
      '@': src(),
      '@hook': src('hooks')
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          'css-loader'
        ]
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /.svg$/,
        loader: 'svg-inline-loader'
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProd() ? '[name].[hash].css' : '[name].css'
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: root('assets'),
        to: dist()
      }
    ]),
    new HtmlWebpackPlugin({
      template: src('index.html'),
      inject: 'body'
    })
  ]
}

if (!isProd()) {
  config = Object.assign({}, config, {
    devServer: {
      contentBase: dist(),
      port: 9080,
      historyApiFallback: true
    }
  })
}

module.exports = config
