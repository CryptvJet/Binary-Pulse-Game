import { initializeGrid } from '../grid.js';

test('initializeGrid creates correct dimensions', () => {
  const grid = initializeGrid(2, 3);
  expect(grid.length).toBe(2);
  expect(grid[0].length).toBe(3);
});

test('cells start with zero', () => {
  const grid = initializeGrid(1, 1);
  expect(grid[0][0]).toBe(0);
});
