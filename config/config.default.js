'use strict';

/**
 * egg-apollo default config
 * @member Config#apollo
 * @property {String} SOME_KEY - some description
 */
exports.apollo = {
  enabled: true,
  timeout: 3000, // 等待超时时间
  // appId: 'foo-service',
  // host: 'http://localhost:8070',
  namespaces: [ 'application' ],
  cachePath: '/tmp/apollo_configs',
  // cluster: 'default',

  // open https://github.com/kaelzhang/ctrip-apollo for more config info
};
