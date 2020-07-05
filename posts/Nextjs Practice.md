---
date: 2020/6/20
categories:
- FrontEnd
---

## 部署

### 部署方法

类似express， 编译完成后运行`npm run start`命令，服务器配置反向代理即可

### 端口占用

Next默认在开发环境下使用3000端口，若此时执行`npm run start`命令会提示端口被占用，将`package.json`文件下script的start命令改成如下即可

```cli
npm run start -p <port>
```

## window属性
