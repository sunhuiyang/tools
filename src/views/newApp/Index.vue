<template>
  <TopVue @confirmCb="confirm" />
  <div class="content">
    <div class="leftBox" ref="leftBox"></div>
    <Card v-show="state.showBox" :index="state.clickIndex" @cardCb="cardCb" @selectedCb="selectedCb" />
    <div class="right-content">
      <!-- <CardDetail :detail="state.showCard" /> -->
      <div class="result-item" v-for="(item, idx) in state.result" :key="idx">
        <template v-if="item.key !== '渡灵属性增加百分比'">
          <span>{{ item.key + "：" }}</span><span>{{ parseFloat(item.value).toFixed(2) }}</span>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { message } from 'ant-design-vue';
import TopVue from "../../components/newApp/Top.vue";
import Card from "../../components/newApp/CardBox.vue";
import { nextTick, reactive, ref } from "vue";
import { deepClone } from "../../utils/util"


const leftBox = ref(null);
const selectCardBox = ref(null);
const state = reactive({
  showBox: false,
  clickIndex: -1,
  result: [],
  cardBox: []
});
//添加卡槽
const appendCardBox = (top, left, index) => {
  //添加卡槽
  state.cardBox.push({ index })
  const cardbox = document.createElement("div");
  cardbox.className = "card-box";
  cardbox.style.top = top + "px";
  cardbox.style.left = parseInt(left) - 10 + "px";
  cardbox.addEventListener("click", e => {
    //将点击的卡槽存储下来，方便等下点击卡牌回调赋值。
    selectCardBox.value = e.target;
    state.clickIndex = index
    state.showBox = true;
  });
  leftBox.value.appendChild(cardbox);
  //FB卡槽
  const fbBox = document.createElement("div");
  fbBox.className = "fabao-box";
  fbBox.style.top = parseInt(top) + 120 + "px";
  fbBox.style.left = parseInt(left) + 101 + "px";
  leftBox.value.appendChild(fbBox);
};
const removeCardBox = () => {
  while (leftBox.value.firstChild) {
    leftBox.value.removeChild(leftBox.value.firstChild);
  }
};

const clearState = () => {
  state.showBox = false;
  state.clickIndex = -1;
  state.result = [];
  state.cardBox = []
}
const confirm = async e => {
  await nextTick(); //等待页面加载完成
  leftBox.value.style.background = `url(${e.img}) no-repeat`;
  //清空state
  clearState()
  //先清空再添加
  removeCardBox();
  switch (e.value) {
    case "二龙出水阵":
      appendCardBox(105, 112, 0);
      appendCardBox(255, 312, 1);
      break;
    case "三才天地阵":
      appendCardBox(34, 318, 0);
      appendCardBox(178, 77, 1);
      appendCardBox(332, 250, 2);
      break;
    case "四门斗底阵":
      appendCardBox(30, 192, 0);
      appendCardBox(207, 66, 1);
      appendCardBox(207, 343, 2);
      appendCardBox(385, 193, 3);
      break;
    case "五虎群羊阵":
      appendCardBox(35, 204, 0);
      appendCardBox(123, 48, 1);
      appendCardBox(113, 348, 2);
      appendCardBox(300, 109, 3);
      appendCardBox(290, 298, 4);
      break;
    case "六宇连方阵":
      appendCardBox(25, 202, 0);
      appendCardBox(105, 42, 1);
      appendCardBox(100, 360, 2);
      appendCardBox(295, 45, 3);
      appendCardBox(295, 364, 4);
      appendCardBox(360, 211, 5);
      break;
    case "七星北斗阵":
      appendCardBox(0, 207, 0);
      appendCardBox(116, 74, 1);
      appendCardBox(116, 340, 2);
      appendCardBox(195, 206, 3);
      appendCardBox(310, 29, 4);
      appendCardBox(300, 372, 5);
      appendCardBox(388, 206, 6);
      break;
    case "八门金锁阵":
      appendCardBox(0, 9, 0);
      appendCardBox(0, 375, 1);
      appendCardBox(90, 138, 2);
      appendCardBox(95, 269, 3);
      appendCardBox(290, 112, 4);
      appendCardBox(295, 244, 5);
      appendCardBox(405, 6, 6);
      appendCardBox(405, 375, 7);
      break;
  }
};

