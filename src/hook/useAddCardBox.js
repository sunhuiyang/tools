import { ref, nextTick } from "vue";
import { useCalc } from "./useCalc";
import { deepClone } from "../utils/util";
import { initMap } from "../api/data";
export const useAddCardBox = ({ selectCardBox, selectFabaoBox, state }) => {
  const { handleProperty, handleCombine, finalHandle } = useCalc(state);
  const leftBox = ref(null);
  const popShow = ref(false);
  const selectedCard = ref({});
  const selectedLeft = ref("");
  const isFabao = ref(false);
  const activeKey = ref(0);
  const calc = () => {
    //处理普通属性
    handleProperty();
    //处理激活属性
    handleCombine();
    //最后组合普通属性和激活属性
    finalHandle();
  };

  const appendCardBox = (top, left, index) => {
    //添加卡槽
    const cardbox = document.createElement("div");
    cardbox.className = "card-box";
    cardbox.style.backgroundImage = import.meta.env.DEV? `url("/image/card_add.png")` : `url("/dist/image/card_add.png")` ;
    cardbox.style.top = top + "px";
    cardbox.style.left = parseInt(left) - 10 + "px";
    state.cardBox.push({ index, target: cardbox});
    cardbox.addEventListener("click", (e) => {
      //将点击的卡槽存储下来，方便等下点击卡牌回调赋值。
      isFabao.value = false;
      activeKey.value = 0;
      selectCardBox.value = e.target;
      state.clickIndex = index;
      state.showBox = true;
      console.log("点击卡牌的state", state);
    });
    cardbox.addEventListener("mouseenter", (e) => {
      console.log("进入父元素");
      if (!state.cardBox[index].cardDetail) return;
      popShow.value = true;
      selectedCard.value = state.cardBox[index].cardDetail;
      selectedLeft.value = parseInt(left) + 131 + "px";
    });
    cardbox.addEventListener("mouseleave", (e) => {
      if (!state.cardBox[index].cardDetail) return;
      popShow.value = false;
    });
    leftBox.value.appendChild(cardbox);

    //添加删除图标
    const deletcIcon = document.createElement("div");
    deletcIcon.className = "delete-icon";
    deletcIcon.style.backgroundImage = import.meta.env.DEV?`url("/image/delete.png")`:`url("/dist/image/delete.png")`;
    deletcIcon.style.top = top - 12 + "px";
    deletcIcon.style.left = parseInt(left) + 84 + "px";
    deletcIcon.addEventListener("click", (e) => {
      console.log("点击close");
      if (!state.cardBox[index].name) return; //没有卡牌时点击不做任何反应
      state.cardBox[
        index
      ].target.style.backgroundImage =import.meta.env.DEV? `url("/image/card_add.png")`:`url("/dist/image/card_add.png")`;
      //删除卡牌
      state.cardBox[index].name = "";
      state.cardBox[index].cardDetail = "";
      state.cardBox[index].juLingDengJi = 0;
      state.cardBox[index].property = "";
      //然后重新计算
      calc();
    });
    leftBox.value.appendChild(deletcIcon);

    //FB卡槽
    const fbBox = document.createElement("div");
    fbBox.className = "fabao-box";
    fbBox.style.backgroundImage =import.meta.env.DEV? `url("/image/fb_add.png")`:`url("/dist/image/fb_add.png")`;
    fbBox.style.top = parseInt(top) + 120 + "px";
    fbBox.style.left = parseInt(left) + 101 + "px";
    leftBox.value.appendChild(fbBox);
    fbBox.addEventListener("click", (e) => {
      isFabao.value = true;
      activeKey.value = 4;
      state.clickIndex = index;
      selectFabaoBox.value = e.target;
      //保存点击的节点，方便删除的时候替换样式
      state.cardBox[index].fabaoTarget = e.target;
      state.showBox = true; //打开卡牌选择，但是只能选择法宝
    });
    fbBox.addEventListener("mouseenter", () => {
      if (!state.cardBox[index].fabao || !state.cardBox[index].fabao.detail)
        return;
      selectedCard.value = state.cardBox[index].fabao.detail;
      selectedLeft.value = parseInt(left) + 131 + "px";
      popShow.value = true;
    });
    fbBox.addEventListener("mouseleave", () => {
      if (!state.cardBox[index].fabao || !state.cardBox[index].fabao.detail)
        return;
      popShow.value = false;
    });
    
    //法宝卡槽删除图标
    const fbdeletcIcon = document.createElement("div");
    fbdeletcIcon.className = "delete-icon";
    fbdeletcIcon.style.backgroundImage =import.meta.env.DEV? `url("/image/delete.png")`:`url("/dist/image/delete.png")`;
    fbdeletcIcon.style.top = parseInt(top) + 106 + "px";
    fbdeletcIcon.style.left = parseInt(left) + 106 + "px";
    fbdeletcIcon.addEventListener("click", (e) => {
      console.log("点击法宝close");
      if (!state.cardBox[index].fabao || !state.cardBox[index].fabao.name)
        return;
      //删除图标，删除保存的法宝属性，然后重新计算
      state.cardBox[index].fabaoTarget.style.backgroundImage = import.meta.env.DEV?`url("/image/fb_add.png")`:`url("/dist/image/fb_add.png")`;
      state.cardBox[index].fabao = {};
      calc();
    });
    leftBox.value.appendChild(fbdeletcIcon);
  };
  const removeCardBox = () => {
    while (leftBox.value.firstChild) {
      leftBox.value.removeChild(leftBox.value.firstChild);
    }
  };
  const clearState = () => {
    state.showBox = false;
    state.clickIndex = -1;
    state.result = deepClone(initMap); //深拷贝避免赋值的时候导致initMap也改变
    state.fabaoResult = deepClone(initMap);
    state.cardBox = [];
    state.combination = [];
  };
  const confirm = async (e) => {
    await nextTick(); //等待页面加载完成
    leftBox.value.style.background = `url(${e.img}) no-repeat`;
    //清空state
    clearState();
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
  const changeKey = (key) => {
    activeKey.value = key;
  };
  return {
    leftBox,
    selectedCard,
    selectedLeft,
    isFabao,
    popShow,
    activeKey,
    confirm,
    changeKey,
  };
};
