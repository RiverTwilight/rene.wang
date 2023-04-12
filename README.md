# Rene.wang

这是我的的 [博客](https://rene.wang) 的源代码，同时也是一个强大的静态博客站点。

-   [x] 支持自定义主题开发
-   [x] 从 Notion 同步文章
-   [x] 多语言 UI/文章
-   [ ] 评论

## 🎞️ 使用

点击页面右上角 **Use this templat**，创建你自己的仓库。

之后，修改配置文件。位于 `./site.config.js`

-   title:博客名称
-   root:博客根网址
-   author: 作者信息
    -   name:名称
    -   intro:介绍

如果你需要使用 Notion 写作，请在 Notion 新建一个 Intergation，获取 API Key. 同时获取你的 database_id

然后，在 Github 仓库新增两个环境变量：

```bash
NOTION_API_KEY=<YOUR_KEY>
NOTION_DATABASE_ID=<YOUR_ID>
```

一切准备就绪后，可以选择你喜欢的方法部署。

## ✍ 写作

目前支持两种写作方式：

1. 将 Markdown 文件放入`/posts/<catagories>`目录即可。目前最高支持二级目录。
2. 从 Notion 自动同步文章。

如果你选择第一种方式，每篇文章至少需要以下两个 frontmatter：

-   title
-   date

如果选择使用 Notion 写作，请参考这个 [database]() 的形式创建一个一样的。

## 部署到 Vercel

有两种部署方式，[Vercel](https://vercel.com/) 和自己的服务器，vercel 只需创建好仓库并按提示走就可以了，如果要部署到自己的服务器请继续阅读:

## 部署到自己的服务器

### 0.服务器配置

确保服务器已安装 Node.js、 git 和 pm2。

在服务器下创建/app/ygk-blog 目录，并执行`git init`初始化仓库。

```
mkdir -p /app/blog && cd /app/blog
git init
```

### 1.Github 仓库配置

在 github 创建一个仓库，并在`Setting`->`Secrets`下添加服务器信息。

-   SSH_HOST：服务器 IP
-   SSH_USERNAME：服务器用户名
-   SSH_PORT：SSH 端口（默认 22）
-   SSH_PASSWORD：服务器用户密码

在 Github 仓库的 `Deploy Keys` 下添加服务器 git 公钥（[生成方法](https://git-scm.com/book/zh/v2/%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%8A%E7%9A%84-Git-%E7%94%9F%E6%88%90-SSH-%E5%85%AC%E9%92%A5)）。

```sh
vim ~/.ssh/id_rsa.pub
```

### 2.推送代码

确保 Action 已启用之后，在 github 上所有 master 分支的更新都会自动部署到服务器。大功告成！

## 配置 Notion

## License

MIT
