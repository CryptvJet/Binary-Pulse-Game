import { initializeGrid } from '../grid.js';

test('initializeGrid creates correct dimensions', () => {
  const grid = initializeGrid(4, 2, 3);
  expect(grid.length).toBe(4); // depth
  expect(grid[0].length).toBe(2); // rows
  expect(grid[0][0].length).toBe(3); // cols
});

test('cells start with default values', () => {
  const grid = initializeGrid(1, 1, 1);
  expect(grid[0][0][0]).toEqual({ value: 0, density: 0, isNull: false });
});
