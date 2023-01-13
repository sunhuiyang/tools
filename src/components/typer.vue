<template>
  <div class="in-coder-panel">
    <textarea ref="textarea" v-model="code"></textarea>
  </div>
</template>

<script>
// 引入全局实例
import _CodeMirror from "codemirror/lib/codemirror";

// 核心样式
import "codemirror/lib/codemirror.css";
import "codemirror/addon/lint/lint.css";
import "codemirror/theme/rubyblue.css";

// 引入主题后还需要在 options 中指定主题才会生效
// 需要引入具体的语法高亮库才会有对应的语法高亮效果, 目前已动态引入
// import 'codemirror/theme/midnight.css'
// 主题样式
import "codemirror/addon/hint/show-hint.css";

import {
  reactive,
  defineComponent,
  toRefs,
  getCurrentInstance,
  onMounted,
  onBeforeUnmount
} from "vue";

// codemirror 官方其实支持通过 /addon/mode/loadmode.js 和 /mode/meta.js 来实现动态加载对应语法高亮库
// 但 vue 貌似没有无法在实例初始化后再动态加载对应 JS ，所以此处才把对应的 JS 提前引入
import "codemirror/mode/javascript/javascript.js";

// const codemirrorThemList = [];
// const requireModules = require.context("codemirror/theme/", false, /\.css$/);
// requireModules.keys().forEach(value => {
//   const newValue = value.replace(/^\.\//, "").replace(/\.css$/, "");
//   codemirrorThemList.push(newValue);
// });

// 尝试获取全局实例
const CodeMirror = window.CodeMirror || _CodeMirror;
let coder = null; // 编辑器实例

export default defineComponent({
  name: "codeEditor",
  props: {
    value: {
      type: String
    }
  },
  setup(props, { emit }) {
    const { proxy } = getCurrentInstance();
    const data = reactive({
      code: props.value, // 内部真实的内容
      // 默认配置
      options: {
        lineNumbers: true,
        mode: "application/json",
        gutters: ["CodeMirror-lint-markers"],
        theme: "rubyblue",
        lint: true,
        lineWrapping: true
      },
      // 初始化
      initialize: () => {
        // 初始化编辑器实例，传入需要被实例化的文本域对象和默认配置
        coder = CodeMirror.fromTextArea(proxy.$refs.textarea, data.options);
        coder.setValue(JSON.stringify(data.code, null, 2));

        // 此处也可使用'change'事件，不过每次书写的过程中都会触发，为了提高性能，故默认使用'blur'
        coder.on("change", coder => {
          emit("update:value", coder.getValue());
        });
      }
    });
    onMounted(() => {
      // console.log('value:', props.value)
      // data.importThemDynamic().then(() => {
      data.initialize();
      // });
    });
    onBeforeUnmount(() => {
      coder.off(props.eventType);
    });
    return {
      ...toRefs(data)
    };
  }
});
</script>

<style>
.in-coder-panel {
  height: 100%;
  position: relative;
  text-align: left !important;
}
.in-coder-panel :deep(.CodeMirror) {
  height: 100%;
  min-height: 300px;
}

.in-coder-panel :deep(.CodeMirror) .CodeMirror-code {
  line-height: 19px;
}

.in-coder-panel :deep(.CodeMirror-scroll) {
  min-height: 300px;
}
.in-coder-panel :deep(span.cm-string) {
  color: #f08047;
}
</style>
