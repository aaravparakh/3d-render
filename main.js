// Import Three.js and GLTFLoader
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

// Create the scene
const scene = new THREE.Scene();

// Set up the camera
const camera = new THREE.PerspectiveCamera(
    75, // Field of view
    window.innerWidth / window.innerHeight, // Aspect ratio
    0.1, // Near clipping plane
    1000 // Far clipping plane
);
camera.position.z = 5;

// Create the renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Add lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Soft white light
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5); // Directional light
directionalLight.position.set(5, 10, 7.5);
scene.add(directionalLight);

// Load the 3D Human Model
const loader = new GLTFLoader();
loader.load(
    'models/human.glb', // Replace with your 3D model path
    (gltf) => {
        const model = gltf.scene; // Get the 3D model
        model.scale.set(1, 1, 1); // Scale the model
        scene.add(model); // Add the model to the scene

        // Optional: Animate the model
        animateModel(model);
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded'); // Progress
    },
    (error) => {
        console.error('An error occurred while loading the model:', error);
    }
);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}
animate();

// Handle window resizing
window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

// Optional: Animate the model
function animateModel(model) {
    model.rotation.y = 0;
    function rotate() {
        requestAnimationFrame(rotate);
        model.rotation.y += 0.01; // Rotate the model around the Y-axis
    }
    rotate();
}
