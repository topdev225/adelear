const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const { filenames, pathMap } = require("./constants");

const { curryPathJoin, pluginGenerator } = require("./utilities");

const srcPathJoiner = curryPathJoin(pathMap.src);
const distPathJoiner = curryPathJoin(pathMap.output);

const CssExtractGenerator = pluginGenerator(MiniCssExtractPlugin, {
  filename: filenames.productionCSSBundle,
  ignoreOrder: false
});

const CleanGenerator = pluginGenerator(CleanWebpackPlugin);

const HtmlGenerator = pluginGenerator(HtmlWebpackPlugin, {
  filename: distPathJoiner("index.html"),
  meta: {
    viewport:
      "minimum-scale=1, width=device-width, initial-scale=1, shrink-to-fit=no"
  },
  title: "Adelear",
  favicon: "src/assets/icons/favicon.ico"
});

const UglifierGenerator = pluginGenerator(UglifyJsPlugin, {
  sourceMap: true
});

module.exports = {
  CleanGenerator,
  CssExtractGenerator,
  HtmlGenerator,
  UglifierGenerator
};
