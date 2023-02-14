<template>
  <a-select show-search placeholder="请选择规格" style="width: 200px" :options="zhenfas" v-model:value="defaultV"
    :filter-option="filterOption" @change="handleChange"></a-select>
</template>
<script setup>
// import { ref, toRefs } from "vue";
import { useZhenfa } from "../../hook/useSelectType"


const emits = defineEmits(["confirmCb"]);
//给个第一次的默认值触发改变选择回调
const defaultFunc = (defaultV) => {
  emits("confirmCb", defaultV)
}
const { zhenfas, defaultV, handleChange, filterOption } = useZhenfa(defaultFunc, emits)

</script>
<style scoped>
.zhenfaimg {
  width: 500px;
  height: 600px;
}
</style>
