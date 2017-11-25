'use strict';

const parser = require('./parser');

function generate(ast) {
  if (ast.op === parser.ops.assign) {
    return `assign ${ast.val}`;
  }
  let ret = '';
  ret += generate(ast.y) + '\n';
  ret += generate(ast.x) + '\n';
  ret += ast.op;
  return ret;
}

module.exports = {
  generate: generate,
};
