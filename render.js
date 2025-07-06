import { getPulses } from './pulse.js';

export function renderGame(ctx, grid, cellSize = 40) {
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      ctx.fillStyle = grid[r][c] ? '#0f0' : '#222';
      ctx.fillRect(c * cellSize, r * cellSize, cellSize - 1, cellSize - 1);
    }
  }

  ctx.fillStyle = '#f00';
  for (const p of getPulses()) {
    ctx.beginPath();
    ctx.arc(
      p.x * cellSize + cellSize / 2,
      p.y * cellSize + cellSize / 2,
      cellSize / 4,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }
}
