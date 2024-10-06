import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';
import './style.css';

const scene = new THREE.Scene();

const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
  color: "#00ff83",
  roughness: 0.35,
});
const sphereMesh = new THREE.Mesh(geometry, material);
scene.add(sphereMesh);

const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
}

const light = new THREE.PointLight("#ffffff", 125, 100);
light.position.set(0, 10,10)
scene.add(light);

const camera = new THREE.PerspectiveCamera(45, sizes.width/sizes.height, 0.1, 100);
camera.position.z = 20;
scene.add(camera);

const canvas = document.querySelector('canvas') as HTMLCanvasElement;
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.max(window.devicePixelRatio, 2));

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

//resizing
window.addEventListener('resize', ()=>{
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;
  //update camera
  camera.aspect = sizes.width/sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
})

function animationLoop(){
  controls.update();
  renderer.render(scene, camera);
  window.requestAnimationFrame(animationLoop);
}
animationLoop();

const tl = gsap.timeline({defaults: {duration: 1}});
tl.fromTo(sphereMesh.scale, {x: 0, y: 0, z: 0}, {x: 1, y: 1, z: 1,});
tl.fromTo('nav', {opacity: 0}, {opacity: 1});

let mouseDown = false
window.addEventListener('mousedown', ()=>{
  mouseDown = true;
});

window.addEventListener('mouseup', ()=>{
    mouseDown = false;
});

let rgb = [0,255,131];
window.addEventListener('mousemove', (e)=>{
  if(mouseDown){
    rgb = [
        Math.round((e.pageX / sizes.width) * 255),
        Math.round((e.pageY / sizes.height) * 255),
        150,
    ];
  }

  gsap.to(sphereMesh.material.color, {r: rgb[0]/255, g: rgb[1]/255, b: rgb[2]/255});
});






