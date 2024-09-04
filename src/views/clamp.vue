<template>
  <div class="box"></div>
  <ul>
    <li v-for="(item, index) in list" :key="item.id">
      <input type="checkbox" :value="item.name">{{ item.name }}
    </li>
  </ul>
  <button @click="remove">删除</button>
</template>
<script setup>
import { onMounted, reactive } from 'vue';
let list = reactive([{ id: 1, name: "重庆" }, { id: 2, name: "成都" }, { id: 3, name: "徐州" }])
const remove = () => {
  list.shift()
}
const change = () => {
  let style = window.getComputedStyle(document.querySelector(".box"))
  let sty = document.querySelector(".box").style
  console.log(sty);
  console.log(style);
  sty.setProperty("--fs", "30px")
}
onMounted(()=>{
  let style = window.getComputedStyle(document.querySelector(".box"))
  console.log(style.width);
  list[0].name=style.width;
  list[1].name=style.height;
  list[2].name=style.fontSize;
  
})

</script>
<style lang="scss">
.box {
  width: 50px;
  height: 50px;
  border: 1px solid #666;
  font-size: 16px;
}
</style>