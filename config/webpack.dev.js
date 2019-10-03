const path = require('path');
const webpack = require('webpack');

const __DEV_INPUT__ = path.join(__dirname, '..', 'examples');

module.exports = {

  devtool: 'source-map',

  context: __dirname,

  entry: {
    examples: [path.join(__DEV_INPUT__, 'index.js')],
    vendor: [
      'react',
      'react-dom',
      'jquery'
    ]
  },

  output: {
    filename: '[name].js'
  },

  module: {
    loaders: [{
      test: /\.(js|jsx)$/,
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        presets: ['react', 'es2015', 'stage-0']
      }
    }, {
      test: /\.(scss|css)$/,
      loader: 'style-loader!css-loader!sass-loader'
    }, {
      test: /\.(jpe?g|png|gif|svg)$/i,
      loaders: [
        `file?context=../images&name=images/[path][name].[ext]`
      ]
    }]
  },

  devServer: {
    contentBase: __DEV_INPUT__,
    historyApiFallback: true,
    host: '0.0.0.0',
    hot: true,
    staticOptions: {}
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': '"development"'
      }
    }),
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new webpack.optimize.OccurenceOrderPlugin()
  ],

  resolve: {
    extensions: ['', '.js', '.jsx', '.css']
  }
};
