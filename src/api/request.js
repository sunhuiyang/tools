import axios from "axios";
const token = localStorage.getItem("token");
const baseUrl = import.meta.env.VITE_APP_BASE_URL;
axios.interceptors.request.use(
  function (config) {
    !token || (config["headers"]["Authorization"] = `Bearer ${token}`);
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);
export default {
  get(url, params) {
    return axios
      .get(url, {
        params: { ...params }
      })
      .then(res => res)
      .catch(() => {
        throw new Error("网络错误");
      });
  },
  post(url, params) {
    // if(url.include("login")||url.include("reg"))
    // if (url.includes("/file")) {
    return axios
      .post(baseUrl + url, params)
      .then(res => res)
      .catch(() => {
        throw new Error("网络错误");
      });
  }
};
