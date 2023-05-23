<template>
  <ul>
    <li>1<a-button type="primary" @click="toZhenling('zhenling')">测试App</a-button></li>
    <li>2<a-button type="primary" @click="test">学习</a-button></li>
    <li>3<a-button type="primary" @click="toZhenling('qiankun')">微前端框架</a-button></li>
    <!-- <iframe width="100%" height="70%" ref="iframes" id="iframes" src="http://localhost:8080/#/login"
      frameborder="0"></iframe> -->
  </ul>
  <!-- <div v-for="[key, value] of arr.entries()" :key="key">
    {{ key }},{{ value }}
  </div>
  <div v-for="item of set.values()">{{ item }}</div>
  <div>{{ obj2.ob.name }}</div> -->
  <input type="text" @blur="checkInfo">
</template>

<script setup>
import { onMounted, reactive, ref, onRenderTriggered, nextTick } from 'vue';
import { useRouter } from 'vue-router';
import { Modal, } from "ant-design-vue"
import api from "../api/bus"
import to from "await-to-js"
import { symbol } from 'vue-types';
console.log("test new feature");
const co = ref("red")
const router = useRouter();
const iframes = ref(null)
let obj = ref({
  name: " 20"
})
const checkInfo = () => {
  console.log("blur");
  Modal.confirm({
    title: 'Confirm',
    content: 'Bla bla ...',
    okText: '确认',
    cancelText: '取消',
  });
}
let obj2 = reactive({
  ob: ref({ name: 'lqx' })
})
console.log(obj.value.name);
//map响应
let arr = ref(new Map())
arr.value.set("key1", "value1").set("key2", "value2")
//set响应
let set = ref(new Set([1, 2, 3]))
const inputcb = e => {
  console.log("inputcb", obj.value.name);
}
const changecb = e => {
  console.log("changecb", e.keyCode);
}
const toZhenling = (route) => {
  router.push(route)
}
// onRenderTriggered((e) => {
//   console.log("onRenderTracked", e);
// })
function hanlde(arr) {
  let i = 0;
  let res = [];
  while (i < arr.length) {
    res.push(arr.slice(i, i + 10));
    i += 10;
  }
  return res;
}

const getdata = async () => {
  console.log("getdata");
  router.push("event")
  // arr.value.set("key3", "value3")
  // let [err,res] = await to(api.getStu());
  // if(err) {
  //   console.warn(err.message)
  //   return
  // }
  // console.log("res",res)
  // api.getStu().then(res => {
  //   console.log("res", res);
  //   let handleRes = hanlde(res.data.rows)
  //   console.log("handleRes.lenth", handleRes.length);
  //   // const requestA = page=>{
  //   //   if(page>handleRes.length-1){
  //   //     console.log("完了");
  //   //     return
  //   //   }
  //   //   requestAnimationFrame(()=>{
  //   //     arr.value = [...arr.value,...handleRes[page]]
  //   //     page = page+1;
  //   //     requestA(page)
  //   //   })
  //   // }
  //   // requestA(0)
  // })

}

const test = async (params) => {
  await nextTick()
  let iframe = document.querySelector("#iframes")
  console.log("----iframse", iframe);
  iframe.contentWindow.postMessage({ code: 1, message: params }, "*")
  // window.open("http://localhost:8080/#/slide")
}
onMounted(() => {
  // console.log("onMounted=====", window.frames[0].parent === window)
  // let child = iframes.value.contentWindowDocument;
  // iframes.value.onload = () => {
  //   let newChid = iframes.value.contentDocument;
  //   console.log(child === newChid)
  // }
  nextTick(() => {
    window.addEventListener("message", async (e) => {
      console.log("父页面", e.data.key);
      let data = {};
      for (let key in obj.value) {
        data[key] = obj.value[key]
      }
      console.log("父页面传送的数据", data);
      if (e.data.key === 321) {
        test(data)
      }
    })
  })
})
//set

</script>

<style scoped>
li {
  list-style: none;
}

ul {
  color: v-bind(co)
}
</style>