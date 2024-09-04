<template>
  <a-row>
    <a-col :span="2">
      {{ type }}
    </a-col>
    <a-col :span="8">
      <a-slider v-model:value="value" :min="min" :max="max" :step="1" @change="sliderChange" />
    </a-col>
    <a-col :span="4">
      <a-input-number v-model:value="value" :min="min" :max="max" :step="1" style="margin-left: 16px" />
    </a-col>
  </a-row>
</template>
<script setup>
import { computed } from '@vue/reactivity';

const props = defineProps({
  inputValue: Number,
  type: String,
  min: Number,
  max: Number,
  index: Number
})
const emits = defineEmits(["sliderCb"])
const value = computed({
  get: () => props.inputValue,
  set: (val) => {
    emits("sliderCb", val, props.index)
  }
})
const sliderChange = e => {
  console.log("sliderChange", e);
}
</script>