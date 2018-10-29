'use strict';

const url = require('url');
const JSON = require('..');
const path = require('path');
const heapdump = require('heapdump');

// const address = url.parse('hsf://127.0.0.1:12200?xx=xx', true);

// const buf = JSON.encode(address);
// console.log(buf.toString('hex'));
const buf = Buffer.from('70726f746f636f6c7c6873663a7c736c61736865737c617574687c686f73747c3132372e302e302e313a31323230307c706f72747c31323230307c686f73746e616d657c3132372e302e302e317c686173687c7365617263687c3f78783d78787c71756572797c78787c78787c706174686e616d657c706174687c3f78783d78787c687265667c6873663a2f2f3132372e302e302e313a31323230303f78783d78785e5e5e5e24307c317c327c2d317c337c2d337c347c357c367c377c387c397c417c2d337c427c437c447c24457c465d7c477c2d337c487c497c4a7c4b5d', 'hex');
const o = JSON.decode(buf);

console.log(o);

process.o = o;
// const file = path.join(__dirname, Date.now() + '.heapsnapshot');
// console.log(file);
// heapdump.writeSnapshot(file);

heapdump.writeSnapshot(function(err, filename) {
  console.log('dump written to', filename);
});

