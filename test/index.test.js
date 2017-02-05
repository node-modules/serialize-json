'use strict';

const JSON = require('../lib');
const is = require('is-type-of');
const assert = require('assert');

describe('test/index.test.js', () => {

  it('should encode & decode boolean', () => {
    let buf = JSON.encode(true);
    assert(is.buffer(buf));
    assert(JSON.decode(buf) === true);
    buf = JSON.encode(false);
    assert(JSON.decode(buf) === false);
  });

  it('should encode & decode string', () => {
    let buf = JSON.encode('xxx_yyy_中文 +|^%');
    assert(is.buffer(buf));
    assert(JSON.decode(buf) === 'xxx_yyy_中文 +|^%');
    buf = JSON.encode('');
    assert(is.buffer(buf));
    assert(JSON.decode(buf) === '');
  });

  it('should encode & decode integer', () => {
    const buf = JSON.encode(123456);
    assert(is.buffer(buf));
    assert(JSON.decode(buf) === 123456);
  });

  it('should encode & decode float', () => {
    const buf = JSON.encode(123.456);
    assert(is.buffer(buf));
    assert(JSON.decode(buf) === 123.456);
  });

  it('should encode & decode null', () => {
    const buf = JSON.encode(null);
    assert(is.buffer(buf));
    assert(JSON.decode(buf) === null);
  });

  it('should encode & decode undefined', () => {
    const buf = JSON.encode(undefined);
    assert(is.buffer(buf));
    assert(JSON.decode(buf) === undefined);
  });

  it('should encode & decode date', () => {
    const date = new Date();
    const buf = JSON.encode(date);
    assert(is.buffer(buf));
    assert.deepEqual(JSON.decode(buf), date);
  });

  it('should encode & decode buffer', () => {
    const buffer = new Buffer('hello world');
    const buf = JSON.encode(buffer);
    assert(is.buffer(buf));
    assert.deepEqual(JSON.decode(buf), buffer);
  });

  it('should not encode & decode function', () => {
    const buf = JSON.encode(function foo() {});
    assert(is.buffer(buf));
    assert(JSON.decode(buf) === null);
  });

  it('should encode & decode array', () => {
    let buf = JSON.encode([ 1, 2, 3, 4 ]);
    assert(is.buffer(buf));
    assert.deepEqual(JSON.decode(buf), [ 1, 2, 3, 4 ]);

    buf = JSON.encode([ '1', '2', 3, '4' ]);
    assert(is.buffer(buf));
    assert.deepEqual(JSON.decode(buf), [ '1', '2', 3, '4' ]);
  });

  it('should encode & decode error', () => {
    const err = new Error('mock error');
    err.code = 'success';
    const buf = JSON.encode(err);
    assert(is.buffer(buf));
    const ret = JSON.decode(buf);
    assert(is.error(ret));
    assert(ret.message === 'mock error');
    assert(ret.stack === err.stack);
    assert(ret.code === 'success');
    assert.deepEqual(ret, err);
  });

  it('should encode & decode object', () => {
    let json = {
      a: 'a',
      b: 123,
      c: 123.456,
      d: [ 1, 2, 3 ],
      e: true,
      f: null,
      g: undefined,
      h: new Date(),
      i: new Buffer('this is a buffer'),
      j: new Error('this is a error'),
    };
    let buf = JSON.encode(json);
    assert(is.buffer(buf));
    assert.deepEqual(JSON.decode(buf), json);

    json = {
      fn() {},
    };
    buf = JSON.encode(json);
    assert(is.buffer(buf));
    assert.deepEqual(JSON.decode(buf), {
      fn: null,
    });
  });
});
