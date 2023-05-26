<template>
  <div class="container">
    <a-card style="width: 80vw; height: 300px">
      <account :type="type"></account>
    </a-card>
  </div>
</template>

<script>
import { reactive, toRefs } from "vue";
import Account from "../components/account/index.vue";
export default {
  components: {
    Account
  },
  data() {
    return {
      obj: {}
    };
  },
  setup() {
    const state = reactive({
      type: "login"
    });
    return {
      ...toRefs(state)
    };
  },
  async mounted() {

  }
};
</script>

<style scoped>
.container {
  background: #ececec;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  width: 100vw;
}
</style>
