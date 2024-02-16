# Rene.wang

[简体中文](./README.md) | English

This is the source code for my [blog](https://rene.wang) and also a powerful static blogging site.

-   [x] Write with Markdown
-   [x] Syncs articles from Notion
-   [x] Multi-language UI and articles
-   [x] RSS Feed
-   [x] Full SEO
-   [x] Unique appearence
-   [x] Deploy in one-click

## 🎞️ Get Started

Click on the Use this template button on the top right corner of the page to create your own repository.

Afterwards, modify the configuration file located at ./site.config.js.

-   title: Blog name
-   root: Blog root URL

## Deploying to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2FRiverTwilight%2Frene.wang)

## Deploying to Netify

```bash
CI= yarn run build
```

## Deploying to Your Own Server

0. Server Configuration
   Make sure that Node.js, git, and pm2 are installed on the server.

Create a `/app/ygk-blog` directory on the server and execute git init to initialize the repository.

```bash
mkdir -p /app/blog && cd /app/blog
git init
```

### 1. Github Repository Configuration

Create a repository on Github and add server information under Setting -> Secrets.

```bash
SSH_HOST: Server IP
SSH_USERNAME: Server username
SSH_PORT: SSH port (default 22)
SSH_PASSWORD: Server user password
```

Add the server's git public key under Deploy Keys in the Github repository (generation method).

```sh
vim ~/.ssh/id_rsa.pub
```

### 2. Pushing Code

Make sure that the Action is enabled, and all updates to the master branch on Github will be automatically deployed to the server. Congratulations!

## ✍ Writing

Currently, two writing methods are supported:

1. Place the Markdown file in the /posts/<categories> directory. Currently, up to two-level directories are supported.
2. Automatically sync articles from Notion.

If you choose the first method, each article must have at least the following two frontmatter:

-   title
-   date

If you choose to use Notion for writing, refer to this [database] () to create a similar one.

Then, create a new Integration in Notion to obtain an API Key. Also, get your database_id.

Finally, add two environment variables in the Github repository:

```bash
NOTION_API_KEY=<YOUR_KEY>
NOTION_DATABASE_ID=<YOUR_ID>
```

> [!NOTE]  
> To get the NOTION_DATABASE_ID, open the page where the database is located, and the long string after the username in the browser URL is the id. To get the NOTION_API_KEY, you need to create a Connection on the first page of the Database, and then click "Manage connections" to get the TOKEN.

Once everything is ready, you can choose the deployment method you prefer.

## License

MIT
