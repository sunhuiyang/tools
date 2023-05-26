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

export const localSave = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const getLocalSave = (key) => {
  let res = localStorage.getItem(key);
  try {
    res = JSON.parse(res);
  } catch (error) {
    console.log("取值报错");
  }
  if (res && res.expires && res.expires > Date.now()) {
    return res;
  } else {
    localStorage.removeItem(key);
    return null;
  }
};

export function toUTF8Array(str) {
  var utf8 = [];
  for (var i = 0; i < str.length; i++) {
    var charcode = str.charCodeAt(i);
    if (charcode < 0x80) utf8.push(charcode);
    else if (charcode < 0x800) {
      utf8.push(0xc0 | (charcode >> 6), 0x80 | (charcode & 0x3f));
    } else if (charcode < 0xd800 || charcode >= 0xe000) {
      utf8.push(
        0xe0 | (charcode >> 12),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f)
      );
    } else {
      i++;
      charcode = ((charcode & 0x3ff) << 10) | (str.charCodeAt(i) & 0x3ff);
      utf8.push(
        0xf0 | (charcode >> 18),
        0x80 | ((charcode >> 12) & 0x3f),
        0x80 | ((charcode >> 6) & 0x3f),
        0x80 | (charcode & 0x3f)
      );
    }
  }
  console.log(utf8, "utf8");
  return utf8;
}
export function Utf8ArrayToStr(array) {
  var out, i, len, c;
  var char2, char3;

  out = "";
  len = array.length;
  i = 0;
  while (i < len) {
      c = array[i++];
      switch (c >> 4) {
          case 0: case 1: case 2: case 3: case 4: case 5: case 6: case 7:
              // 0xxxxxxx
              out += String.fromCharCode(c);
              break;
          case 12: case 13:
              // 110x xxxx   10xx xxxx
              char2 = array[i++];
              out += String.fromCharCode(((c & 0x1F) << 6) | (char2 & 0x3F));
              break;
          case 14:
              // 1110 xxxx  10xx xxxx  10xx xxxx
              char2 = array[i++];
              char3 = array[i++];
              out += String.fromCharCode(((c & 0x0F) << 12) |
                  ((char2 & 0x3F) << 6) |
                  ((char3 & 0x3F) << 0));
              break;
      }
  }

  return out;
}
