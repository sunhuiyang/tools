<template>
  <div class="equip_key">
    <div class="equip_key_item" v-for="(k, kIndex) in list" :key="kIndex">{{ k.codeName }}</div>
  </div>
  <div v-once @click="change">{{ count }}</div>
  <div @click="reset">{{ str }}</div>
</template>

<script setup>
import { reactive, ref } from "vue"
import { useStore } from "../store/pinia.js"
import { storeToRefs } from "pinia"
const list = ref([
  { codeId: 70, codeName: 'F', isChoose: false },
  { codeId: 74, codeName: 'J', isChoose: false },
  { codeId: 38, codeName: '↑', isChoose: false },
  { codeId: 40, codeName: '↓', isChoose: false },
  { codeId: 37, codeName: '←', isChoose: false },
  { codeId: 39, codeName: '→', isChoose: false },
  { codeId: 32, codeName: '空格', isChoose: false }
])

const state = reactive({ a: { b: "bv" } })//初始化只有a有响应式，只有调用state.a才会给b做响应式处理

document.onkeyup = e => {
  let code = e.keyCode;
  console.log(code);
  let current = list.value.findIndex(item => !item.isChoose);
  console.log("current", current);
  if (current < 0) return
  if (list.value[current].codeId !== code) {
    console.warn("顺序不对");
    return
  }
  document.getElementsByClassName("equip_key_item")[current].classList.add('ac_color')
  list.value[current].isChoose = true
}
window.onhashchange = e => {
  console.log("hashchange", e);
}
let store = useStore()
console.log("store接收参数", store);
let { obj, str, count } = storeToRefs(store)
// let { obj } = store;
// let { str } = store;
const change = () => {
  store.increment()
}
const reset = () => {
  store.$reset()
}
store.$subscribe((mutation, state) => {
  console.log("mutation", mutation, state);
})
</script>

<style scoped lang="scss">
.equip_key {
  display: flex;
  flex-wrap: wrap;

  .equip_key_item {
    width: 90px;
    height: 90px;
    line-height: 90px;
    text-align: center;
    font-size: 40px;
    font-weight: bold;
    color: #333;
    border: 1px solid #999;
    margin-right: 30px;
  }
}

.ac_color {
  color: #2470F2 !important;
  border: 2px solid #2470F2 !important;
}
</style>