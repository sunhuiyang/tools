<template>
  <a-layout-header class="header">
    <div class="logo" />
    <a-menu
      v-model:selectedKeys="selectedKeys1"
      theme="dark"
      mode="horizontal"
      :style="{ lineHeight: '64px' }"
      @click="menuClick"
    >
      <a-menu-item v-for="item in navs" :key="item.value">{{
        item.value
      }}</a-menu-item>
    </a-menu>
  </a-layout-header>
</template>
<script>
import { useStore } from "vuex";
import { defineComponent, reactive, toRefs, ref, computed } from "vue";
export default defineComponent({
  setup() {
    const selectedKeys1 = ref(["nav1"]);
    const store = useStore();
    store.commit("setNav", selectedKeys1.value[0]);
    const data = reactive({
      navs: [
        {
          key: 1,
          value: "nav1"
        },
        {
          key: 2,
          value: "nav2"
        },
        {
          key: 3,
          value: "nav3"
        }
      ]
    });
    const menuClick = e => {
      store.commit("setNav", e.key);
    };
    return {
      ...toRefs(data),
      selectedKeys1,
      menuClick
    };
  },
  mounted() {
    console.log("mounted", this.selectedKeys1);
    //初始化
    // this.$store.commit("setNav", this.selectedKeys1[0]);
  },
  methods: {}
});
</script>
<style>
.logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: url("../assets/logo.png") no-repeat 100% 100%;
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
