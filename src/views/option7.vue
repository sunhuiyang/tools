<template>
  <div>option7</div>
</template>

<script setup>
// import { computed, ref, reactive } from "vue";
import { onMounted } from "vue";
import axios from "axios";
import "../../mock/index.js"
onMounted(() => {
  axios
    .post("/account/login")
    .then(res => {
      console.log("res", res);
    })
    .catch(err => {
      console.warn(err);
    });
});
</script>
