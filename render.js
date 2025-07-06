import { getPulses } from './pulse.js';

export function renderGame(ctx, grid, options = {}) {
  const { cellSize = 40, pending } = options;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const cell = grid[r][c];
      if (cell.isNull) {
        ctx.fillStyle = '#000';
        ctx.fillRect(c * cellSize, r * cellSize, cellSize - 1, cellSize - 1);
        ctx.strokeStyle = '#555';
        ctx.strokeRect(c * cellSize, r * cellSize, cellSize - 1, cellSize - 1);
        continue;
      }
      const intensity = 50 + cell.density * 20;
      if (cell.value === 1) {
        ctx.fillStyle = `rgb(0, ${intensity}, 0)`;
      } else {
        ctx.fillStyle = '#222';
      }
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

  if (pending) {
    ctx.strokeStyle = '#fff';
    ctx.beginPath();
    const x = pending.x * cellSize + cellSize / 2;
    const y = pending.y * cellSize + cellSize / 2;
    ctx.moveTo(x, y);
    ctx.lineTo(x + pending.dx * cellSize / 2, y + pending.dy * cellSize / 2);
    ctx.stroke();
  }
}
