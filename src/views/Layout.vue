<template>
  <a-layout>
    <my-header></my-header>
    <a-layout>
      <my-side></my-side>
      <my-content></my-content>
    </a-layout>
  </a-layout>
</template>

<script>
import MyHeader from "../components/header.vue";
import MySide from "../components/aside.vue";
import MyContent from "../components/content.vue";
export default {
  components: {
    MyHeader,
    MySide,
    MyContent
  },
  setup() {}
};
</script>

<style>
.site-layout-background {
  background: #fff;
}
</style>
