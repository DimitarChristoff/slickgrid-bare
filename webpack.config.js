const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const __OUTPUT__ = path.join(__dirname, 'dist');
const __INPUT__ = path.join(__dirname, 'src');

module.exports = {

  devtool: 'source-map',

  context: __dirname,

  entry: {
    slickgrid: [
      path.join(__INPUT__, 'index.js')
    ],
    '6pac': [
      path.join(__INPUT__, 'slick.grid.js')
    ],
    frozen: [
      path.join(__INPUT__, 'slick-frozen.grid.js')
    ],
    data: [
      path.join(__INPUT__, 'slick.dataview.js')
    ],
    core: [
      path.join(__INPUT__, 'slick.core.js')
    ]
  },

  output: {
    path: __OUTPUT__,
    publicPath: '/',
    filename: `[name].js`,
    libraryTarget: 'commonjs2'
  },

  externals: [nodeExternals()],

  module: {
    loaders: [{
      test: /\.(js)$/,
      exclude: /(node_modules)/,
      loader: 'babel',
      query: {
        presets: ['latest']
      }
    }, {
      test: /\.(scss)$/,
      loader: 'style-loader!scss-loader'
    }]
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      beautify: false, // prod
      mangle: {
        screw_ie8: true
      }, // prod
      compress: {
        screw_ie8: true
      }, // prod
      comments: false // prod
    }),
    new CopyWebpackPlugin([
      {
        flatten: true,
        from: `${__INPUT__}/*.scss`
      }
    ])
  ],

  resolve: {
    extensions: ['', '.js']
  }
};
