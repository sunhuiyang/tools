let output;
function a() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve("outputparams");
    }, 3000);
  });
}
export default (async function () {
  output = await a();
})();
//顶层 await ，会阻塞页面
// output = await a()
export { output };
