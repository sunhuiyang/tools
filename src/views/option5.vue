<template>
  <city-pikcer v-model="state.va" @cb="cb">
    <template v-slot:hhs>
      <div>{{ address }}</div>
    </template>
  </city-pikcer>
</template>

<script setup>
import CityPikcer from "../components/cityPicker.vue";
import { computed, onMounted, reactive } from "vue";
import img from "../assets/logo.png";
onMounted(() => {
  // setTimeout(newNote, 5000);
  newNote();
});

const oldNote = function () {
  let titleInit = document.title;
  setInterval(() => {
    let title = document.title;
    if (state.shine) {
      if (/新/.test(title)) {
        document.title = `【\xa0\xa0\xa0\xa0\xa0\xa0】`;
      } else {
        document.title = "【新消息】";
      }
    } else {
      document.title = titleInit;
    }
  }, 100);

  window.onfocus = function () {
    console.log("onfocus");
    state.shine = false;
  };
  window.onblur = function () {
    console.log("onblur");
    state.shine = true;
  };
};

const newNote = () => {
  if (window.Notification) {
    Notification.requestPermission().then(res => {
      console.log("用户点击", res);
      if (res === "denied") return;
      // 通过 new Notification 来创建新的通知
      let note = new Notification("sir, you got a message", {
        icon: img,
        body: "you will have a meeting 5 minutes later."
      });
      note.onclick = function (e) {
        console.log("click note", e);
      };
      note.onclose = e => {
        console.log("close note", e);
      };
    });
  }
};

const state = reactive({
  location: [],
  va: 10,
  shine: false
});
const cb = e => {
  state.location = e;
};
const address = computed({
  get() {
    let str = "";
    for (let i = 0; i < state.location.length; i++) {
      str = str + state.location[i].name + "/";
    }
    if (str.length > 0) str = str.substr(0, str.length - 1);
    return str;
  }
});
</script>
