
<template>
  <div v-if="show">sub</div>
</template>

<script setup>
import { ref } from 'vue'
const show = ref(false)

const open = (a) => {
  console.log("---", a);
  show.value = true
}

defineExpose({ open, show })

</script>