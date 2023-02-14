<template>
  <div class="detail-box">
    <div class="basic-info">
      <a-divider style="margin:10px 0">基本属性</a-divider>
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
      <a-divider style="margin:10px 0">激活属性</a-divider>
      <a-tabs v-model:activeKey="activeKey" size="large">
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
      <a-divider style="margin:10px 0">渡灵属性</a-divider>
      <div v-for="(item, idx) in jinjieMap" :key="idx" :class="{ active: item.isActive }">
        <span>{{ item.name + "：" }}</span><span>{{ detail[item.key] + "+" + detail[item.val] }}</span>
      </div>
    </div>
    <div class="juling">
      <a-divider style="margin:10px 0">聚灵属性</a-divider>
      <div v-for="(item, idx) in julingMap" :key="idx" :class="{ active: item.isActive }">
        <span>{{ item.name + "：" }}</span><span>{{ detail[item.key] + "+" + detail[item.val] }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useCardDetail } from "../../hook/useCardDetail"
const props = defineProps({
  detail: Object
});
const { activeKey, detail, combine, jinjieMap, julingMap } = useCardDetail(props)

</script>

<style scoped>
.detail-box {
  text-align: left;
  overflow-y: auto;
}

.active {
  color: rgb(33, 235, 33)
}
</style>
