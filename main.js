import { initializeGrid } from './grid.js';
import { renderGame } from './render.js';
import { toggleCell } from './pulse.js';

const canvas = document.getElementById('game-canvas');
const ctx = canvas.getContext('2d');

const ROWS = 10;
const COLS = 10;
const CELL_SIZE = 40;

canvas.width = COLS * CELL_SIZE;
canvas.height = ROWS * CELL_SIZE;

const grid = initializeGrid(ROWS, COLS);

canvas.addEventListener('click', (e) => {
  const rect = canvas.getBoundingClientRect();
  const x = Math.floor((e.clientX - rect.left) / CELL_SIZE);
  const y = Math.floor((e.clientY - rect.top) / CELL_SIZE);
  toggleCell(grid, x, y);
});

function loop() {
  renderGame(ctx, grid, CELL_SIZE);
  requestAnimationFrame(loop);
}

loop();
