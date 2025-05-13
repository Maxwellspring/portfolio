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

renderer.domElement.addEventListener("mouseup", onClick, false);

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();

window.addEventListener('resize', () => {

    // 1. Update the camera's aspect ratio
    camera.aspect = window.innerWidth / window.innerHeight;

    // 2. You must call updateProjectionMatrix for the changes to take effect
    camera.updateProjectionMatrix();

    // 3. Update the size of the renderer
    renderer.setSize(window.innerWidth, window.innerHeight);

    // Optional: If you're using a post-processing composer, you might need to resize it as well
    // if (composer) {
    //     composer.setSize(window.innerWidth, window.innerHeight);
    // }

}, false);

function onClick(event) {
    event.preventDefault(); // Prevent default browser behavior (e.g., text selection)
    // Get the normalized mouse coordinates
    mouse.x = (event.clientX / renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / renderer.domElement.clientHeight) * 2 + 1;

    // Update the raycaster's position
    raycaster.setFromCamera(mouse, camera);

    // Find intersections
    const intersects = raycaster.intersectObjects(scene.children, true);

    // Check if there are any intersections
    if (intersects.length > 0) {    // Handle the click on the intersected object
        const intersectedObject = intersects[0].object;// Do something with the intersectedObject (e.g., highlight it, display information)

        if (intersectedObject.uuid == cubeC.uuid) {
            console.log("Clicked on the cubeC");
            window.open("about-me.html", "_self");
        } else if (intersectedObject.uuid == cubeS.uuid) {
            console.log("Clicked on the cubeS");
            window.open("contact.html", "_self");
        } else if (intersectedObject.uuid == cube.uuid) {
            console.log("Clicked on the cube");
            window.open("portfolio.html", "_self");
        } else if (intersectedObject.uuid == cubeSad.uuid) {
            console.log("Clicked on the cubeSad");
            window.open("resume.html", "_self");
        }
    }
}




renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
document.body.appendChild(renderer.domElement);

const texturey = new THREE.TextureLoader().load('texturours.png');
// texturey.wrapS = THREE.RepeatWrapping;
// texturey.wrapT = THREE.RepeatWrapping;
// texturey.repeat.set( 4, 4 );

texturey.wrapS = THREE.ClampToEdgeWrapping;
texturey.wrapT = THREE.ClampToEdgeWrapping;

const textureLoader = new THREE.TextureLoader();

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

const materialLambert = new THREE.MeshLambertMaterial({
    color: 0xff8c00, // Base color of the material (e.g., orange)
    emissive: 0x000000 // Color emitted by the material (black, no emission by default)
});

const materialDepth = new THREE.MeshDepthMaterial({
    depthWrite: true, // Whether to render the depth value to the depth buffer (default: true)
    depthTest: true,  // Whether to have depth testing enabled (default: true)
    opacity: 1,       // How opaque the material is (default: 1)
    transparent: false // Whether the material is transparent (default: false)
});

const glass = new THREE.MeshStandardMaterial({
    opacity: 0.5,       // How opaque the material is (default: 1)
    transparent: true,
    color: 0xffffff, // Base color
    metalness: 0.0,   // How metallic the surface is (0.0 = non-metal, 1.0 = metal)
    roughness: 0,   // How rough the surface is (0.0 = smooth/glossy, 1.0 = rough/matte)
    side: THREE.DoubleSide,
    // wireframe: true
});

const materialNormal = new THREE.MeshNormalMaterial({
    flatShading: false // Whether to use flat shading
    // No direct color properties like MeshPhongMaterial
});

// const materialMatcap = new THREE.MeshMatcapMaterial({
//     matcap: matcapTexture, // The loaded MatCap texture (replace matcapTexture with your loaded texture)
//     color: 0xffffff // Optional tint color
//     // normalMap: normalTexture, // Normal map for surface detail
//     // bumpMap: bumpTexture, // Bump map for surface detail
// });

const sphereMaterial = new THREE.MeshStandardMaterial({
    map: texturey, // Apply the texture
    color: 0xffffff, //optional, can be used to tint.
    metalness: 0.2,
    roughness: 0.7,
});

const shadowOverrideMaterial = new THREE.ShadowMaterial({
    opacity: 0.1 // Make the shadow cast by the transparent object darker
});

const cube = new THREE.Mesh(geometry, material);
const cubeS = new THREE.Mesh(geometry, glass);
const cubeC = new THREE.Mesh(geometry, materialComplex);
const floor = new THREE.Mesh(geometry, brown);
const cubeSad = new THREE.Mesh(geometry, materialNormal);



const sphere = new THREE.Mesh(new THREE.SphereGeometry(5000, 10, 10), ballMaterial);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.01);
const ambientLight = new THREE.AmbientLight(0x4040ff, 1);




