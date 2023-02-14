<template>
  <count v-once ref="comp">
    <template v-slot:a>
      <header>header</header>
    </template>
    <template v-slot:b>
      <input type="text">
    </template>
  </count>
</template>

<script>
import { ref } from "vue";
import Count from "../components/cout.vue"
export default {
  components: { Count },
  setup() {
    const s = ref(100)
    const comp = ref()
    const add = () => {
      comp.value.incre()
    }
    const adds = () => { console.log("adds") }
    return {
      add, comp, s, adds
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