const { Client } = require("@notionhq/client");
const fs = require("fs").promises;
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const NOTION_API_KEY = "secret_BRKiwPYjUbj1ucekKVgow8BhSwafFsjM0CsYD95wxDG";
const NOTION_DATABASE_ID = "faf0f2effa1746f8806af0c0df3d7b30";
// const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

if (!NOTION_API_KEY || !NOTION_DATABASE_ID) {
	console.error(
		"Please set NOTION_API_KEY and NOTION_DATABASE_ID environment variables"
	);
	process.exit(1);
}

const notion = new Client({
	auth: NOTION_API_KEY,
});

function richTextToMarkdown(richText) {
	return richText.map((text) => text.plain_text).join("");
}

function notionBlocksToMarkdown(blocks) {
	const markdown = blocks
		.map((block) => {
			switch (block.type) {
				case "quote":
					return `> ${richTextToMarkdown(block.quote.rich_text)}\n`;
				case "bulleted_list_item":
					return `- ${richTextToMarkdown(
						block.bulleted_list_item.rich_text
					)}\n`;
				case "divider":
					return `<hr />\n`;
				case "paragraph":
					return `\n${richTextToMarkdown(
						block.paragraph.rich_text
					)}\n`;
				case "heading_2":
					return `\n## ${richTextToMarkdown(
						block.heading_2.rich_text
					)}\n`;
				case "heading_1":
					return `\n# ${richTextToMarkdown(
						block.heading_1.rich_text
					)}\n`;
				default:
					return "";
			}
		})
		.join("");

	return markdown;
}

async function getPageContent(pageId) {
	const content = await notion.blocks.children.list({ block_id: pageId });

	return notionBlocksToMarkdown(content.results);
}

async function getBlogPosts() {
	const results = await notion.databases.query({
		database_id: NOTION_DATABASE_ID,
	});

	const posts = await Promise.all(
		results.results.map(async (post) => {
			console.log(post.properties.Slug);
			if (!post.properties.Published.checkbox) {
				return {
					id: post.id,
					title: post.properties.Name.title[0]?.plain_text,
					slug: post.properties.Slug.rich_text[0]?.plain_text,
					cover: post.properties.Cover.files[0]?.external.url,
					date: post.properties.Date.last_edited_time,
					locale: post.properties.Locale.multi_select,
					tags: post.properties.Tags.multi_select,
				};
			}
		})
	);

	return posts.filter((post) => post);
}

async function getPaths(locale = "zh-CN") {
	const results = await notion.databases.query({
		database_id: databaseId[locale],
	});

	const posts = await Promise.all(
		results.results.map(async (post) => {
			return {
				params: {
					id: post.id,
				},
				locale,
			};
		})
	);

	return posts;
}

function formatDate(dateString) {
	const date = new Date(dateString);

	const year = date.getFullYear().toString().substr(-2); // Extract the last two digits of the year
	const month = ("0" + (date.getMonth() + 1)).slice(-2); // Add 1 to month (0-indexed) and pad with 0 if needed
	const day = ("0" + date.getDate()).slice(-2); // Pad with 0 if needed

	return `${year}/${month}/${day}`;
}

(async function main() {
	const posts = await getBlogPosts();

	posts.forEach(async (post) => {
		const rawMarkdown = `
---
title: ${post.title}
cover: ${post.cover}
date: ${formatDate(post.date)}
---

${await getPageContent(post.id)}
		`;

		const fileName = `${post.slug
			.replace(/[^a-zA-Z0-9]/g, "-")
			.toLowerCase()}.md`;

		console.log(post.locale);
		console.log(post.tags);

		post.locale.forEach(async (locale) => {
			post.tags.forEach(async (tag) => {
				console.log(
					`Saving ${fileName} to ${path.join(
						`./posts/${locale.name}/${tag.name}`,
						fileName
					)}`
				);
				await fs.writeFile(
					path.join(
						`../../posts/${locale.name}/${tag.name}`,
						fileName
					),
					rawMarkdown
				);
				console.log(`Saved post: ${fileName}`);
			});
		});
	});
})();
