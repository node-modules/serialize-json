'use strict';

module.exports = {
  write: true,
  prefix: '^',
  test: [
    'test',
  ],
  devdep: [
    'egg-ci',
    'egg-bin',
    'mm',
    'autod',
    'eslint',
    'eslint-config-egg',
  ],
  exclude: [
    './test/fixtures',
    'benchmark',
  ],
  semver: [
    'debug@3',
    'egg-bin@1',
    'eslint@4',
    'eslint-config-egg@6',
  ],
}
