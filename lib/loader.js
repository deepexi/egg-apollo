'use strict';

const apollo = require('ctrip-apollo');

// eslint-disable-next-line no-unused-vars
function creator(config, app) {
  const client = apollo(config);
  return client;
}

module.exports = app => {
  app.apollo = creator(app.config.apollo, app);
};
