const pulses = [];

export function launchPulse(
  x,
  y,
  z,
  dx,
  dy,
  dz,
  speed = 10,
  generation = 0,
  color = '#f00'
) {
  pulses.push({ x, y, z, dx, dy, dz, speed, generation, color });
}

export function updatePulse(delta, grid) {
  for (let i = pulses.length - 1; i >= 0; i--) {
    const p = pulses[i];
    let col = Math.floor(p.x);
    let row = Math.floor(p.y);
    let depth = Math.floor(p.z);
    let cellSpeed = p.speed;
    if (
      depth >= 0 &&
      depth < grid.length &&
      row >= 0 &&
      row < grid[0].length &&
      col >= 0 &&
      col < grid[0][0].length
    ) {
      cellSpeed = p.speed - grid[depth][row][col].density * 0.05;
    }
    p.x += p.dx * cellSpeed * delta;
    p.y += p.dy * cellSpeed * delta;
    p.z += p.dz * cellSpeed * delta;

    col = Math.floor(p.x);
    row = Math.floor(p.y);
    depth = Math.floor(p.z);

    if (
      depth >= 0 &&
      depth < grid.length &&
      row >= 0 &&
      row < grid[0].length &&
      col >= 0 &&
      col < grid[0][0].length
    ) {
      const cell = grid[depth][row][col];
      if (cell.isNull) {
        pulses.splice(i, 1);
        continue;
      }
      cell.value = cell.value === 0 ? 1 : 0;

      const neighbors = countOnNeighbors(grid, depth, row, col);
      if (neighbors >= 3 && p.generation < 5) {
        const dirs = [
          { dx: 1, dy: 0, dz: 0 },
          { dx: -1, dy: 0, dz: 0 },
          { dx: 0, dy: 1, dz: 0 },
          { dx: 0, dy: -1, dz: 0 },
          { dx: 0, dy: 0, dz: 1 },
          { dx: 0, dy: 0, dz: -1 },
        ];
        const choice = dirs[Math.floor(Math.random() * dirs.length)];
        pulses.push({
          x: p.x,
          y: p.y,
          z: p.z,
          dx: choice.dx,
          dy: choice.dy,
          dz: choice.dz,
          speed: p.speed,
          generation: p.generation + 1,
          color: p.color,
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

function countOnNeighbors(grid, z, r, c) {
  let count = 0;
  for (let dz = -1; dz <= 1; dz++) {
    for (let dr = -1; dr <= 1; dr++) {
      for (let dc = -1; dc <= 1; dc++) {
        if (dz === 0 && dr === 0 && dc === 0) continue;
        const nz = z + dz;
        const nr = r + dr;
        const nc = c + dc;
        if (
          nz >= 0 &&
          nz < grid.length &&
          nr >= 0 &&
          nr < grid[0].length &&
          nc >= 0 &&
          nc < grid[0][0].length &&
          grid[nz][nr][nc].value === 1
        ) {
          count++;
        }
      }
    }
  }
  return count;
}
