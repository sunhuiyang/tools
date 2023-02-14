<template>
  <div ref="pop" class="pop">
    <Suspense>
      <CardDetail :detail="props.detail" />
    </Suspense>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue"
import CardDetail from './CardDetail.vue';

const pop = ref(null)
const props = defineProps({
  detail: Object,
  left: String
});
onMounted(() => {
  pop.value.style.left = props.left;
})


</script>

<style scoped>
.pop {
  position: fixed;
  background-color: #efef;
  z-index: 10000;
}
</style>