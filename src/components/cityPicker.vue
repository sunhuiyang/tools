<template>
  <a-cascader
    v-model:value="value"
    :options="options"
    :show-search="{ filter }"
    placeholder="Please select"
    :fieldNames="{ label: 'name', value: 'code', children: 'children' }"
    size="large"
    style="width: 50%"
    @change="change"
  />
  <div>
    <slot name="hhs"></slot>
    <slot name="asd"></slot>
  </div>
  <div @click="clic">--{{ modelValue }}</div>
</template>
<script setup>
import { ref, defineProps } from "vue";
import { cityList } from "../utils/cityList";
const emits = defineEmits(["cb","update:modelValue"]);
defineProps({
  modelValue: Number
});
const clic = ()=>{
  emits("update:modelValue",1000)
}
const options = cityList;
const value = ref([]);
const filter = (inputValue, path) => {
  return path.some(option => option.name.indexOf(inputValue) > -1);
};
const change = (e, selectedOptions) => {
  console.log(e, value.value, selectedOptions);
  emits("cb", selectedOptions);
};
</script>
