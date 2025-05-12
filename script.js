import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { ShaderPass } from 'three/addons/postprocessing/ShaderPass.js';
import { LuminosityShader } from 'three/addons/shaders/LuminosityShader.js';

const loader = new GLTFLoader();
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);
const renderer = new THREE.WebGLRenderer();
const controls = new OrbitControls(camera, renderer.domElement);



renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const texturey = new THREE.TextureLoader().load('texturours.png');
// texturey.wrapS = THREE.RepeatWrapping;
// texturey.wrapT = THREE.RepeatWrapping;
// texturey.repeat.set( 4, 4 );

texturey.wrapS = THREE.ClampToEdgeWrapping;
texturey.wrapT = THREE.ClampToEdgeWrapping;

// scene.background = texturey





const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
const materialComplex = new THREE.MeshStandardMaterial({
    color: 0x0000ff, // Base color
    metalness: 0.0,   // How metallic the surface is (0.0 = non-metal, 1.0 = metal)
    roughness: 0,   // How rough the surface is (0.0 = smooth/glossy, 1.0 = rough/matte)
});
const brown = new THREE.MeshStandardMaterial({
    color: 0x964B00, // Base color
    metalness: 0.0,   // How metallic the surface is (0.0 = non-metal, 1.0 = metal)
    roughness: 1,   // How rough the surface is (0.0 = smooth/glossy, 1.0 = rough/matte)
});
const materialSimple = new THREE.MeshPhongMaterial({
    color: 0x00ff00, // Base color of the material
    specular: 0xffffff, // Color of the specular highlight
    shininess: 1000,     // Size and intensity of the highlight
})

const ballMaterial = new THREE.MeshPhongMaterial({
    color: 0xAACEDB, // Base color of the material
    specular: 0xffffff, // Color of the specular highlight
    shininess: 1000,     // Size and intensity of the highlight
    side: THREE.BackSide //  <--- This line

})

const sphereMaterial = new THREE.MeshStandardMaterial({
    map: texturey, // Apply the texture
    color: 0xffffff, //optional, can be used to tint.
    metalness: 0.2,
    roughness: 0.7,
});

const cube = new THREE.Mesh(geometry, material);
const cubeS = new THREE.Mesh(geometry, materialSimple);
const cubeC = new THREE.Mesh(geometry, materialComplex);
const floor = new THREE.Mesh(geometry, brown);



const sphere = new THREE.Mesh(new THREE.SphereGeometry(5000, 10, 10), ballMaterial);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.01);
const ambientLight = new THREE.AmbientLight(0x4040ff, 0.01);




directionalLight.castShadow = true;
cube.receiveShadow = true; //  the cube can get shadowssss
cube.castShadow = true; // the cube can cast shadows
cubeS.castShadow = true; // the cube can cast shadows
cubeS.receiveShadow = true;
cubeC.receiveShadow = true;
cubeC.castShadow = true;
floor.receiveShadow = true;
floor.castShadow = true; // the cube can cast shadows

directionalLight.shadow.mapSize.width = 1024*4; // Default is 512
directionalLight.shadow.mapSize.height = 1022*4;



function Vector3(x, y, z) {
    return new THREE.Vector3(x, y, z);
}


directionalLight.shadow.camera.near = 0.1;
directionalLight.shadow.camera.far = 100;
directionalLight.shadow.camera.left = -5;
directionalLight.shadow.camera.right = 5;
directionalLight.shadow.camera.top = 5;
directionalLight.shadow.camera.bottom = -5;


scene.add(cube);
scene.add(cubeS);
scene.add(cubeC);
scene.add(floor);
scene.add(directionalLight);
scene.add(ambientLight);
scene.add(sphere);

cube.position.set(-1.5, 0, 0); // Set the position of the cube
cubeS.position.set(0, 0, 0); // Set the position of the cube
cubeC.position.set(1.5, 0, 0); // Set the position of the cube
floor.position.set(0, -2, 0); // Set the position of the cube



directionalLight.position.set(10, 10, 10); // Set the direction of the light


camera.position.z = 5;

let switchty = false;

function animate() {
    renderer.render(scene, camera);
    cube.rotation.x += 0.015;
    cube.rotation.y += 0.015;
    cubeS.rotation.x += 0.02;
    cubeS.rotation.y += 0.01;
    cubeC.rotation.x += 0.01;
    cubeC.rotation.y += 0.02;
    floor.scale.set(10, 0.1, 10);
    // ambientLight.intensity += 0.01
    // directionalLight.intensity += 0.01
    console.log(directionalLight.intensity)


    changeLightIntensity()

    function changeLightIntensity() {

        if (switchty) {
            directionalLight.intensity += 0.02;
        } else if (!switchty) {
            directionalLight.intensity -= 0.02;
        }
    }

    if (directionalLight.intensity >= 2) {
        switchty = false;
        return switchty;
    } else if (directionalLight.intensity <= 0) {
        switchty = true;
        return switchty;
    }
}


renderer.setAnimationLoop(animate);



