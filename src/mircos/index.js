import { registerMicroApps, start } from "qiankun";

registerMicroApps([
  {
    name: "vue-micro-app",
    entry: "//localhost:8080",
    container: "#container",
    activeRule: "/app-vue",
  },
]);
// 启动 qiankun
start();
