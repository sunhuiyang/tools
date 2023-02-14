import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  {
    path: "/",
    redirect: "/index",
  },
  // {
  //   path: "/list",
  //   name: "list",
  //   component: () => import("../views/Vlist.vue")
  // },
  {
    path: "/index",
    name: "index",
    // component: () => import("../views/newApp/Index.vue")
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/zhenling",
    name: "zhenling",
    component: () => import("../views/newApp/Index.vue"),
  },
  {
    path: "/a",
    name: "aa",
    component: () => import("../views/study.vue"),
  },
  // {
  //   path: "/reg",
  //   name: "reg",
  //   component: () => import("../views/Reg.vue")
  // },
  // {
  //   path: "/login",
  //   name: "login",
  //   component: () => import("../views/Login.vue")
  // },
  // {
  //   path: "/layout",
  //   name: "home",
  //   redirect: "/layout/edit",
  //   component: () => import("../views/Layout.vue"),
  //   children: [
  //     {
  //       path: "edit",
  //       name: "editor",
  //       component: () => import("../views/editor.vue")
  //     },
  //     {
  //       path: "option5",
  //       name: "option5",
  //       component: () => import("../views/option5.vue")
  //     },
  //     {
  //       path: "option6",
  //       name: "option6",
  //       component: () => import("../views/option6.vue")
  //     },
  //     {
  //       path: "option7",
  //       name: "option7",
  //       component: () => import("../views/option7.vue")
  //     }
  //   ]
  // }
];
export default createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});
