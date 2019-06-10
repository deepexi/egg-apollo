'use strict';

const loader = require('./lib/loader');
const helper = require('./lib/helper.js');
const wait = require('wait-sync');
const assert = require('assert');
const _ = require('lodash');

function _assert(config, keys) {
  keys.forEach(key => {
    assert(config[key], `[egg-apollo] Must set \`${key}\` in apollo\'s config`);
    return key;
  });
}

module.exports = class AppBootHook {
  constructor(app) {
    this.app = app;

    if (app.config.apollo.enabled) {
      loader(app);
    } else {
      app.coreLogger.warn('plugin egg-apollo has been disabled!');
    }
  }

  configWillLoad() {
    const config = this.app.config.apollo;
    const client = this.app.apollo;

    _assert(config, [ 'namespaces' ]);

    if (client) {
      try {
        this.app.coreLogger.info(`load configs from apollo. namespace: ${config.namespaces}`);
        const promises = config.namespaces.map(async item => {
          const namespace = client.namespace(item);
          await namespace.ready();
          return namespace.config();
        });

        let configs;
        Promise.all(promises).then(cfg => {
          configs = cfg;
        });

        // TODO:: 测试本地缓存
        // 同步等待请求返回
        const max = config.timeout / 10;
        let count = 0;
        while (!configs) {
          count = count + 1;
          if (count > max) {
            throw new Error('fetch configs timeout from apollo');
          }
          wait(0.01);
        }

        const merged = helper.mergeConfigs(configs);
        const jsonObj = helper.parseToJson(merged);

        this.app.coreLogger.info('合并apollo配置到本地egg配置');
        _.assignIn(this.app.config, jsonObj);
      } catch (e) {
        this.app.coreLogger.warn(`从apollo加载配置失败，错误信息：${e.message}`);
      }
    }
  }
};
