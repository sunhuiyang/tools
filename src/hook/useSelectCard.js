import { useCalc } from "./useCalc";
import { message } from "ant-design-vue";

export const useSelectCard = ({ state, selectCardBox, selectFabaoBox }) => {
  console.log("useSelectCard",state.cardBox)
  const { handleProperty, handleCombine, finalHandle } = useCalc(state);
  //选择卡牌之后的回调
  const cardCb = (e, res, index, flag) => {
    state.showBox = false; //close card select
    if (!flag) {
      //不是选择的法宝
      //判断卡牌是否重复
      console.log("循环之前",state.cardBox)
      for (let j = 0; j < state.cardBox.length; j++) {//有问题
        // if (state.cardBox[j].index === index) {
        //   //同一个孔点击多次，则清空上一次的
        //   state.cardBox[j] = { index };
        // }
        if (
          state.cardBox[j].index !== index &&
          state.cardBox[j].name === e.name
        ) {
          //卡牌重复，提示用户
          message.error(`已有${e.name}卡牌`);
          return;
        }
      }
      console.log("选择卡牌之后的state",state)
      //将人物信息保存于每个孔位，保证孔位每次修改之后都是最新的信息
      state.cardBox[index].name = e.name;
      state.cardBox[index].cardDetail = e;
      state.cardBox[index].juLingDengJi = e.juLingDengJi;
      state.cardBox[index].property = res;
      selectCardBox.value.style.backgroundImage = `url(${e.img})`;
      selectCardBox.value.style.backgroundSize = "cover";
    } else {
      selectFabaoBox.value.style.backgroundImage = `url(${e.img})`;
      selectFabaoBox.value.style.backgroundSize = "cover";
      //将法宝信息保存在人物孔位中
      state.cardBox[index].fabao = {
        ...state.cardBox[index].fabao,
        name: e.name,
        detail: e,
        juLingDengJi: e.juLingDengJi,
        property: res,
      };
    }
    //处理普通属性
    handleProperty();
    //处理激活属性
    handleCombine();
    //最后组合普通属性和激活属性
    finalHandle();
    // console.log("最终计算的结果", state);
  };
  //选择卡牌展示的回调
  const selectedCb = (item) => {
    // console.log("selectedCb", item);
    // state.showCard = item;
  };

  return { cardCb, selectedCb };
};