directionalLight.castShadow = true;
cube.receiveShadow = true; //  the cube can get shadowssss
cube.castShadow = true; // the cube can cast shadows
cubeS.castShadow = true; // the cube can cast shadows
cubeS.receiveShadow = true;
cubeC.receiveShadow = true;
cubeC.castShadow = true;
floor.receiveShadow = true;
floor.castShadow = true; // the cube can cast shadows
cubeSad.receiveShadow = true;
cubeSad.castShadow = true; // the cube can cast shadows

directionalLight.shadow.mapSize.width = 1024 * 10; // Default is 512
directionalLight.shadow.mapSize.height = 1022 * 10;
ambientLight.intensity = 1;

cubeS.shadowMaterial = shadowOverrideMaterial;

loader.load("platform.glb", (gltf) => {
    const platform = gltf.scene;
    scene.add(platform);
    platform.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;

        }
    });

    platform.scale.set(5, 5, 5); // Scale to twice its original size in all dimensions
    platform.position.set(0, -3, 0); // Set the position of the platform
});

loader.load("T-2.13-other-MODEL.glb", (gltf) => {
    const platform = gltf.scene;
    scene.add(platform);
    platform.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;

        }
    });

    platform.scale.set(0.01, 0.01, 0.01); // Scale to twice its original size in all dimensions
    platform.position.set(0, -1.72, 0); // Set the position of the platform
    platform.rotation.set(0, -90, 0); // Set the rotation of the platform
});

const pointLight = new THREE.PointLight(0xffffff, 1, 100, 1);

// 2. Set the position of the light:
pointLight.position.set(0.3, -1.1, -0.3); // Example position in 3D space

const targetHelp = new THREE.Mesh(geometry, material);
targetHelp.scale.set(0.1, 0.1, 0.1); // Scale to twice its original size in all dimensions
targetHelp.position.set(-3, -2.3, 6); // Set the position of the platform
// 3. Add the light to the scene:
scene.add(pointLight);
// scene.add(targetHelp);
// =================================================
// 1. Create a SpotLight instance:
//    - The first argument is the color of the light (e.g., 0xffffff for white).
//    - The second argument is the intensity of the light (e.g., 1).
//    - The third argument (optional) is the distance the light travels before its intensity decays to 0.
//    - The fourth argument (optional) is the angle of the spotlight cone, in radians. Defaults to Math.PI / 3 (60 degrees).
//    - The fifth argument (optional) is the penumbra, a value between 0 and 1 that softens the edges of the cone. 0 is hard edges, 1 is very soft.
//    - The sixth argument (optional) is the decay factor of the light.
const spotLight = new THREE.SpotLight(0xffffff, 5, 100, Math.PI / 3, 0.2, 2);

// 2. Set the position of the light:
spotLight.position.set(-1.25, -1.5, 2.5); // Example position

// 3. Set the target of the spotlight (where it points):
//    The target is a separate object that the spotlight's 'target' property points to.
const spotLightTarget = new THREE.Object3D();
spotLightTarget.position.set(-3, -2.3, 6); // Example target position
scene.add(spotLightTarget);
spotLight.target = spotLightTarget;

// 4. Add the light to the scene:
scene.add(spotLight);



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
// scene.add(floor);
scene.add(directionalLight);
scene.add(ambientLight);
scene.add(sphere);
scene.add(cubeSad)

cube.position.set(-2, 0, 0); // Set the position of the cube
cubeS.position.set(0, 0, 2); // Set the position of the cube
cubeC.position.set(2, 0, 0); // Set the position of the cube
cubeSad.position.set(0, 0, -2); // Set the position of the cube
floor.position.set(0, -2, 0); // Set the position of the cube



directionalLight.position.set(1, 3, 1); // Set the direction of the light
ambientLight

camera.position.z = 5;

let switchty = false;

function animate() {
    renderer.render(scene, camera);
    cube.rotation.x += 0.015;
    cube.rotation.y += 0.015;
    cubeS.rotation.x -= 0.02;
    cubeS.rotation.y += 0.01;
    cubeC.rotation.x += 0.01;
    cubeC.rotation.y -= 0.02;
    floor.scale.set(10, 0.1, 10);
    cubeSad.rotation.x -= 0.01;
    cubeSad.rotation.y -= 0.01;
    // ambientLight.intensity += 0.01
    // directionalLight.intensity += 0.01
    // console.log(directionalLight.intensity)


    changeLightIntensity()

    function changeLightIntensity() {

        if (switchty) {
            directionalLight.intensity += 0.01;
        } else if (!switchty) {
            directionalLight.intensity -= 0.01;
        }
    }

    if (directionalLight.intensity >= 3) {
        switchty = false;
        return switchty;
    } else if (directionalLight.intensity <= 2) {
        switchty = true;
        return switchty;
    }
}


renderer.setAnimationLoop(animate);



