// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../src/index.ts":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getQueryString = getQueryString;
exports.fillz = fillz;
exports.toRawType = toRawType;
exports.isString = isString;
exports.isObject = isObject;
exports.isArray = isArray;
exports.isDate = isDate;
exports.isNumber = isNumber;
exports.isSymbol = isSymbol;
exports.formatDate = formatDate;
exports.formatTime = formatTime;
exports.toNumber = toNumber;
exports.getFirstDateOfMonth = getFirstDateOfMonth;
exports.getLastDateOfMonth = getLastDateOfMonth;
exports.getRangeDateOfMonth = getRangeDateOfMonth;
exports.getRangeDateOfWeek = getRangeDateOfWeek;
exports.getSuffix = getSuffix;
exports.isEmpty = isEmpty;
exports.pruneEmpty = pruneEmpty;
exports.serialize = serialize;
exports.encodeHTML = encodeHTML;
exports.decodeHTML = decodeHTML;
exports.rgbToHex = rgbToHex;
exports.hexToRgb = hexToRgb;

/**
 * @description 获取 url 查询参数
 * @param { string | string[] } name 参数 key，如果为数组，则返回多个
 * @param { string } [ href = location.href ] 目标 url，不传默认为当前 url，即 location.href
 * @return { string | string[] } 参数值 value，如果 name 为数组，则返回数组
 * @example
 * const href = 'https://www.baidu.com?name=tom&age=20'
 * getQueryString('name', href) // tom
 * getQueryString('age', href) // 20
 * getQueryString(['name', 'age'], href) // ['tom', '20']
 */
function getQueryString(name, href) {
  if (href === void 0) {
    href = location.href;
  }

  var getMatch = function getMatch(val) {
    var reg = new RegExp('(^|&)' + val + '=([^&]*)(&|$)', 'i');
    var match = query ? query.match(reg) : null;
    return match ? unescape(match[2]) : null;
  };

  var query = href.split('?')[1];

  if (isArray(name)) {
    return name.map(function (val) {
      return getMatch(val);
    });
  }

  return getMatch(name);
}
/**
 * @description 内容前补 0
 * @param { string | number } val 需要补 0 的内容
 * @param { number } [ count = 1 ] 0 的个数，默认为 1
 * @returns { string } 补 0 后的值
 * @example
 * fillz(1, 1) // '01'
 */


function fillz(val, count) {
  if (count === void 0) {
    count = 1;
  }

  return "" + Array(count).fill(0).join('') + val;
}
/**
 * @description 获取对象类型
 * @param { * } val 任意参数
 * @returns { string } 类型，Object、String 等
 * @example
 * toRawType({}) // Object
 * toRawType('') // String
 */


function toRawType(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
}
/**
 * @description 是否为字符串
 * @param { * } val 任意参数
 * @returns { boolean } 结果
 * @example
 * isString('hello') // true
 */


function isString(val) {
  return toRawType(val) === 'String';
}
/**
 * @description 是否为对象
 * @param { * } val 任意参数
 * @return { boolean } 结果
 */


function isObject(val) {
  return toRawType(val) === 'Object';
}
/**
 * @description 是否为数组
 * @param { * } val 任意参数
 * @return { boolean } 结果
 */


function isArray(val) {
  return toRawType(val) === 'Array';
}
/**
 * @description 是否为日期
 * @param { * } val 任意参数
 * @return { boolean } 结果
 */


function isDate(val) {
  return toRawType(val) === 'Date';
}
/**
 * @description 是否为数字
 * @param { * } val 任意参数
 * @return { boolean } 结果
 */


function isNumber(val) {
  return toRawType(val) === 'Number';
}
/**
 * @description 是否为 Symbol
 * @param { * } val 任意参数
 * @return { boolean } 结果
 */


function isSymbol(val) {
  return toRawType(val) === 'Symbol';
}
/**
 * @description Date 转字符串
 * @param { date } val Date 对象
 * @param { string } [ fmt = yyyy-MM-dd ] 格式，默认 yyyy-MM-dd
 * @returns { string } 转换后的日期
 * @example
 * formatDate(new Date()) // 2021-02-23
 * formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss') // 2021-02-23 13:40:44
 */


