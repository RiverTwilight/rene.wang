# NBlog

A Responsive, Fast, i18n and Markdown Blog base on Next.js. Inspired by this [article](https://dev.to/tinacms/creating-a-markdown-blog-with-next-js-52hk)

## 配置

配置文件位于 `/data/config.json`

-   title:博客名称

*   root:博客根网址

*   author: 作者信息
    -   name:名称
    -   image:玉照
    -   intro:介绍
*   catagories: 目录配置
*

## Writting

将文章放入`/posts`目录即可. NBlog 支持 markdown 和 HTML.

### frontmatter

-   title: articel's title, if null, NBlog will regard the file name as title
-   date: Due to node cannot read the file's meta date, **you need to add a date by yourself**.

## Deploy

You can deploy your blog by [Vercel](https://vercel.com) easily by one command.

Or you can deploy by yourself. You don't need a node server.

```sh
npm run deploy
```
