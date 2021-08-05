/* version: 0.2.6 */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global['SHARED-JS-API'] = {}));
}(this, (function (exports) { 'use strict';

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
      if (href === void 0) { href = location.href; }
      var getMatch = function (val) {
          var reg = new RegExp('(^|&)' + val + '=([^&]*)(&|$)', 'i');
          var match = query ? query.match(reg) : null;
          return match ? unescape(match[2]) : null;
      };
      var query = href.split('?')[1];
      if (isArray(name)) {
          return name.map(function (val) { return getMatch(val); });
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
      if (count === void 0) { count = 1; }
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
      if (fmt === void 0) { fmt = 'yyyy-MM-dd'; }
      var map = {
          'y+': val.getFullYear(),
          'M+': val.getMonth() + 1,
          'd+': val.getDate(),
          'h+': val.getHours(),
          'm+': val.getMinutes(),
          's+': val.getSeconds()
      };
      Object.entries(map).forEach(function (_a) {
          var key = _a[0], value = _a[1];
          if (new RegExp("(" + key + ")").test(fmt)) {
              fmt = fmt.replace(RegExp.$1, (value < 10 ? fillz(value) : value));
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
      if (fmt === void 0) { fmt = 'dd:hh:mm:ss'; }
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
          var key = _a[0], value = _a[1];
          if (new RegExp("(" + key + ")").test(fmt)) {
              fmt = fmt.replace(RegExp.$1, (value < 10 ? fillz(value) : value));
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
      var _b = _a === void 0 ? {} : _a, _c = _b.offset, offset = _c === void 0 ? 0 : _c, fmt = _b.fmt;
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
      var _b = _a === void 0 ? {} : _a, _c = _b.offset, offset = _c === void 0 ? 0 : _c, fmt = _b.fmt;
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
      var _b = _a === void 0 ? {} : _a, _c = _b.offset, offset = _c === void 0 ? 0 : _c, fmt = _b.fmt;
      var start = getFirstDateOfMonth({ offset: offset, fmt: fmt });
      var end = getLastDateOfMonth({ offset: offset, fmt: fmt });
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
      var _b = _a === void 0 ? {} : _a, _c = _b.offset, offset = _c === void 0 ? 0 : _c, fmt = _b.fmt;
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
      if (toUpperCase === void 0) { toUpperCase = false; }
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
   * @description 验证参数
   * @param { string } type 要验证类型，手机号：mobilePhone、邮箱：email、18位身份证：identityCard
   * @param { string | number } val 要验证的值
   * @returns { string } 结果
   */
  function validate(type, val) {
      if (isEmpty(val))
          return false;
      switch (type) {
          case 'mobilePhone': {
              return /^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])\d{8}$/.test(val);
          }
          case 'email': {
              return /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val);
          }
          case 'identityCard': {
              return /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(val);
          }
          default: {
              return false;
          }
      }
  }

  exports.decodeHTML = decodeHTML;
  exports.encodeHTML = encodeHTML;
  exports.fillz = fillz;
  exports.formatDate = formatDate;
  exports.formatTime = formatTime;
  exports.getFirstDateOfMonth = getFirstDateOfMonth;
  exports.getLastDateOfMonth = getLastDateOfMonth;
  exports.getQueryString = getQueryString;
  exports.getRangeDateOfMonth = getRangeDateOfMonth;
  exports.getRangeDateOfWeek = getRangeDateOfWeek;
  exports.getSuffix = getSuffix;
  exports.isArray = isArray;
  exports.isDate = isDate;
  exports.isEmpty = isEmpty;
  exports.isNumber = isNumber;
  exports.isObject = isObject;
  exports.isString = isString;
  exports.isSymbol = isSymbol;
  exports.toNumber = toNumber;
  exports.toRawType = toRawType;
  exports.validate = validate;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
