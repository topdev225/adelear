const merge = require('webpack-merge');
const path = require('path');
const commonConfig = require('./webpack.common.js');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
var webpack = require('webpack');

const { devtoolMap, filenames, modeMap, pathMap } = require('./constants');

const {
  CleanGenerator,
  CssExtractGenerator,
  HtmlGenerator,
  UglifierGenerator
} = require('./plugin-generators');

const { curryPathJoin } = require('./utilities');

const srcPathJoiner = curryPathJoin(pathMap.src);

module.exports = env => {
  const envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});

  const productionConfig = {
    devtool: devtoolMap.production,
    entry: {
      ployfills: path.join(__dirname, '..', 'polyfills/object-assign.js'),
      app: srcPathJoiner('index.tsx'),
      azureConfig: path.join(__dirname, '..', 'app-config/web.config')
    },
    mode: modeMap.production,
    module: {
      rules: [
        {
          test: /\.(ico|gif|png|jpe?g|svg)$/i,
          use: [
            'file-loader',
            {
              loader: 'image-webpack-loader',
              options: {
                mozjpeg: {
                  progressive: true,
                  quality: 65
                },
                optipng: {
                  enabled: true
                },
                pngquant: {
                  quality: [0.65, 0.9],
                  speed: 4
                },
                gifsicle: {
                  interlaced: false
                },
                webp: {
                  quality: 75
                }
              }
            }
          ]
        },
        {
          test: /\.config$/,
          loader: 'file-loader',
          options: {
            name: '[name].[ext]'
          }
        },
        {
          test: /\.s?css$/,
          use: [
            {
              loader: MiniCssExtractPlugin.loader
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
          exclude: /node_modules/
        }
      ]
    },
    optimization: {
      minimizer: [UglifierGenerator()],
      splitChunks: {
        cacheGroups: {
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all'
          }
        }
      }
    },
    output: {
      filename: filenames.productionAppBundle,
      path: pathMap.output
    },
    plugins: [
      CleanGenerator(),
      CssExtractGenerator(),
      HtmlGenerator({
        template: srcPathJoiner('html-templates/index.prod.html'),
        minify: {
          collapseWhitespace: true,
          removeComments: true,
          removeRedundantAttributes: true,
          removeScriptTypeAttributes: true,
          removeStyleLinkTypeAttributes: true,
          useShortDoctype: true
        },
        hash: true
      }),
      new webpack.DefinePlugin(envKeys)
    ]
  };

  return merge(commonConfig, productionConfig);
};
