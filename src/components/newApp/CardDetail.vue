<template>
  <div class="detail-box">
    <div class="basic-info">
      <a-divider>基本属性</a-divider>
      <h1 class="normal">{{ detail.name }}</h1>
      <div class="normal">修真等级：{{ detail.xiuZhenDengJi }}</div>
      <div class="normal">进阶等级：{{ detail.jinJieDengJi }}</div>
      <div class="normal">聚灵等级：{{ detail.juLingDengJi }}</div>
      <div>
        <span>体魄：{{ detail.tiPo }}</span><span> 气血：{{ detail.tiPoQiXue }}</span>
      </div>
      <div>
        <span>修真：{{ detail.xiuZhen }}</span><span> 真气：{{ detail.xiuZhenZhenQi }}</span>
      </div>
      <div>
        <span>御宝：{{ detail.yuBao }}</span><span> 攻击：{{ detail.yuBaoGongJi }}</span>
      </div>
    </div>
    <div class="combine">
      <a-divider>激活属性</a-divider>
      <a-tabs v-model:activeKey="activeKey" size="large" @change="tabsChange">
        <a-tab-pane v-for="(item, index) in combine" :key="index" :tab="item.combinationName">
          <div>
            <span>达成条件：{{ item.tiaoJian }}</span>
          </div>
          <div v-if="item.activateProperty">
            <span>激活属性：</span><span>{{ item.activateProperty + "+" + item.activatePropertyVal }}</span>
          </div>
          <div v-if="item.activateHighProperty">
            <span>激活高级属性：</span><span>{{ item.activateHighProperty + "+" + item.activateHighPropertyVal }}</span>
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="duling">
      <a-divider>渡灵属性</a-divider>

      <div v-for="(item, idx) in jinjieMap" :key="idx" :class="{ active: item.isActive }">
        <span>{{ item.name + "：" }}</span><span>{{ detail[item.key] + "+" + detail[item.val] }}</span>
      </div>
    </div>
    <div class="juling">
      <a-divider>聚灵属性</a-divider>
      <div v-for="(item, idx) in julingMap" :key="idx" :class="{ active: item.isActive }">
        <span>{{ item.name + "：" }}</span><span>{{ detail[item.key] + "+" + detail[item.val] }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { toRefs, ref, watchEffect, watch } from "vue";
import { useCombine } from "../../hook/combine"
const activeKey = ref(0);
const props = defineProps({
  detail: Object
});
const jinjieMap = [
  { name: "1阶", key: "one", val: "oneVal", isActive: false },
  { name: "2阶", key: "two", val: "twoVal", isActive: false },
  { name: "4阶", key: "four", val: "fourVal", isActive: false },
  { name: "6阶", key: "six", val: "sixVal", isActive: false },
  { name: "9阶", key: "nine", val: "nineVal", isActive: false },
  { name: "12阶", key: "twelve", val: "twelveVal", isActive: false }
]
const julingMap = [
  { name: "1阶", key: "jone", val: "joneVal", isActive: false },//0
  { name: "2阶", key: "jtwo", val: "jtwoVal", isActive: false },//1
  { name: "4阶", key: "jfour", val: "jfourVal", isActive: false },//2
  { name: "6阶", key: "jsix", val: "jsixVal", isActive: false },//3
  { name: "9阶", key: "jnine", val: "jnineVal", isActive: false },//4
  { name: "12阶", key: "jtwelve", val: "jtwelveVal", isActive: false }//5
]
const { detail } = toRefs(props);
let combine = ref([])
watchEffect(async () => {//可以立即执行一次，请求初始数据
  combine.value = await useCombine(detail.value.name);
})
const handleCalc = (lv, arr) => {
  //等级发生变化，先把所有的active置为false，在重新赋值
  arr.forEach(it => it.isActive = false)
  let len = 0;
  switch (lv) {//需要处理等级
    case 3:
      len = 2
      break
    case 4:
    case 5:
      len = 3
      break
    case 6:
    case 7:
    case 8:
      len = 4;
      break
    case 9:
    case 10:
    case 11:
      len = 5;
      break
    case 12:
      len = 6;
      break
    default:
      len = lv
  }
  for (let i = 0; i < len; i++) {
    arr[i].isActive = true;
  }
}
watch(() => [detail.value.jinJieDengJi, detail.value.juLingDengJi], ([jinJieDengJi, juLingDengJi]) => {
  handleCalc(jinJieDengJi, jinjieMap)
  handleCalc(juLingDengJi, julingMap)
})
const tabsChange = (key) => {
  console.log('tabschange', key);
}
</script>

<style scoped>
.detail-box {
  text-align: left;
}

.active {
  color: rgb(33, 235, 33)
}
</style>
