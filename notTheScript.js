import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const loader = new GLTFLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

// directionalLight.position.set(10, 10, 10); // Set the direction of the light
// directionalLight.castShadow = true;

const geometryBox = new THREE.BoxGeometry(1, 1, 1);
const materialComplex = new THREE.MeshStandardMaterial({
    color: 0x0000ff, // Base color
    metalness: 0.0,   // How metallic the surface is (0.0 = non-metal, 1.0 = metal)
    roughness: 0,   // How rough the surface is (0.0 = smooth/glossy, 1.0 = rough/matte)
});

const geometryCircle = new THREE.CircleGeometry( 5, 32 ); 
const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 
const circle = new THREE.Mesh( geometryCircle, material ); scene.add( circle );


const cubeC = new THREE.Mesh(geometryBox, materialComplex);

cubeC.position.set(1.5, 0, 0); // Set the position of the cube


scene.add(circle)
scene.add(cubeC)

camera.position.set(0, 0, 10); // Move the camera back along the z-axis

function animate() {
    controls.update(); // Update the OrbitControls
    renderer.render(scene, camera);
}

renderer.setAnimationLoop(animate);