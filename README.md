## Functions

<dl>
<dt><a href="#getQueryString">getQueryString(name, [href])</a> ⇒ <code>string</code> | <code>Array.&lt;string&gt;</code></dt>
<dd><p>获取 url 查询参数</p>
</dd>
<dt><a href="#fillz">fillz(val, [count])</a> ⇒ <code>string</code></dt>
<dd><p>内容前补 0</p>
</dd>
<dt><a href="#toRawType">toRawType(val)</a> ⇒ <code>string</code></dt>
<dd><p>获取对象类型</p>
</dd>
<dt><a href="#isString">isString(val)</a> ⇒ <code>boolean</code></dt>
<dd><p>是否为字符串</p>
</dd>
<dt><a href="#isObject">isObject(val)</a> ⇒ <code>boolean</code></dt>
<dd><p>是否为对象</p>
</dd>
<dt><a href="#isArray">isArray(val)</a> ⇒ <code>boolean</code></dt>
<dd><p>是否为数组</p>
</dd>
<dt><a href="#isDate">isDate(val)</a> ⇒ <code>boolean</code></dt>
<dd><p>是否为日期</p>
</dd>
<dt><a href="#isNumber">isNumber(val)</a> ⇒ <code>boolean</code></dt>
<dd><p>是否为数字</p>
</dd>
<dt><a href="#isSymbol">isSymbol(val)</a> ⇒ <code>boolean</code></dt>
<dd><p>是否为 Symbol</p>
</dd>
<dt><a href="#isFunction">isFunction(val)</a> ⇒ <code>boolean</code></dt>
<dd><p>是否为 Function</p>
</dd>
<dt><a href="#isPromise">isPromise(val)</a> ⇒ <code>boolean</code></dt>
<dd><p>是否为 Promise</p>
</dd>
<dt><a href="#formatDate">formatDate(val, [fmt])</a> ⇒ <code>string</code></dt>
<dd><p>Date 转字符串</p>
</dd>
<dt><a href="#formatTime">formatTime(val, [fmt])</a> ⇒ <code>string</code></dt>
<dd><p>毫秒转时间</p>
</dd>
<dt><a href="#toNumber">toNumber(val)</a> ⇒ <code>*</code></dt>
<dd><p>将字符串转为数字，转换失败返回原参数</p>
</dd>
<dt><a href="#getFirstDateOfMonth">getFirstDateOfMonth(dateConfig)</a> ⇒ <code>string</code> | <code>Date</code></dt>
<dd><p>获取当月第一天</p>
</dd>
<dt><a href="#getLastDateOfMonth">getLastDateOfMonth(dateConfig)</a> ⇒ <code>string</code> | <code>Date</code></dt>
<dd><p>获取当月最后一天</p>
</dd>
<dt><a href="#getRangeDateOfMonth">getRangeDateOfMonth(dateConfig)</a> ⇒ <code>Array.&lt;string&gt;</code> | <code>Array.&lt;Date&gt;</code></dt>
<dd><p>获取当月日期范围</p>
</dd>
<dt><a href="#getRangeDateOfWeek">getRangeDateOfWeek(dateConfig)</a> ⇒ <code>Array.&lt;string&gt;</code> | <code>Array.&lt;Date&gt;</code></dt>
<dd><p>获取当前日期所在周的日期范围，比如今天是 2021 年 4 月 22 日（周 4），那么就返回这周的开始日期和结束日期</p>
</dd>
<dt><a href="#getSuffix">getSuffix(val, [toUpperCase])</a> ⇒ <code>string</code></dt>
<dd><p>获取后缀</p>
</dd>
<dt><a href="#isEmpty">isEmpty(val)</a> ⇒ <code>boolean</code></dt>
<dd><p>是否为 null、undefined 或者 &#39;&#39;</p>
</dd>
<dt><a href="#encodeHTML">encodeHTML(val)</a> ⇒ <code>string</code></dt>
<dd><p>对 html 代码进行编码</p>
</dd>
<dt><a href="#decodeHTML">decodeHTML(val)</a> ⇒ <code>string</code></dt>
<dd><p>与 encodeHTML 相反，对字符串进行 html 解码</p>
</dd>
<dt><a href="#validate">validate(type, val)</a> ⇒ <code>string</code></dt>
<dd><p>验证参数</p>
</dd>
</dl>

