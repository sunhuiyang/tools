import { createRouter, createWebHashHistory } from "vue-router";
import errorPage from "../views/errorPage.vue";
import { useStore } from "../store/pinia";
import { getLocalSave } from "../utils/util.js";
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
    component: () => import("../views/Login.vue"),
  },
  // {
  //   path: "/three",
  //   name: "three",
  //   // component: () => import("../views/newApp/Index.vue")
  //   component: () => import("../views/Three.vue"),
  // },
  // {
  //   path: "/event",
  //   name: "e",
  //   // component: () => import("../views/newApp/Index.vue")
  //   component: () => import("../views/event.vue"),
  // },
  // {
  //   path: "/zhenling",
  //   name: "zhenling",
  //   component: () => import("../views/newApp/Index.vue"),
  // },

  // {
  //   path: "/qiankun",
  //   name: "qiankun",
  //   component: () => import("../views/QK.vue"),
  // },
  {
    path: "/menu",
    name: "menu",
    component: () => import("../views/Menu.vue"),
  },
  {
    path: "/:pathMatch(.*)",
    name: "error",
    component: errorPage,
  },
  {
    path: "/reg",
    name: "reg",
    component: () => import("../views/Reg.vue"),
  },
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
export const router = createRouter({
  // 4. 内部提供了 history 模式的实现。为了简单起见，我们在这里使用 hash 模式。
  history: createWebHashHistory(),
  routes, // `routes: routes` 的缩写
});
const whiteList = ["/", "/index", "/reg"];
router.beforeEach((to, from) => {
  console.log("to", to);
  // const store = useStore();
  const userInfo = getLocalSave("userInfo");
  console.log("route.js", userInfo);
  if (whiteList.includes(to.path)) return true;
  if (userInfo) {
    if (!userInfo.token) return "/index";
    if (router.getRoutes().findIndex((item) => item.path === to.path) > -1)
      return true;
    for (let i = 0; i < userInfo.routes.length; i++) {
      if (userInfo.routes[i].path === to.path) {
        router.addRoute({
          ...userInfo.routes[i],
          component: () => import(userInfo.routes[i].component),
        });
        return to.fullPath;
      } else {
        continue;
      }
    }
  } else {
    return "/index";
  }
});
