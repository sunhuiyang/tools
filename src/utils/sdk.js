export let getWxSdk = function () {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://res.wx.qq.com/open/js/jweixin-1.6.0.js";
  script.language = "javascript";
  document.getElementsByTagName("head")[0].appendChild(script);
};

export let getUniSdk = function () {
  let script = document.createElement("script");
  script.type = "text/javascript";
  script.src = "https://unpkg.com/@dcloudio/uni-webview-js@0.0.2/index.js";
  script.language = "javascript";
  document.getElementsByTagName("head")[0].appendChild(script);
};
