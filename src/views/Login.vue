<template>
  <div class="container">
    <a-card style="width: 80vw; height: 300px">
      <account :type="type"></account>
    </a-card>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import pro, { output } from "../utils/await"; //加载异步模块
import Account from "../components/account/index.vue";
export default {
  components: {
    Account
  },
  data() {
    return {
      obj: {}
    };
  },
  setup() {
    const state = reactive({
      type: "login"
    });
    return {
      ...toRefs(state)
    };
  },
  async mounted() {
    console.log("===mounted===");
    class Dep {
      constructor() {}
      static target = 1;
      static say(){
        console.log("say");
      }
    }
    let d = new Dep();
    console.log("--",Dep.target);
    console.log("----",Dep.say());
    //generator函数
    // function* ge(){
    //   yield 1;
    //   yield Promise.resolve(2)
    // }
    // let i = ge();
    // console.log(i.next().value,i.next().value,i.next());
    // pro.then(res=>{
    //   console.log("-",output);
    // })
    // const arr = function (time) {
    //   return new Promise(resolve => {
    //     // setTimeout(() => {
    //     //   console.log("time", time * 1000);
    //     //   resolve(time);
    //     // }, time * 1000);
    //     resolve(time)
    //   });
    // };
    // let ar = [arr(2), arr(1), arr(3), arr(5), arr(4)];
    // async function fn(arr) {
    //   for (let o of ar) {
    //     const r = await o;
    //     console.log("r", r);
    //   }
    // }
    // fn(ar);
    // let res = [];
    // async function fn(promise) {
    //   for (let pro of promise) {
    //     res.push(await pro);
    //   }
    // }
    // await fn(promise);
    // console.log(res);
  }
};
</script>

<style scoped>
.container {
  background: #ececec;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
</style>
