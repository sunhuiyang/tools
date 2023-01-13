import {
  zhenfas,
  jueDingZhenLing,
  chaoFanZhenLing,
  shangPinZhenLing,
  zhongPinZhenLing,
  faBaoZhenLing,
  cards,
  combinations,
} from "./data";
const base = {
  getBase: zhenfas,
  jueDing: jueDingZhenLing,
  chaoFan: chaoFanZhenLing,
  shangPin: shangPinZhenLing,
  zhongPin: zhongPinZhenLing,
  faBao: faBaoZhenLing,
  cards: cards,
  combinations,
};

export const requestData = function (params) {
  const data = base[params];
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(data);
    }, 500);
  });
};
