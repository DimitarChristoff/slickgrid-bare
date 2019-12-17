const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const nodeExternals = require('webpack-node-externals');

const __OUTPUT__ = path.join(__dirname, 'dist');
const __INPUT__ = path.join(__dirname, 'src');

module.exports = {
  devtool: 'source-map',

  context: __dirname,

  entry: {
    slickgrid: [path.join(__INPUT__, 'index.js')],
    '6pac': [path.join(__INPUT__, 'slick.grid.js')],
    frozen: [path.join(__INPUT__, 'slick-frozen.grid.js')],
    data: [path.join(__INPUT__, 'slick.dataview.js')],
    core: [path.join(__INPUT__, 'slick.core.js')],
    interact: [path.join(__INPUT__, 'interact.js')]
  },

  output: {
    path: __OUTPUT__,
    publicPath: '/',
    filename: `[name].js`,
    libraryTarget: 'commonjs2'
  },

  externals: [nodeExternals()],

  module: {
    rules: [{
      test: /\.(js)$/,
      exclude: /(node_modules)/,
      loader: require.resolve('babel-loader'),
    }]
  },

  optimization: {
    minimize: true,
    minimizer: [
      // This is only used in production mode
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2
          },
          mangle: {
            safari10: !true
          },
          // Added for profiling in devtools
          keep_classnames: true,
          keep_fnames: true,
          output: {
            ecma: 5,
            comments: false,
            // Turned on because emoji and regex is not minified properly using default
            // https://github.com/facebook/create-react-app/issues/2488
            ascii_only: true
          }
        },
        // Enable file caching
        cache: true,
        sourceMap: true
      })
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new CopyWebpackPlugin([
      {
        flatten: true,
        from: `${__INPUT__}/*.scss`
      }
    ])
  ]
};
