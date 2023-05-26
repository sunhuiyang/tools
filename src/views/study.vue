<template>
  <count v-once ref="comp">
    <template v-slot:a>
      <header>header</header>
    </template>
    <template v-slot:b>
      <input type="text">
    </template>
  </count>
  <div>
    <input type="text">

  </div>
  <input type="text" v-model="inputV" @change="encode">
  <button v-has="'admin'">管理员按钮</button>
  <input type="text" v-model="str" @change="decode">
  <button v-has="'normal'">普通用户按钮</button>
</template>

<script>
import { ref } from "vue";
import Count from "../components/cout.vue"
import { toUTF8Array, Utf8ArrayToStr } from "../utils/util";
export default {
  components: { Count },
  setup() {
    const s = ref(100)
    let inputV = ref('')
    let str = ref('')
    const comp = ref()
    const add = () => {
      comp.value.incre()
    }
    let enc = ["o", "ο", "о", "ᴏ"];
    let dec = {
      "o": "0",
      "ο": "1",
      "о": "2",
      "ᴏ": "3"
    }
    const adds = () => { console.log("adds") }
    const encode = e => {
      console.log(inputV.value);
      let encodev = toUTF8Array(inputV.value)
      console.log("encodev", encodev);
      let url = encodev.map(n => n.toString(4).padStart(4, "0")).join("").split("").map(x => enc[parseInt(x)]).join("")
      // let decode = Utf8ArrayToStr(encodev);
      console.log("encode", url);
    }
    const decode = () => {
      let b4str = str.value.split("").map(x => dec[x]).join("")
      let utf8arr = []
      for (let i = 0; i < b4str.length; i += 4) {
        utf8arr.push(parseInt(b4str.substring(i, i + 4), 4))
      }
      let res = Utf8ArrayToStr(utf8arr)
      console.log('decode', res);
    }

    return {
      add, comp, s, adds, encode, inputV, decode, str
    }
  }
}
</script>

<style>
.box {
  width: 100px;
  height: 100px;
  border: 1px solid #000000;
}
</style>