export function toggleCell(grid, x, y) {
  if (y >= 0 && y < grid.length && x >= 0 && x < grid[0].length) {
    grid[y][x] = grid[y][x] ? 0 : 1;
  }
}
