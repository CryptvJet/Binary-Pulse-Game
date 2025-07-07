export function initializeGrid(rows, cols) {
  const grid = [];
  for (let r = 0; r < rows; r++) {
    const row = [];
    for (let c = 0; c < cols; c++) {
      row.push({ value: 0, density: 0, isNull: false });
    }
    grid.push(row);
  }
  return grid;
}
