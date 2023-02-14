<template>
  <TopVue @confirmCb="confirm" />
  <div class="content">
    <div class="leftBox" ref="leftBox"></div>
    <Card v-show="state.showBox" :active-key="activeKey" @changeKey="changeKey" :isFabao="isFabao"
      :index="state.clickIndex" @cardCb="cardCb" @selectedCb="selectedCb" />
    <ShowCard v-if="popShow" :detail="selectedCard" :left="selectedLeft" />
    <div class="rightBox">
      <div class="right-content">
        <!-- <CardDetail :detail="state.showCard" /> -->
        <div v-for="(item, idx) in state.result" :key="idx">
          <div class="result-item" v-if="item.value">
            <span>{{ item.key + "：" }}</span><span>{{ parseFloat(item.value).toFixed(item.fixed) }}</span>
          </div>
        </div>
      </div>
      <div class="combineName">
        <div v-for="(item, idx) in state.combination" :key="idx">
          <template v-if="item.name">
            <div>{{ item.name }}</div>
            <div><span>达成条件：</span>{{ item.dckey }}</div>
            <div>
              <span>{{ item.property + "：" }}</span><span>{{ parseFloat(item.value).toFixed(2) }}</span>
            </div>
            <div v-if="item.highVal">
              <span>{{ item.highProperty + "：" }}</span><span>{{ parseFloat(item.highVal).toFixed(2) }}</span>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>
  <!-- <div>{{ left }} {{ right }}</div> -->
</template>

<script setup>
import TopVue from "../../components/newApp/Top.vue";
import Card from "../../components/newApp/CardBox.vue";
import ShowCard from "../../components/newApp/ShowCard.vue";
import { reactive, ref, } from "vue";
import { deepClone } from "../../utils/util";
import { initMap } from "../../api/data";
import { useAddCardBox } from "../../hook/useAddCardBox";
import { useSelectCard } from "../../hook/useSelectCard"
// import { useMousePosition } from "../../hook/mouse"
// const [left, right] = useMousePosition()
//其他hook可能会用到的变量放在外面公用
const selectCardBox = ref(null);
const selectFabaoBox = ref(null);
const state = reactive({
  showBox: false,
  clickIndex: -1,
  result: deepClone(initMap),
  fabaoResult: deepClone(initMap),
  cardBox: [],
  combination: []
});
//添加卡牌的hook
const {
  leftBox,
  selectedCard,
  selectedLeft,
  isFabao,
  popShow,
  activeKey,
  confirm,
  changeKey
} = useAddCardBox({ selectCardBox, selectFabaoBox, state });

//计算属性值的hook
const { cardCb, selectedCb } = useSelectCard({ state, selectCardBox, selectFabaoBox })

</script>
<style scoped>
.content {
  display: flex;
  /* justify-content: space-between; */
  width: 100%;
  height: 100%;
  padding: 0 6px;
  margin: 10px 0 0 0;
  position: relative;
  box-sizing: border-box;
}

.right-content {
  border: 1px solid #000;
  width: 50%;
  overflow-y: auto;
}

.combineName {
  width: 50%;
  border: 1px solid #666;
  border-left: none;
  text-align: left;
  overflow-y: auto;
}

.leftBox {
  width: 500px;
  height: 600px;
  position: relative;
}

.rightBox {
  flex-grow: 1;
  height: 600px;
  display: flex;
}

.rightBox>div {
  height: 100%;
  box-sizing: border-box;
}

:deep(.card-box) {
  /* background-image: url("/image/card_add.png"); */
  width: 120px;
  height: 196px;
  position: absolute;
  cursor: pointer;
}

:deep(.fabao-box) {
  /* background-image: url("/image/fb_add.png"); */
  width: 23px;
  height: 40px;
  position: absolute;
  cursor: pointer;
}

:deep(.delete-icon) {
  width: 20px;
  height: 20px;
  position: absolute;
  cursor: pointer;
}

.result-item {
  padding: 4px 0 0 10px;
  text-align: left;
}
</style>
