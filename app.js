'use strict';

const loader = require('./lib/loader');
const helper = require('./lib/helper.js');
const wait = require('wait-sync');
const _ = require('lodash');

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

    helper.assert(config, [ 'namespaces' ]);

    if (client) {
      try {
        this.app.coreLogger.info(`load configs from apollo. namespace: ${config.namespaces}`);
        const promises = config.namespaces.map(async item => {
          const namespace = client.namespace(item);
          await namespace.ready();
          return namespace.config();
        });

        let configs;
        let err;
        Promise.all(promises).then(cfg => {
          configs = cfg;
        }).catch(e => {
          err = e;
        });

        // TODO:: 测试本地缓存
        // 同步等待请求返回
        const max = config.timeout / 10;
        let count = 0;
        while (!configs) {
          if (err) {
            break;
          }
          count = count + 1;
          if (count > max) {
            throw new Error('fetch configs timeout from apollo');
          }
          wait(0.01);
        }

        if (err) {
          throw err;
        }

        const merged = helper.mergeConfigs(configs);
        const jsonObj = helper.parseToJson(merged);

        this.app.coreLogger.info('合并apollo配置到本地egg配置');
        _.assignIn(this.app.config, jsonObj);
      } catch (e) {
        this.app.coreLogger.warn(`从apollo加载配置失败，错误信息：${e.message}`);
        delete this.app.apollo;
      }
    }
  }
};
