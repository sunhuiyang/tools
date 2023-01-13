<template>
  <a-layout style="padding: 0 24px 24px">
    <a-breadcrumb style="margin: 16px 0">
      <a-breadcrumb-item>{{ nav }}</a-breadcrumb-item>
      <a-breadcrumb-item>{{ submenu }}</a-breadcrumb-item>
      <a-breadcrumb-item>{{ menu }}</a-breadcrumb-item>
    </a-breadcrumb>
    <a-layout-content
      :style="{
        background: '#fff',
        padding: '24px',
        margin: 0,
        minHeight: '280px'
      }"
    >
      <router-view></router-view>
    </a-layout-content>
  </a-layout>
</template>
<script>
import { computed, defineComponent } from "vue";
import { useStore } from "vuex";
export default defineComponent({
  setup() {
    const store = useStore();
    return {
      nav: computed(() => store.state.nav),
      submenu: computed(() => store.state.submenu),
      menu: computed(() => store.state.menu)
    };
  },
  mounted() {
    console.log("nav", this.nav, "sub", this.submenu, "menu", this.menu);
  }
});
</script>

<style scoped>
.site-layout-background {
  background: #fff;
}
</style>
