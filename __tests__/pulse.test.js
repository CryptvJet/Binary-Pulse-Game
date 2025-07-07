import { initializeGrid } from '../grid.js';
import { toggleCell } from '../pulse.js';

test('toggleCell flips value', () => {
  const grid = initializeGrid(2, 2);
  toggleCell(grid, 0, 0);
  expect(grid[0][0]).toBe(1);
  toggleCell(grid, 0, 0);
  expect(grid[0][0]).toBe(0);
});
