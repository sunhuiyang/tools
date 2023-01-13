import Api from "./request";
import { requestData } from "./zhenlingData";
const commonReq = async function (url, params) {
  const res = await Api.post(url, params);
  if (!(res.status >= 200 && res.status < 300)) {
    return {
      code: 2,
      msg: "请求错误",
    };
  }
  return {
    code: 0,
    msg: "成功",
    data: res.data,
  };
};
export default {
  async login(params) {
    const res = await commonReq("/account/login", params);
    if (res.data.status) localStorage.setItem("token", res.data.token);
    return res;
  },
  async reg(params) {
    const res = await commonReq("/account/reg", params);
    return res;
  },
  async available(params) {
    const res = await commonReq("/account/nameIsUse", params);
    return res;
  },
  async getData(params) {
    const res = await requestData(params);
    return res;
  },
};
