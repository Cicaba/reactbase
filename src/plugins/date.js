export const newDate = str => {
  if (str === null) return null;
  if (str === undefined) return new Date();
  if (str.constructor != String) return new Date(str);
  let $ = str.match(/^\s*(\d+)-(\d+)-(\d+)T(\d+):(\d+):(\d+)\s*$/);
  return $ && new Date($[1], $[2] - 1, $[3], $[4], $[5], $[6]) || new Date(str);
};
/**
 *  * 格式化时间
 *
 * @param {String} str
 * @param {String} fmt  "yyyy-MM-dd hh:mm:ss"  "yyyy-MM-dd"
 * @returns 格式化后的时间
 */
const formatDate = (str, fmt) => {
  if (!new Boolean(str) || str === null || str === undefined) {
    return "";
  }
  const now = newDate(str);
  let o = {
    "M+": now.getMonth() + 1, // 月份
    "d+": now.getDate(), // 日
    "h+": now.getHours(), // 小时
    "m+": now.getMinutes(), // 分
    "s+": now.getSeconds(), // 秒
    "q+": Math.floor((now.getMonth() + 3) / 3), // 季度
    "W+": getWeekNumber(now), // 周
    "N+": getMonthDays(now), // 天数
    "L+": isLeapYear(now), // 天数
    "S": now.getMilliseconds() // 毫秒
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (now.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  for (let k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};
export default formatDate;

/**
 * 判断年份是否为润年
 *
 * @param { Date } time
 */
function isLeapYear(time) {
  let year = time.getFullYear();
  return (year % 400 == 0) || (year % 4 == 0 && year % 100 != 0);
}
/**
 * 获取某一年份的某一月份的天数
 *
 * @param { Date } time
 * @returns { Number }
 */
function getMonthDays(time) {
  let month = time.getMonth();
  return [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][month] || (isLeapYear(time) ? 29 : 28);
}
/**
 * 获取某年的某天是第几周
 * @param { Date } time
 * @returns {Number}
 */
function getWeekNumber(time) {
  var now = new Date(time);
  var year = now.getFullYear();
  var month = now.getMonth();
  var days = now.getDate();
  // 那一天是那一年中的第多少天
  for (let i = 0; i < month; i++) {
    days += getMonthDays(time);
  }

  // 那一年第一天是星期几
  let yearFirstDay = new Date(year, 0, 1).getDay() || 7;

  let week = null;
  if (yearFirstDay == 1) {
    week = Math.ceil(days / yearFirstDay);
  } else {
    days -= (7 - yearFirstDay + 1);
    week = Math.ceil(days / 7) + 1;
  }

  return week;
}