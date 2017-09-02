'use strict';

const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');
const suite = new Benchmark.Suite();

let count = 0;
const base = 900000000000000;
const obj = {};
while (count < 5000) {
  const userId = String(base + count++);
  obj[userId] = {
    date: new Date(),
    num: 10000000,
    bool: true,
    null: null,
    undefined: undefined,
    buf: new Buffer('this is a buffer'),
    err: new Error('this is a error'),
  };
}

const JSONSerialize = require('..');

const buf_1 = new Buffer(JSON.stringify(obj));
const buf_2 = JSONSerialize.encode(obj);

// add tests
suite
  .add('new Buffer(JSON.stringify(json))', function() {
    new Buffer(JSON.stringify(obj));
  })
  .add('JSONSerialize.encode(json)', function() {
    JSONSerialize.encode(obj);
  })
  .add('JSON.parse(buf)', function() {
    JSON.parse(buf_1);
  })
  .add('JSONSerialize.decode(buf)', function() {
    JSONSerialize.decode(buf_2);
  })
  .on('cycle', function(event) {
    benchmarks.add(event.target);
  })
  .on('start', function() {
    console.log('\n  node version: %s, date: %s\n  Starting...', process.version, Date());
  })
  .on('complete', function done() {
    benchmarks.log();
  })
  .run({ async: false });

// node version: v8.4.0, date: Sat Sep 02 2017 09:04:07 GMT+0800 (CST)
// Starting...
// 4 tests completed.

// new Buffer(JSON.stringify(json)) x 47.75 ops/sec ±2.27% (61 runs sampled)
// JSONSerialize.encode(json)       x  5.12 ops/sec ±4.66% (18 runs sampled)
// JSON.parse(buf)                  x 73.03 ops/sec ±5.54% (63 runs sampled)
// JSONSerialize.decode(buf)        x  5.81 ops/sec ±2.83% (19 runs sampled)
