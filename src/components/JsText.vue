<template>
  <div class="json-editor">
    <textarea ref="textarea" />
  </div>
</template>

<script setup>
import CodeMirror from "codemirror";
import "codemirror/addon/lint/lint.css";
import "codemirror/lib/codemirror.css";
import "codemirror/theme/rubyblue.css";
// require('script-loader!jsonlint')
import "codemirror/mode/javascript/javascript";
// import 'codemirror/addon/lint/lint'
import "codemirror/addon/lint/json-lint";
import { reactive, ref, watch, getCurrentInstance, onMounted } from "vue";
const props = defineProps({
  modelValue: JSON
});
const { proxy } = getCurrentInstance();
console.log("实例", proxy);
const emits = defineEmits(["changed", "update:modelValue"]);
console.log("props", props);
const textarea = ref(null);
const state = reactive({
  jsonEditor: false
});

const getValue = function () {
  return state.jsonEditor.getValue();
};
watch(
  () => props.modelValue,
  (newV, oldV) => {
    const editorValue = state.jsonEditor.getValue();
    if (newV !== editorValue) {
      state.jsonEditor.setValue(JSON.stringify(newV, null, 2));
    }
  }
);
onMounted(() => {
  state.jsonEditor = CodeMirror.fromTextArea(proxy.$refs.textarea, {
    lineNumbers: true,
    mode: "application/json",
    gutters: ["CodeMirror-lint-markers"],
    theme: "rubyblue",
    lint: true,
    lineWrapping: true
  });
  state.jsonEditor.setValue(JSON.stringify(props.modelValue, null, 2));
  state.jsonEditor.on("change", cm => {
    console.log(cm.getValue());
    emits("changed", cm.getValue());
    emits("update:modelValue", cm.getValue());
  });
});
</script>
<style scoped>
.json-editor {
  height: 100%;
  position: relative;
}
.json-editor :deep(.CodeMirror) {
  height: 100%;
  min-height: 300px;
}
.json-editor :deep(.CodeMirror-scroll) {
  min-height: 300px;
}
.json-editor :deep(.cm-s-rubyblue) span.cm-string {
  color: #f08047;
}
</style>
