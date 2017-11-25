'use struct';

const assert = require('power-assert');
const main = require('..');

describe('main', function() {
  it('should calc', function() {
    let tests = [
      {in: '1 + 2', out: 3},
      {in: '1 - 2', out: -1},
      {in: '1 * 2', out: 2},
      {in: '10 / 5', out: 2},
      {in: '2 * (2 + 3)', out: 10},
      {in: '2 * (3 * (4 + 5))', out: 54},
      {in: '(1 + 2)', out: 3},
      {in: '(1 + 2) + (3 + 4)', out: 10},
      {in: '(2 * (3 * 4)) / (1)', out: 24},
      {in: '(1 + (2 + (3 + (4 + 5))))', out: 15},
    ];
    tests.forEach((t) => {
      assert.equal(main.execute(t.in), t.out);
    });
  });
});
