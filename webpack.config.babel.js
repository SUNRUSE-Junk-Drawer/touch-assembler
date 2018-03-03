import {
  join as pathJoin
} from "path"

import HtmlWebpackPlugin from "html-webpack-plugin"

import ExtractTextWebpackPlugin from "extract-text-webpack-plugin"
const extractTextCss = new ExtractTextWebpackPlugin({
  filename: "index.css"
})

import FaviconsWebpackPlugin from "favicons-webpack-plugin"

import { WebpackBundleSizeAnalyzerPlugin } from "webpack-bundle-size-analyzer"

module.exports = {
  entry: "./src/index.js",
  output: {
    path: pathJoin(__dirname, "dist"),
    filename: "index.js"
  },
  module: {
    rules: [{
      test: /\.js$/, use: {
        loader: "babel-loader",
        options: {
          presets: ["env"],
          plugins: [["transform-react-jsx", { pragma: "ultradomCreateNode" }]]
        }
      }
    },
    {
      test: /\.css$/,
      use: extractTextCss.extract({
        fallback: "style-loader",
        use: ["css-loader"]
      })
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: "head",
      title: "Touch Assembler",
      minify: {
        collapseWhitespace: true,
        removeComments: true
      }
    }),
    extractTextCss,
    new FaviconsWebpackPlugin({
      logo: "./src/favicon.png",
      prefix: "icons/",
      background: "#000",
      title: "Touch Assembler",
      icons: {
        coast: true,
        opengraph: true,
        twitter: true,
        yandex: true,
        windows: true
      }
    }),
    new WebpackBundleSizeAnalyzerPlugin(pathJoin(__dirname, "stats.txt"))
  ]
}