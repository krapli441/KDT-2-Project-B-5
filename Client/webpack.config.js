const path = require("path");
const Dotenv = require("dotenv-webpack");
module.exports = {
  entry: {
    index: "./src/controller/index.tsx",
  },
  output: {
    path: path.join(__dirname, "/public"),
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
    extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".png"],
  },
  plugins: [new Dotenv()],
  devtool: "source-map",
};
