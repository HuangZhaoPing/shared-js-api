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
exports.encodeHTML = encodeHTML;
exports.decodeHTML = decodeHTML;
exports.validate = validate;

/**
 * @description ?????? url ????????????
 * @param { string | string[] } name ?????? key????????????????????????????????????
 * @param { string } [ href = location.href ] ?????? url???????????????????????? url?????? location.href
 * @return { string | string[] } ????????? value????????? name ???????????????????????????
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
 * @description ???????????? 0
 * @param { string | number } val ????????? 0 ?????????
 * @param { number } [ count = 1 ] 0 ????????????????????? 1
 * @returns { string } ??? 0 ?????????
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
 * @description ??????????????????
 * @param { * } val ????????????
 * @returns { string } ?????????Object???String ???
 * @example
 * toRawType({}) // Object
 * toRawType('') // String
 */


function toRawType(val) {
  return Object.prototype.toString.call(val).slice(8, -1);
}
/**
 * @description ??????????????????
 * @param { * } val ????????????
 * @returns { boolean } ??????
 * @example
 * isString('hello') // true
 */


function isString(val) {
  return toRawType(val) === 'String';
}
/**
 * @description ???????????????
 * @param { * } val ????????????
 * @return { boolean } ??????
 */


function isObject(val) {
  return toRawType(val) === 'Object';
}
/**
 * @description ???????????????
 * @param { * } val ????????????
 * @return { boolean } ??????
 */


function isArray(val) {
  return toRawType(val) === 'Array';
}
/**
 * @description ???????????????
 * @param { * } val ????????????
 * @return { boolean } ??????
 */


function isDate(val) {
  return toRawType(val) === 'Date';
}
/**
 * @description ???????????????
 * @param { * } val ????????????
 * @return { boolean } ??????
 */


function isNumber(val) {
  return toRawType(val) === 'Number';
}
/**
 * @description ????????? Symbol
 * @param { * } val ????????????
 * @return { boolean } ??????
 */


function isSymbol(val) {
  return toRawType(val) === 'Symbol';
}
/**
 * @description Date ????????????
 * @param { date } val Date ??????
 * @param { string } [ fmt = yyyy-MM-dd ] ??????????????? yyyy-MM-dd
 * @returns { string } ??????????????????
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
 * @description ???????????????
 * @param { string } val ?????????
 * @param { string } [ fmt = dd:hh:mm:ss ] ??????????????? dd:hh:mm:ss
 * @returns { string } ??????????????????
 * @example
 * formatTime(60 * 1000) // 00:00:01:00
 * formatTime(60 * 1000, 'dd ??? hh ?????? mm ?????? ss ???') // 00 ??? 00 ?????? 01 ?????? 00 ???
 * formatTime(60 * 1000 * 1.5, 'dd ??? hh ?????? mm ?????? ss ???') // 00 ??? 00 ?????? 01 ?????? 30 ???
 * formatTime(60 * 1000 * 1.5, 'mm ?????? ss ???') // 01 ?????? 30 ???
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
 * @description ??????????????????????????????????????????????????????
 * @param { * } val ??????????????????
 * @returns { * } ???????????????????????????????????????
 * @example
 * toNumber('1') // 1
 * toNumber('a') // 'a'
 */


function toNumber(val) {
  var fmt = Number(val);
  return isNaN(fmt) ? val : fmt;
}
/**
 * @description ?????????????????????
 * @param { object } dateConfig ????????????
 * @param { number } dateConfig.offset ?????????-1 ??????????????????1 ??????????????????????????? 0 ?????????
 * @param { string } dateConfig.fmt ????????????????????? Date ??????
 * @returns { string | Date } ??????
 * @example
 * // ??????????????? 4 ???
 * getFirstDateOfMonth() // Thu Apr 01 2021 00:00:00 GMT+0800 (??????????????????)
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
 * @description ????????????????????????
 * @param { object } dateConfig ????????????
 * @param { number } dateConfig.offset ?????????-1 ??????????????????1 ??????????????????????????? 0 ?????????
 * @param { string } dateConfig.fmt ????????????????????? Date ??????
 * @returns { string | Date } ??????
 * @example
 * // ??????????????? 4 ???
 * getLastDateOfMonth() // Fri Apr 30 2021 23:59:59 GMT+0800 (??????????????????)
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
 * @description ????????????????????????
 * @param { object } dateConfig ????????????
 * @param { number } dateConfig.offset ?????????-1 ??????????????????1 ??????????????????????????? 0 ?????????
 * @param { string } dateConfig.fmt ????????????????????? Date ??????
 * @returns { string[] | Date[] } ??????
 * @example
 * // ??????????????? 4 ???
 * getRangeDateOfMonth() // [Thu Apr 01 2021 00:00:00 GMT+0800 (??????????????????), Fri Apr 30 2021 23:59:59 GMT+0800 (??????????????????)]
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
 * @description ???????????????????????????????????????????????????????????? 2021 ??? 4 ??? 22 ????????? 4?????????????????????????????????????????????????????????
 * @param { object } dateConfig ????????????
 * @param { number } dateConfig.offset ?????????-1 ??????????????????1 ??????????????????????????? 0 ?????????
 * @param { string } dateConfig.fmt ????????????????????? Date ??????
 * @returns { string[] | Date[] } ??????
 * @example
 * getRangeDateOfWeek() // [Mon Apr 19 2021 00:00:00 GMT+0800 (??????????????????), Sun Apr 25 2021 23:59:59 GMT+0800 (??????????????????)]
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
 * @description ????????????
 * @param { string } val ??????
 * @param { boolean } [ toUpperCase = false ] ???????????????????????? false????????????
 * @returns { string } ??????
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
 * @description ????????? null???undefined ?????? ''
 * @param { * } val ????????????
 * @returns { boolean } ??????
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
 * @description ??? html ??????????????????
 * @param { string } val html ??????
 * @returns { string } ?????????????????????
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
 * @description ??? encodeHTML ??????????????????????????? html ??????
 * @param { string } val ?????????????????????
 * @returns { string } ???????????? html
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
 * @description ????????????
 * @param { string } type ??????????????????????????????mobilePhone????????????email???18???????????????identityCard
 * @param { string | number } val ???????????????
 * @returns { string } ??????
 */


function validate(type, val) {
  if (isEmpty(val)) return false;

  switch (type) {
    case 'mobilePhone':
      {
        return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(val);
      }

    case 'email':
      {
        return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val);
      }

    case 'identityCard':
      {
        return /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(val);
      }

    default:
      {
        return false;
      }
  }
}
},{}],"main.ts":[function(require,module,exports) {
"use strict";

var _index = require("../src/index");

console.log((0, _index.validate)('mobilePhone', '13111111111'));
console.log((0, _index.validate)('email', '131111111@11.x'));
console.log((0, _index.validate)('identityCard', '44182719900618681X'));
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "45339" + '/');

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
      console.log('[parcel] ??? Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] ????  ' + data.error.message + '\n' + data.error.stack);
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
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">????</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
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