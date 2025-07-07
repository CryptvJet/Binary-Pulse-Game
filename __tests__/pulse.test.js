import { initializeGrid } from '../grid.js';
import { launchPulse, updatePulse, getPulses } from '../pulse.js';

describe('pulse mechanics', () => {
  beforeEach(() => {
    getPulses().length = 0;
  });

  test('pulse moves and toggles cell', () => {
    const grid = initializeGrid(3, 3);
    launchPulse(0, 0, 1, 0, 1);
    updatePulse(1, grid);
    expect(grid[0][1].value).toBe(1);
    const pulses = getPulses();
    expect(pulses[0].x).toBeCloseTo(1);
  });
});
