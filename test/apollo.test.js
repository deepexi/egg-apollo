'use strict';

const mock = require('egg-mock');

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
    return app.httpRequest()
      .get('/')
      .expect('hi, apollo')
      .expect(200);
  });
});