function formatDate(val, fmt) {
  if (fmt === void 0) {
    fmt = 'yyyy-MM-dd';
  }

  var map = {
    'y+': val.getFullYear(),
    'M+': val.getMonth() + 1,
    'd+': val.getDate(),
    'h+': val.getHours(),
    'm+': val.getMinutes(),
    's+': val.getSeconds()
  };
  Object.entries(map).forEach(function (_a) {
    var key = _a[0],
        value = _a[1];

    if (new RegExp("(" + key + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, value < 10 ? fillz(value) : value);
    }
  });
  return fmt;
}
/**
 * @description 毫秒转时间
 * @param { string } val 毫秒数
 * @param { string } [ fmt = dd:hh:mm:ss ] 格式，默认 dd:hh:mm:ss
 * @returns { string } 转换后的时间
 * @example
 * formatTime(60 * 1000) // 00:00:01:00
 * formatTime(60 * 1000, 'dd 天 hh 小时 mm 分钟 ss 秒') // 00 天 00 小时 01 分钟 00 秒
 * formatTime(60 * 1000 * 1.5, 'dd 天 hh 小时 mm 分钟 ss 秒') // 00 天 00 小时 01 分钟 30 秒
 * formatTime(60 * 1000 * 1.5, 'mm 分钟 ss 秒') // 01 分钟 30 秒
 */


function formatTime(val, fmt) {
  if (fmt === void 0) {
    fmt = 'dd:hh:mm:ss';
  }

  var secondMillisecond = 1000;
  var minuteMillisecond = secondMillisecond * 60;
  var hoursMillisecond = minuteMillisecond * 60;
  var dayMillisecond = hoursMillisecond * 24;
  var day = Math.floor(val / dayMillisecond);
  val = val - day * dayMillisecond;
  var hours = Math.floor(val / hoursMillisecond);
  val = val - hours * hoursMillisecond;
  var minute = Math.floor(val / minuteMillisecond);
  val = val - minute * minuteMillisecond;
  var second = Math.floor(val / secondMillisecond);
  var map = {
    'd+': day,
    'h+': hours,
    'm+': minute,
    's+': second
  };
  Object.entries(map).forEach(function (_a) {
    var key = _a[0],
        value = _a[1];

    if (new RegExp("(" + key + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, value < 10 ? fillz(value) : value);
    }
  });
  return fmt;
}
/**
 * @description 将字符串转为数字，转换失败返回原参数
 * @param { * } val 要转换的对象
 * @returns { * } 成功返回数字，失败原样返回
 * @example
 * toNumber('1') // 1
 * toNumber('a') // 'a'
 */


function toNumber(val) {
  var fmt = Number(val);
  return isNaN(fmt) ? val : fmt;
}
/**
 * @description 获取当月第一天
 * @param { object } dateConfig 配置对象
 * @param { number } dateConfig.offset 偏移，-1 表示上一月，1 表示下一月，默认为 0 当前月
 * @param { string } dateConfig.fmt 格式，不传返回 Date 对象
 * @returns { string | Date } 结果
 * @example
 * // 假设当前为 4 月
 * getFirstDateOfMonth() // Thu Apr 01 2021 00:00:00 GMT+0800 (中国标准时间)
 * getFirstDateOfMonth({ fmt: 'yyyy-MM-dd hh:mm:ss' }) // 2021-04-01 00:00:00
 * getFirstDateOfMonth({ offset: 1, fmt: 'yyyy-MM-dd hh:mm:ss' }) // 2021-05-01 00:00:00
 */


function getFirstDateOfMonth(_a) {
  var _b = _a === void 0 ? {} : _a,
      _c = _b.offset,
      offset = _c === void 0 ? 0 : _c,
      fmt = _b.fmt;

  var date = new Date();
  date.setMonth(date.getMonth() + offset);
  date.setDate(1);
  date.setHours(0, 0, 0, 0);
  return fmt ? formatDate(date, fmt) : date;
}
/**
 * @description 获取当月最后一天
 * @param { object } dateConfig 配置对象
 * @param { number } dateConfig.offset 偏移，-1 表示上一月，1 表示下一月，默认为 0 当前月
 * @param { string } dateConfig.fmt 格式，不传返回 Date 对象
 * @returns { string | Date } 结果
 * @example
 * // 假设当前为 4 月
 * getLastDateOfMonth() // Fri Apr 30 2021 23:59:59 GMT+0800 (中国标准时间)
 * getLastDateOfMonth({ fmt: 'yyyy-MM-dd hh:mm:ss' }) // 2021-04-30 23:59:59
 * getLastDateOfMonth({ offset: 1, fmt: 'yyyy-MM-dd hh:mm:ss' }) // 2021-05-31 23:59:59
 */


