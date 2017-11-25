'use strict';

const symbols = {
  '+': 'add',
  '-': 'sub',
  '*': 'mul',
  '/': 'div',
  '(': 'open',
  ')': 'close',
};

const types = {
  number: 'number',
  symbol: 'symbol',
};

function lex(expr) {
  let tokens = [];
  let cursor = 0;
  while (cursor < expr.length) {
    let c = expr[cursor];
    if ('0' <= c && c <= '9') {
      let n = parseInt(c);
      while (true) {
        let cursor_ = cursor + 1;
        if (cursor_ >= expr.length) {
          break;
        }
        let c = expr[cursor_];
        if (!('0' <= c && c <= '9')) {
          break;
        }
        n *= 10;
        n += parseInt(c);
        cursor++;
      }
      tokens.push({type: types.number, val: n});
    } else if (c in symbols) {
      tokens.push({type: types.symbol, val: symbols[c]});
    }
    cursor++;
  }
  return tokens;
}

module.exports = {
  symbols: symbols,
  types: types,
  lex: lex,
};
