import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/loaders/DRACOLoader.js';
import { TextureLoader } from 'three';


let scene, camera, renderer, mixer;

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const loaderTexture = new TextureLoader();
loaderTexture.load('./assets/farm.jpg', function(texture) {
  scene.background = texture;
});

camera.position.z = .5;
camera.position.y = .1;

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add ambient light and directional light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // smooth camera movement
controls.dampingFactor = 0.05;

controls.minPolarAngle = Math.PI / 2;   // Minimum angle (60°)
controls.maxPolarAngle = Math.PI / 2; // Maximum angle (~100°)

// Horizontal rotation limits (left/right)
controls.minAzimuthAngle = -Math.PI / 2; // Left limit (-45°)
controls.maxAzimuthAngle = Math.PI / 4;  // Right limit (45°)

// Load GLTF model
const loader = new GLTFLoader();

const dracoLoader = new DRACOLoader();
// Path to Draco decoder files (you can use CDN or local)
// Here using CDN from jsdelivr:
dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.132.2/examples/js/libs/draco/');

loader.setDRACOLoader(dracoLoader);

let chickenModel;  // Store chicken model reference
let grassModel;    // Store grass model reference

// Load chicken model
loader.load(
    './assets/chicken_rig.glb',
    function (gltf) {
        chickenModel = gltf.scene;
        chickenModel.position.set(0, -0.2, 0);
        chickenModel.rotation.y = Math.PI / 2.5;
        scene.add(chickenModel);

        if (gltf.animations && gltf.animations.length) {
            mixer = new THREE.AnimationMixer(chickenModel);
            gltf.animations.forEach((clip) => {
                mixer.clipAction(clip).play();
            });
        }
    },
    undefined,
    function (error) {
        console.error('Error loading chicken_rig.glb:', error);
    }
);

// Load grass model
loader.load(
    './assets/grassopt.glb',
    function (gltf) {
        grassModel = gltf.scene;
        grassModel.position.set(0, -.21, 0); // Adjust position as needed
        grassModel.scale.set(.2, .2, .2);    // Adjust scale as needed
        scene.add(grassModel);
    },
    undefined,
    function (error) {
        console.error('Error loading grassopt.glb:', error);
    }
);



// Animation loop
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    renderer.render(scene, camera);
}
animate();

// Responsive resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
