<template>
  <ul>
    <li><a-button type="primary" @click="toZhenling('zhenling')">测试App</a-button></li>
    <li><a-button type="primary" @click="toZhenling('study')">学习</a-button></li>
  </ul>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();
const toZhenling = (route) => {
  router.push(route)
}
</script>

<style scoped>
li {
  list-style: none;
}
</style>