<a name="getQueryString"></a>

## getQueryString(name, [href]) ⇒ <code>string</code> \| <code>Array.&lt;string&gt;</code>
获取 url 查询参数

**Kind**: global function  
**Returns**: <code>string</code> \| <code>Array.&lt;string&gt;</code> - 参数值 value，如果 name 为数组，则返回数组  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| name | <code>string</code> \| <code>Array.&lt;string&gt;</code> |  | 参数 key，如果为数组，则返回多个 |
| [href] | <code>string</code> | <code>&quot;location.href&quot;</code> | 目标 url，不传默认为当前 url，即 location.href |

**Example**  
```js
const href = 'https://www.baidu.com?name=tom&age=20'
getQueryString('name', href) // tom
getQueryString('age', href) // 20
getQueryString(['name', 'age'], href) // ['tom', '20']
```
<a name="fillz"></a>

## fillz(val, [count]) ⇒ <code>string</code>
内容前补 0

**Kind**: global function  
**Returns**: <code>string</code> - 补 0 后的值  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| val | <code>string</code> \| <code>number</code> |  | 需要补 0 的内容 |
| [count] | <code>number</code> | <code>1</code> | 0 的个数，默认为 1 |

**Example**  
```js
fillz(1, 1) // '01'
```
<a name="toRawType"></a>

## toRawType(val) ⇒ <code>string</code>
获取对象类型

**Kind**: global function  
**Returns**: <code>string</code> - 类型，Object、String 等  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>\*</code> | 任意参数 |

**Example**  
```js
toRawType({}) // Object
toRawType('') // String
```
<a name="isString"></a>

## isString(val) ⇒ <code>boolean</code>
是否为字符串

**Kind**: global function  
**Returns**: <code>boolean</code> - 结果  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>\*</code> | 任意参数 |

**Example**  
```js
isString('hello') // true
```
<a name="isObject"></a>

## isObject(val) ⇒ <code>boolean</code>
是否为对象

**Kind**: global function  
**Returns**: <code>boolean</code> - 结果  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>\*</code> | 任意参数 |

<a name="isArray"></a>

## isArray(val) ⇒ <code>boolean</code>
是否为数组

**Kind**: global function  
**Returns**: <code>boolean</code> - 结果  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>\*</code> | 任意参数 |

<a name="isDate"></a>

## isDate(val) ⇒ <code>boolean</code>
是否为日期

**Kind**: global function  
**Returns**: <code>boolean</code> - 结果  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>\*</code> | 任意参数 |

<a name="isNumber"></a>

## isNumber(val) ⇒ <code>boolean</code>
是否为数字

**Kind**: global function  
**Returns**: <code>boolean</code> - 结果  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>\*</code> | 任意参数 |

<a name="isSymbol"></a>

## isSymbol(val) ⇒ <code>boolean</code>
是否为 Symbol

**Kind**: global function  
**Returns**: <code>boolean</code> - 结果  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>\*</code> | 任意参数 |

<a name="isFunction"></a>

## isFunction(val) ⇒ <code>boolean</code>
是否为 Function

**Kind**: global function  
**Returns**: <code>boolean</code> - 结果  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>\*</code> | 任意参数 |

<a name="isPromise"></a>

## isPromise(val) ⇒ <code>boolean</code>
是否为 Promise

**Kind**: global function  
**Returns**: <code>boolean</code> - 结果  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>\*</code> | 任意参数 |

<a name="formatDate"></a>

## formatDate(val, [fmt]) ⇒ <code>string</code>
Date 转字符串

**Kind**: global function  
**Returns**: <code>string</code> - 转换后的日期  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| val | <code>date</code> |  | Date 对象 |
| [fmt] | <code>string</code> | <code>&quot;yyyy-MM-dd&quot;</code> | 格式，默认 yyyy-MM-dd |

**Example**  
```js
formatDate(new Date()) // 2021-02-23
formatDate(new Date(), 'yyyy-MM-dd hh:mm:ss') // 2021-02-23 13:40:44
```
<a name="formatTime"></a>

## formatTime(val, [fmt]) ⇒ <code>string</code>
毫秒转时间

