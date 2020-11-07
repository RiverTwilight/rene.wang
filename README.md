# NBlog

灵感来源于这篇 [文章](https://dev.to/tinacms/creating-a-markdown-blog-with-next-js-52hk)

## 配置

配置文件位于 `/data/config.json`

-   title:博客名称

*   root:博客根网址

*   author: 作者信息
    -   name:名称
    -   image:玉照
    -   intro:介绍
*   catagories: 目录配置

### 静态资源
### 样式

暂不支持自定义样式

## 写作

将文章放入`/posts`目录即可. NBlog 支持 markdown 和 HTML.

### 文章元数据 frontmatter

-   title: articel's title, if null, NBlog will regard the file name as title
-   date: Due to node cannot read the file's meta date, **you need to add a date by yourself**.

## 部署

本系统是纯静态的，可以**零成本部署**。推荐使用[Vercel](https://vercel.com)。

将本仓库 fork 至你的 hub 账户下，绑定 vercel 即可快速部署。仓库的任何更新都会自动部署。

你也可以自己部署，执行以下命令即可：

```sh
npm run deploy
```
