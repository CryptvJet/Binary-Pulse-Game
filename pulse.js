const pulses = [];

export function launchPulse(x, y, dx, dy, speed = 1, generation = 0) {
  pulses.push({ x, y, dx, dy, speed, generation });
}

export function updatePulse(delta, grid) {
  for (let i = pulses.length - 1; i >= 0; i--) {
    const p = pulses[i];
    let col = Math.floor(p.x);
    let row = Math.floor(p.y);
    let cellSpeed = p.speed;
    if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
      cellSpeed = p.speed - grid[row][col].density * 0.05;
    }
    p.x += p.dx * cellSpeed * delta;
    p.y += p.dy * cellSpeed * delta;

    col = Math.floor(p.x);
    row = Math.floor(p.y);

    if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
      const cell = grid[row][col];
      if (cell.isNull) {
        pulses.splice(i, 1);
        continue;
      }
      cell.value = cell.value === 0 ? 1 : 0;

      const neighbors = countOnNeighbors(grid, row, col);
      if (neighbors >= 3 && p.generation < 5) {
        const dirs = [
          { dx: 1, dy: 0 },
          { dx: -1, dy: 0 },
          { dx: 0, dy: 1 },
          { dx: 0, dy: -1 },
        ];
        const choice = dirs[Math.floor(Math.random() * dirs.length)];
        pulses.push({
          x: p.x,
          y: p.y,
          dx: choice.dx,
          dy: choice.dy,
          speed: p.speed,
          generation: p.generation + 1,
        });
      }
    } else {
      pulses.splice(i, 1);
    }
  }
}

export function getPulses() {
  return pulses;
}

function countOnNeighbors(grid, r, c) {
  let count = 0;
  for (let dr = -1; dr <= 1; dr++) {
    for (let dc = -1; dc <= 1; dc++) {
      if (dr === 0 && dc === 0) continue;
      const nr = r + dr;
      const nc = c + dc;
      if (
        nr >= 0 &&
        nr < grid.length &&
        nc >= 0 &&
        nc < grid[0].length &&
        grid[nr][nc].value === 1
      ) {
        count++;
      }
    }
  }
  return count;
}