**Kind**: global function  
**Returns**: <code>string</code> - 转换后的时间  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| val | <code>string</code> |  | 毫秒数 |
| [fmt] | <code>string</code> | <code>&quot;dd:hh:mm:ss&quot;</code> | 格式，默认 dd:hh:mm:ss |

**Example**  
```js
formatTime(60 * 1000) // 00:00:01:00
formatTime(60 * 1000, 'dd 天 hh 小时 mm 分钟 ss 秒') // 00 天 00 小时 01 分钟 00 秒
formatTime(60 * 1000 * 1.5, 'dd 天 hh 小时 mm 分钟 ss 秒') // 00 天 00 小时 01 分钟 30 秒
formatTime(60 * 1000 * 1.5, 'mm 分钟 ss 秒') // 01 分钟 30 秒
```
<a name="toNumber"></a>

## toNumber(val) ⇒ <code>\*</code>
将字符串转为数字，转换失败返回原参数

**Kind**: global function  
**Returns**: <code>\*</code> - 成功返回数字，失败原样返回  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>\*</code> | 要转换的对象 |

**Example**  
```js
toNumber('1') // 1
toNumber('a') // 'a'
```
<a name="getFirstDateOfMonth"></a>

## getFirstDateOfMonth(dateConfig) ⇒ <code>string</code> \| <code>Date</code>
获取当月第一天

**Kind**: global function  
**Returns**: <code>string</code> \| <code>Date</code> - 结果  

| Param | Type | Description |
| --- | --- | --- |
| dateConfig | <code>object</code> | 配置对象 |
| dateConfig.offset | <code>number</code> | 偏移，-1 表示上一月，1 表示下一月，默认为 0 当前月 |
| dateConfig.fmt | <code>string</code> | 格式，不传返回 Date 对象 |

**Example**  
```js
// 假设当前为 4 月
getFirstDateOfMonth() // Thu Apr 01 2021 00:00:00 GMT+0800 (中国标准时间)
getFirstDateOfMonth({ fmt: 'yyyy-MM-dd hh:mm:ss' }) // 2021-04-01 00:00:00
getFirstDateOfMonth({ offset: 1, fmt: 'yyyy-MM-dd hh:mm:ss' }) // 2021-05-01 00:00:00
```
<a name="getLastDateOfMonth"></a>

## getLastDateOfMonth(dateConfig) ⇒ <code>string</code> \| <code>Date</code>
获取当月最后一天

**Kind**: global function  
**Returns**: <code>string</code> \| <code>Date</code> - 结果  

| Param | Type | Description |
| --- | --- | --- |
| dateConfig | <code>object</code> | 配置对象 |
| dateConfig.offset | <code>number</code> | 偏移，-1 表示上一月，1 表示下一月，默认为 0 当前月 |
| dateConfig.fmt | <code>string</code> | 格式，不传返回 Date 对象 |

**Example**  
```js
// 假设当前为 4 月
getLastDateOfMonth() // Fri Apr 30 2021 23:59:59 GMT+0800 (中国标准时间)
getLastDateOfMonth({ fmt: 'yyyy-MM-dd hh:mm:ss' }) // 2021-04-30 23:59:59
getLastDateOfMonth({ offset: 1, fmt: 'yyyy-MM-dd hh:mm:ss' }) // 2021-05-31 23:59:59
```
<a name="getRangeDateOfMonth"></a>

## getRangeDateOfMonth(dateConfig) ⇒ <code>Array.&lt;string&gt;</code> \| <code>Array.&lt;Date&gt;</code>
获取当月日期范围

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> \| <code>Array.&lt;Date&gt;</code> - 结果  

| Param | Type | Description |
| --- | --- | --- |
| dateConfig | <code>object</code> | 配置对象 |
| dateConfig.offset | <code>number</code> | 偏移，-1 表示上一月，1 表示下一月，默认为 0 当前月 |
| dateConfig.fmt | <code>string</code> | 格式，不传返回 Date 对象 |

