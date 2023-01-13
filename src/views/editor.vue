<template>
  <a-button type="primary" @click="submit">submit</a-button>

  <codeEditor v-model:value="code"></codeEditor>
</template>

<script>
import { defineComponent, reactive, toRefs } from "vue";
import codeEditor from "../components/typer.vue";
import axios from "axios";
export default defineComponent({
  components: {
    codeEditor
  },
  setup() {
    const data = reactive({
      code: {flow:{
        "210203":{
          start:"introduce"
        }
      }}
    });

    const submit = e => {
      // console.log("submit", JSON.parse(data.code));
      // axios
      //   .post("/api/config/get", {
      //     fileName: "first"
      //   })
      //   .then(res => {
      //     console.log("res", res);
      //   })
      //   .catch(err => {
      //     console.log("err", err);
      //   });

      //添加文件
      axios
        .post("/api/config/add", {
          fileName: "second",
          config: data.code
        })
        .then(res => {
          console.log(res);
        })
        .catch(err => {});
    };
    return {
      ...toRefs(data),
      submit
    };
  }
});
</script>
