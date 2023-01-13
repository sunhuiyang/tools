<template>
  <a-select  show-search placeholder="请选择规格" style="width: 200px" :options="zhenfa"
    :filter-option="filterOption" @focus="handleFocus" @blur="handleBlur" @change="handleChange"></a-select>
</template>
<script setup>
// import { ref, toRefs } from "vue";
import { useZhenfa } from "../../hook/base"


const emits = defineEmits(["confirmCb"]);
const defaultFunc = (defaultV) => {
  emits("confirmCb", defaultV)
}
const [zhenfa] = useZhenfa(defaultFunc)
//使用父组件传递过来的值
// emits("confirmCb", zhenfa.value[0]);
const handleChange = (value, s) => {
  emits("confirmCb", s);
};

const handleBlur = () => {
};

const handleFocus = () => {
};

const filterOption = (input, option) => {
  return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
};
</script>
<style scoped>
.zhenfaimg {
  width: 500px;
  height: 600px;
}
</style>
