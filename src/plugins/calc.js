
/**
 * @description 解决JS浮点运算精度问题
 * @author Cicaba
 * @date 2019-08-30
 * @export calc
 * @returns 计算结果
 */
export default function calc() {
  let nowStr = Array.prototype.join.call(arguments, "");
  let test = /\*|\/|\+|\-/;
  let index = nowStr.search(test);
  let symbol = nowStr[index];
  let before = nowStr.substr(0, index);
  let affer, nowIndex;
  function subCalc() {
    index = nowStr.search(test);
    symbol = nowStr[index]
    nowStr = nowStr.substr(index + 1);
    nowIndex = nowStr.search(test);
    if (nowIndex > 0) {
      affer = nowStr.substr(0, nowIndex);
    } else {
      affer = nowStr;
    }
    if (symbol === '+') {
      before = accAdd(before, affer);
    } else if (symbol === '-') {
      before = accSub(before, affer);
    } else if (symbol === '*') {
      before = accMul(before, affer);
    } else {
      before = accDiv(before, affer);
    }
    if (symbol && nowIndex > 0) {
      subCalc()
    }
  }
  if (index > 0) {
    subCalc()
  }
  return before
}
/**
 ** 除法函数，用来得到精确的除法结果
 ** 说明：javascript的除法结果会有误差，在两个浮点数相除的时候会比较明显。这个函数返回较为精确的除法结果。
 ** 调用：accDiv(arg1,arg2)
 ** 返回值：arg1除以arg2的精确结果
 **/
function accDiv(arg1, arg2) {
  var t1 = 0;
  var t2 = 0;
  var r1, r2;
  try {
    t1 = arg1.toString().split('.')[1].length;
  } catch (e) { }
  try {
    t2 = arg2.toString().split('.')[1].length;
  } catch (e) { }
  r1 = Number(arg1.toString().replace('.', ''));
  r2 = Number(arg2.toString().replace('.', ''));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}
//给Number类型增加一个div方法，调用起来更加方便。Number.prototype.div = function (arg) {    return accDiv(this, arg);
/**
 ** 乘法函数，用来得到精确的乘法结果
 ** 说明：javascript的乘法结果会有误差，在两个浮点数相乘的时候会比较明显。这个函数返回较为精确的乘法结果。
 ** 调用：accMul(arg1,arg2)
 ** 返回值：arg1乘以 arg2的精确结果
 **/
function accMul(arg1, arg2) {
  var m = 0;
  var s1 = arg1.toString();
  var s2 = arg2.toString();
  try {
    m += s1.split('.')[1].length;
  } catch (e) { }
  try {
    m += s2.split('.')[1].length;
  } catch (e) { }
  return Number(s1.replace('.', '')) * Number(s2.replace('.', '')) / Math.pow(10, m);
}
// 给Number类型增加一个mul方法，调用起来更加方便。Number.prototype.mul = function (arg) {    return accMul(arg, this);
/**
 ** 减法函数，用来得到精确的减法结果
 ** 说明：javascript的减法结果会有误差，在两个浮点数相减的时候会比较明显。这个函数返回较为精确的减法结果。
 ** 调用：accSub(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accSub(arg1, arg2) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2)); //last modify by deeka //动态控制精度长度
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
// 给Number类型增加一个mul方法，调用起来更加方便。Number.prototype.sub = function (arg) {    return accMul(arg, this);
/**
 ** 加法函数，用来得到精确的加法结果
 ** 说明：javascript的加法结果会有误差，在两个浮点数相加的时候会比较明显。这个函数返回较为精确的加法结果。
 ** 调用：accAdd(arg1,arg2)
 ** 返回值：arg1加上arg2的精确结果
 **/
function accAdd(arg1, arg2) {
  var r1, r2, m, c;
  try {
    r1 = arg1.toString().split('.')[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split('.')[1].length;
  } catch (e) {
    r2 = 0;
  }
  c = Math.abs(r1 - r2);
  m = Math.pow(10, Math.max(r1, r2));
  if (c > 0) {
    var cm = Math.pow(10, c);
    if (r1 > r2) {
      arg1 = Number(arg1.toString().replace('.', ''));
      arg2 = Number(arg2.toString().replace('.', '')) * cm;
    } else {
      arg1 = Number(arg1.toString().replace('.', '')) * cm;
      arg2 = Number(arg2.toString().replace('.', ''));
    }
  } else {
    arg1 = Number(arg1.toString().replace('.', ''));
    arg2 = Number(arg2.toString().replace('.', ''));
  }
  return (arg1 + arg2) / m;
}