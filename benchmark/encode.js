'use strict';

const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');
const suite = new Benchmark.Suite();

const JSONSerialize = require('..');

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
};

console.log(new Buffer(JSON.stringify(json)).length);
console.log(JSONSerialize.encode(json).length);

// add tests
suite
  .add('new Buffer(JSON.stringify(json))', function() {
    new Buffer(JSON.stringify(json));
  })
  .add('JSONSerialize.encode(json)', function() {
    JSONSerialize.encode(json);
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

// node version: v6.9.2, date: Mon Feb 06 2017 21:31:12 GMT+0800 (CST)
// Starting...
// 2 tests completed.

// new Buffer(JSON.stringify(json)) x 365,334 ops/sec ±1.44% (87 runs sampled)
// JSONSerialize.encode(json)       x  43,591 ops/sec ±1.23% (85 runs sampled)
