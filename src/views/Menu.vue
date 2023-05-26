<template>
  <div>menu</div>
  <div v-for="(menu, idx) in list" :key="idx" @click="goTo(menu.path)">{{ menu.meta.title }}</div>
</template>

<script setup>
import { reactive } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from '../store/pinia';
const store = useStore();
let list = reactive({})
list = store.routes;
const router = useRouter()
const goTo = path => router.push(path)
</script>