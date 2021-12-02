const path = require("path"); // node 模块

module.exports = {
  mode: "none", // 原始模式
  entry: "./src/index.js", // 默认index
  output: {
    filename: "main.js", // 默认main
    path: path.join(__dirname, "dist"),
  },
};
