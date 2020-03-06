const assert = require('assert');

const {
  calculateNextGridState,
  shouldCellLive,
} = require('../src/utils/calculate-grid');

const grid = [
  [false, false, false, false, false],
  [false, false, true, false, false],
  [true, false, true, false, true],
  [true, false, false, true, true],
  [true, true, false, false, true],
];

describe(`GAME`, () => {
  describe(`state`, () => {
    it(`Calculate next grid`, () => {
      assert.deepEqual(calculateNextGridState(grid), [
        [false, false, false, false, false],
        [false, true, false, true, false],
        [false, false, true, false, true],
        [true, false, true, false, true],
        [true, true, false, true, true],
      ]);
    });

    it(`Any live cell with fewer than two live neighbours dies (underpopulation)`, () => {
      assert.deepEqual(shouldCellLive(true, 1, 2, grid), false);
    });

    it(`Any live cell with two or three live neighbours lives on to the next generation`, () => {
      assert.deepEqual(shouldCellLive(true, 2, 2, grid), true);
    });

    it(`Any live cell with more than three live neighbours dies (overcrowding)`, () => {
      assert.deepEqual(shouldCellLive(true, 3, 3, grid), false);
    });

    it(`Any dead cell with exactly three live neighbours becomes a live cell (reproduction)`, () => {
      assert.deepEqual(shouldCellLive(false, 4, 3, grid), true);
    });
  });
});
