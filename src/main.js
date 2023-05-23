import { createApp, markRaw } from "vue";
import App from "./App.vue";
import router from "./router";
import "ant-design-vue/es/message/style/css";
import store from "./store";
import { plugin } from "./directive/index"; //引入自定义插件
import { createPinia } from "pinia";

let pinia = createPinia();
pinia.use(({ store }) => {
  store.router = markRaw(router);
  store.$onAction((a, b, c) => {
    console.log("action", a, b, c);
  });
});
const app = createApp(App);

import { getUniSdk, getWxSdk } from "./utils/sdk";
// getWxSdk();
app.use(router);
app.use(store);
app.use(plugin);
app.use(pinia);
app.mount("#app");
document.getElementsByTagName("title")[0].innerHTML = import.meta.env.DEV
  ? "开发模式"
  : "生产模式";
//test代码
