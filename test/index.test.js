const assert = require('assert');

const { calculateNextGridState } = require('../src/utils');

const grid = [
  [false, false, false, false, false],
  [false, false, true, false, false],
  [true, false, true, false, true],
  [true, false, false, true, false],
  [true, true, false, false, false],
];

describe(`GAME`, () => {
  describe(`state`, () => {
    it(`Any live cell with fewer than two live neighbours dies`, () => {
      assert.deepEqual(calculateNextGridState(grid), [
        [false, false, false, false, false],
        [false, true, false, true, false],
        [false, false, true, false, false],
        [true, false, true, true, false],
        [true, true, false, false, false],
      ]);
    });

    it(`Any live cell with two or three live neighbours lives on to the next generation`, () => {
      assert.deepEqual(calculateNextGridState(grid), [
        [false, false, false, false, false],
        [false, true, false, true, false],
        [false, false, true, false, false],
        [true, false, true, true, false],
        [true, true, false, false, false],
      ]);
    });

    it(`Any live cell with more than three live neighbours dies`, () => {
      assert.deepEqual(calculateNextGridState(grid), [
        [false, false, false, false, false],
        [false, true, false, true, false],
        [false, false, true, false, false],
        [true, false, true, true, false],
        [true, true, false, false, false],
      ]);
    });

    it(`Any dead cell with exactly three live neighbours becomes a live cell`, () => {
      assert.deepEqual(calculateNextGridState(grid), [
        [false, false, false, false, false],
        [false, true, false, true, false],
        [false, false, true, false, false],
        [true, false, true, true, false],
        [true, true, false, false, false],
      ]);
    });
  });
});
