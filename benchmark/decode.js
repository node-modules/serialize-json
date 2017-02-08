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

const buf1 = new Buffer(JSON.stringify(json));
const buf2 = JSONSerialize.encode(json);

// add tests
suite
  .add('JSON.parse(buf1.toString())', function() {
    JSON.parse(buf1.toString());
  })
  .add('JSONSerialize.decode(buf2)', function() {
    JSONSerialize.decode(buf2);
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

// node version: v6.9.2, date: Mon Feb 06 2017 21:33:01 GMT+0800 (CST)
// Starting...
// 2 tests completed.

// JSON.parse(buf1.toString()) x 464,798 ops/sec ±1.62% (90 runs sampled)
// JSONSerialize.decode(buf2)  x  45,589 ops/sec ±1.21% (90 runs sampled)
