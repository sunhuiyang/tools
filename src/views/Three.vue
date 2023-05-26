<template>
  <div>
    <canvas id="draw" style="border:1px solid;background-color: #000;"></canvas>
  </div>
</template>

<script setup>
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { onMounted } from "vue";
const width = 500, height = 500;
const baseWidth = 40, baseLength = 60;
let scene = null
let camera = null
let canvas = null;
let renderer = null
const group = new THREE.Group();//组合零件的工具
function createGround(){
  
}
onMounted(() => {
  canvas = document.querySelector("#draw");
  //创建场景
  scene = new THREE.Scene();
  //创建一个透视相机
  camera = new THREE.PerspectiveCamera(125, width / height, 1, 2000);
  //设置相机位置
  camera.position.set(-30, 30, 50);
  //创建环境光
  const hjLight = new THREE.AmbientLight(0xffffff);
  //添加环境光至场景
  scene.add(hjLight);



  //添加房子的group到场景中
  scene.add(group);
  //添加轨道控制器
  const controls = new OrbitControls(camera, canvas);
  //渲染器
  renderer = new THREE.WebGLRenderer({
    canvas,//传入要渲染的canvas，相关参数可以看文档
    antialias: true,//抗锯齿
    alpha: true,
  });
  //设置渲染器大小
  renderer.setSize(width, height);

  //渲染器开始渲染
  renderer.render(scene, camera);
  //执行
  function animate() {
    controls.update();
    renderer.render(scene, camera);
  }
  animate()

});
</script>
