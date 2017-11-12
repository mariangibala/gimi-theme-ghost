const webpack = require('webpack')
const path = require('path')

const NODE_ENV = process.env.NODE_ENV
const _DEBUG_ = NODE_ENV === 'dev'
const _INCLUDE_EDITOR_ = process.env._INCLUDE_EDITOR_ ? process.env._INCLUDE_EDITOR_ : false

const config = {
  production: {
    watch: false
  },
  dev: {
    watch: true
  }
};

const webpackConfig = {
  output: {
    filename: 'theme.js',
    publicPath: '/js/'
  },
  devtool: '',
  watch: config[NODE_ENV].watch,
  watchOptions: {
    poll: 5000
  },
  module: {
    loaders: [
      // the 'transform-runtime' plugin tells babel to require the runtime
      // instead of inlining it.
      {
        test: /\.js?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: {
          presets: ['es2015'],
          plugins: ['transform-runtime']
        }
      }
    ]
  },
  resolve: {
    root: path.join(__dirname, 'src/js'),
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.DefinePlugin({
      _DEBUG_: JSON.stringify(_DEBUG_),
      _INCLUDE_EDITOR_: JSON.stringify(_INCLUDE_EDITOR_)
    })
  ]
}

if (NODE_ENV === 'production') {
  webpackConfig.plugins.push(new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production'),
    },
  }))

  webpackConfig.plugins.push(new webpack.optimize.UglifyJsPlugin({
    output: {
      comments: false
    },
    compress: {
      warnings: false
    }
  }))
}

module.exports = webpackConfig
