export function applyBrush(grid, x, y, size = 0) {
  const modified = [];
  for (let dy = -size; dy <= size; dy++) {
    for (let dx = -size; dx <= size; dx++) {
      const ny = y + dy;
      const nx = x + dx;
      if (ny >= 0 && ny < grid.length && nx >= 0 && nx < grid[0].length) {
        grid[ny][nx] = grid[ny][nx] ? 0 : 1;
        modified.push({ x: nx, y: ny });
      }
    }
  }
  return modified;
}
