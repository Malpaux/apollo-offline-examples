const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const { CheckerPlugin, TsConfigPathsPlugin } = require('awesome-typescript-loader');
const SWPrecacheWebpackPlugin = require('sw-precache-webpack-plugin');

const path = require('path');
const paths = require('./paths');

const publicPath = paths.servedPath;
const publicUrl = publicPath.slice(0, -1);

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

  target: 'web',
  context: paths.appSrc,
  entry: isProd ?
    ['babel-polyfill', paths.appJs]
  : ['babel-polyfill', require.resolve('react-dev-utils/webpackHotDevClient'), paths.appJs],
  output: {
    path: paths.appBuild,
    pathinfo: !isProd,
    publicPath: publicPath,
    filename: '[name].[hash:8].js',
    chunkFilename: '[name].[chunkhash:8].chunk.js',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json'],
    alias: {
      'react-native': 'react-native-web',
    },
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
        exclude: /node_modules/,
        loader: 'tslint-loader',
        options: {
          typeCheck: true,
        },
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
      // Process web manifest (manifest.json)
      {
        test: /manifest.json$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'static/media/[name].[hash:8].[ext]' },
          },
          {
            loader: 'extract-loader',
            options: { publicPath },
          },
          'web-manifest-loader',
        ],
      },
      // Process browser config (browserconfig.xml)
      {
        test: /browserconfig.xml$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'static/media/[name].[hash:8].[ext]' },
          },
          {
            loader: 'extract-loader',
            options: { publicPath },
          },
          'browserconfig-loader',
        ],
      },
      // Optimize common image formats
      {
        test: /\.(bmp|jpe?g|png|gif|svg)$/,
        use: [
          {
            loader: 'file-loader',
            options: { name: 'static/media/[name].[hash:8].[ext]' },
          },
          'img-loader',
        ],
      },
      // "file" loader makes sure assets end up in the `build` folder.
      // When you `import` an asset, you get its filename.
      {
        test: /\.(ico|eot|otf|webp|ttf|woff|woff2)(\?.*)?$/,
        loader: 'file-loader',
        options: { name: 'static/media/[name].[hash:8].[ext]' },
      },
      // Use DataURL for small files
      {
        test: /\.(mp4|webm|wav|mp3|m4a|aac|oga)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      // Interpolate HTML template
      {
        test: /\.(html)(\?.*)?$/,
        loader: 'html-loader',
        options: { interpolate: 'require' },
      },
    ],
  },

  plugins: [
    // Generates an `index.html` file with the <script> injected.
    new HtmlWebpackPlugin({
      inject: true,
      template: paths.appHtml,
      minify: isProd && {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
    }),
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
      options: {
        context: __dirname,
        htmlLoader: {
          attrs: ['img:src', 'link:href'],
        },
      },
    }),
  ],

  performance: {
    hints: isProd && 'warning',
    maxAssetSize: 300000,
    maxEntrypointSize: 300000,
  },

  node: {
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
  },
};

if (isProd) {
  config.plugins.push(
    // Enable scope hoisting
    new webpack.optimize.ModuleConcatenationPlugin(),
    // Extract commons chunk
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[hash:8].js',
      minChunks: (module) =>
        module.context && module.context.indexOf('node_modules') !== -1,
    }),
    // Minify the code
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        unused: true,
        // Disabled because of an issue with Uglify breaking seemingly valid code:
        // https://github.com/facebookincubator/create-react-app/issues/2376
        // Pending further investigation:
        // https://github.com/mishoo/UglifyJS2/issues/2011
        comparisons: false,
        conditionals: true,
        dead_code: true,
        evaluate: true,
        if_return: true,
        join_vars: true,
        screw_ie8: true,
        sequences: true,
        warnings: false,
      },
      mangle: {
        screw_ie8: true,
      },
      output: {
        // Turned on because emoji and regex is not minified properly using default
        // https://github.com/facebookincubator/create-react-app/issues/2488
        ascii_only: true,
        comments: false,
        screw_ie8: true,
      }
    }),
    // Generate a service worker script that will precache, and keep up to date,
    // the HTML & assets that are part of the Webpack build.
    new SWPrecacheWebpackPlugin({
      // By default, a cache-busting query parameter is appended to requests
      // used to populate the caches, to ensure the responses are fresh.
      // If a URL is already hashed by Webpack, then there is no concern
      // about it being stale, and the cache-busting can be skipped.
      dontCacheBustUrlsMatching: /\.\w{8}\./,
      filename: 'service-worker.js',
      logger(message) {
        if (message.indexOf('Total precache size is') === 0) {
          // This message occurs for every build and is a bit too noisy.
          return;
        }
        if (message.indexOf('Skipping static resource') === 0) {
          // This message obscures real errors so we ignore it.
          // https://github.com/facebookincubator/create-react-app/issues/2612
          return;
        }
        console.log(message);
      },
      minify: true,
      // For unknown URLs, fallback to the index page
      navigateFallback: publicUrl + '/index.html',
      // Ignores URLs starting from /__ (useful for Firebase):
      // https://github.com/facebookincubator/create-react-app/issues/2237#issuecomment-302693219
      navigateFallbackWhitelist: [/^(?!\/__).*/],
      // Don't precache sourcemaps (they're large) and build asset manifest:
      staticFileGlobsIgnorePatterns: [/\.map$/, /asset-manifest\.json$/],
    })
  );
} else {
  config.plugins.push(
    // Add module names to factory functions so they appear in browser profiler.
    new webpack.NamedModulesPlugin(),
    // This is necessary to emit hot updates (currently CSS only):
    new webpack.HotModuleReplacementPlugin()
  );
}

module.exports = config;
