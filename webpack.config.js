const path = require('path');
const webpack = require('webpack');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetPlugin = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

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
  const loaders = ['style-loader', 'css-loader'];

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

const PAGES_DIR = `${PATHS.src}/pages/`;

const ASSET_PATH = process.env.ASSET_PATH || '/';

module.exports = {
  context: path.resolve(__dirname, 'src'),
  mode: 'development',
  entry: {
    common: ['@babel/polyfill', './common.js'],
    index: ['@babel/polyfill', './pages/index/index.js'],
    landing: ['@babel/polyfill', './pages/landing/landing.js'],
    cards: ['@babel/polyfill', './pages/cards/cards.js'],
    filter: ['@babel/polyfill', './pages/filter/filter.js'],
    formElements: ['@babel/polyfill', './pages/form-elements/formElements.js'],
    headersFooters: ['@babel/polyfill', './pages/headers-footers/headersFooters.js'],
    registration: ['@babel/polyfill', './pages/registration/registration.js'],
    signIn: ['@babel/polyfill', './pages/sign-in/signIn.js'],
    roomDetails: ['@babel/polyfill', './pages/room-details/roomDetails.js'],
  },
  output: {
    filename: filename('js'),
    path: path.resolve(__dirname, 'dist'),
    publicPath: ASSET_PATH,
  },
  resolve: {
    extensions: ['.jsx', '.ts', '.js'],
    alias: {
      '~': path.resolve(__dirname, 'node_modules/'),
      src: path.resolve(__dirname, 'src/'),
      utils: path.resolve(__dirname, 'src/utils/'),
      components: path.resolve(__dirname, 'src/components/'),
      img: path.resolve(__dirname, 'src/assets/img/'),
      fonts: path.resolve(__dirname, 'src/assets/fonts/'),
      js: path.resolve(__dirname, 'src/js/'),
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
    ...[
      new HTMLWebpackPlugin({
        template: `${PAGES_DIR}/index/index.pug`,
        filename: 'index.html',
        chunks: ['index'],
        minify: false,
      }),

      new HTMLWebpackPlugin({
        template: `${PAGES_DIR}/landing/landing.pug`,
        filename: 'landing.html',
        chunks: ['common', 'landing'],
        minify: false,
      }),

      new HTMLWebpackPlugin({
        template: `${PAGES_DIR}/cards/cards.pug`,
        filename: 'cards.html',
        chunks: ['cards'],
        minify: false,
      }),
      new HTMLWebpackPlugin({
        template: `${PAGES_DIR}/filter/filter.pug`,
        filename: 'filter.html',
        chunks: ['common', 'filter'],
        minify: false,
      }),
      new HTMLWebpackPlugin({
        template: `${PAGES_DIR}/form-elements/form-elements.pug`,
        filename: 'form-elements.html',
        chunks: ['formElements'],
        minify: false,
      }),
      new HTMLWebpackPlugin({
        template: `${PAGES_DIR}/headers-footers/headers-footers.pug`,
        filename: 'headers-footers.html',
        chunks: ['headersFooters'],
        minify: false,
      }),
      new HTMLWebpackPlugin({
        template: `${PAGES_DIR}/room-details/room-details.pug`,
        filename: 'room-details.html',
        chunks: ['common', 'roomDetails'],
        minify: false,
      }),
      new HTMLWebpackPlugin({
        template: `${PAGES_DIR}/registration/registration.pug`,
        filename: 'registration.html',
        chunks: ['common', 'registration'],
        minify: false,
      }),
      new HTMLWebpackPlugin({
        template: `${PAGES_DIR}/sign-in/sign-in.pug`,
        filename: 'sign-in.html',
        chunks: ['common', 'signIn'],
        minify: false,
      }),
    ],

    new MiniCssExtractPlugin({
      filename: filename('css'),
      linkType: false,
    }),
    new SpriteLoaderPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: cssLoaders('postcss-loader'),
      },
      {
        test: /\.scss$/,
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
    ],
  },
};
