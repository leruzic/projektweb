// main.js
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

let modelRoot = null;
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 100);
camera.position.z = 5;

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const hemLight = new THREE.HemisphereLight(0xffffff, 0x444444);
scene.add(hemLight);

// Grupe kostiju
const boneGroups = {
  lowerTorso: ['mixamorigHips'],
  upperTorso: ['mixamorigSpine', 'mixamorigSpine1', 'mixamorigSpine2'],
  leftThigh: ['mixamorigLeftUpLeg'],
  leftShin: ['mixamorigLeftLeg'],
  leftFoot: ['mixamorigLeftFoot'],
  rightThigh: ['mixamorigRightUpLeg'],
  rightShin: ['mixamorigRightLeg'],
  rightFoot: ['mixamorigRightFoot'],
  leftUpperArm: ['mixamorigLeftArm'],
  leftForearm: ['mixamorigLeftForeArm'],
  leftHand: ['mixamorigLeftHand'],
  rightUpperArm: ['mixamorigRightArm'],
  rightForearm: ['mixamorigRightForeArm'],
  rightHand: ['mixamorigRightHand'],
  head: ['mixamorigNeck', 'mixamorigHead']
};

const gltfLoader = new GLTFLoader();
gltfLoader.load('Model.glb', (gltf) => {
  modelRoot = gltf.scene;
  scene.add(modelRoot);

  modelRoot.traverse((object) => {
    if (object.isBone) {
      console.log('Bone:', object.name);
    }
  });

  initSliders();
});

