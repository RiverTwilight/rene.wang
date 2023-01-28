import { createElement } from "react";
import { renderToString } from "react-dom/server";
import fs from "fs";
import { Feed } from "feed";
import ReactMarkdown from "react-markdown";
import siteConfig from "src/site.config";
import getAllPosts from "./getAllPosts";
import getPostId from "./getPostId";

export default async function generateRssFeed() {
	const siteURL = siteConfig.root;
	const date = new Date();
	const author = siteConfig.author;

	const feed = new Feed({
		title: siteConfig.title,
		description: siteConfig.description,
		id: siteURL,
		link: siteURL,
		image: `${siteURL}/favicon.ico`,
		favicon: `${siteURL}/favicon.ico`,
		copyright: `All rights reserved ${date.getFullYear()}, RiverTwilight`,
		updated: date, 
		generator: "Feed for rene.wng",
		feedLinks: {
			rss2: `${siteURL}/rss/feed.xml`, // xml format
			json: `${siteURL}/rss/feed.json`, // json fromat
		},
		author,
	});

	const allPosts = getAllPosts(
		{
			markdownBody: (content) => content,
			id: getPostId,
		},
		require.context("../../posts", true, /[\.md|(\.js)]$/),
		true,
		true,
		"zh-CN"
	)
		.map((cate) => cate.children)
		.flat(1);

	console.log("ASfdasdfas", allPosts);
	fs.mkdirSync(`./public/rss`, {
		recursive: true,
	});

	allPosts.forEach((post) => {
		feed.addItem({
			title: post.frontmatter.title,
			id: post.id,
			link: `${siteConfig.root}/p/${post.id}`,
			content: renderToString(
				createElement(ReactMarkdown, {
					source: post.markdownBody,
				})
			),
			author: [author],
			contributor: [author],
			date: new Date(date),
		});
	});

	fs.mkdirSync(`./public/rss`, {
		recursive: true,
	});

	fs.writeFileSync(
		"./public/rss/feed.xml",
		feed.rss2(),
		"utf8"
	);
}
