const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new HtmlWebpackPlugin({ template: "./src/index.html" }),
      new WebpackPwaManifest({
        name: "PWA Text Editor",
        short_name: "J.A.T.E",
        description: "Just Another Text Editor",
        background_color: "#ffffff",
        crossorigin: "use-credentials",
        icons: [
          {
            src: path.resolve("src/icon.png"),
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join("icons"),
          },
        ],
      }),
      new InjectManifest({
        swSrc: "./src/service-worker.js",
        swDest: "service-worker.js",
      }),
      new MiniCssExtractPlugin(),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [MiniCssExtractPlugin.loader, "css-loader"],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        },
      ],
    },
  };
};
