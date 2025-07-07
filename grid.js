export function initializeGrid(depth, rows, cols) {
  const grid = [];
  for (let z = 0; z < depth; z++) {
    const plane = [];
    for (let r = 0; r < rows; r++) {
      const row = [];
      for (let c = 0; c < cols; c++) {
        row.push({ value: 0, density: 0, isNull: false });
      }
      plane.push(row);
    }
    grid.push(plane);
  }
  return grid;
}
