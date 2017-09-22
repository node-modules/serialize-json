'use strict';

const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');
const suite = new Benchmark.Suite();

let count = 0;
const base = 900000000000000;
const userIds = [];
while (count < 50000) {
  userIds.push(String(base + count++));
}

console.log(userIds.slice(0, 10), userIds.slice(-10));

const JSONSerialize = require('..');

const buf_1 = new Buffer(JSON.stringify(userIds));
const buf_2 = JSONSerialize.encode(userIds);

// add tests
suite
  .add('new Buffer(JSON.stringify(json))', function() {
    new Buffer(JSON.stringify(userIds));
  })
  .add('JSONSerialize.encode(json)', function() {
    JSONSerialize.encode(userIds);
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

// node version: v8.4.0, date: Sat Sep 02 2017 08:58:29 GMT+0800 (CST)
// Starting...
// 4 tests completed.

// new Buffer(JSON.stringify(json)) x   255 ops/sec ±2.50% (74 runs sampled)
// JSONSerialize.encode(json)       x 28.50 ops/sec ±2.55% (50 runs sampled)
// JSON.parse(buf)                  x   201 ops/sec ±2.84% (70 runs sampled)
// JSONSerialize.decode(buf)        x 35.37 ops/sec ±4.61% (48 runs sampled)
