<template>
  <a-list item-layout="horizontal" :data-source="data">
    <template #renderItem="{ item }">
      <a-list-item>
        <a-list-item-meta
          :description="item.description">
          <template #title>
            <div class="title" @click="open(item.path)">{{ item.title }}</div>
          </template>
          <template #avatar>
            <a-avatar src="https://joeschmoe.io/api/v1/random" />
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
  </a-list>
</template>
<script setup>
import { ref } from "vue"
import { useRouter } from "vue-router"
const data = ref([
  {
    title: "模拟器",
    description: "点击打开模拟器",
    path:"/newApp"
  }
])
const router = useRouter()
const open = url=> router.push(url)
</script>

<style scoped>
.title {
  cursor: pointer;
}
</style>