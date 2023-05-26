import bus from "../api/bus";
import { useStore } from "../store/pinia";
import { getLocalSave } from "../utils/util";
export const plugin = {};
plugin.install = function (app, options) {
  app.directive("type", (el, binding) => {
    //v-type，判断模板类型
    el.innerHTML = binding.value;
  });
  app.directive("has", {
    mounted(el, binding, vnode) {
      //判断权限
      if (!binding.value) return;
      const userInfo = getLocalSave("userInfo");
      if (userInfo.permissions !== binding.value) {
        console.log("无权限", binding.value);
        el.style.display = "none";
        return;
      }
      console.log("有权限");
    },
  });

  //全局方法
  app.mixin({
    methods: {
      req(type, params) {
        if (!bus[type]) {
          throw new Error(`${type} is not a function`);
        }
        return new Promise((resolve, reject) => {
          bus[type](params)
            .then((res) => {
              console.log("response=>", res);
              resolve(res);
            })
            .catch((err) => {
              reject(err);
            });
        });
      },
    },
  });
};
