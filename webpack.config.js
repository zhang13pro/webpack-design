const path = require("path"); // node 模块

const RemoveCommentsPlugin = require("./remove-comments-plugin");

/**
 * JSDoc 配置提示
 * @type {import('webpack').Configuration}
 */
module.exports = {
  mode: "none", // 原始模式
  entry: "./src/main.js", // 默认index
  output: {
    filename: "md.js", // 默认main
    path: path.join(__dirname, "dist"),
  },
  module: {
    rules: [
      {
        test: /\.md$/,
        use: ["html-loader", "./md-loader"],
      },
    ],
  },
  plugins: [new RemoveCommentsPlugin({})],
};
