module.exports = class RemoveCommentsPlugin {
  apply(compiler) {
    compiler.hooks.emit.tap("RemoveCommentsPlugin", (compilation) => {
      for (const name in compilation.assets) {
        if (name.endsWith(".js")) {
          const contents = compilation.assets[name].source();
          const noComments = contents.replace(/\/\*{2,}\/\s?/g, "");
          // 暴露source() size()
          compilation.assets[name] = {
            source: () => noComments,
            size: () => noComments.length,
          };
        }
      }
    });
  }
};
