import { ref, onMounted } from "vue";
import Bus from "../api/bus";
export const useZhenfa = function (defaultF, emits) {
  let zhenfas = ref([]);
  let defaultV = ref("");
  const loadData = () => {
    console.log(import.meta.env);

    Bus.getData("getBase").then((res) => {
      zhenfas.value = res.map((item, idx) => {
        item.img = import.meta.env.DEV ? `/image/${idx + 2}.jpg` : `/dist/image/${idx + 2}.jpg`;
        return item;
      });
      defaultV.value = zhenfas.value[0].value;
      defaultF(zhenfas.value[0]);
    });
  };
  const handleChange = (value, s) => {
    emits("confirmCb", s);
  };

  const filterOption = (input, option) => {
    return option.value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
  };
  onMounted(() => {
    loadData();
  });
  return { zhenfas, defaultV, handleChange, filterOption };
};
