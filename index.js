'use strict';

const lexer = require('./lib/lexer');
const parser = require('./lib/parser');
const generator = require('./lib/generator');
const vm = require('./lib/vm');

function execute(expr) {
  let tokens = lexer.lex(expr);
  let ast = parser.parse(tokens);
  let code = generator.generate(ast);
  let res = vm.run(code);
  return res;
}

module.exports = {
  lexer: lexer,
  parser: parser,
  generator: generator,
  vm: vm,
  execute: execute,
};
