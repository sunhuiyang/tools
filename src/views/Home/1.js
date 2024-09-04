console.log("start");
function toRaw(observed) {
  let raw = observed && observed["__v_raw"];
  return raw ? toRaw(raw) : observed;
}

function createArrayInstrumentations() {
  const instrumentations = {};
  ["includes", "indexOf", "lastIndexOf"].forEach((key) => {
    instrumentations[key] = function (...args) {
      console.log("this", this);
      const arr = toRaw(this);
      for (let i = 0, l = this.length; i < l; i++) {
        track(arr, "get", i + "");
      }
      const res = arr[key](...args);
      if (res === -1 || res === false) {
        return arr[key](...args.map(toRaw));
      } else {
        return res;
      }
    };
  });
  ["push", "pop", "shift", "unshift", "splice"].forEach((key) => {
    instrumentations[key] = function (...args) {
      pauseTracking();
      const res = toRaw(this)[key].apply(this, args);
      resetTracking();
      return res;
    };
  });
  return instrumentations;
}
const arr = [{ name: "1" }, { name: "2" }, "aaas"];
const handler = {
  get(target, key, receiver) {
    console.log("get", target, key, receiver);
    return Reflect.get(createArrayInstrumentations(), key, receiver);
  },
  set(target, key, receiver) {
    console.log("set", target, key, receiver);
    return Reflect.set(target, key, receiver);
  },
  deleteProperty(target, key) {
    console.log("del", target, key);
    return Reflect.deleteProperty(target, key);
  },
};
// const proxy = new Proxy(arr, handler);

// console.log(proxy[0]);

const child = { name: "child" };

const parent = new Proxy(child, {
  set(target, key, value, receiver) {
    console.log("set", target, receiver);
    return Reflect.set(target, key, value, receiver);
  },
  get(target, key, receiver) {
    console.log("get===", target, receiver);

    return Reflect.set(target, key, receiver);
  },
});

// Object.setPrototypeOf(child, parent);
console.log(parent.name);
