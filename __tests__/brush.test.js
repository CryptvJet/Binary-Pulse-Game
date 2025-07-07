import { initializeGrid } from '../grid.js';
import { applyBrush } from '../brush.js';

test('applyBrush toggles cells within radius', () => {
  const grid = initializeGrid(1, 3, 3);
  applyBrush(grid, 1, 1, 0, 1);
  // 3x3 area toggled around center at depth 0
  expect(grid[0][0][0].value).toBe(1);
  expect(grid[0][2][2].value).toBe(1);
});

