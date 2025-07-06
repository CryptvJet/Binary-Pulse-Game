export function initializeGrid(rows, cols) {
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push(0);
    }
    grid.push(row);
  }
  return grid;
}
