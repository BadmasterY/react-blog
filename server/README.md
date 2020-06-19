## Blog Server
服务器。

### 启动
```
yarn install
yarn start // 正常启动
yarn debug // debug 模式
yarn serve // 开发模式
```

### 打包
编译 `ts`:
```
yarn build-ts // 检查 ./dist
```

将 `client` 中构建的前端文件放入 `./dist/public` 文件夹下:
```
yarn build-app // 检查 ./build
```

### 配置
调整数据库及其他相关配置移步 `config/default.json`。

```
// default.json 目录结构
- default.json
  - http http相关设置
  - server 服务器相关设置
  - initDB 初始化账号密码
  - db 数据库相关设置
  - schema schema额外配置
```

如果有增/删键的情况, 请同时修改 `interfaces/config.ts` 文件。