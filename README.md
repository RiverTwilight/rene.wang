# Rene.wang

简体中文 | [English](./README.en-US.md)

这是我的的 [博客](https://rene.wang) 的源代码，同时也是一个强大的静态博客站点。

-   [x] 使用 Markdown 写作
-   [x] 从 Notion 同步文章
-   [x] 多语言 UI/文章
-   [x] RSS 订阅
-   [x] 良好的 SEO
-   [x] 独特的外观
-   [x] 一键部署
-   [-] Twikoo 评论系统

## 🎞️ 开始使用

点击页面右上角 **Use this template**，创建你自己的仓库。

之后，修改配置文件。位于 `./site.config.js`

-   title:博客名称
-   root:博客根网址

一切准备就绪后，可以选择你喜欢的方法部署。

## 部署到 Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FRiverTwilight%2Frene.wang)

## 部署到 Netify

由于 netify 的特性，请在项目设置中把部署命令修改为：

```bash
CI= yarn run build
```

## 部署到自己的服务器

### 0.服务器配置

确保服务器已安装 Node.js、 git 和 pm2。

在服务器下创建/app/ygk-blog 目录，并执行`git init`初始化仓库。

```
mkdir -p /app/blog && cd /app/blog
git init
```

### 1.GitHub 仓库配置

在 github 创建一个仓库，并在`Setting`->`Secrets`下添加服务器信息。

-   SSH_HOST：服务器 IP
-   SSH_USERNAME：服务器用户名
-   SSH_PORT：SSH 端口（默认 22）
-   SSH_PASSWORD：服务器用户密码

在 GitHub 仓库的 `Deploy Keys` 下添加服务器 git 公钥（[生成方法](https://git-scm.com/book/zh/v2/%E6%9C%8D%E5%8A%A1%E5%99%A8%E4%B8%8A%E7%9A%84-Git-%E7%94%9F%E6%88%90-SSH-%E5%85%AC%E9%92%A5)）。

```sh
vim ~/.ssh/id_rsa.pub
```

### 2.推送代码

确保 Action 已启用之后，在 github 上所有 master 分支的更新都会自动部署到服务器。大功告成！

## ✍ 写作

目前支持两种写作方式：

1. 将 Markdown 文件放入`/posts/<catagories>`目录即可。目前最高支持二级目录。
2. 从 Notion 单向同步文章。

两种方式可以同步使用。

如果你选择第一种方式，每篇文章至少需要以下两个 frontmatter：

-   title
-   date

如果选择使用 Notion 写作，请参考这个 [database](https://rivertwilight.notion.site/faf0f2effa1746f8806af0c0df3d7b30?v=7c3efd0a9f7c4b858cee4f3d563b5d89) 的形式创建一个一样的。（打开后点击右上角 `Duplicate` 一键复制）

之后，请在 Notion 新建一个 Intergation，获取 API Key. 同时获取你的 database_id

然后，在 GitHub 仓库新增两个环境变量：

```bash
NOTION_API_KEY=secret_xxxxx
NOTION_DATABASE_ID=xxxxx
```

> [!NOTE]  
> 要获取 NOTION_DATABASE_ID，只需要打开数据库所在的页面，此时浏览器 URL 中用户名之后的长字符就是 id。要获取 NOTION_API_KEY，你需要先在 Database 的首页创建一个 Connection，然后点击 Manage connections 获取 TOKEN。

## License

MIT