function getLastDateOfMonth(_a) {
  var _b = _a === void 0 ? {} : _a,
      _c = _b.offset,
      offset = _c === void 0 ? 0 : _c,
      fmt = _b.fmt;

  var date = new Date();
  date.setMonth(date.getMonth() + 1 + offset);
  date.setDate(0);
  date.setHours(23, 59, 59, 999);
  return fmt ? formatDate(date, fmt) : date;
}
/**
 * @description 获取当月日期范围
 * @param { object } dateConfig 配置对象
 * @param { number } dateConfig.offset 偏移，-1 表示上一月，1 表示下一月，默认为 0 当前月
 * @param { string } dateConfig.fmt 格式，不传返回 Date 对象
 * @returns { string[] | Date[] } 结果
 * @example
 * // 假设当前为 4 月
 * getRangeDateOfMonth() // [Thu Apr 01 2021 00:00:00 GMT+0800 (中国标准时间), Fri Apr 30 2021 23:59:59 GMT+0800 (中国标准时间)]
 * getRangeDateOfMonth({ fmt: 'yyyy-MM-dd hh:mm:ss' }) // ['2021-04-01 00:00:00', '2021-04-30 23:59:59']
 * getRangeDateOfMonth({ offset: 1, fmt: 'yyyy-MM-dd hh:mm:ss' }) // ['2021-05-01 00:00:00', '2021-05-31 23:59:59']
 */


function getRangeDateOfMonth(_a) {
  var _b = _a === void 0 ? {} : _a,
      _c = _b.offset,
      offset = _c === void 0 ? 0 : _c,
      fmt = _b.fmt;

  var start = getFirstDateOfMonth({
    offset: offset,
    fmt: fmt
  });
  var end = getLastDateOfMonth({
    offset: offset,
    fmt: fmt
  });
  return [start, end];
}
/**
 * @description 获取当前日期所在周的日期范围，比如今天是 2021 年 4 月 22 日（周 4），那么就返回这周的开始日期和结束日期
 * @param { object } dateConfig 配置对象
 * @param { number } dateConfig.offset 偏移，-1 表示上一周，1 表示下一周，默认为 0 当前周
 * @param { string } dateConfig.fmt 格式，不传返回 Date 对象
 * @returns { string[] | Date[] } 结果
 * @example
 * getRangeDateOfWeek() // [Mon Apr 19 2021 00:00:00 GMT+0800 (中国标准时间), Sun Apr 25 2021 23:59:59 GMT+0800 (中国标准时间)]
 * getRangeDateOfWeek({ fmt: 'yyyy-MM-dd hh:mm:ss' }) // ['2021-04-19 00:00:00', '2021-04-25 23:59:59']
 * getRangeDateOfWeek({ offset: 1, fmt: 'yyyy-MM-dd hh:mm:ss' }) // ['2021-04-26 00:00:00', '2021-05-02 23:59:59']
 */


function getRangeDateOfWeek(_a) {
  var _b = _a === void 0 ? {} : _a,
      _c = _b.offset,
      offset = _c === void 0 ? 0 : _c,
      fmt = _b.fmt;

  var date = new Date();
  var current = date.getDate();
  var day = date.getDay() || 7;
  var start = new Date();
  start.setDate(current + (7 * offset + 1 - day));
  start.setHours(0, 0, 0, 0);
  var end = new Date();
  end.setDate(current + (7 * (offset + 1) - day));
  end.setHours(23, 59, 59, 999);
  return fmt ? [formatDate(start, fmt), formatDate(end, fmt)] : [start, end];
}
/**
 * @description 获取后缀
 * @param { string } val 路径
 * @param { boolean } [ toUpperCase = false ] 是否转大写，默认 false，即小写
 * @returns { string } 后缀
 * @example
 * getSuffix('xx.jpg') // jpg
 * getSuffix('xx.jpg', true) // JPG
 * getSuffix('xx.JPG') // jpg
 */


function getSuffix(val, toUpperCase) {
  if (toUpperCase === void 0) {
    toUpperCase = false;
  }

  var suffix = val.substr(val.lastIndexOf('.') + 1);
  return toUpperCase ? suffix.toUpperCase() : suffix.toLowerCase();
}
/**
 * @description 是否为 null、undefined 或者 ''
 * @param { * } val 任意参数
 * @returns { boolean } 结果
 * @example
 * isEmpty('') // true
 * isEmpty(null) // true
 * isEmpty(undefined) // true
 * isEmpty(0) // false
 */


