/* eslint-disable implicit-arrow-linebreak */
const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');
const fs = require('fs');

const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: 'all',
    },
  };

  if (isProd) {
    config.minimizer = [new OptimizeCssAssetPlugin(), new TerserWebpackPlugin()];
  }
  return config;
};

const filename = (ext) => (isDev ? `[name].${ext}` : `[name].[hash].${ext}`);

const cssLoaders = (extra) => {
  const loaders = [
    {
      loader: MiniCssExtractPlugin.loader,
      options: {
        hmr: isDev,
        reloadAll: true,
        sourceMap: isDev,
      },
    },
    'css-loader',
  ];

  if (extra) {
    loaders.push(extra);
  }
  return loaders;
};

const babelOptions = (preset) => {
  const opts = {
    presets: ['@babel/preset-env'],
  };
  if (preset) {
    opts.presets.push(preset);
  }
  return opts;
};

const jsLoaders = () => {
  const loaders = [
    {
      loader: 'babel-loader',
      options: babelOptions(),
    },
  ];
  const eslintLoader = {
    loader: 'eslint-loader',
  };
  if (isDev) {
    loaders.push(eslintLoader);
  }
  return loaders;
};

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/',
};

// Pages const for HtmlWebpackPlugin
// see more: https://github.com/vedees/webpack-template/blob/master/README.md#html-dir-folder
// const PAGES_DIR = PATHS.src
const PAGES_DIR = `${PATHS.src}/pages/`;

const SUB_DIRS = [];

function deepGetDirectories(distPath) {
  return fs
    .readdirSync(distPath)
    .filter((file) => {
      SUB_DIRS.push(file);
      return fs.statSync(`${distPath}/${file}`).isDirectory();
    })
    .reduce(
      (all, subDir) => [
        ...all,
        ...fs
          .readdirSync(`${distPath}/${subDir}`)
          .map((e) => `${subDir}/${e}`)
          .filter((e) => e.endsWith('.pug')),
      ],
      []
    );
}

const PAGES_WITH_DIR = deepGetDirectories(PAGES_DIR);

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    main: ['@babel/polyfill', './index.js'],
    // some other entry point
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),

    // turn on that publicPath for deploy
    // publicPath: '/toxin/',
  },
  resolve: {
    extensions: ['.jsx', '.ts', '.js'],
    alias: {
      '~': path.resolve(__dirname, 'node_modules/'),
    },
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
  },
  devtool: isDev ? 'source-map' : '',
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new CopyWebpackPlugin({
      patterns: [{ from: `${PATHS.src}/assets/favicons/`, to: 'assets/favicons' }],
    }),
    new MiniCssExtractPlugin({
      filename: filename('css'),
    }),
    ...PAGES_WITH_DIR.map(
      (page) =>
        new HTMLWebpackPlugin({
          template: `${PAGES_DIR}/${page}`,
          filename: `${page.substring(page.lastIndexOf('/') + 1, page.length).replace(/\.pug/, '.html')}`,
          minify: false,
        })
    ),
    new SpriteLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders(),
      },
      {
        test: /\.s[ac]ss$/,
        use: cssLoaders('sass-loader'),
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        exclude: [path.resolve(__dirname, `${PATHS.src}/assets/img/icons/`)],
        options: {
          outputPath: 'assets/img',
        },
      },
      {
        test: /\.(woff|woff2)$/,
        loader: 'file-loader',
        options: {
          outputPath: 'assets/fonts',
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: jsLoaders(),
      },
      {
        test: /\.pug$/,
        use: [
          {
            loader: 'pug-loader',
            options: {
              pretty: false,
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: [path.resolve(__dirname, `${PATHS.src}/assets/img/icons/`)],
        options: {
          publicPath: '',
          extract: true,
          spriteFilename: 'icons.svg',
          outputPath: './assets/img/icons/',
          esModule: false,
        },
      },
      // {
      //   test: /\.svg$/,
      //   loader: 'svgo-loader',
      //   include: [path.resolve(__dirname, `${PATHS.src}/assets/img/icons/`)],
      //   options: {
      //     plugins: [{ removeAttrs: { attrs: ['fill', 'stroke'] } }],
      //   },
      // },
    ],
  },
};
