import { initializeGrid } from '../grid.js';
import { applyBrush } from '../brush.js';

test('applyBrush toggles cells within radius', () => {
  const grid = initializeGrid(3, 3);
  applyBrush(grid, 1, 1, 1);
  expect(grid[0][0]).toBe(1);
  expect(grid[2][2]).toBe(1);
});
