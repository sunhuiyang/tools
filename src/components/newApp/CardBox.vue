<template>
  <div class="cards-container">
    <div class="card-container-left">
      <a-tabs v-model:activeKey="activeKey" size="large" @change="tabsChange">
        <a-tab-pane v-for="(item, index) in cards" :key="index" :tab="item.name">
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
import { reactive, ref, watch } from "vue";
import CardDetail from "./CardDetail.vue";
import { useCards } from "../../hook/cards"
import { useCombine } from "../../hook/combine"

const props = defineProps({
  index: Number
});
let [cards] = useCards()
let activeKey = ref(0);
let isSelected = ref(false);
const state = reactive({
  zhenling: {
    type: "超凡",
    cuiLing: "40",
    name: "普泓",
    xiuZhenDengJi: 1,
    jinJieDengJi: 0,
    juLingDengJi: -1,
    tiPo: "66",
    xiuZhen: "66",
    yuBao: "66",
    tiPoQiXue: "55",
    xiuZhenZhenQi: "55",
    yuBaoGongJi: "5",
    yaoLing: "400",
    des: "0",
    one: "攻击",
    two: "真气",
    four: "真气",
    six: "昏睡抗性",
    nine: "对仙阵营伤害增加百分比",
    twelve: "昏睡抗性",
    oneVal: "150",
    twoVal: "3600",
    fourVal: "4200",
    sixVal: "21",
    nineVal: "6.00",
    twelveVal: "32",
    jone: "渡灵属性增加百分比",
    jtwo: "渡灵属性增加百分比",
    jfour: "防御",
    jsix: "渡灵属性增加百分比",
    jnine: "渡灵属性增加百分比",
    jtwelve: "对仙阵营伤害增加百分比",
    joneVal: "2.0",
    jtwoVal: "5.0",
    jfourVal: "600",
    jsixVal: "9.0",
    jnineVal: "14.0",
    jtwelveVal: "6.00",
    img: "image/普泓.png"
  }
});

//watch
const xzdjCalc = (lv, condition, isGJ) => {
  let con = parseFloat(condition);
  let res;
  if (!isGJ) {
    if (lv < 61) {
      res = parseInt(con / 1.2 * lv)
    } else {
      res = parseInt(con / 1.2 * 60 + con * 2 * (lv - 60))
    }
  } else {
    if (lv < 61) {
      res = parseInt(con / 12 * lv)
    } else {
      res = parseInt(con / 12 * 60 + con / 5 * (lv - 60))
    }
  }
  return res
}
watch(() => state.zhenling.xiuZhenDengJi, (newV, oldV) => {
  state.zhenling.tiPoQiXue = xzdjCalc(newV, state.zhenling.tiPo)
  state.zhenling.xiuZhenZhenQi = xzdjCalc(newV, state.zhenling.xiuZhen)
  state.zhenling.yuBaoGongJi = xzdjCalc(newV, state.zhenling.yuBao, true)
})

//methods
const emits = defineEmits(["cardCb", 'selectedCb']);
const selectCard = item => { //选择卡牌之后的回调
  //判断是否有聚灵等级
  if (item.hasOwnProperty("juLingDengJi")) {
    item.hasJuL = true
  } else {
    item.hasJuL = false
  }

  state.zhenling = item;
  isSelected.value = true;
  emits('selectedCb', item)
};
const calcLv = lv => {
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
  return len
}
const handleRes = () => {
  const res = [];
  //通用属性气血，真气，攻击
  let qixue = {
    key: "气血",
    value: state.zhenling.tiPoQiXue
  }
  res.push(qixue)
  let zhenqi = {
    key: "真气",
    value: state.zhenling.xiuZhenZhenQi
  }
  res.push(zhenqi)
  let gongji = {
    key: "攻击",
    value: state.zhenling.yuBaoGongJi
  }
  res.push(gongji)
  let Jorgin = ["jone", "jtwo", "jfour", "jsix", "jnine", "jtwelve"];
  let Jlen = calcLv(state.zhenling.juLingDengJi);
  if (Jlen > -1) {
    let jkeyMap = Jorgin.slice(0, Jlen)
    jkeyMap.forEach(key => {
      //人物聚灵属性
      let idx = res.findIndex(item => item.key === state.zhenling[key])
      if (idx >= 0) {
        //有则累加
        res[idx].value += parseFloat(state.zhenling[key + "Val"])
      } else {
        res.push({
          key: state.zhenling[key],
          value: parseFloat(state.zhenling[key + "Val"])
        })
      }
    })
  }
  const origin = ["one", "two", "four", "six", "nine", "twelve"];
  let len = calcLv(state.zhenling.jinJieDengJi);
  let keyMap = origin.slice(0, len)
  //需要计算渡灵百分比增加，所以先计算聚灵增益，在计算渡灵增益
  let dlIndex = res.findIndex(item => item.key === "渡灵属性增加百分比");
  let percent = res[dlIndex] ? res[dlIndex].value / 100 : 0
  keyMap.forEach(key => {
    //人物进阶属性
    let index = res.findIndex(item => item.key === state.zhenling[key])
    let v = parseFloat(state.zhenling[key + "Val"]) * (1 + percent)
    if (index >= 0) {
      //如果进阶属性已经存在于res上，就累加上去
      res[index].value += v
    } else {//新属性直接push进去
      res.push({
        key: state.zhenling[key],
        value: v
      })
    }
  })
  //最后删除渡灵属性增加百分比
  res.splice(dlIndex, 1)
  return res
}
const cardCallback = async () => { //确定卡牌之后的回调
  //汇集当前任务的所有属性
  let res = handleRes();
  console.log("选择卡牌的属性==>", res)
  //判断激活信息
  const combine = await useCombine(state.zhenling.name);
  emits("cardCb", state.zhenling, res, props.index, combine);
};
const tabsChange = (key) => {
}

const addCard = () => {
};

const addFabao = () => {
};
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
