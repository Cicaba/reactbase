// 该方法利用的是延迟调用，在指定时间内如果再次执行，那么上次的定时器将被清理，直到指定时间内不再调用，函数才会被执行！
/**
 * @description 去抖函数(当调用动作n毫秒后，才会执行该动作，若在这n毫秒内又调用此动作则将重新计算执行时间，如此往复，直到不再调用该动作，函数才会执行。)
 * @author Cicaba
 * @date 2019-08-30
 * @param {*} action
 * @param {*} idle
 * @returns function
 */
export default function debounce(action, idle = 16.7) {
  var last = null;
  return function () {
    var ctx = this;
    var args = arguments;
    clearTimeout(last);
    last = setTimeout(function () {
      action.apply(ctx, args);
    }, idle);
  };
}
// 通常时间设为16.7sm,由于主流的屏幕刷新率都在60hz，因此渲染一帧的事件就必须控制在16.7ms内才能保证不掉帧。也就是说每一次渲染都要在 16.7ms