//处理result属性
function handleResult(result, newItem) {
  let idx = result.findIndex(item => item.key === newItem.key)
  if (idx > -1) {
    //相同的属性累加
    result[idx].value = parseFloat(result[idx].value) + parseFloat(newItem.value);
  } else {
    result.push({ ...newItem })
  }
}
//选择卡牌之后的回调
const cardCb = (e, res, index, combine) => {
  state.showBox = false; //close card select
  //判断卡牌是否重复
  for (let j = 0; j < state.cardBox.length; j++) {
    if (state.cardBox[j].index === index) {
      //同一个孔点击多次，则清空上一次的
      state.cardBox[j] = { index }
    }
    if (state.cardBox[j].index !== index && state.cardBox[j].name === e.name) {
      //卡牌重复，提示用户
      message.error(`已有${e.name}卡牌`)
      return
    }
  }


  //将人物信息保存于每个孔位，保证孔位每次修改之后都是最新的信息
  // let i = state.cardBox.findIndex(item => item.index === index);
  state.cardBox[index].name = e.name;
  state.cardBox[index].juLingDengJi = e.juLingDengJi;
  state.cardBox[index].property = res;
  state.cardBox[index].combine = combine;
  selectCardBox.value.style.background = `url(${e.img}) no-repeat`;
  selectCardBox.value.style.backgroundSize = "cover";

  //处理返回回来的属性表
  state.result = state.cardBox.reduce((pre, cur) => {
    console.log("pre===>", pre, "cur==>", cur)
    let obj = {};
    obj.name = pre.name;
    obj.juLingDengJi = pre.juLingDengJi;
    obj.combine = deepClone(pre.combine);
    let result = deepClone(pre.property) || [];//激活属性也应该在这里来加
    if (!cur.property) return { ...obj, property: result };
    // 处理普通属性
    cur.property.forEach(newItem => {
      handleResult(result, newItem)
    })
    //检查是否存在激活属性
    if (obj.combine && obj.combine.length > 0) {
      obj.combine.forEach(ap => {
        let tiaojian = ap.tiaoJian.replace(e.name + "、", "").split("、");
        //删除自己的name，然后剩下的去匹配下一个的name，如果满足就添加属性
        tiaojian = tiaojian.splice(tiaojian.findIndex(item => item === ap.name), 1);
        let idx = tiaojian.findIndex(item => item === cur.name)
        if (idx > -1) {
          //有包含了该人物的的激活属性
          if (idx === 0 && tiaojian.length === 1) {
            //双人激活
            handleResult(result, {
              key: ap.activateProperty,
              value: parseFloat(ap.activatePropertyVal)
            })
            if (obj.juLingDengJi > -1 && cur.juLingDengJi > -1) {
              handleResult(result, {
                key: ap.activateHighProperty,
                value: parseFloat(ap.activateHighPropertyVal)
              })
            }
          }
        }
      })
    }
    return {
      ...obj,
      property: result
    }
  }).property
  //处理激活属性
  combine.forEach(ap => {
    let tiaojian = ap.tiaoJian.replace(e.name + "、", "").split("、")
    tiaojian.forEach(name => {
      let idx = state.cardBox.findIndex(item => item.name === name);
      if (idx > -1) {
        //激活普通组合属性
        handleResult(state.result, {
          key: ap.activateProperty,
          value: parseFloat(ap.activatePropertyVal)
        })
        if (e.juLingDengJi > -1 && state.cardBox[idx].juLingDengJi > -1) {
          //有激活高级属性
          handleResult(state.result, {
            key: ap.activateHighProperty,
            value: parseFloat(ap.activateHighPropertyVal)
          })
        }
      }
    })
  })
  console.log("最终计算的结果", state)

};
//选择卡牌展示的回调
const selectedCb = item => {
  console.log("selectedCb", item);
  // state.showCard = item;
};
</script>
<style scoped>
.content {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 100%;
  padding: 0;
  margin: 0;
  position: relative;
}

.right-content {
  border: 1px solid #000;
  width: 40%;
}

.leftBox {
  width: 60%;
  height: 600px;
  position: relative;
}

:deep(.card-box) {
  background-image: url("/image/card_add.png");
  width: 120px;
  height: 196px;
  position: absolute;
  cursor: pointer;
}

:deep(.fabao-box) {
  background-image: url("/image/fb_add.png");
  width: 23px;
  height: 40px;
  position: absolute;
  cursor: pointer;
}

.result-item {
  padding: 4px 0 0 10px;
  text-align: left;
}
</style>
