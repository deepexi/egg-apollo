# egg-apollo

[![NPM version][npm-image]][npm-url]
[![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/@taccisum/egg-apollo.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/@taccisum/egg-apollo
[download-image]: https://img.shields.io/npm/dm/@taccisum/egg-apollo.svg?style=flat-square
[download-url]: https://www.npmjs.com/package/@taccisum/egg-apollo

egg-apollo插件基于[ctrip-apollo v4.4.0](https://github.com/kaelzhang/ctrip-apollo)，帮助你在eggjs下快速与apollo配置中心进行集成。

## 安装

### 通过npm仓库安装

```bash
$ npm i @taccisum/egg-apollo --save
```

## 使用

```js
// {app_root}/config/plugin.js
exports.apollo = {
  enable: true,
  package: '@taccisum/egg-apollo',
};
```

## 配置

```js
// {app_root}/config/config.default.js
exports.apollo = {
  enabled: true,
  timeout: 3000, // 等待超时时间
  namespaces: [ 'application' ]

  // 其它配置沿用自ctrip-apollo，更多请参考 https://github.com/kaelzhang/ctrip-apollo
  appId: 'foo-service', // your application id in apollo
  host: 'http://localhost:8070',  // apollo config service地址
};
```

## 使用示例

`egg-apollo`在启动后会自动从apollo拉取配置并合并到eggjs本地配置中，一般不需要做额外的操作。点击这里查看[合并规则](#配置合并规则)

如果确实有需要，你也可以通过以下方式获取到apollo的客户端

```js
const client = app.apollo;
// do something with apollo client
```

## 使用参考

### 配置合并规则

每个应用只能指定唯一的`appId`及`cluster`，但可以指定多个namespace，多个namespace的配置会按照一定规则合并后再与本地配置合并。

具体规则如下：

namespaces通过`config.apollo.namespaces | array`配置，多个namesapce优先级从右到左降低，例如指定了3个namespace

```js
exports.apollo = {
  namespaces: [ 'application', 'tac.foo1', 'tac.foo2' ]
}
```

其中

**application**
```properties
a=a
b=b
c.d=cd
```

**tac.foo1**
```properties
a=a1
b=b1
```

**tac.foo2**
```properties
b=b2
```

则配置会按照`tac.foo2` -> `tac.foo1` -> `application`的顺序合并，合并后的结果将是
```properties
a=a1
b=b2
c.d=cd
```

最终被解析为以下json对象与本地config合并

```json
{
  "a": "a1",
  "b": "b2",
  "c": {
    "d": "cd"
  }
}
```


## 问题和建议

empty now.

## License

[MIT](LICENSE)
