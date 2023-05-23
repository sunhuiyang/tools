import { defineStore } from "pinia";
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
    };
  },
  actions: {
    increment() {
      this.count++;
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
