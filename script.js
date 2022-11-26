import * as THREE from "./build/three.module.js";
import { OrbitControls } from "./controls/OrbitControls.js";
import { FontLoader} from "./loaders/FontLoader.js";
import { TextGeometry } from "./geometries/TextGeometry.js";

// Scene
const scene = new THREE.Scene();

const sizes = {
  // width: window.innerWidth,
  // height: window.innerHeight,
  width:400,
  height:150,
};

// const helper = new THREE.AxesHelper();
// scene.add(helper);

//camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.set(0, 1, 3);
camera.lookAt(new THREE.Vector3(0, 0, 0));
scene.add(camera);

// Renderer
const renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector('#myCanvas')
      });
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
// document.body.appendChild(renderer.domElement);
renderer.shadowMap.enabled=true;


//Fonts
const fontLoader = new FontLoader();
fontLoader.load("./fonts/helvetiker_regular.typeface.json", function(font){
// fontLoader.load("./fonts/Noto Sans JP Medium_Regular.json", function(font){
    console.log(font);

  const textGeometry = new TextGeometry("Techman2021" , {
    font:font,
    size:1,
    height:0.2,
    // curveSegment:0,
    // bevelEnabled:true,
    // bevelThickness:0.04,
    // bevelSize:0.02,
    // bevelOffset:0,
    // bevelSegment:5,
  });
  textGeometry.center();
  // const textGeometry2 = new TextGeometry("マウスで回転するよ" , {
  //   font:font,
  //   size:1,
  //   height:0.2,
  // });
  // textGeometry2.center();

  //material
  // const textMaterial = new THREE.MeshNormalMaterial();
  // const textMaterial = new THREE.MeshBasicMaterial({color: 0xA63744});
  // const textMaterial = new THREE.MeshLambertMaterial({color: 0xA63744});
  // const textMaterial = new THREE.MeshPhongMaterial({color: 0xA63744});
  const textMaterial = new THREE.MeshStandardMaterial();

  


  //mesh
  const text = new THREE.Mesh(textGeometry, textMaterial);
  text.position.y = 0.5;
  text.castShadow = true;
  scene.add(text);
  // const text2 = new THREE.Mesh(textGeometry2, textMaterial);
  // scene.add(text2);

  //boxGeometry
  const boxGeometry = new THREE.BoxGeometry(0.5, 0.5,0.5);
  const material = new THREE.MeshNormalMaterial(); 
  //const material = new THREE.MeshPhongMaterial({color: 0xffffff}); 
  //const material = new THREE.MeshToonMaterial({color: 0x52070});   

  for(let i=0; i<100;i++){
    const box = new THREE.Mesh(boxGeometry,material);

    box.position.x = (Math.random() - 0.5) * 10;
    box.position.y = (Math.random() - 0.5) * 10;
    box.position.z = (Math.random() - 0.5) * 10;

    box.rotation.x = Math.random() * Math.PI;
    box.rotation.y = Math.random() * Math.PI;
    box.rotation.z = Math.random() * Math.PI;

    const scale = Math.random();
    box.scale.x = scale;
    box.scale.y = scale;
    box.scale.z = scale;
    scene.add(box);

  }
});

// // 平行光源
// const directionalLight = new THREE.DirectionalLight(0xFFFFFF, 0.5);
// directionalLight.position.set(1, 10, 1);
// // シーンに追加
// scene.add(directionalLight);

// // 環境光源
// const ambientLight = new THREE.AmbientLight(0xFFFFFF, 0.01);
// // シーンに追加
// // scene.add(ambientLight);

// 地面と影をつける
//material
// const material = new THREE.MeshStandardMaterial({
const material = new THREE.MeshToonMaterial({
  color:"gray",
});

//plane
const planeGeometry = new THREE.PlaneGeometry(40,40);

//mesh-plane
const plane = new THREE.Mesh(planeGeometry,material);
plane.rotation.x = -Math.PI * 0.5;
plane.receiveShadow = true;
scene.add(plane);

//light
const pointLight = new THREE.PointLight(0xff7f50,2);
pointLight.position.set(5,10,20);
pointLight.castShadow = true;
scene.add(pointLight);

// 影を表現する領域を広げると、滑らかになる
pointLight.shadow.width = 1024;
pointLight.shadow.height = 1024;
// 影の境界がぼやける
// pointLight.shadow.radius = 10;

pointLight.shadow.camera.near  = 6;
pointLight.shadow.camera.far  = 30;

//helper
const pointLightHelper = new THREE.PointLightHelper(pointLight,3,150);
scene.add(pointLightHelper);

// Controls
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

// Animate
const animate = () => {
  controls.update();

  renderer.render(scene, camera);
  window.requestAnimationFrame(animate);
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

animate();
