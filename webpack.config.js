const path = require("path"); // node 模块

/**
 * JSDoc 配置提示
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: "none", // 原始模式
  entry: "./src/style.css", // 默认index
  output: {
    filename: "main.js", // 默认main
    path: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
};
