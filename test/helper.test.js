'use strict';

const helper = require('../lib/helper');
const assert = require('assert');


describe('test/helper.test.js', () => {
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
