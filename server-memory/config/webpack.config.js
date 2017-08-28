const webpack = require('webpack');
var nodeExternals = require('webpack-node-externals');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const path = require('path');
const paths = require('./paths');

/** Prepare environment variables for runtime inclusion */
const getEnv = (arr = ['NODE_ENV'], def = {}) => {
  const res = {};

  arr.forEach((k) => {
    const v = process.env[k];
    res[k] = JSON.stringify(v === undefined ? def[k] : v);
  });

  return res;
};

const env = process.env.NODE_ENV,
  isProd = env === 'production';

const config = {
  bail: isProd,
  devtool: !isProd && 'cheap-module-source-map',

  target: 'node',
  externals: [nodeExternals()],
  context: paths.appSrc,
  entry: {
    index: paths.appJs
  },
  output: {
    path: paths.appBuild,
    pathinfo: !isProd,
    filename: '[name].js',
    chunkFilename: '[name].chunk.js',
  },

  resolve: {
    extensions: ['.ts', '.js', '.json'],
    plugins: [
      new TsConfigPathsPlugin({
        tsconfig: path.resolve(__dirname, `${paths.appSrc}/tsconfig.json`),
        compiler: 'typescript',
      })
    ],
  },

  module: {
    strictExportPresence: true,
    rules: [
      // Lint the code
      {
        enforce: 'pre',
        test: /\.(ts|tsx)$/,
        loader: 'tslint-loader',
        options: {
          typeCheck: true,
        },
        include: paths.appSrc,
        exclude: /\.min./,
      },
      // Compile TypeScript
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'awesome-typescript-loader',
      },
      // Generate ASTs from GraphqQL files
      {
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: 'graphql-tag/loader',
      },
    ],
  },

  plugins: [
    // Watcher doesn't work well if you mistype casing in a path so we use
    // a plugin that prints an error when you attempt to do this.
    // See https://github.com/facebookincubator/create-react-app/issues/240
    // Additionally helps to prevent "works on my system" errors on cross-platform projects
    new CaseSensitivePathsPlugin(),
    // Makes some environment variables available to the JS code, for example:
    // if (process.env.NODE_ENV === 'production') { ... }. See `./env.js`.
    new webpack.DefinePlugin({ 'process.env': getEnv(paths.env, paths.envDefault) }),
    // Display typescript status information
    new CheckerPlugin(),
    // Configure loaders
    new webpack.LoaderOptionsPlugin({
      minimize: isProd,
      debug: !isProd,
      options: {
        context: __dirname,
      },
    })
  ],
};

if (isProd) {
  config.plugins.push(
    // Enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // Minify the code
    new UglifyJsPlugin({
      uglifyOptions: {
        ie8: false,
        ecma: 8,
        compress: {
          conditionals: true,
          unused: true,
          // Disabled because of an issue with Uglify breaking seemingly valid code:
          // https://github.com/facebookincubator/create-react-app/issues/2376
          // Pending further investigation:
          // https://github.com/mishoo/UglifyJS2/issues/2011
          comparisons: false,
          sequences: true,
          dead_code: true,
          evaluate: true,
          if_return: true,
          join_vars: true,
        },
        output: {
          // Turned on because emoji and regex is not minified properly using default
          // https://github.com/facebookincubator/create-react-app/issues/2488
          ascii_only: true,
          comments: false,
        },
        warnings: false,
      },
    })
  );
} else {
  config.plugins.push(
    // Add module names to factory functions so they appear in browser profiler.
    new webpack.NamedModulesPlugin(),
    // Add source map support for accurate stack traces
    new webpack.BannerPlugin({
      banner: 'require("source-map-support").install();',
      raw: true,
      entryOnly: false,
    })
  );
}

module.exports = config;
