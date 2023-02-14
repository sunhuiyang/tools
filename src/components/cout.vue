<template>
  <div id="foo" class="child">{{ count }}</div>
  <div>
    <slot name="a"></slot>
    <slot name="b"></slot>
  </div>
</template>

<script>
import { h, ref } from "vue"
export default {
  setup(props, { expose }) {
    const count = ref(0)
    const incre = () => count.value++;
    expose({ incre, count })
    return {
      count, incre
    }
    // return () => h('div', { id: "foo", onClick() { incre() } }, h('span', { class: "child" }, count.value))
  }
}
</script>

<style>
#foo {
  color: red;
  width: 100px;
  height: 100px;
  border: 1px solid #000;
}

.child {
  font-size: 20px;
}
</style>