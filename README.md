## 打包结果运行原理

```js
/******/ (() => {
  // webpackBootstrap
  /******/ "use strict";
  /******/ var __webpack_modules__ = [
    ,
    /* 0 */ /* 1 */
    /***/ (
      __unused_webpack_module,
      __webpack_exports__,
      __webpack_require__
    ) => {
      __webpack_require__.r(__webpack_exports__);
      /* harmony export */ __webpack_require__.d(__webpack_exports__, {
        /* harmony export */ default: () => __WEBPACK_DEFAULT_EXPORT__,
        /* harmony export */
      });
      /* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = () => {
        const element = document.createElement("h2");

        element.textContent = "Hello world";
        element.addEventListener("click", () => {
          alert("Hello webpack");
        });

        return element;
      };

      /***/
    },
    /******/
  ];
  /************************************************************************/
  /******/ // The module cache
  /******/ var __webpack_module_cache__ = {};
  /******/
  /******/ // The require function
  /******/ function __webpack_require__(moduleId) {
    /******/ // Check if module is in cache
    /******/ var cachedModule = __webpack_module_cache__[moduleId];
    /******/ if (cachedModule !== undefined) {
      /******/ return cachedModule.exports;
      /******/
    }
    /******/ // Create a new module (and put it into the cache)
    /******/ var module = (__webpack_module_cache__[moduleId] = {
      /******/ // no module.id needed
      /******/ // no module.loaded needed
      /******/ exports: {},
      /******/
    });
    /******/
    /******/ // Execute the module function
    /******/ __webpack_modules__[moduleId](
      module,
      module.exports,
      __webpack_require__
    );
    /******/
    /******/ // Return the exports of the module
    /******/ return module.exports;
    /******/
  }
  /******/
  /************************************************************************/
  /******/ /* webpack/runtime/define property getters */
  /******/ (() => {
    /******/ // define getter functions for harmony exports
    /******/ __webpack_require__.d = (exports, definition) => {
      /******/ for (var key in definition) {
        /******/ if (
          __webpack_require__.o(definition, key) &&
          !__webpack_require__.o(exports, key)
        ) {
          /******/ Object.defineProperty(exports, key, {
            enumerable: true,
            get: definition[key],
          });
          /******/
        }
        /******/
      }
      /******/
    };
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/hasOwnProperty shorthand */
  /******/ (() => {
    /******/ __webpack_require__.o = (obj, prop) =>
      Object.prototype.hasOwnProperty.call(obj, prop);
    /******/
  })();
  /******/
  /******/ /* webpack/runtime/make namespace object */
  /******/ (() => {
    /******/ // define __esModule on exports
    /******/ __webpack_require__.r = (exports) => {
      /******/ if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
        /******/ Object.defineProperty(exports, Symbol.toStringTag, {
          value: "Module",
        });
        /******/
      }
      /******/ Object.defineProperty(exports, "__esModule", { value: true });
      /******/
    };
    /******/
  })();
  /******/
  /************************************************************************/
  var __webpack_exports__ = {};
  // This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
  (() => {
    __webpack_require__.r(__webpack_exports__);
    /* harmony import */ var _heading_js__WEBPACK_IMPORTED_MODULE_0__ =
      __webpack_require__(1);

    const heading = (0, _heading_js__WEBPACK_IMPORTED_MODULE_0__["default"])();

    document.body.append(heading);
  })();

  /******/
})();
```

## Loader

Webpack 默认只加载 JS 语法，其他资源如`css`就需要`css-loader`处理 css 语法。

可以看到注释也会被打包到最终的`js`文件，所以去除多余的注释也是性能优化的一个点。

```js
/******/ (() => {
  // webpackBootstrap
  var __webpack_exports__ = {};
  /* You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file. */
  /* div {
  font-size: 12px;
} */

  /* 测试JS语法 */
  console.log("JS in CSS");
  /******/
})();
```

### css-loader

```js
var ___CSS_LOADER_EXPORT___ =
  _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()(
    _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()
  );
// Module
___CSS_LOADER_EXPORT___.push([
  module.id,
  "div {\r\n  color: red;\r\n}\r\n",
  "",
]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ =
  ___CSS_LOADER_EXPORT___;
```

### style-loader

```js
/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
```

## plugin

自定义插件去除注释

- compiler
- compilation

```js
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
```
