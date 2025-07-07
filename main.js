import { initializeGrid } from './grid.js';
import { launchPulse, updatePulse, getPulses } from './pulse.js';
import { initRenderer, renderGame } from './render.js';
import { applyBrush } from './brush.js';

const canvas = document.getElementById('game-canvas');

let cellSize = 20; // desired pixel size per cell
let GRID_COLS;
let GRID_ROWS;
const GRID_DEPTH = 5;
let grid;

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  GRID_COLS = Math.floor(canvas.width / cellSize);
  GRID_ROWS = Math.floor(canvas.height / cellSize);

  grid = initializeGrid(GRID_DEPTH, GRID_ROWS, GRID_COLS);
  initRenderer(canvas, grid);
}

window.addEventListener('resize', resizeCanvas);
resizeCanvas();

let lastTime = 0;

let pendingPulse = null;
let pendingTimeout = null;
let selectedCell = null;
let autoInterval = null;
const debugDiv = document.getElementById('debug');
const autoBtn = document.getElementById('auto-btn');
const zoomRange = document.getElementById('zoom-range');
const aboutBtn = document.getElementById('about-btn');
const directionsBtn = document.getElementById('directions-btn');
const aboutPanel = document.getElementById('about-panel');
const directionsPanel = document.getElementById('directions-panel');
const overlay = document.getElementById('overlay');
const brushColorInput = document.getElementById('brush-color');
let brushColor = brushColorInput?.value || '#00ff00';
let isPainting = false;
let modifiedCells = [];
let rapidInterval = null;
let rapidCell = null;
let currentDir = { dx: 1, dy: 0 };

function openPanel(panel) {
  panel.classList.add('open');
  overlay.style.display = 'block';
}

function closePanels() {
  aboutPanel.classList.remove('open');
  directionsPanel.classList.remove('open');
  overlay.style.display = 'none';
}

aboutBtn.addEventListener('click', () => openPanel(aboutPanel));
directionsBtn.addEventListener('click', () => openPanel(directionsPanel));
overlay.addEventListener('click', closePanels);
document.querySelectorAll('.panel .close-btn').forEach(btn =>
  btn.addEventListener('click', closePanels)
);

function getCellFromEvent(e) {
  const rect = canvas.getBoundingClientRect();
  const cellWidth = canvas.width / GRID_COLS;
  const cellHeight = canvas.height / GRID_ROWS;
  const x = Math.floor((e.clientX - rect.left) / cellWidth);
  const y = Math.floor((e.clientY - rect.top) / cellHeight);
  const z = Math.floor(GRID_DEPTH / 2);
  return { x, y, z };
}

function paintCell(e) {
  const { x, y, z } = getCellFromEvent(e);
  brushColor = brushColorInput.value;
  const changed = applyBrush(grid, x, y, z, 0);
  modifiedCells.push(...changed);
}

canvas.addEventListener('mousedown', (e) => {
  if (e.button === 0) {
    isPainting = true;
    paintCell(e);
  }
  if (e.button === 1 && !rapidInterval) {
    rapidCell = getCellFromEvent(e);
    rapidInterval = setInterval(() => {
      launchPulse(
        rapidCell.x,
        rapidCell.y,
        rapidCell.z,
        currentDir.dx,
        currentDir.dy,
        10,
        0,
        brushColor
      );
    }, 100);
  }
});

canvas.addEventListener('mousemove', (e) => {
  if (isPainting) {
    paintCell(e);
  }
  if (rapidInterval) {
    rapidCell = getCellFromEvent(e);
  }
});

window.addEventListener('mouseup', () => {
  isPainting = false;
  if (rapidInterval) {
    clearInterval(rapidInterval);
    rapidInterval = null;
  }
});

function loop(timestamp) {
  const FRAME_TIME = 1000 / 60;
  const delta = (timestamp - lastTime) / FRAME_TIME;
  lastTime = timestamp;

  updatePulse(delta, grid[Math.floor(GRID_DEPTH / 2)]);
  renderGame(grid);
  modifiedCells = [];
  updateDebug();

  requestAnimationFrame(loop);
}

