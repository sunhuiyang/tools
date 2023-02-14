import { combinations, initMap } from "../api/data";
import { deepClone } from "../utils/util";

export const useCalc = (state) => {
  const handleCombine = () => {
    //每一次计算都是遍历所有的卡槽进行计算，所以需要将表先清空
    state.combination = [];
    let nameArr = state.cardBox.map((item) => item.name);
    let flag = false;
    for (let i = 0; i < state.cardBox.length; i++) {
      for (let k = 0; k < combinations.length; k++) {
        if (state.cardBox[i].name === combinations[k].name) {
          if (combinations[k].tiaoJian.indexOf("、")) {
            //不是法宝
            let tiaoJian = combinations[k].tiaoJian.split("、");

            if (tiaoJian.length > 0) {
              for (let j = 0; j < tiaoJian.length; j++) {
                if (nameArr.indexOf(tiaoJian[j]) > -1) {
                  flag = true;
                } else {
                  flag = false;
                  break;
                }
              }
              if (flag) {
                const obj = {};
                obj.name = combinations[k].combinationName;
                obj.dckey = combinations[k].tiaoJian + "同时上阵";
                obj.property = combinations[k].activateProperty;
                obj.value = combinations[k].activatePropertyVal;
                if (
                  typeof combinations[k].activateHighProperty != "undefined" &&
                  state.cardBox[i].juLingDengJi > -1
                ) {
                  obj.highProperty = combinations[k].activateHighProperty;
                  obj.highVal = combinations[k].activateHighPropertyVal;
                }
                //保证不会重复
                // if (state.combination.findIndex(item => item.name === obj.name) > -1) return
                state.combination.push(obj);
              }
              flag = false;
            }
          }
        } else if (
          state.cardBox[i].fabao &&
          state.cardBox[i].fabao.name === combinations[k].name
        ) {
          if (combinations[k].tiaoJian.indexOf("被") > -1) {
            // 法宝
            let tiaoJian = combinations[k].tiaoJian.split("被");
            if (tiaoJian.length > 0) {
              if (
                tiaoJian[0] === state.cardBox[i].fabao.name &&
                tiaoJian[1] === state.cardBox[i].name
              ) {
                //这个条件都是2个，法宝和人物，人物在第二个位置。如果满足则达成激活条件
                flag = true;
              } else {
                flag = false;
              }
              if (flag) {
                const obj = {};
                if (
                  state.cardBox[i].fabao.juLingDengJi > -1 &&
                  state.cardBox[i].juLingDengJi > -1
                ) {
                  obj.name = combinations[k].combinationName;
                  obj.dckey = combinations[k].tiaoJian;
                  obj.property = combinations[k].activateProperty;
                  obj.value = combinations[k].activatePropertyVal;
                }
                state.combination.push(obj);
              }
            }
          }
        }
      }
      // console.log("激活属性", state.combination);
    }
  };
  const handlResult = (result, item) => {
    let idx = result.findIndex((o) => o.key === item.key);
    if (idx > -1) {
      result[idx].value =
        parseFloat(result[idx].value) + parseFloat(item.value);
    } else {
      result.push(item);
    }
  };
  const handleProperty = () => {
    //处理返回回来的属性表，因为都是重新遍历计算，需要清空上一次计算的，以最后一次计算为准
    state.result = deepClone(initMap);
    for (let i = 0; i < state.cardBox.length; i++) {
      let property =
        state.cardBox[i].property && deepClone(state.cardBox[i].property);
      if (!property) continue;
      property.forEach((item) => {
        handlResult(state.result, item);
      });
    }
    state.fabaoResult = deepClone(initMap);
    for (let i = 0; i < state.cardBox.length; i++) {
      let fabaoProperty =
        state.cardBox[i].fabao &&
        state.cardBox[i].fabao.property &&
        deepClone(state.cardBox[i].fabao.property);
      if (!fabaoProperty) continue;
      fabaoProperty.forEach((item) => {
        handlResult(state.fabaoResult, item);
      });
    }
    // console.log("法宝最后添加的属性表", state.fabaoResult);
  };

  const finalHandle = () => {
    for (let i = 0; i < state.combination.length; i++) {
      if (state.combination[i].property) {
        let obj = {
          key: state.combination[i].property,
          value: state.combination[i].value,
        };
        handlResult(state.result, obj);
      }
      if (state.combination[i].highProperty) {
        let obj = {
          key: state.combination[i].highProperty,
          value: state.combination[i].highVal,
        };
        handlResult(state.result, obj);
      }
    }
    //再加上法宝属性
    for (let i = 0; i < state.fabaoResult.length; i++) {
      handlResult(state.result, state.fabaoResult[i]);
    }
  };

  return { handleProperty, handleCombine, finalHandle };
};
