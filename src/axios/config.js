import Axios from 'axios';
import axiosJsonp from '../plugins/axiosJsonp';
import loading from '@/components/loading';
import { Toast } from 'antd-mobile';
import store from "@/store/store.js";
console.log(store.getState());
let open = [];
let off = [];
Axios.interceptors.request.use(config => {
    //这里写死一个token，你需要在这里取到你设置好的token的值
    // 这里将token设置到headers中，header的key是Authorization，这个key值根据你的需要进行修改即可
    // config.headers.Authorization = token;
    // config.headers = {
    //   'Access-Control-Allow-Origin': '*',
    //   "Content-Type": "application/json; charset=utf-8"
    // };
    //测试环境

    let token = store.getState().user.accessToken;
    if (config.url.includes("Login") || config.url.includes("WeixinBinding")) {
      token = null;
    }
    token && (config.headers.Authorization = "Bearer " + token);
    config.baseURL = process.env.NODE_ENV === 'development' ? '/' : '/';

    config.withCredentials = true; // 允许携带cookie
    config.timeout = 30000; // 请求的超时时间
    queue(true, config.url);
    return config;
  },
  error => {
    queue(true, error.url);
    return Promise.reject(error);
  });
Axios.interceptors.response.use(
  response => {
    let data = response.data;
    switch (response.status) {
      case 200:
        if (!data.success) {
          Toast.fail(data.message);
          queue(false, response.config.url);
          return Promise.reject(response);
        } else if (data.result && Array.isArray(data.result.items) && !data.result.items.length) {
          Toast.offline("无数据!!!", 1);
        }
        break;
      case 204:
        Toast.fail('服务器成功处理了请求，但没有返回任何内容!');
        return Promise.reject(response);
    }
    // store.commit('setLoading', false);
    try {
      queue(false, response.config.url);
    } catch (error) {
      queue(false, 'cicaba');
    }
    return Promise.resolve(response);
  },
  error => {
    let data;
    try {
      data = error.response.data;
    } catch (error) {
      queue(false, 'cicaba');
    }
    if (error.response) {
      switch (error.response.status) {
        case 301:
          Toast.fail('请求的网页已永久移动到新位置!');
          break;
        case 302:
          Toast.fail('请求的网页已临时移动到新位置!');
          break;
        case 401:
          window.location.href = '/login';
          Toast.fail('登录过期，请重新登录！');
          break;
        case 404:
          Toast.fail('请求接口不存在！');
          break;
        case 408:
          Toast.fail('服务器等候请求时发生超时');
          break;
        case 410:
          Toast.fail('资源以被删除');
          break;
        case 413:
          Toast.fail('请求实体过大，超出服务器的处理能力!');
          break;
        case 415:
          Toast.fail('请求的URI过长，服务器无法处理!');
          break;
        case 500:
          if (!data.success) {
            Toast.fail(data.error.message);
          }
          break;
        case 503:
          Toast.fail('服务不可用0.0！');
          break;
      }
      // store.commit('setLoading', false);
      queue(false, error.config.url);
      return Promise.reject(error); // 返回接口返回的错误信息
    }
  });

Axios.jsonp = (url, callbackParamName = 'callback') => {
  return new Promise((resolve, reject) => {
    Axios({
      url,
      adapter: axiosJsonp,
      callbackParamName // optional, 'callback' by default
    }).then((res) => {
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  });
};
Axios.file = (url, file, ) => {
  let param = new FormData(); //创建form对象
  param.append('file', file.file); //通过append向form对象添加数据
  return new Promise((resolve, reject) => {
    Axios.post(
      url,
      param, { headers: { 'Content-Type': 'multipart/form-data' } }
    ).then((res) => {
      resolve(res);
    }).catch(err => {
      reject(err);
    });
  });
};
export default Axios;

function queue(isadded, url) {
  if (isadded) {
    open.push(url);
    if (open.length === 1) {
      loading.show();
    }
  } else {
    off.push(url);
    setTimeout(() => {
      if (open.length && open.length === off.length) {
        loading.hide();
        off = [];
        open = [];
      }
    }, 300);
  }
}