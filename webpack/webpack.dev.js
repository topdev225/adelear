const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common.js');

const { devtoolMap, filenames, modeMap, pathMap } = require('./constants');

const { CleanGenerator, HtmlGenerator } = require('./plugin-generators');

const { curryPathJoin } = require('./utilities');

const srcPathJoiner = curryPathJoin(pathMap.src);

module.exports = () => {
  const devServer = {
    contentBase: pathMap.output,
    historyApiFallback: true
  };

  const developmentConfig = {
    devServer,
    devtool: devtoolMap.development,
    entry: {
      // react-devtools must load before the app
      'react-devtools': 'react-devtools',
      ployfills: path.join(__dirname, '..', 'polyfills/object-assign.js'),
      app: srcPathJoiner('index.tsx')
    },
    mode: modeMap.development,
    module: {
      rules: [
        {
          test: /\.(ico|png|jpe?g)$/,
          loader: 'file-loader',
          options: {
            name: 'assets/[name].[ext]'
          }
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                sourceMap: true
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: true
              }
            }
          ],
          exclude: /node_modules/
        },
        {
          test: /\.tsx?$/,
          loader: 'awesome-typescript-loader',
          exclude: /node_modules/,
          options: {
            compilerOptions: {
              sourceMap: true
            }
          }
        }
      ]
    },
    output: {
      filename: filenames.developmentAppBundle,
      path: pathMap.output
    },
    plugins: [
      CleanGenerator(),
      HtmlGenerator({
        template: srcPathJoiner('html-templates/index.dev.html')
      })
    ]
  };

  return merge(commonConfig, developmentConfig);
};
