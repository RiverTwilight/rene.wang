# NBlog

A Responsive, Fast, i18n and Markdown Blog base on Next.js. Inspired by this [article](https://dev.to/tinacms/creating-a-markdown-blog-with-next-js-52hk)

## Config

All config  is in `/data/config.json`

* author: Author info will be  written into `<meta>` tags
* catagories: Custom catagories, each post can add a catagoies info in `yaml`
* 

## Writting

All posts is in `/posts`. NBlog surports markdown and HTML.

### frontmatter

* title: articel's title, if null, NBlog will regard the file name as title
* date: Due to node cannot read the file's meta date, **you need to add a date by yourself**.

## Deploy

You can deploy your blog by [Vercel](https://vercel.com) easily by one command.

Or you can deploy by yourself. You don't need a node server.

```sh
npm run deploy
```
