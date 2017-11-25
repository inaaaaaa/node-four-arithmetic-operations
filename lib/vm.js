'use strict';

let stack = [];

function init() {
  stack = [];
}

function assign(x) {
  stack.push(parseInt(x[0]));
}

function add() {
  let x = stack.pop();
  let y = stack.pop();
  stack.push(x + y);
}

function sub() {
  let x = stack.pop();
  let y = stack.pop();
  stack.push(x - y);
}

function mul() {
  let x = stack.pop();
  let y = stack.pop();
  stack.push(x * y);
}

function div() {
  let x = stack.pop();
  let y = stack.pop();
  stack.push(x / y);
}

const ops = {
  add: add,
  sub: sub,
  mul: mul,
  div: div,
  assign: assign,
};

function _decode(ins) {
  let tmp = ins.split(' ');
  return {op: tmp[0], args: tmp.slice(1, tmp.length)};
}

function run(text) {
  init();
  text.split('\n').forEach((ins) => {
    let tmp = _decode(ins);
    ops[tmp.op](tmp.args);
  });
  return stack.pop();
}

module.exports = {
  run: run,
};
