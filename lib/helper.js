'use strict';

const _ = require('lodash');
const properties = require('properties');

module.exports = {
  /**
   * 合并配置
   * @param {Array} configs 配置列表
   */
  mergeConfigs(configs) {
    return configs.reduce((p, c) => {
      return _.assignIn({}, p, c);
    });
  },

  /**
   * 解析properties配置为json
   * @param {*} config 配置
   */
  parseToJson(config) {
    let obj = {};
    let propertiesStr = '';

    Object.keys(config).forEach(key => {
      propertiesStr = propertiesStr + `${key}=${config[key]}\n`;
    });

    // TODO:: 支持数组解析
    properties.parse(propertiesStr, {
      path: false,
      namespaces: true,
    }, (err, o) => {
      if (err) {
        throw new Error(`fail to parse properties: ${err.message}`);
      }
      obj = o;
    });

    return obj;
  },
};
