import { formatTime } from '../src/index'

console.log(formatTime(60 * 1000, 'dd 天 hh 小时 mm 分钟 ss 秒'))
console.log(formatTime(60 * 1000 * 1.5, 'mm 分钟 ss 秒'))
