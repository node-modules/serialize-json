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
  date: new Date(),
  buf: Buffer.from('hello buffer 😄'),
  // err: new Error('foo error'),
  // map: new Map(),
};

const buf1 = Buffer.from(JSON.stringify(json));
const buf2 = JSONSerialize.encode(json);
const buf3 = v8.serialize(json);
// console.log(typeof json, buf3)
// for (const k in json) {
//   const v = json[k];
//   console.log(typeof v, k, v8.serialize(v));
// }

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

// node version: v10.13.0, date: Sun Nov 11 2018 23:05:47 GMT+0800 (China Standard Time)
// Starting...
// 3 tests completed.
//
// JSON.parse(buf1.toString()) x 314,187 ops/sec ±0.96% (92 runs sampled)
// JSONSerialize.decode(buf2)  x  56,123 ops/sec ±1.31% (88 runs sampled)
// v8.deserialize(buf3)        x 176,858 ops/sec ±9.81% (68 runs sampled)
