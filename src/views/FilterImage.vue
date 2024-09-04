<template>
  <div>
    <img :src="originSrc" alt="" class="origin">
    <div class="upload-component">
      <label for="upload" class="preview">
        <img :src="src" ref="img" alt="" class="target">
      </label>
      <input type="file" accept="imgae/*" name="" id="upload" @change="inputCb">
    </div>
    <div class="control" v-if="src">
      <my-slider v-for="(item, idx) in  typeList " :key="idx" :index="idx" :type="item.name" :max="item.max"
        :min="item.min" :input-value="item.value" @slider-cb="sliderCb"></my-slider>
    </div>
    <a-button type="primary" @click="download">download</a-button>
  </div>
</template>
<script setup>
import mySlider from '../components/mySlider.vue';
import { ref, reactive } from 'vue'
import { useRoute } from 'vue-router';
const route = useRoute()
console.warn(route.params)
let img = ref('')
let src = ref('')
let imgInfo = reactive({
  file: "",
  with: 0,
  height: 0,
  filter: ""
})
let originSrc = ref('')
const typeList = reactive([{
  name: "亮度",
  key: "brightness",
  min: 0,
  max: 200,
  value: 100
},
{
  name: "对比度",
  key: "contrast",
  min: 0,
  max: 200,
  value: 100

}, {
  name: "色相旋转",
  key: "hue-rotate",
  min: 0,
  max: 360,
  value: 0

}, {
  name: "反转",
  key: "invert",
  min: 0,
  max: 100,
  value: 0
}, {
  name: "透明度",
  key: "opacity",
  min: 0,
  max: 100,
  value: 100
}, {
  name: "饱和度",
  key: "saturate",
  min: 0,
  max: 200,
  value: 100
},
{
  name: "灰度",
  key: "grayscale",
  min: 0,
  max: 100,
  value: 0
},
{
  name: "褐色调",
  key: "sepia",
  min: 0,
  max: 100,
  value: 0
}])

const inputCb = function (e) {
  console.log(e.target.files);
  let fileUrl = window.URL.createObjectURL(e.target.files[0]);
  imgInfo.file = e.target.files[0];
  src.value = fileUrl;
}
const sliderCb = (e, index) => {
  console.log("sliderCb", e, index);
  typeList[index].value = e;
  let filter = "";
  typeList.forEach(item => {
    if (item.key !== "hue-rotate") {
      filter += `${item.key}(${item.value}%) `
    } else {
      filter += `${item.key}(${item.value}deg) `
    }
  })
  console.log(filter);
  img.value.style.filter = filter;
  imgInfo.filter = filter;
}
//下载处理好的图片
const download = () => {
  let reader = new FileReader();
  //创建原始尺寸的图片
  reader.onload = function (e) {
    let newImage = new Image();
    newImage.src = e.target.result;
    newImage.crossOrigin = "anonymous"
    newImage.style.filter = imgInfo.filter;
    newImage.style.visibility = "hidden"
    document.body.appendChild(newImage)
    newImage.onload = function () {
      let canvas = document.createElement("canvas");
      canvas.width = newImage.width;
      canvas.height = newImage.height;
      console.log("长宽", newImage.width, newImage.height);
      let ctx = canvas.getContext("2d");
      ctx.filter = window.getComputedStyle(newImage).filter;//获取滤镜效果
      console.log("ctx.filter", ctx.filter);
      //创建
      ctx.drawImage(newImage, 0, 0, newImage.width, newImage.height)
      document.body.removeChild(newImage)
      try {
        canvas.toBlob(blob => {
          let url = window.URL.createObjectURL(blob);
          let a = document.createElement("a")
          let event = new MouseEvent("click");
          a.download = "default.png";
          a.href = url;
          a.dispatchEvent(event)
          window.URL.revokeObjectURL(url)
        })
      } catch (error) {
        console.warn("error", error);
      }
    }
  }
  reader.readAsDataURL(imgInfo.file)
}
</script>

<style scoped>
.origin {
  position: absolute;
  visibility: hidden;
  transform: scale(0.1);
  overflow: hidden;
}

#upload {
  display: none;
}

.preview {
  display: block;
  width: 140px;
  height: 100px;
  border: 1px dashed #555555;
}

.preview img {
  width: 140px;
  height: 100px;
}

.upload-component {
  /* margin-top: 30px; */
}

.upload-btn {
  width: 80px;
  display: block;
  padding: 6px;
  border-radius: 4px;
  border: 1px solid #666;
}

.control {
  margin-top: 30px;
}
</style>