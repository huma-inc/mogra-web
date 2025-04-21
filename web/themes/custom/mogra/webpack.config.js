const path = require('path');
const glob = require('glob');

const isProduction = process.env.NODE_ENV === 'production';

module.exports = {
  entry: () => {
    const entries = {};

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
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
    ],
  },

  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
};