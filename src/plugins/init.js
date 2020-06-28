/**
 * @description
 * @author Cicaba
 * @date 2019-12-24
 * @export []
 * @param {*} obj
 * @returns obj
 */
export default function init(obj, c1, c2, c3) {
  let n = 0;
  let s = "";
  let b = true;
  typeof c1 === 'number' && (n = c1);
  typeof c2 === 'number' && (n = c2);
  typeof c3 === 'number' && (n = c3);
  typeof c1 === 'string' && (s = c1);
  typeof c2 === 'string' && (s = c2);
  typeof c3 === 'string' && (s = c3);
  typeof c1 === 'boolean' && (b = c1);
  typeof c2 === 'boolean' && (b = c2);
  typeof c3 === 'boolean' && (b = c3);
  if (obj instanceof Object) {
    if (Array.isArray(obj)) {
      // 数组
      let each = (obj) => {
        for (let i = 0, l = obj.length; i < l; i++) {
          if (obj[i] instanceof Object) {
            init(obj[i]);
          } else {
            obj.splice(i, 1);
            each(obj);
          }
        }
      };
      each(obj);
    } else {
      // 对象
      let keys = Object.keys(obj);
      keys.forEach((v, i) => {
        if (typeof obj[v] === 'number') {
          obj[v] = n;
        } else if (typeof obj[v] === 'string') {
          obj[v] = s;
        } else if (typeof obj[v] === 'undefined' || obj[v] === null) {
          obj[v] = null;
        } else if (typeof obj[v] === 'boolean') {
          obj[v] = b;
        } else {
          init(obj[v], c1, c2, c3);
        }
      });
    }
    return obj;
  } else {
    return obj;
  }
};