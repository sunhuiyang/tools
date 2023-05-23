import { ref, toRefs, watchEffect, watch } from "vue";
import { useCombine } from "../hook/useCombine";

export const useCardDetail = (props) => {
  const activeKey = ref(0);
  const jinjieMap = [
    { name: "1阶", key: "one", val: "oneVal", isActive: false },
    { name: "2阶", key: "two", val: "twoVal", isActive: false },
    { name: "4阶", key: "four", val: "fourVal", isActive: false },
    { name: "6阶", key: "six", val: "sixVal", isActive: false },
    { name: "9阶", key: "nine", val: "nineVal", isActive: false },
    { name: "12阶", key: "twelve", val: "twelveVal", isActive: false },
  ];
  const julingMap = [
    { name: "1阶", key: "jone", val: "joneVal", isActive: false }, //0
    { name: "2阶", key: "jtwo", val: "jtwoVal", isActive: false }, //1
    { name: "4阶", key: "jfour", val: "jfourVal", isActive: false }, //2
    { name: "6阶", key: "jsix", val: "jsixVal", isActive: false }, //3
    { name: "9阶", key: "jnine", val: "jnineVal", isActive: false }, //4
    { name: "12阶", key: "jtwelve", val: "jtwelveVal", isActive: false }, //5
  ];
  const { detail } = toRefs(props);
  let combine = ref([]);
  watchEffect(async (onInvalidate) => {
    //可以立即执行一次，请求初始数据
    console.log("watcheffect");
    onInvalidate(()=>{
      console.log("watcheffect invalidate");
    })
    combine.value = await useCombine(detail.value.name);
  });
  const handleCalc = (lv, arr) => {
    //等级发生变化，先把所有的active置为false，在重新赋值
    arr.forEach((it) => (it.isActive = false));
    let len = 0;
    switch (
      lv //需要处理等级
    ) {
      case 3:
        len = 2;
        break;
      case 4:
      case 5:
        len = 3;
        break;
      case 6:
      case 7:
      case 8:
        len = 4;
        break;
      case 9:
      case 10:
      case 11:
        len = 5;
        break;
      case 12:
        len = 6;
        break;
      default:
        len = lv;
    }
    for (let i = 0; i < len; i++) {
      arr[i].isActive = true;
    }
  };
  watch(
    () => [detail.value.jinJieDengJi, detail.value.juLingDengJi],
    ([jinJieDengJi, juLingDengJi]) => {
      handleCalc(jinJieDengJi, jinjieMap);
      handleCalc(juLingDengJi, julingMap);
    },
    {
      immediate: true,
    }
  );
  return { activeKey, detail, combine, jinjieMap, julingMap };
};
