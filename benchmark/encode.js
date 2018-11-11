'use strict';

const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');
const suite = new Benchmark.Suite();

const JSONSerialize = require('..');
const v8 = require('v8');

const json = {
  anyhost: true,
  application: 'demo-provider',
  dubbo: '2.0.0',
  generic: false,
  interface: 'com.alibaba.dubbo.demo.DemoService',
  loadbalance: 'roundrobin',
  methods: 'sayHello',
  owner: 'william',
  pid: 81281,
  side: 'provider',
  timestamp: 1481613276143,
  date: new Date(),
  buf: Buffer.from('hello buffer 😄'),
};

console.log(new Buffer(JSON.stringify(json)).length);
console.log(JSONSerialize.encode(json).length);
console.log(v8.serialize(json).length);

// add tests
suite
  .add('new Buffer(JSON.stringify(json))', function() {
    new Buffer(JSON.stringify(json));
  })
  .add('JSONSerialize.encode(json)', function() {
    JSONSerialize.encode(json);
  })
  .add('v8.serialize(json)', function() {
    v8.serialize(json);
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

// node version: v10.13.0, date: Sun Nov 11 2018 23:10:25 GMT+0800 (China Standard Time)
// Starting...
// 3 tests completed.
//
// new Buffer(JSON.stringify(json)) x 186,784 ops/sec ±1.18% (86 runs sampled)
// JSONSerialize.encode(json)       x  53,639 ops/sec ±1.16% (88 runs sampled)
// v8.serialize(json)               x   3,921 ops/sec ±46.68% (11 runs sampled)