**Example**  
```js
// 假设当前为 4 月
getRangeDateOfMonth() // [Thu Apr 01 2021 00:00:00 GMT+0800 (中国标准时间), Fri Apr 30 2021 23:59:59 GMT+0800 (中国标准时间)]
getRangeDateOfMonth({ fmt: 'yyyy-MM-dd hh:mm:ss' }) // ['2021-04-01 00:00:00', '2021-04-30 23:59:59']
getRangeDateOfMonth({ offset: 1, fmt: 'yyyy-MM-dd hh:mm:ss' }) // ['2021-05-01 00:00:00', '2021-05-31 23:59:59']
```
<a name="getRangeDateOfWeek"></a>

## getRangeDateOfWeek(dateConfig) ⇒ <code>Array.&lt;string&gt;</code> \| <code>Array.&lt;Date&gt;</code>
获取当前日期所在周的日期范围，比如今天是 2021 年 4 月 22 日（周 4），那么就返回这周的开始日期和结束日期

**Kind**: global function  
**Returns**: <code>Array.&lt;string&gt;</code> \| <code>Array.&lt;Date&gt;</code> - 结果  

| Param | Type | Description |
| --- | --- | --- |
| dateConfig | <code>object</code> | 配置对象 |
| dateConfig.offset | <code>number</code> | 偏移，-1 表示上一周，1 表示下一周，默认为 0 当前周 |
| dateConfig.fmt | <code>string</code> | 格式，不传返回 Date 对象 |

**Example**  
```js
getRangeDateOfWeek() // [Mon Apr 19 2021 00:00:00 GMT+0800 (中国标准时间), Sun Apr 25 2021 23:59:59 GMT+0800 (中国标准时间)]
getRangeDateOfWeek({ fmt: 'yyyy-MM-dd hh:mm:ss' }) // ['2021-04-19 00:00:00', '2021-04-25 23:59:59']
getRangeDateOfWeek({ offset: 1, fmt: 'yyyy-MM-dd hh:mm:ss' }) // ['2021-04-26 00:00:00', '2021-05-02 23:59:59']
```
<a name="getSuffix"></a>

## getSuffix(val, [toUpperCase]) ⇒ <code>string</code>
获取后缀

**Kind**: global function  
**Returns**: <code>string</code> - 后缀  

| Param | Type | Default | Description |
| --- | --- | --- | --- |
| val | <code>string</code> |  | 路径 |
| [toUpperCase] | <code>boolean</code> | <code>false</code> | 是否转大写，默认 false，即小写 |

**Example**  
```js
getSuffix('xx.jpg') // jpg
getSuffix('xx.jpg', true) // JPG
getSuffix('xx.JPG') // jpg
```
<a name="isEmpty"></a>

## isEmpty(val) ⇒ <code>boolean</code>
是否为 null、undefined 或者 ''

**Kind**: global function  
**Returns**: <code>boolean</code> - 结果  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>\*</code> | 任意参数 |

**Example**  
```js
isEmpty('') // true
isEmpty(null) // true
isEmpty(undefined) // true
isEmpty(0) // false
```
<a name="encodeHTML"></a>

## encodeHTML(val) ⇒ <code>string</code>
对 html 代码进行编码

**Kind**: global function  
**Returns**: <code>string</code> - 编码后的字符串  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>string</code> | html 代码 |

**Example**  
```js
encodeHTML('<div>hello</div>') // &lt;div&gt;hello&lt;/div&gt;
```
<a name="decodeHTML"></a>

## decodeHTML(val) ⇒ <code>string</code>
与 encodeHTML 相反，对字符串进行 html 解码

**Kind**: global function  
**Returns**: <code>string</code> - 解码后的 html  

| Param | Type | Description |
| --- | --- | --- |
| val | <code>string</code> | 要解码的字符串 |

**Example**  
```js
decodeHTML('&lt;div&gt;hello&lt;/div&gt;') // <div>hello</div>
```
<a name="validate"></a>

## validate(type, val) ⇒ <code>string</code>
验证参数

**Kind**: global function  
**Returns**: <code>string</code> - 结果  

| Param | Type | Description |
| --- | --- | --- |
| type | <code>string</code> | 要验证类型，11 位手机号：mobilePhone、邮箱：email、18 位身份证：identityCard |
| val | <code>string</code> \| <code>number</code> | 要验证的值 |

**Example**  
```js
validate('mobilePhone', '13122222222') // true
validate('mobilePhone', '11111111111') // false

validate('email', '32d@xx.cc') // true
validate('email', '32d.cc') // false
```
