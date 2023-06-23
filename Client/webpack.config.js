const path = require('path')

module.exports = {
    entry: {
      index: "./test/index.jsx",
    },
    output: {
      path: path.join(__dirname, "../../public"),
      filename: "bundle.js",
    },
    module: {
      rules: [
        {
          test: [/\.js$/, /\.jsx$/],
          use: ["babel-loader"],
        },
        {
          test: [/\.ts$/, /\.tsx$/],
          use: ["ts-loader"],
        },
        { 
          test: [/\.css$/],
          use: ["style-loader", "css-loader"],
        },
        { test: [/\.(png|jpe?g|gif)$/i], use: ["file-loader"] },
      ],
    },
    devServer: {
      historyApiFallback: true,
      port: 8085,
      hot: true,
    },
    resolve: {
      extensions: [".js", ".jsx", ".ts", ".tsx", ".css", ".png"],
    },
    // plugins: [
    //   new CopyWebpackPlugin([
    //     {
    //       from: "./public/img/image",
    //       to: "./public/img/image",
    //     },
    //   ]),
    // ],
  };