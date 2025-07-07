export function initializeGrid(rows, cols) {
  const grid = [];
  for (let y = 0; y < rows; y++) {
    const row = [];
    for (let x = 0; x < cols; x++) {
      row.push(0);
    }
    grid.push(row);
  }
  return grid;
}
