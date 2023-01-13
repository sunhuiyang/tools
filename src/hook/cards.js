import { ref, onMounted } from "vue";
import Bus from "../api/bus";
export const useCards = function () {
  let cards = ref([]);
  const loadData = () => {
    Bus.getData("cards").then((res) => {
      res.forEach((element) => {
        element.value.forEach((item) => {
          item.xiuZhenDengJi = Number(item.xiuZhenDengJi);
          item.jinJieDengJi = Number(item.jinJieDengJi);
          if (item.juLingDengJi) {
            item.juLingDengJi = Number(item.juLingDengJi);
          }
        });
      });
      cards.value = res;
    });
  };
  onMounted(() => {
    loadData();
  });
  return [cards];
};
