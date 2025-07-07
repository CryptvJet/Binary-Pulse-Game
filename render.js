import { getPulses } from './pulse.js';

export function renderGame(ctx, grid, options = {}) {
  const { pending, modified = [], brushColor = '#00ff00' } = options;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  const cellWidth = ctx.canvas.width / grid[0].length;
  const cellHeight = ctx.canvas.height / grid.length;
  const cellSize = Math.min(cellWidth, cellHeight);

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[r].length; c++) {
      const cell = grid[r][c];
      const x = c * cellWidth;
      const y = r * cellHeight;
      if (cell.isNull) {
        ctx.fillStyle = '#000';
        ctx.fillRect(x, y, cellWidth - 1, cellHeight - 1);
        ctx.strokeStyle = '#555';
        ctx.strokeRect(x, y, cellWidth - 1, cellHeight - 1);
        continue;
      }
      const intensity = 50 + cell.density * 20;
      if (cell.value === 1) {
        ctx.fillStyle = `rgb(0, ${intensity}, 0)`;
      } else {
        ctx.fillStyle = '#222';
      }
      ctx.fillRect(x, y, cellWidth - 1, cellHeight - 1);
    }
  }

  if (modified.length) {
    ctx.fillStyle = brushColor;
    for (const m of modified) {
      const mx = m.x * cellWidth;
      const my = m.y * cellHeight;
      ctx.fillRect(mx, my, cellWidth - 1, cellHeight - 1);
    }
  }

  for (const p of getPulses()) {
    ctx.fillStyle = p.color || '#f00';
    ctx.beginPath();
    ctx.arc(
      p.x * cellWidth + cellWidth / 2,
      p.y * cellHeight + cellHeight / 2,
      cellSize / 4,
      0,
      Math.PI * 2
    );
    ctx.fill();
  }

  if (pending) {
    ctx.strokeStyle = '#fff';
    ctx.beginPath();
    const x = pending.x * cellWidth + cellWidth / 2;
    const y = pending.y * cellHeight + cellHeight / 2;
    ctx.moveTo(x, y);
    ctx.lineTo(x + pending.dx * cellWidth / 2, y + pending.dy * cellHeight / 2);
    ctx.stroke();
  }
}
