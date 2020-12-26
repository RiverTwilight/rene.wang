---
date: 2020/7/5
categories:
- FrontEnd
---

## 前言

最近一直在探索合适的个人博客解决方案。最开始是用hexo,然后推送到coding page仓库。后来用Next.js开发了个静态博客[NBlog](https://github.com/RiverTwilight/NBlog)，官方文档中推荐使用vercel部署，就抱着试试看的心态尝试了一下，没想到vercel竟如此强大。

## GithubPage vs Vercel

### github page

+ 使用开发框架需要手动执行开发框架的编译脚本，再单独为打包出来的文件夹建立git仓库。

+ 每个账户只能拥有一个仓库&站点

+ 访问速度较慢

### vercel

+ 支持十几个开发框架（Next.js/Create React App/Vue...)，只需要建立源代码仓库，打包在云端进行。推送代码后自动部署。

+ 每个账户支持绑定无限Github/Gitlagb仓库&站点

+ 全球CDN加速

当然，vercel有一个缺点，如果你开发时修改了使用的依赖包，部署后是无效的，因为vercel会重新安装依赖。

## 教程

### 绑定仓库

访问[Vercel](https://vercel.com/)官网，根据提示注册账号。个人用户可以免费使用。

点击`Import Project` -> `Import Git Repository`，输入git仓库地址，vercel与Github基本上是无缝衔接，绑定过程非常轻松。

绑定完成后是项目配置。Vercel会自动识别开发框架，这里可以自定义编译代码和输出文件夹，你可以在编译代码中添加自己的逻辑；使用内置框架一般不要修改输出文件夹。

配置完成后点击`Deploy`，耐心等待即可。

### 绑定域名

部署完成后vercel会自动生成一个域名（一般是*.vercel.app)，访问域名提供商控制台，添加一个**CNAME**解析,记录值填入vercel控制台看到的域名。解析完成后返回控制台，vercel会自动验证域名，通过后会自动申请SSL证书。

大功告成！

[vercel官方文档](https://vercel.com/docs)
