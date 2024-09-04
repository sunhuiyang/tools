import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import { viteMockServe } from "vite-plugin-mock";
import { createHtmlPlugin } from "vite-plugin-html";
// import legacy from "@vitejs/plugin-legacy";
// const resolve = str => path.resolve(__dirname, str);
// https://vitejs.dev/config/
const getViteEnv = (mode, target) => {
  return loadEnv(mode, process.cwd())[target];
};
export default defineConfig(({ mode }) => {
  const ENV = loadEnv(mode, __dirname);
  const IS_DEV = ENV.VITE_APP_ENV !== "production";
  console.log("config=>", mode, "env=>", __dirname);
  console.log("cwd==>", process.cwd());
  return {
    plugins: [
      vue(),
      viteMockServe({
        mockPath: "./mock/index",
        supportTs: false, //如果使用 js发开，则需要配置 supportTs 为 false
      }),
      AutoImport({
        resolvers: [AntDesignVueResolver()],
      }),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
      createHtmlPlugin({//固定显示
        inject: {
          data: {
            title: getViteEnv(mode, "VITE_APP_HEADER"),
            logo: getViteEnv(mode, "VITE_APP_ENV"),
          },
        },
      }),
      // legacy({
      //   targets: ["defaults", "not IE 11"],
      // }),
    ],
    base: "/",
    server: {
      port: 3005,
      proxy: {
        "/api": {
          /**
           *  请求的目标资源再经过替换成 /httphwm/getList 后，
           *  会加上 http://127.0.0.1:9693 这个前缀，
           *  最后请求的URL为: http://127.0.0.1:9693/httphwm/getList
           */
          target: "http://localhost:3003",
          ws: true,
          changeOrigin: true,
          // 拦截到的请求路径 testaxios/httphwm/getList，/testaxios会被替换成空
          rewrite: (path) => path.replace(/^\/api/, ""),
        },
      },
    },
    build: {
      // 打包构建输出路径
      outDir: "zxtool",
      // 生成静态资源的存放路径
      assetsDir: "static",
      // 构建后是否生成 source map 文件
      sourcemap: true,
      // chunk 大小警告的限制
      chunkSizeWarningLimit: 700,
      // 生产环境移除 console
      minify: "terser", //"esbuild",
      terserOptions: {
        compress: {
          drop_console: !IS_DEV,
          drop_debugger: !IS_DEV,
        },
      },
      sourcemap: false,
      rollupOptions: {
        output: {
          // https://rollupjs.org/guide/en/#outputmanualchunks
          // manualChunks: {
          //   vlib: ["vue", "vue-router", "vuex"]
          // }
        },
      },
    },
    // esbuild: {
    //   drop: IS_DEV ? [] : ["console", "debugger"],
    // },
  };
});
