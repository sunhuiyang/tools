export const getQueryString = function (name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
};

export function deepClone(obj) {
  function isObject(o) {
    return typeof o === "object" && o !== null;
  }
  function isFunction(o) {
    return typeof o === "function" && o !== null;
  }

  if (!isObject(obj) && !isFunction(obj)) {
    throw new Error("非对象");
  }
  let newObj;
  if (isFunction(obj)) {
    newObj = new Function("return " + obj.toString())();
  }
  let isArray = Array.isArray(obj);
  newObj = isArray ? [...obj] : { ...obj };
  Reflect.ownKeys(newObj).forEach((key) => {
    newObj[key] = isObject(obj[key]) ? deepClone(obj[key]) : obj[key];
  });

  return newObj;
}
