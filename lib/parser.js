'use strict';

const lexer = require('./lexer');

const ops = {
  add: 'add',
  sub: 'sub',
  mul: 'mul',
  div: 'div',
  assign: 'assign',
};

function parse(tokens) {
  return _parseExpression(tokens);
}

function _parseExpression(tokens) {
  let depth = 0;
  let cursor = 0;
  while (cursor < tokens.length) {
    let token = tokens[cursor];
    if (token.type === lexer.types.number) {
      cursor++;
      continue;
    }
    if (token.val === lexer.symbols['(']) {
      depth++;
    }
    if (token.val === lexer.symbols[')']) {
      depth--;
    }
    if (depth !== 0) {
      cursor++;
      continue;
    }
    if (token.val === lexer.symbols['+'] || token.val === lexer.symbols['-']) {
      return {
        op: token.val,
        x: _parseTerm(tokens.slice(0, cursor)),
        y: parse(tokens.slice(cursor + 1, cursor.length)),
      };
    }
    cursor++;
  }
  return _parseTerm(tokens);
}

function _parseTerm(tokens) {
  let depth = 0;
  let cursor = 0;
  while (cursor < tokens.length) {
    let token = tokens[cursor];
    if (token.type === lexer.types.number) {
      cursor++;
      continue;
    }
    if (token.val === lexer.symbols['(']) {
      depth++;
    }
    if (token.val === lexer.symbols[')']) {
      depth--;
    }
    if (depth !== 0) {
      cursor++;
      continue;
    }
    if (token.val === lexer.symbols['*'] || token.val === lexer.symbols['/']) {
      return {
        op: token.val,
        x: _parseFactor(tokens.slice(0, cursor)),
        y: parse(tokens.slice(cursor + 1, cursor.length)),
      };
    }
    cursor++;
  }
  return _parseFactor(tokens);
}

function _parseFactor(tokens) {
  if (tokens.length === 1) {
    if (tokens[0].type === lexer.types.number) {
      return {op: ops.assign, val: tokens[0].val};
    } else {
      throw new Error('error');
    }
  }
  let open = tokens[0].val === lexer.symbols['('];
  let close = tokens[tokens.length-1].val === lexer.symbols[')'];
  if (open && close) {
    return parse(tokens.slice(1, tokens.length - 1));
  }
  throw new Error('error');
}

module.exports = {
  ops: ops,
  parse: parse,
};
