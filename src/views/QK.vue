<template>
  <a-layout>
    <a-layout-sider>
      <a-menu v-model:openKeys="openKeys" v-model:selectedKeys="selectedKeys" style="width: 256px" mode="inline"
        @click="handleClick">
        <a-menu-item key="/">
          <template #icon>
            <MailOutlined />
          </template>
          主Home
        </a-menu-item>
        <a-menu-item key="master-about">
          <template #icon>
            <CalendarOutlined />
          </template>
          主About
        </a-menu-item>
        <a-menu-item key="/vue2-micro-app/home">
          <template #icon>
            <CalendarOutlined />
          </template>
          子Home
        </a-menu-item>
        <a-menu-item key="/vue2-micro-app/about">
          <template #icon>
            <CalendarOutlined />
          </template>
          子About
        </a-menu-item>
      </a-menu>
    </a-layout-sider>
    <a-layout-content :style="{ background: '#fff', padding: '24px', margin: 0, minHeight: '200px' }"></a-layout-content>
  </a-layout>
</template>

<script setup>
import { reactive, ref } from "vue"
import { MailOutlined, CalendarOutlined, AppstoreOutlined, SettingOutlined } from '@ant-design/icons-vue';
let appToken = ref("");
appToken.value = localStorage.getItem("token")
let { selectedKeys, openKeys } = reactive({
  selectedKeys: [],
  openKeys: [],
});
const handleClick = menuInfo => {
  console.log('click ', menuInfo);
};
</script>

<style scoped>
.ant-layout-sider {
  background-color: #fff;
}
</style>