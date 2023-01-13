<template>
  <div class="container">
    <a-card :bordered="false" style="width: 500px; height: 300px">
      <account :type="type"></account>
    </a-card>
  </div>
</template>

<script setup>
import { ref } from "vue";
import Account from "../components/account/index.vue";

const type = ref("reg");
</script>
<style scoped>
.container {
  background: #ececec;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
</style>
