<template>
  <div ref="listWrap" class="list-wrap" @scroll="scrollListener">
    <div class="list" ref="List">
      <div v-for="(item, idx) in showList" :key="idx">{{ item }}</div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed } from "vue";
const arr = new Array();
for (let i = 0; i < 100; i++) {
  arr.push(i + 1);
}
export default {
  setup() {
    const list = ref(arr); //长列表数据
    const itemHeight = ref(50); //item高度
    const showNum = ref(10); //展示的数据
    const start = ref(0); //滚动过程中的开始索引
    const end = ref(10); //滚动过程中的结束索引
    const listWrap = ref(null); //获取列表视图模型节点
    const List = ref(null); //获取列表节点

    onMounted(() => {
      listWrap.value.style.height = itemHeight.value * showNum.value + "px"; //设置列表视图模型的高度
    });
    const showList = computed(() => {
      //获取展示的列表
      return list.value.slice(start.value, end.value);
    });
    const scrollListener = () => {
      //获取滚动高度
      let scrollTop = listWrap.value.scrollTop;
      console.log("滚动高度", scrollTop);
      //开始的数组索引ew67[]\[kgcxz]
      start.value = Math.floor(scrollTop / itemHeight.value);
      //结束索引
      end.value = start.value + showNum.value;
      console.log(start.value, end.value);
      List.value.style.transform = `translateY(${
        start.value * itemHeight.value
      }px)`; //对列表项进行偏移
    };
    return {
      list,
      itemHeight,
      showNum,
      start,
      end,
      listWrap,
      List,
      showList,
      scrollListener
    };
  }
};
</script>
<style scoped>
.list-wrap {
  width: 100px;
  height: 400px;
  border: 1px solid #000;
  overflow: scroll;
}
.list-wrap::-webkit-scrollbar{
  display: none;
}
.list > div {
  height: 55px;
}
</style>