function initSliders() {
  // Desna potkoljenica (mixamorigLeftLeg)
  const leftLegSlider = document.getElementById('leftLegSlider');
  const leftLegBone = modelRoot.getObjectByName('mixamorigLeftLeg');

  leftLegBone.rotation.order = 'YXZ';
  leftLegSlider.addEventListener('input', () => {
    const degrees = parseFloat(leftLegSlider.value);
    const radians = THREE.MathUtils.degToRad(degrees);
    leftLegBone.rotation.x = radians;
  });

  const leftLegYSlider = document.getElementById('leftLegYSlider');
  leftLegBone.rotation.order = 'YXZ';
  leftLegYSlider.addEventListener('input', () => {
    const degrees = parseFloat(leftLegYSlider.value);
    const radians = THREE.MathUtils.degToRad(degrees);
    leftLegBone.rotation.y = radians;
  });

  // Desna natkoljenica (mixamorigLeftUpLeg)
  const leftUpLegSlider = document.getElementById('leftUpLegSlider');
  const leftUpLegYSlider = document.getElementById('leftUpLegYSlider');
  const leftUpLegBone = modelRoot.getObjectByName('mixamorigLeftUpLeg');

  leftUpLegBone.rotation.order = 'YXZ';

  leftUpLegSlider.addEventListener('input', () => {
    const degrees = parseFloat(leftUpLegSlider.value);
    const radians = THREE.MathUtils.degToRad(degrees);
    leftUpLegBone.rotation.x = radians;
  });

  leftUpLegYSlider.addEventListener('input', () => {
    const degrees = parseFloat(leftUpLegYSlider.value);
    const radians = THREE.MathUtils.degToRad(degrees);
    leftUpLegBone.rotation.y = radians;
  });

  // Lijeva potkoljenica
  const rightLegSlider = document.getElementById('rightLegSlider');
  const rightLegBone = modelRoot.getObjectByName('mixamorigRightLeg');

  rightLegBone.rotation.order = 'YXZ';
  rightLegSlider.addEventListener('input', () => {
    const degrees = parseFloat(rightLegSlider.value);
    const radians = THREE.MathUtils.degToRad(degrees);
    rightLegBone.rotation.x = radians;
  });

  const rightLegYSlider = document.getElementById('rightLegYSlider');
  rightLegYSlider.addEventListener('input', () => {
    const degrees = parseFloat(rightLegYSlider.value);
    const radians = THREE.MathUtils.degToRad(degrees);
    rightLegBone.rotation.y = radians;
  });

  // Lijeva natkoljenica (mixamorigRightUpLeg)
  const rightUpLegSlider = document.getElementById('rightUpLegSlider');
  const rightUpLegYSlider = document.getElementById('rightUpLegYSlider');
  const rightUpLegBone = modelRoot.getObjectByName('mixamorigRightUpLeg');
  rightUpLegBone.rotation.order = 'YXZ';

  rightUpLegSlider.addEventListener('input', () => {
    const degrees = parseFloat(rightUpLegSlider.value);
    const radians = THREE.MathUtils.degToRad(degrees);
    rightUpLegBone.rotation.x = radians;
  });

  rightUpLegYSlider.addEventListener('input', () => {
    const degrees = parseFloat(rightUpLegYSlider.value);
    const radians = THREE.MathUtils.degToRad(degrees);
    rightUpLegBone.rotation.y = radians;
  });

  // Glava i vrat (head grupa)
  const headSlider = document.getElementById('headSlider');
  const headBones = ['mixamorigNeck', 'mixamorigHead']
    .map(name => modelRoot.getObjectByName(name))
    .filter(bone => bone); // filtriraj ako koji nedostaje

  headSlider.addEventListener('input', () => {
    const degrees = parseFloat(headSlider.value);
    const radians = THREE.MathUtils.degToRad(degrees);
    headBones.forEach(bone => {
      bone.rotation.x = radians;
    });
  });

  const upperTorsoSlider = document.getElementById('upperTorsoSlider');
  const upperTorsoBones = ['mixamorigSpine', 'mixamorigSpine1', 'mixamorigSpine2']
    .map(name => modelRoot.getObjectByName(name))
    .filter(bone => bone);

  upperTorsoSlider.addEventListener('input', () => {
    const degrees = parseFloat(upperTorsoSlider.value);
    const radians = THREE.MathUtils.degToRad(degrees);
    upperTorsoBones.forEach(bone => {
      bone.rotation.x = radians;
    });
  });

  const upperTorsoYSlider = document.getElementById('upperTorsoYSlider');
  upperTorsoYSlider.addEventListener('input', () => {
    const degrees = parseFloat(upperTorsoYSlider.value);
    const radians = THREE.MathUtils.degToRad(degrees);
    upperTorsoBones.forEach(bone => {
      if (bone) bone.rotation.y = radians;
    });
  });

  // Lijeva nadlaktica
  const leftUpperArmSlider = document.getElementById('leftUpperArmSlider');
  const leftUpperArmYSlider = document.getElementById('leftUpperArmYSlider');
  const leftUpperArmBone = modelRoot.getObjectByName('mixamorigLeftArm');
  leftUpperArmBone.rotation.order = 'YXZ';

  leftUpperArmSlider.addEventListener('input', () => {
    leftUpperArmBone.rotation.x = THREE.MathUtils.degToRad(leftUpperArmSlider.value);
  });

  leftUpperArmYSlider.addEventListener('input', () => {
    leftUpperArmBone.rotation.y = THREE.MathUtils.degToRad(leftUpperArmYSlider.value);
  });

  // Lijeva podlaktica
  const leftForeArmSlider = document.getElementById('leftForeArmSlider');
  const leftForeArmYSlider = document.getElementById('leftForeArmYSlider');
  const leftForeArmBone = modelRoot.getObjectByName('mixamorigLeftForeArm');
  leftForeArmBone.rotation.order = 'YXZ';

  leftForeArmSlider.addEventListener('input', () => {
    leftForeArmBone.rotation.x = THREE.MathUtils.degToRad(leftForeArmSlider.value);
  });

  leftForeArmYSlider.addEventListener('input', () => {
    leftForeArmBone.rotation.y = THREE.MathUtils.degToRad(leftForeArmYSlider.value);
  });

  // Desna nadlaktica
  const rightUpperArmSlider = document.getElementById('rightUpperArmSlider');
  const rightUpperArmYSlider = document.getElementById('rightUpperArmYSlider');
  const rightUpperArmBone = modelRoot.getObjectByName('mixamorigRightArm');
  rightUpperArmBone.rotation.order = 'YXZ';

  rightUpperArmSlider.addEventListener('input', () => {
    rightUpperArmBone.rotation.x = THREE.MathUtils.degToRad(rightUpperArmSlider.value);
  });

  rightUpperArmYSlider.addEventListener('input', () => {
    rightUpperArmBone.rotation.y = THREE.MathUtils.degToRad(rightUpperArmYSlider.value);
  });

  // Desna podlaktica
  const rightForeArmSlider = document.getElementById('rightForeArmSlider');
  const rightForeArmYSlider = document.getElementById('rightForeArmYSlider');
  const rightForeArmBone = modelRoot.getObjectByName('mixamorigRightForeArm');
  rightForeArmBone.rotation.order = 'YXZ';

  rightForeArmSlider.addEventListener('input', () => {
    rightForeArmBone.rotation.x = THREE.MathUtils.degToRad(rightForeArmSlider.value);
  });

  rightForeArmYSlider.addEventListener('input', () => {
    rightForeArmBone.rotation.y = THREE.MathUtils.degToRad(rightForeArmYSlider.value);
  });

  // Lijeva šaka
  const leftHandSlider = document.getElementById('leftHandSlider');
  const leftHandYSlider = document.getElementById('leftHandYSlider');
  const leftHandBone = modelRoot.getObjectByName('mixamorigLeftHand');
  leftHandBone.rotation.order = 'YXZ';

  leftHandSlider.addEventListener('input', () => {
    const radians = THREE.MathUtils.degToRad(leftHandSlider.value);
    leftHandBone.rotation.x = radians;
  });

  leftHandYSlider.addEventListener('input', () => {
    const radians = THREE.MathUtils.degToRad(leftHandYSlider.value);
    leftHandBone.rotation.y = radians;
  });

  // Desna šaka
  const rightHandSlider = document.getElementById('rightHandSlider');
  const rightHandYSlider = document.getElementById('rightHandYSlider');
  const rightHandBone = modelRoot.getObjectByName('mixamorigRightHand');
  rightHandBone.rotation.order = 'YXZ';

  rightHandSlider.addEventListener('input', () => {
    const radians = THREE.MathUtils.degToRad(rightHandSlider.value);
    rightHandBone.rotation.x = radians;
  });

  rightHandYSlider.addEventListener('input', () => {
    const radians = THREE.MathUtils.degToRad(rightHandYSlider.value);
    rightHandBone.rotation.y = radians;
  });

  // Lijevo stopalo
  const leftFootSlider = document.getElementById('leftFootSlider');
  const leftFootYSlider = document.getElementById('leftFootYSlider');
  const leftFootBone = modelRoot.getObjectByName('mixamorigLeftFoot');
  leftFootBone.rotation.order = 'YXZ';

  leftFootSlider.addEventListener('input', () => {
    const radians = THREE.MathUtils.degToRad(leftFootSlider.value);
    leftFootBone.rotation.x = radians;
  });

  leftFootYSlider.addEventListener('input', () => {
    const radians = THREE.MathUtils.degToRad(leftFootYSlider.value);
    leftFootBone.rotation.y = radians;
  });

  // Desno stopalo
  const rightFootSlider = document.getElementById('rightFootSlider');
  const rightFootYSlider = document.getElementById('rightFootYSlider');
  const rightFootBone = modelRoot.getObjectByName('mixamorigRightFoot');
  rightFootBone.rotation.order = 'YXZ';

  rightFootSlider.addEventListener('input', () => {
    const radians = THREE.MathUtils.degToRad(rightFootSlider.value);
    rightFootBone.rotation.x = radians;
  });

  rightFootYSlider.addEventListener('input', () => {
    const radians = THREE.MathUtils.degToRad(rightFootYSlider.value);
    rightFootBone.rotation.y = radians;
  });

  // Lijevi prsti (mixamorigLeftToeBase)
  const leftToesSlider = document.getElementById('leftToesSlider');
  const leftToesBone = modelRoot.getObjectByName('mixamorigLeftToeBase');
  leftToesBone.rotation.order = 'YXZ';

  leftToesSlider.addEventListener('input', () => {
    const radians = THREE.MathUtils.degToRad(leftToesSlider.value);
    leftToesBone.rotation.x = radians;
  });

  // Desni prsti (mixamorigRightToeBase)
  const rightToesSlider = document.getElementById('rightToesSlider');
  const rightToesBone = modelRoot.getObjectByName('mixamorigRightToeBase');
  rightToesBone.rotation.order = 'YXZ';

  rightToesSlider.addEventListener('input', () => {
    const radians = THREE.MathUtils.degToRad(rightToesSlider.value);
    rightToesBone.rotation.x = radians;
  });

}

// ANIMACIJA
function animate() {
  requestAnimationFrame(animate);
  controls.update();
  renderer.render(scene, camera);
}
animate();

// ========== DODANO: Silueta i slideri ==========

// Prikaži sve slidere na klik gumba "Prikaži sve"
document.getElementById('showAllBtn').addEventListener('click', function() {
  document.querySelectorAll('.slider-label, .slider-input').forEach(el => {
    el.style.display = '';
  });
});

// Klik na dio tijela prikazuje samo odgovarajuće slidere
document.querySelectorAll('.body-part').forEach(button => {
  button.addEventListener('click', () => {
    const part = button.getAttribute('data-part');
    // Sakrij sve slidere i labele
    document.querySelectorAll('.slider-label, .slider-input').forEach(el => {
      el.style.display = 'none';
    });
    // Prikaži samo one koji imaju isti data-part
    document.querySelectorAll(`[data-part="${part}"]`).forEach(el => {
      el.style.display = '';
    });
  });
});
