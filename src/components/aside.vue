<template>
  <a-layout-sider width="200" style="background: #fff">
    <a-menu
      v-model:selectedKeys="selectedKeys2"
      v-model:openKeys="openKeys"
      mode="inline"
      :style="{ height: 'calc(100vh - 64px)', borderRight: 0 }"
      @click="menuClick"
      @openChange="openChange"
    >
      <a-sub-menu key="sub1">
        <template #title>
          <span>
            <user-outlined />
            subnav 1
          </span>
        </template>
        <a-menu-item key="option1">option1</a-menu-item>
        <a-menu-item key="option2">option2</a-menu-item>
        <a-menu-item key="option3">option3</a-menu-item>
        <a-menu-item key="option4">option4</a-menu-item>
      </a-sub-menu>
      <a-sub-menu key="sub2">
        <template #title>
          <span>
            <laptop-outlined />
            subnav 2
          </span>
        </template>
        <a-menu-item key="option5">option5</a-menu-item>
        <a-menu-item key="option6">option6</a-menu-item>
        <a-menu-item key="option7">option7</a-menu-item>
        <a-menu-item key="option8">option8</a-menu-item>
      </a-sub-menu>
    </a-menu>
  </a-layout-sider>
</template>
<script>
import {
  UserOutlined,
  LaptopOutlined
  // NotificationOutlined
} from "@ant-design/icons-vue";
import { defineComponent, ref } from "vue";
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default defineComponent({
  components: {
    UserOutlined,
    LaptopOutlined
    // NotificationOutlined
  },

  setup() {
    const router = useRouter();
    const selectedKeys2 = ref(["option5"]);
    const openKeys = ref(["sub2"]);
    const store = useStore();
    //初始化
    store.commit("setSubmenu", openKeys.value[0]);
    store.commit("setMenu", selectedKeys2.value[0]);

    const menuClick = e => {
      store.commit("setMenu", e.key);
      router.push({ name: e.key });
    };
    const openChange = e => {
      console.log("openchange", e);
      store.commit("setSubmenu", e.length > 0 ? e[0] : "");
    };
    return {
      selectedKeys2,
      openKeys,
      openChange,
      menuClick
    };
  }
});
</script>
<style>
.logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side-2 .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
