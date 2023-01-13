import bus from "../api/bus";

export const plugin = {};
plugin.install = function (app, options) {
  app.directive("type", (el, binding) => {
    //v-type，判断模板类型
    el.innerHTML = binding.value;
  });
  app.directive("permission", (el, binding) => {
    //判断权限
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
            .then(res => {
              console.log("response=>", res);
              resolve(res);
            })
            .catch(err => {
              reject(err);
            });
        });
      }
    }
  });
};
