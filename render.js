// Import Three.js directly from the CDN so the game can run without a build step
import * as THREE from 'https://unpkg.com/three@0.154.0/build/three.module.js';
import { getPulses } from './pulse.js';

let renderer;
let scene;
let camera;
let cellMeshes = [];
let pulseMeshes = [];

export function initRenderer(canvas, grid) {
  renderer = new THREE.WebGLRenderer({ canvas });
  renderer.setSize(canvas.clientWidth, canvas.clientHeight);
  scene = new THREE.Scene();
  const aspect = canvas.clientWidth / canvas.clientHeight;
  camera = new THREE.PerspectiveCamera(70, aspect, 0.1, 1000);
  const depth = grid.length;
  const rows = grid[0].length;
  const cols = grid[0][0].length;
  camera.position.set(cols / 2, -rows * 1.5, depth * 2);
  camera.lookAt(cols / 2, -rows / 2, depth / 2);

  const geometry = new THREE.BoxGeometry(1, 1, 1);
  for (let z = 0; z < depth; z++) {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const material = new THREE.MeshBasicMaterial({ color: 0x222222 });
        const mesh = new THREE.Mesh(geometry, material);
        mesh.position.set(x, -y, z);
        scene.add(mesh);
        cellMeshes.push(mesh);
      }
    }
  }
}

export function renderGame(grid) {
  if (!renderer) return;
  const depth = grid.length;
  const rows = grid[0].length;
  const cols = grid[0][0].length;
  let i = 0;
  for (let z = 0; z < depth; z++) {
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const cell = grid[z][y][x];
        const mesh = cellMeshes[i++];
        if (!mesh) continue;
        if (cell.isNull) {
          mesh.material.color.set(0x000000);
        } else if (cell.value === 1) {
          mesh.material.color.set(0x00ff00);
        } else {
          mesh.material.color.set(0x222222);
        }
      }
    }
  }

  const pulses = getPulses();
  const sphereGeo = new THREE.SphereGeometry(0.3, 8, 8);
  for (i = 0; i < pulses.length; i++) {
    const p = pulses[i];
    let mesh = pulseMeshes[i];
    if (!mesh) {
      const mat = new THREE.MeshBasicMaterial({ color: p.color || '#ff0000' });
      mesh = new THREE.Mesh(sphereGeo, mat);
      pulseMeshes[i] = mesh;
      scene.add(mesh);
    }
    mesh.position.set(p.x, -p.y, p.z);
    mesh.material.color.set(p.color || '#ff0000');
  }
  while (pulseMeshes.length > pulses.length) {
    const m = pulseMeshes.pop();
    scene.remove(m);
  }

  renderer.render(scene, camera);
}
