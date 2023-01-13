import { ref, onMounted } from "vue";
import Bus from "../api/bus";
export const useZhenfa = function (defaultF) {
  let zhenfas = ref([]);
  let defaultV = ref("");
  const loadData = () => {
    Bus.getData("getBase").then((res) => {
      zhenfas.value = res.map((item, idx) => {
        item.img = `/image/${idx + 2}.jpg`;
        return item;
      });
      defaultV.value = zhenfas.value[0].value;
      // defaultF(zhenfas.value[0]);
    });
  };
  onMounted(() => {
    loadData();
  });
  return [zhenfas, defaultV];
};
