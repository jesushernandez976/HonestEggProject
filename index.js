import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { OrbitControls } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/controls/OrbitControls.js';
import { DRACOLoader } from 'https://cdn.jsdelivr.net/npm/three@0.132.2/examples/jsm/loaders/DRACOLoader.js';
import { TextureLoader } from 'three';
import { gsap } from "https://cdn.skypack.dev/gsap@3.9.1";

let scene, camera, renderer, mixer;

scene = new THREE.Scene();

camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);


camera.position.z = .5;
camera.position.y = .3;

camera.position.set(0, 0, 1.4);

gsap.to(camera.position, {
    duration: 2,     // 2 seconds animation
    y: 0.3,
    z: 0.5,
    ease: 'power2.out',
    onUpdate: () => {
        camera.lookAt(0, 0, 0);  // Keep camera looking at the center during animation
    },
    onComplete: () => {
        camera.lookAt(0, 0, 0);  // Final lookAt to keep camera steady
    }
});

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
controls.minDistance = .5; // how close the camera can get
controls.maxDistance = 1; // how far the camera can zoom out
controls.enablePan = false;

controls.minPolarAngle = Math.PI / 2;   // Minimum angle (60°)
controls.maxPolarAngle = Math.PI / 2; // Maximum angle (~100°)

// Horizontal rotation limits (left/right)
controls.minAzimuthAngle = -Math.PI / 2; // Left limit (-45°)
controls.maxAzimuthAngle = Math.PI / 4;  // Right limit (45°)

const loaderTexture = new TextureLoader();

function updateSceneBackground() {
    const hour = new Date().getHours();
    const isDayTime = hour >= 6 && hour < 19;

    const texturePath = isDayTime
        ? './assets/farm2.jpg'       // Day
        : './assets/farm3.jpg'; // Night

    loaderTexture.load(texturePath, function (texture) {
        scene.background = texture;
    });

    ambientLight.color.setHex(isDayTime ? 0xffffff : 0x000000);

}

updateSceneBackground();


const eggPoints = [];
for (let i = 0; i < 50; i++) {
    const t = i / 50;
    const x = Math.sin(Math.PI * t) * 0.5;
    const y = t * 1.5 - 0.75;
    eggPoints.push(new THREE.Vector2(x, y));
}

const eggs = []; // store eggs globally

const eggGeometry = new THREE.LatheGeometry(eggPoints, 64);
const eggMaterial = new THREE.MeshStandardMaterial({ color: 0xfff1c1, roughness: 0.6 });

// Create multiple eggs
for (let i = 0; i < 40; i++) {
    const egg = new THREE.Mesh(eggGeometry, eggMaterial);

    // Scale and position
    egg.scale.set(0.02, 0.02, 0.02);
    egg.position.set(-0.22 + Math.random() * .25, -0.2, Math.random() * -0.1); // slight spread

    // Random rotation
    egg.rotation.y = Math.random() * Math.PI * 2;
    egg.rotation.x = Math.random() * 0.5 - 0.25;
    egg.rotation.z = Math.random() * 0.5 - 0.25;

    egg.visible = false; // initially hidden
    scene.add(egg);
    eggs.push(egg);
}



// Load GLTF model
const loader = new GLTFLoader();

const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('https://cdn.jsdelivr.net/npm/three@0.132.2/examples/js/libs/draco/');

loader.setDRACOLoader(dracoLoader);

let chickenModel;
let grassModel;

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
        grassModel.scale.set(.2, .3, .2);    // Adjust scale as needed
        scene.add(grassModel);
    },
    undefined,
    function (error) {
        console.error('Error loading grassopt.glb:', error);
    }
);

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

let revealedEggs = 0;

function handleTap(event) {
  event.preventDefault();

  const touch = event.touches ? event.touches[0] : event;
  mouse.x = (touch.clientX / window.innerWidth) * 2 - 1;
  mouse.y = -(touch.clientY / window.innerHeight) * 2 + 1;

  raycaster.setFromCamera(mouse, camera);

  if (chickenModel) {
    const intersects = raycaster.intersectObject(chickenModel, true);
    if (intersects.length > 0) {
      revealEggsOneByOne();
    }
  }
}


window.addEventListener('click', handleTap);         // Desktop
window.addEventListener('touchstart', handleTap);    // Mobile


function revealEggsOneByOne() {
    if (revealedEggs >= eggs.length) return;

    const interval = setInterval(() => {
        if (revealedEggs >= eggs.length) {
            clearInterval(interval);
            return;
        }
        eggs[revealedEggs].visible = true;
        revealedEggs++;
    }, 100); // one egg every 100ms (adjust as needed)
}


// window.addEventListener('mousemove', (event) => {
//     // Convert to normalized device coordinates (-1 to +1)
//     mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
//     mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;
// });


// Animation loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    const delta = clock.getDelta();
    if (mixer) mixer.update(delta);
    // if (chickenModel) {
    //     chickenModel.rotation.y = mouse.x * ; // rotate left/right
    //     chickenModel.rotation.x = mouse.y * 0.3; // rotate up/down (optional)
    // }

    renderer.render(scene, camera);
}
animate();

// Responsive resizing
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
