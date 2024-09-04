class MyEventBus {
  constructor() {
    this.eventBus = {}; //存储事件与回调的对应关系
  }
  on(eventName, callback, thisArg) {
    if (!this.eventBus[eventName]) {
      this.eventBus[eventName] = []; //初始化为数组
    }
    this.eventBus[eventName].push({
      callback,
      thisArg,
    });
  }
  /**
   *
   * @param {*} eventName 事件名
   * @param  {...any} args 入参
   */
  emit(eventName, ...args) {
    const handler = this.eventBus[eventName].slice(); //做一次浅拷贝，避免通过once安装的监听器在移除时出现顺序 问题
    if (!handler || handler.length === 0) {
      console.log(`没有监听事件${eventName}`);
      return;
    }
    handler.forEach((item) => {
      item.callback.apply(item.thisArg, args);
    });
  }
  /**
   * 移除某个事件回调队列指定的回调函数
   * @param {*} eventName
   * @param {*} callback
   */
  off(eventName, callback) {
    const handler = this.eventBus[eventName]; //做一次浅拷贝，避免通过once安装的监听器在移除时出现顺序 问题
    if (!handler) return;
    for (let i = 0; i < handler.length; i++) {
      if (handler[i].callback === callback) {
        handler.splice(i, 1);
      }
    }
    console.log("100", handler, this.eventBus[eventName]);
  }
  /**
   * 单次监听
   * @param {*} eventName
   * @param {*} callback
   */
  once(eventName, callback) {
    const temp = (...args) => {
      callback(...args);
      this.off(eventName, temp); //执行完成就自动移除
    };
    this.on(eventName, temp);
  }
}

const bus = new MyEventBus();

bus.on(
  "on",
  function (data) {
    console.log("一号监听事件", this.name, data);
  },
  {
    name: "小明",
  }
);
const handle = function (data) {
  console.log("二号监听事件", this, data);
};
bus.on("on", function () {
  console.log("一号监听事件2");
});
bus.on("two", handle);
bus.emit("on", "入参");
bus.emit("two", "入参2");
bus.once("once", function (data) {
  console.log("once监听", data);
});
bus.emit("once", "once入参");
bus.emit("once", "once第二次");
bus.off("on", function () {
  console.log("一号监听事件2");
});
bus.emit("on", "入参3");
console.log(bus);
