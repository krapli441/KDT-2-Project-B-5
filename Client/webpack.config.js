const path = require("path");
const dotenv = require('dotenv-webpack');

module.exports = {
  entry: {
    index: "./src/index.tsx",
  },
  output: {
    path: path.join(__dirname, "./public"),
    filename: "bundle.js",
  },
  output: {
    path: path.join(__dirname, "../server/public"),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: [/\.(js|jsx)$/],
        use: ["babel-loader"],
      },
      {
        test: [/\.(ts|tsx)$/],
        use: ["ts-loader"],
      },
      {
        test: [/\.(css)$/],
        use: ["style-loader", "css-loader"],
      },
      {
        test: [/\.(png|jpe?g|gif)$/i],
        use: ["file-loader"],
      },
      {
        test: /\.(mp3|ogg)$/,
        loader: "file-loader",
        options: {
          name: "assets/media/[name].[ext]?[hash]",
        },
      },
    ],
  },
  devServer: {
    historyApiFallback: true,
    port: 8085,
  },
  resolve: {
    extensions: [".js ", ".jsx", ".ts", ".tsx", ".css", ".png"],
    fallback: {
      path: require.resolve('path-browserify'),
      os: require.resolve('os-browserify/browser'),
      crypto: require.resolve('crypto-browserify'),
       stream: require.resolve('stream-browserify'),
      buffer: require.resolve('buffer/'),
    },
  },
  devtool: "source-map",
  
};
