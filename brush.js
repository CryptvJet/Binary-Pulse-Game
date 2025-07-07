export function applyBrush(grid, x, y, size = 0, type = 'toggle') {
  for (let r = y - size; r <= y + size; r++) {
    for (let c = x - size; c <= x + size; c++) {
      if (r >= 0 && r < grid.length && c >= 0 && c < grid[0].length) {
        const cell = grid[r][c];
        if (type === 'toggle') {
          cell.value = cell.value === 0 ? 1 : 0;
        } else if (type === 'null') {
          cell.isNull = !cell.isNull;
        }
      }
    }
  }
}
