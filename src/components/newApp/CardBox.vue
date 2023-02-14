<template>
  <div class="cards-container">
    <div class="card-container-left">
      <a-tabs v-model:activeKey="key" size="large" @change="tabsChange">
        <a-tab-pane v-for="(item, index) in cards" :key="index" :tab="item.name"
          :disabled="(item.name === '法宝' && !isFabao) || (item.name !== '法宝' && isFabao)">
          <ul>
            <li @click="selectCard(tmp)" v-for="(tmp, idx) in item.value" :key="idx">
              <img :src="tmp.img" alt="" />
            </li>
          </ul>
        </a-tab-pane>
      </a-tabs>
    </div>
    <div class="card-container-right">
      <Suspense>
        <CardDetail :detail="state.zhenling" />
      </Suspense>
    </div>
    <!-- 卡牌详情 -->
    <div v-show="isSelected" class="level">
      <a-row>
        <a-col :span="4">等级：</a-col>
        <a-col :span="16">
          <a-slider :tooltipVisible="false" v-model:value="state.zhenling.xiuZhenDengJi" :min="0" :max="70" /></a-col>
        <a-col :span="4">
          <a-input-number v-model:value="state.zhenling.xiuZhenDengJi" :min="0" :max="70" /></a-col>
      </a-row>
      <a-row>
        <a-col :span="4">进阶等级：</a-col>
        <a-col :span="16">
          <a-slider :tooltipVisible="false" v-model:value="state.zhenling.jinJieDengJi" :min="0" :max="12" /></a-col>
        <a-col :span="4">
          <a-input-number v-model:value="state.zhenling.jinJieDengJi" :min="0" :max="12" /></a-col>
      </a-row>
      <a-row v-if="state.zhenling.hasJuL">
        <a-col :span="4">聚灵等级：</a-col>
        <a-col :span="16">
          <a-slider :tooltipVisible="false" v-model:value="state.zhenling.juLingDengJi" :min="-1" :max="12" /></a-col>
        <a-col :span="4">
          <a-input-number v-model:value="state.zhenling.juLingDengJi" :min="-1" :max="12" /></a-col>
      </a-row>

      <a-button type="primary" @click="cardCallback">确定</a-button>
    </div>
  </div>
</template>

<script setup>
import CardDetail from "./CardDetail.vue";
import { useCards } from "../../hook/useCardBox"

const props = defineProps({
  index: Number,
  isFabao: Boolean,
  activeKey: Number
});

const emits = defineEmits(["cardCb", 'selectedCb', "changeKey"]);
let { cards, isSelected, state, key, selectCard, cardCallback, tabsChange } = useCards(props, emits)

</script>

<style scoped>
.cards-container {
  width: 100%;
  height: 600px;
  background-color: #eee;
  position: absolute;
  z-index: 99999;
  overflow: hidden;
  overflow-y: auto;
  display: flex;
  justify-content: space-between;
}

.card-container-left {
  width: 60%;
}

.card-container-right {
  width: 30%;
}

ul {
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}

li {
  list-style: none;
  cursor: pointer;
}

.level {
  width: 60%;
  height: 160px;
  position: fixed;
  bottom: 0;
  z-index: 999;
}
</style>
