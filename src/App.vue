<script setup>
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <!-- <img alt="Vue logo" src="./assets/logo.png" /> -->
  <!-- <HelloWorld msg="Hello Vue 3 + Vite" /> -->
  <!-- <Transition>
    <Suspense> -->
      <router-view></router-view>
    <!-- </Suspense>
  </Transition> -->
</template>

<style>
/* #app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
} */

:root {
  --headColor: hsl(130, 75%, 75%);
  --endColor: hsl(60, 75%, 40%);
  --w: -200px;
  --bgc: #f0f0f0
}
</style>
