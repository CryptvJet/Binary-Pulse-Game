export function applyBrush(grid, x, y, z = 0, size = 0, type = 'toggle') {
  const modified = [];
  for (let dz = -size; dz <= size; dz++) {
    for (let dy = -size; dy <= size; dy++) {
      for (let dx = -size; dx <= size; dx++) {
        const nz = z + dz;
        const ny = y + dy;
        const nx = x + dx;
        if (
          nz >= 0 &&
          nz < grid.length &&
          ny >= 0 &&
          ny < grid[0].length &&
          nx >= 0 &&
          nx < grid[0][0].length
        ) {
          const cell = grid[nz][ny][nx];
          if (type === 'toggle') {
            cell.value = cell.value === 0 ? 1 : 0;
          } else if (type === 'null') {
            cell.isNull = !cell.isNull;
          }
          modified.push({ x: nx, y: ny, z: nz });
        }
      }
    }
  }
  return modified;
}
