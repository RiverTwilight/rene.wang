# Rene.wang

这是我的的[博客](https://rene.wang)的源代码。

## 使用方法

1. 点击右上角“Use this template”，创建你自己的仓库。

2. 删掉我的文章，写你自己的文章。

3. 更改网站配置信息。

## 配置

配置文件位于 `./site.config.js`

-   title:博客名称
-   root:博客根网址
-   author: 作者信息
    -   name:名称
    -   intro:介绍

### 静态资源

## 写作

将 Markdown 文件放入`/posts/<catagories>`目录即可。目前最高支持二级目录。

### 文章元数据 frontmatter

每篇文章至少需要以下两个 frontmatter：

-   title
-   date

## 部署

~~由于 Nextjs 的 i18n 功能不支持静态导出，需要部署到服务器上，可以使用 github action 轻松部署。~~

有两种部署方式，[Vercel](https://vercel.com/)和自己的服务器，vercel 只需创建好仓库并按提示走就可以了，如果要部署到自己的服务器请继续阅读:

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
