const marked = require("marked"); // 解析markdown 到 HTML字符串 的npm包

module.exports = (source) => {
  const html = marked.parse(source);

  return html;
};
