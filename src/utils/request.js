import axios from "axios";

import Api from "./api";
import defaultConfig from "defaultConfig";

import { message } from "antd";

const { api, productName } = defaultConfig;

class Axios {
  axios = axios.create({
    baseURL: api.origin + api.path,
    timeout: 60000,
    headers: {
      Authorization: ""
    }
  });
  constructor() {
    // 初始化axios拦截器
    this.init();
  }
  init() {
    // request拦截器
    this.axios.interceptors.request.use(
      config => {
        /**
         * 参数非空排除
         * 排除空字符串以及null
         */
        let data = config.data;
        let rdata = {};
        let token = localStorage.getItem(`${productName}-token`);

        let dataKeys = Object.keys(data);
        if (dataKeys.length > 0) {
          Object.keys(data).forEach(v => {
            if (data[v] !== "" && data[v] !== null) {
              rdata[v] = typeof data[v] === 'string' ? data[v].trim() : data[v]
            };
          });
          // AES加密
          config.data = rdata;
        }

        config.headers.token = token;
        return config;
      },
      err => {
        console.log(err);
        return Promise.reject(err);
      }
    );

    // response拦截器
    this.axios.interceptors.response.use(
      response => {
        const r = response.data;
        // 暂时只是导出接口特殊情况
        if (r.code === undefined) {
          let reg = new RegExp("=(.*)", "g");
          let exportname = response.headers["content-disposition"].match(reg)
            ? RegExp.$1
            : "模板";
          return { data: r, filename: decodeURIComponent(exportname) };
        } else if (r.code === 0) {
          let result = r.data || r.page;
          return result;
        } else {
          const msg = r.msg || "error";
          // 1003 token失效情况，跳转登录
          if (r.code === "1003") {
            // localStorage.removeItem(`${productName}-token`);
            // let redirect = window.location.pathname;
            // window.location.href = "/base/login?redirect=" + encodeURIComponent(redirect);
          }
          message.destroy("apiError");
          message.error({ content: msg, key: "apiError" });
          return Promise.reject(msg);
        }
      },
      err => {
        console.log(err);
        return Promise.reject(err);
      }
    );
  }
  post(apiname, params) {
    const url = apiname.indexOf("http") === -1 ? Api[apiname] : apiname;

    let requestBody = {
      url,
      data: params,
      method: "post"
    };
    return new Promise((resolve, reject) => {
      this.axios(requestBody).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      });
    });
  }
  get(apiname, params = {}) {
    let url = apiname.indexOf("http") === -1 ? Api[apiname] : apiname;
    let str = "";
    Object.keys(params).forEach(v => {
      str += `/${params[v]}`;
    });
    url = `${url}${str ? `${str}` : ""}`;
    let requestBody = {
      url,
      data: {},
      method: "get"
    };

    return new Promise((resolve, reject) => {
      this.axios(requestBody).then(response => {
        resolve(response);
      }).catch(error => {
        reject(error)
      });
    });
  }
  export(apiname, params) {
    let url = apiname.indexOf("http") === -1 ? Api[apiname] : apiname;
    let requestBody = {
      url,
      data: params,
      method: "post",
      headers: {
        "content-type": "application/json; charset=utf-8"
      },
      responseType: "blob"
    };
    return new Promise((resolve, reject) => {
      this.axios(requestBody).then(response => {
        resolve(response);
      });
    });
  }
}

export default new Axios();
