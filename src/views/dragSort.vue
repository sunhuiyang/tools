<template>
  <TransitionGroup name="list" tag="div" class="container">
    <div v-for="(item, idx) in list" :key="idx" class="target" draggable="true" @dragstart="dragstart($event, idx)"
      @dragenter="dragenter($event, idx)" @dragend="dragend($event, idx)" @dragover="dragover($event, idx)">
      {{ item }}
    </div>
  </TransitionGroup>
  <div>{{obj.value || 'default'}}</div>
  <button @click="read">查看</button>
</template>

<script setup>
import "../utils/eventBus"
import { reactive, ref } from 'vue';
import { openDB, addData, getDataByKey, getDataByIndex, cursorGetData, updateDB, deleteDB } from "../utils/indexedDB"
import { useRouter } from "vue-router";
// import { router } from "../router";
const router = useRouter()
let obj = ref({
  value:"ss"
})
let cur = 0;
const list = reactive([1, 2, 3, 4])
const dragstart = function (e, id) {
  e.stopPropagation()
  console.log("当前拖动的", id);
  cur = id;//当前拖动的
  setTimeout(() => {
    e.target.classList.add('moving')
  }, 0)
}
const dragenter = function (e, id) {
  e.preventDefault()
  if (cur === id) return
  console.log("拖动进入", id);
  const source = list[cur];
  list.splice(cur, 1);
  list.splice(id, 0, source)
  cur = id
  console.log(list)
}
const dragover = function (e, id) {
  e.dataTransfer.dropEffect = 'move'
}
const dragend = function (e, id) {
  console.log("拖动结束", id)
  e.target.classList.remove("moving")
}
console.log(import.meta.env)
// const db = await openDB("group", 2);
// console.log("数据返回", db)
// db.value = db;
// addData(db, "signalChat", {
//   sequenceId: 0,
//   link: "shy",
//   messageType: 10
// })
// addData(db, "signalChat", {
//   sequenceId: 1,
//   link: "lqx",
//   messageType: 20
// })
// getDataByIndex(db, "signalChat", 'link', 'llqx')
const read = function () {
  // console.log(db.value)
  // getDataByKey(db, "signalChat", 0)
  // getDataByIndex(db, "signalChat", 'link', 'lqx')
  // cursorGetData(db,"signalChat")
  // deleteDB(db, "signalChat", 0)
  // db.close()
  delete obj.value.value
  console.log(obj.value);
}
import { useRoute } from "vue-router"
const route = useRoute()
console.log("路由信息params", route)
console.log("路由信息query", route.query)
</script>

<style>
.target {
  width: 200px;
  height: 40px;
  line-height: 40px;
  background-color: skyblue;
  text-align: center;
  margin: 10px;
  color: #fff;
  font-size: 18px;

}

.moving {
  opacity: 0;
}

.list-move,
.list-enter-active,
.list-leave-active {
  transition: all .3s ease;
}
</style>