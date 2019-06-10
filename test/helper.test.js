'use strict';

const helper = require('../lib/helper');
const assert = require('assert');


describe('test/helper.test.js', () => {
  describe('mergeConfigs()', () => {
    it('should right', () => {
      const merged = helper.mergeConfigs([
        { a: 'a', b: 'b' },
        { a: 'a1', b: 'b1' },
        { b: 'b2', 'c.d': 'cd' },
      ]);
      assert(merged.a === 'a1');
      assert(merged.b === 'b2');
      assert(merged['c.d'] === 'cd');
    });
  });

  describe('parseToJson()', () => {
    it('should right', () => {
      const json = helper.parseToJson({
        a: '123',
        'b.c': '456',
      });
      assert(json.a);
      assert(json.b.c);
    });
  });
});
