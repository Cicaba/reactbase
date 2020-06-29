import Axios from 'axios';
import axiosJsonp from '../plugins/axiosJsonp';
// import { Notify } from 'vant';
let Notify = () => {};
let open = [];
let off = [];
Axios.interceptors.request.use(config => {
    //这里写死一个token，你需要在这里取到你设置好的token的值
    // 这里将token设置到headers中，header的key是Authorization，这个key值根据你的需要进行修改即可
    // config.headers.Authorization = token;
    // config.headers = { 'Access-Control-Allow-Origin': '*' };
    //测试环境
    config.baseURL = process.env.NODE_ENV === 'development' ? '/' : '/';

    config.withCredentials = true; // 允许携带cookie
    config.timeout = 30000; // 请求的超时时间
    loading(true, config.url);
    // store.commit('setLoading', true);
    return config;
  },
  error => {
    loading(true, error.url);
    return Promise.reject(error);
  });
Axios.interceptors.response.use(
  response => {
    let data = response.data;
    switch (response.status) {
      case 200:
        if (data.exception && !data.success) {
          Notify({ type: 'danger', message: data.message });
          loading(false, response.config.url);
          return Promise.reject(response);
        }
        if (!data.success) {
          Notify({ type: 'danger', message: data.message });
          loading(false, response.config.url);
          return Promise.reject(response);
        }
        break;
      case 204:
        Notify({ type: 'warning', message: '服务器成功处理了请求，但没有返回任何内容!' });
        break;
    }
    // store.commit('setLoading', false);
    try {
      loading(false, response.config.url);
    } catch (error) {
      loading(false, 'cicaba');
    }
    return Promise.resolve(response);
  },
  error => {
    try {
      var data = error.response.data;
    } catch (error) {
      loading(false, 'cicaba');
    }
    if (error.response) {
      switch (error.response.status) {
        case 301:
          Notify({ type: 'warning', message: '请求的网页已永久移动到新位置!' });
          break;
        case 302:
          Notify({ type: 'warning', message: '请求的网页已临时移动到新位置!' });
          break;
        case 401:
          window.location.hash = '/login';
          Notify({ type: 'warning', message: '登录过期，请重新登录！' });
          // store.commit('setPwd', null);
          loadingDisplay();
          break;
        case 404:
          Notify({ type: 'danger', message: '请求接口不存在！' });
          break;
        case 408:
          Notify({ type: 'danger', message: '服务器等候请求时发生超时' });
          break;
        case 410:
          Notify({ type: 'danger', message: '资源以被删除' });
          break;
        case 413:
          Notify({ type: 'danger', message: '请求实体过大，超出服务器的处理能力!' });
          break;
        case 415:
          Notify({ type: 'danger', message: '请求的URI过长，服务器无法处理!' });
          break;
        case 500:
          if (!data.success) {
            Notify({ type: 'danger', message: data.message });
          }
          break;
        case 503:
          Notify({ type: 'danger', message: '服务不可用0.0！' });
          break;
      }
      // store.commit('setLoading', false);
      loading(false, error.config.url);
      return Promise.reject(error); // 返回接口返回的错误信息
    } else {
      window.location.hash = '/login';
      Notify({ type: 'danger', message: '你与世界已经断开联系...' });
      loadingDisplay();
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

function loadingDisplay() {
  let els = document.getElementsByClassName('sky-loading-box');
  for (let i = 0, length = els.length; i < length; i++) {
    els[i].style.display = 'none';
  }
}

function loading(isadded, url) {
  if (isadded) {
    open.push(url);
    if (open.length === 1) {
      // store.commit('setLoading', true);
    }
  } else {
    off.push(url);
    setTimeout(() => {
      if (open.length && open.length === off.length) {
        // store.commit('setLoading', false);
        off = [];
        open = [];
      }
    }, 300);
  }
}