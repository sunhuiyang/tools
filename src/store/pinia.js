import { defineStore } from "pinia";
import { getRoutes } from "../api/menu";
import { localSave } from "../utils/util";
export const useStore = defineStore("main", {
  state: () => {
    return {
      str: "this is a str",
      obj: {
        intro: "this.is an obj",
      },
      count: 20,
      list: [
        { type: "number", value: 11 },
        { type: "number", value: 12 },
        { type: "string", value: "12" },
      ],
      routes: [],
      permissions: [],
      token: "",
    };
  },
  actions: {
    increment() {
      this.count++;
    },
    setUserInfo(res) {
      this.permissions = res.userInfo.userType;
      this.routes = res.userInfo.routes.map((item) => {
        let route = {};
        const { path, name, component, meta } = item;
        route.path = path;
        route.name = name;
        route.component = component;
        route.meta = meta;
        return route;
      });
      this.token = res.token;
      localStorage.clear()
      localSave("userInfo", {
        permissions: res.userInfo.userType,
        routes: this.routes,
        token: this.token,
        expires: Date.now() + 30 * 60 * 1000, //有效期30分钟
      });
    },
  },
  getters: {
    doubleCount: (state) => {
      return state.count * 2;
    },
    doubleCountPlus(state) {
      console.log(this.doubleCount, this);
      return state.count * 2 + 1;
    },
    receiveParams(state) {
      return (param) => state.list.find((item) => item.type === param);
    },
  },
});
