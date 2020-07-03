/**
 * @description
 * @author Cicaba
 * @date 2020-01-13
 * @export
 * @param {*} [obj={}]
 * @param {*} [arr=[]]
 * @param {*} [arrtext=[]]
 */
import { Toast } from "antd-mobile";

export default (obj = {}, arr = [], arrtext = []) => {
  // obj = this.clone(obj);
  if (arr.length !== arrtext.length) {
    Toast.offline('传入的验证提示不正确!', 1);
    return true;
  }
  let objNow = {};
  let deal = obj => {
    Object.keys(obj).forEach(v => {
      objNow = { ...objNow, ...obj };
      if (Object.prototype.toString.call(obj[v]) === '[object Object]') {
        let objOld = JSON.parse(JSON.stringify(objNow[v]));
        delete objNow[v];
        deal(objOld);
      }
    });
  };
  deal(obj);
  for (let i = 0, l = arr.length; i < l; i++) {
    if (objNow[arr[i]] === '' ||
      objNow[arr[i]] == undefined || objNow[arr[i]] === null || (Array.isArray(objNow[arr[i]]) && objNow[arr[i]].length === 0)) {
      Toast.offline(arrtext[i] + '为必填项!', 1);
      return true;
    }
  }
};