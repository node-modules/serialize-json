'use strict';

const Benchmark = require('benchmark');
const benchmarks = require('beautify-benchmark');
const v8 = require('v8');
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

const buf1 = Buffer.from(JSON.stringify(json));
const buf2 = JSONSerialize.encode(json);
const buf3 = v8.serialize(json);
console.log(JSON.parse(buf1));
console.log(JSONSerialize.decode(buf2));
console.log(v8.deserialize(buf3));

const suite = new Benchmark.Suite();

// add tests
suite
  .add('JSON.parse(buf1.toString())', function() {
    JSON.parse(buf1.toString());
  })
  .add('JSONSerialize.decode(buf2)', function() {
    JSONSerialize.decode(buf2);
  })
  .add('v8.deserialize(buf3)', function() {
    v8.deserialize(buf3);
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

// node version: v10.13.0, date: Wed Oct 31 2018 01:20:21 GMT+0800 (China Standard Time)
//   Starting...
//   3 tests completed.
//
//   JSON.parse(buf1.toString()) x 462,545 ops/sec ±0.80% (88 runs sampled)
//   JSONSerialize.decode(buf2)  x  96,149 ops/sec ±1.29% (91 runs sampled)
//   v8.deserialize(buf3)        x 203,619 ops/sec ±12.29% (64 runs sampled)
