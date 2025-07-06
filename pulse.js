const pulses = [];

export function launchPulse(x, y, dx, dy, speed = 10) {
  pulses.push({ x, y, dx, dy, speed });
}

export function updatePulse(delta, grid) {
  for (let i = pulses.length - 1; i >= 0; i--) {
    const p = pulses[i];
    p.x += p.dx * p.speed * delta;
    p.y += p.dy * p.speed * delta;

    const col = Math.floor(p.x);
    const row = Math.floor(p.y);

    if (row >= 0 && row < grid.length && col >= 0 && col < grid[0].length) {
      grid[row][col] = grid[row][col] === 0 ? 1 : 0;
    } else {
      pulses.splice(i, 1);
    }
  }
}

export function getPulses() {
  return pulses;
}
