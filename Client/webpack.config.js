const path = require("path");

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
    ],
  },
  devServer: {
    historyApiFallback: true,
    port: 8085,
  },
  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".png"],
  },
};
