const path = require('path');
const glob = require('glob');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const RemoveEmptyScriptsPlugin = require('webpack-remove-empty-scripts');


const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: () => {
    const entries = {};

    // PCSSのエントリーポイント設定
    const pcssFiles = glob.sync('./src/pcss/**/*.pcss');
    pcssFiles.forEach(filePath => {
      const relativePath = path.relative('./src/pcss', filePath).replace(/\.pcss$/, '');
      entries['css/' + relativePath] = './' + filePath;
    });

    // JavaScriptのエントリーポイント設定
    const jsFiles = glob.sync('./src/js/**/*.js');
    jsFiles.forEach(filePath => {
      const relativePath = path.relative('./src/js', filePath).replace(/\.js$/, '');
      entries['js/' + relativePath] = './' + filePath;
    });

    return entries;
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    assetModuleFilename: 'assets/[name][ext]',
    clean: true,
  },

  // devtool を環境によって切り替える
  devtool: isProduction ? false : 'source-map',

  module: {
    rules: [
      {
        test: /\.(css|pcss)$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              url: true,
              esModule: false,
            },
          },
          'postcss-loader',
        ],
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff2?|ttf|eot|otf)$/,
        type: 'asset/resource',
        generator: {
          filename: (pathData) => {
            // src/assets/fonts/metropolis/Metropolis-SemiBold.woff2 を
            // assets/fonts/metropolis/Metropolis-SemiBold.woff2 に変換
            const originalPath = pathData.filename.replace(/\\/g, '/'); // Windows対策
            const withoutSrc = originalPath.replace(/^src\/assets\//, ''); // src/assets/ を削除
            return `assets/${withoutSrc}`;
          },
        },
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },

  plugins: [
    new RemoveEmptyScriptsPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),
  ],

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};