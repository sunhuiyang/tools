import { createStore } from "vuex";
// import { getkey } from "../api/index";
export default createStore({
  state: {
    nav: "",
    submenu: "",
    menu: ""
  },
  mutations: {
    setNav: (state, data) => {
      state.nav = data;
    },
    setSubmenu: (state, data) => {
      state.submenu = data;
    },
    setMenu: (state, data) => {
      state.menu = data;
    }
  },
  actions: {
    // getPublicKey: async (context, data) => {
    //   const res = await getkey(data);
    //   return res.publicKey;
    // }
  },
  modules: {}
});
