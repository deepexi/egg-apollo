'use strict';

const apollo = require('ctrip-apollo');
const helper = require('./helper');


// eslint-disable-next-line no-unused-vars
function creator(config, app) {
  helper.assert(config, [ 'appId' ]);
  const client = apollo(config);
  return client;
}

module.exports = app => {
  app.apollo = creator(app.config.apollo, app);
};
