# Rene.wang

这是我的的[博客](https://rene.wang)的源代码。

灵感来源于这篇 [文章](https://dev.to/tinacms/creating-a-markdown-blog-with-next-js-52hk)

## 配置

配置文件位于 `./site.config.js`

-   title:博客名称
-   root:博客根网址
-   author: 作者信息
    -   name:名称
    -   image:玉照
    -   intro:介绍
-   catagories: 目录配置

### 静态资源

### 样式

暂不支持自定义样式

## 写作

将文章放入`/posts`目录即可. NBlog 支持 markdown 和 HTML.

### 文章元数据 frontmatter

-   title: articel's title, if null, NBlog will regard the file name as title
-   date: Due to node cannot read the file's meta date, **you need to add a date by yourself**.

## 部署

~~由于 Nextjs 的 i18n 功能不支持静态导出，需要部署到服务器上，可以使用 github action 轻松部署。~~

有两种部署方式，[Vercel](https://vercel.com/)和自己的服务器，vercel只需FORK仓库并按提示走就可以了，如果要部署到自己的服务器请继续阅读:

### 0.服务器配置

确保服务器已安装 Node.js、 git 和 pm2。

在服务器下创建/app/ygk-blog 目录，并执行`git init`初始化仓库。

### 1.Github 仓库配置

在 github 创建一个仓库，并在`setting`->`Secrets`下添加服务器信息。

-   SSH_HOST：服务器 IP
-   SSH_USERNAME：服务器用户名
-   SSH_PORT：SSH 端口（默认 22）
-   SSH_PASSWORD：服务器用户密码

在 Github 仓库的 `Deploy Keys` 下添加服务器 git 公钥（[生成方法](https://git-scm.com/book/zh/v2/%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%8A%E7%9A%84-Git-%E7%94%9F%E6%88%90-SSH-%E5%85%AC%E9%92%A5)）。

```sh
vim ~/.ssh/id_rsa.pub
```

### 2.推送代码

在 github 上所有 master 分支的更新都会自动部署到服务器。大功告成！

## 贡献

### Atomic css

| 写法       | 可选参数    | 说明     |
| ---------- | ----------- | -------- |
| Bgc(color) | white green | 背景颜色 |
| P(padding) | 10px 20px   | 间距     |
