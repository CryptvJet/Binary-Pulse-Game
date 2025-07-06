import { initializeGrid } from './grid.js';
import { launchPulse, updatePulse } from './pulse.js';
import { renderGame } from './render.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const GRID_ROWS = 10;
const GRID_COLS = 10;
const grid = initializeGrid(GRID_ROWS, GRID_COLS);

let lastTime = 0;

function loop(timestamp) {
  const delta = (timestamp - lastTime) / 1000;
  lastTime = timestamp;

  updatePulse(delta, grid);
  renderGame(ctx, grid);

  requestAnimationFrame(loop);
}

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const cellWidth = canvas.width / GRID_COLS;
  const cellHeight = canvas.height / GRID_ROWS;
  const x = Math.floor((e.clientX - rect.left) / cellWidth);
  const y = Math.floor((e.clientY - rect.top) / cellHeight);
  launchPulse(x, y, 1, 0);
});

requestAnimationFrame(loop);