canvas.addEventListener('click', (e) => {
  if (isPainting) return;
  const rect = canvas.getBoundingClientRect();
  const cellWidth = canvas.width / GRID_COLS;
  const cellHeight = canvas.height / GRID_ROWS;
  const x = Math.floor((e.clientX - rect.left) / cellWidth);
  const y = Math.floor((e.clientY - rect.top) / cellHeight);
  const z = Math.floor(GRID_DEPTH / 2);
  pendingPulse = { x, y, z, dx: 1, dy: 0, dz: 0 };
  selectedCell = { x, y, z };
  clearTimeout(pendingTimeout);
  pendingTimeout = setTimeout(() => {
    if (pendingPulse) {
      launchPulse(x, y, z, 1, 0, 10, 0, brushColor);
      pendingPulse = null;
    }
  }, 500);
});

canvas.addEventListener('contextmenu', (e) => {
  e.preventDefault();
  const rect = canvas.getBoundingClientRect();
  const cellWidth = canvas.width / GRID_COLS;
  const cellHeight = canvas.height / GRID_ROWS;
  const x = Math.floor((e.clientX - rect.left) / cellWidth);
  const y = Math.floor((e.clientY - rect.top) / cellHeight);
  const z = Math.floor(GRID_DEPTH / 2);
  const cell = grid[z][y][x];
  cell.isNull = !cell.isNull;
});

window.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    if (aboutPanel.classList.contains('open') || directionsPanel.classList.contains('open')) {
      closePanels();
      return;
    }
  }
  if (pendingPulse) {
    const dir = getDirectionFromKey(e.key);
    if (dir) {
      currentDir = dir;
      launchPulse(
        pendingPulse.x,
        pendingPulse.y,
        pendingPulse.z,
        dir.dx,
        dir.dy,
        10,
        0,
        brushColor
      );
      pendingPulse = null;
      clearTimeout(pendingTimeout);
      return;
    }
  }
  if (selectedCell) {
    if (e.key >= '0' && e.key <= '9') {
      grid[selectedCell.z][selectedCell.y][selectedCell.x].density = parseInt(e.key, 10);
    }
  }
});

autoBtn.addEventListener('click', () => {
  if (autoInterval) {
    clearInterval(autoInterval);
    autoInterval = null;
    autoBtn.textContent = 'Auto Mode';
  } else {
    autoInterval = setInterval(() => {
      const x = Math.floor(Math.random() * GRID_COLS);
      const y = Math.floor(Math.random() * GRID_ROWS);
      const dirs = [
        { dx: 1, dy: 0 },
        { dx: -1, dy: 0 },
        { dx: 0, dy: 1 },
        { dx: 0, dy: -1 },
      ];
      const d = dirs[Math.floor(Math.random() * dirs.length)];
      launchPulse(x, y, Math.floor(GRID_DEPTH / 2), d.dx, d.dy);
    }, 250);
    autoBtn.textContent = 'Pause Auto';
  }
});

zoomRange.addEventListener('input', () => {
  cellSize = parseInt(zoomRange.value, 10);
  resizeCanvas();
  renderGame(grid);
  updateDebug();
});

function getDirectionFromKey(key) {
  switch (key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      return { dx: 0, dy: -1 };
    case 'ArrowDown':
    case 's':
    case 'S':
      return { dx: 0, dy: 1 };
    case 'ArrowLeft':
    case 'a':
    case 'A':
      return { dx: -1, dy: 0 };
    case 'ArrowRight':
    case 'd':
    case 'D':
      return { dx: 1, dy: 0 };
    case 'q':
    case 'Q':
      return { dx: 0, dy: 0, dz: -1 };
    case 'e':
    case 'E':
      return { dx: 0, dy: 0, dz: 1 };
  }
  return null;
}

requestAnimationFrame(loop);

function updateDebug() {
  let ones = 0;
  let nulls = 0;
  let densitySum = 0;
  for (const plane of grid) {
    for (const row of plane) {
      for (const cell of row) {
        if (cell.value === 1) ones++;
        if (cell.isNull) nulls++;
        densitySum += cell.density;
      }
    }
  }
  const avgDensity = densitySum / (GRID_DEPTH * GRID_ROWS * GRID_COLS);
  debugDiv.textContent =
    `Pulses: ${getPulses().length}\n` +
    `Ones: ${ones}\n` +
    `Null Wells: ${nulls}\n` +
    `Avg Density: ${avgDensity.toFixed(2)}`;
}