function isEmpty(val) {
  return val === null || val === undefined || val === '';
}
/**
 * @description 过滤对象空值属性
 * @param { object } val 要过滤的对象
 * @returns { object } 过滤后的对象
 * @example
 * const obj = {
 *   a: null,
 *   b: '',
 *   c: undefined,
 *   d: 'hello'
 * }
 * pruneEmpty(obj) // { d: hello }
 */


function pruneEmpty(val) {
  if (val) {
    var o_1 = {};
    Object.entries(val).forEach(function (_a) {
      var key = _a[0],
          value = _a[1];

      if (!isEmpty(value)) {
        o_1[key] = value;
      }
    });
    return o_1;
  }
}
/**
 * @description 将对象内的对象、数组属性转成 json
 * @param { object } val 要转换的对象
 * @returns { object } 转换后的对象
 * @example
 * const obj = {
 *   a: [ 1, 2, 3 ],
 *   b: { a: 1 },
 *   c: 'hello'
 * }
 * serialize(obj) // { a: '[ 1, 2, 3 ]', b: '{ "a": 1 }', c: 'hello' }
 */


function serialize(val) {
  var o = {};
  Object.entries(val).forEach(function (_a) {
    var key = _a[0],
        value = _a[1];

    if (isObject(value) || isArray(value)) {
      try {
        o[key] = JSON.stringify(value);
      } catch (error) {
        o[key] = value;
      }
    } else {
      o[key] = value;
    }
  });
  return o;
}
/**
 * @description 对 html 代码进行编码
 * @param { string } val html 代码
 * @returns { string } 编码后的字符串
 * @example
 * encodeHTML('<div>hello</div>') // &lt;div&gt;hello&lt;/div&gt;
 */


function encodeHTML(val) {
  var temp = document.createElement('div');
  temp.innerText = val;
  var output = temp.innerHTML;
  temp = null;
  return output;
}
/**
 * @description 与 encodeHTML 相反，对字符串进行 html 解码
 * @param { string } val 要解码的字符串
 * @returns { string } 解码后的 html
 * @example
 * decodeHTML('&lt;div&gt;hello&lt;/div&gt;') // <div>hello</div>
 */


function decodeHTML(val) {
  var temp = document.createElement('div');
  temp.innerHTML = val;
  var output = temp.innerText;
  temp = null;
  return output;
}
/**
 * @description rgb 颜色转 16 进制颜色
 * @param { string } val rgb 颜色
 * @returns { string } 转换后的 16 进制颜色
 * @example
 * rgbToHex('rgb(11,22,33)') // #0b1621
 */


function rgbToHex(val) {
  var result = null;
  var match = val.match(/^rgb\s*\(((\d,?\s*)+)\)$/);

  if (match && match[1]) {
    var values = match[1].split(',').slice(0, 3).map(function (item) {
      var hex = parseInt(item.trim(), 10).toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    });
    result = "#" + values.join('');
  }

  return result;
}
/**
 * @description 16 进制颜色转 rgb 颜色
 * @param { string } val 16 进制颜色
 * @returns { string } 转换后的 rgb 颜色
 * @example
 * hexToRgb('#0b1621') // rgb(11,22,33)
 */


function hexToRgb(val) {
  var result = null;
  var match = val.match(/^#([a-fA-F\d]{6}|[a-fA-F\d]{3})$/);

  if (match) {
    var target = match[1];
    if (target.length === 3) target = target.replace(/./g, function (s) {
      return s + s;
    });
    var values = [];

    for (var i = 0; i < 3; i++) {
      values.push(parseInt(target.substr(i * 2, 2), 16));
    }

    result = "rgb(" + values.join(',') + ")";
  }

  return result;
}
},{}],"main.ts":[function(require,module,exports) {
"use strict";

var _index = require("../src/index");

console.log((0, _index.formatTime)(60 * 1000, 'dd 天 hh 小时 mm 分钟 ss 秒'));
console.log((0, _index.formatTime)(60 * 1000 * 1.5, 'mm 分钟 ss 秒'));
console.log((0, _index.rgbToHex)('rgb(11,22,33)'));
console.log((0, _index.hexToRgb)('#ad1'));
},{"../src/index":"../src/index.ts"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "46479" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","main.ts"], null)
//# sourceMappingURL=/main.c39d6dcf.js.map