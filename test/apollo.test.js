'use strict';

const mock = require('egg-mock');
const assert = require('assert');

describe('test/apollo.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/apollo-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    // [!important] 执行测试前请前确保apollo中真实存在这些配置
    assert(app.config.deepexi.greeting === 'hi, guys!');
    assert(app.config.foo === 'bar');

    return app.httpRequest()
      .get('/')
      .expect('hi, apollo')
      .expect(200);
  });
});
