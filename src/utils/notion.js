const { Client } = require("@notionhq/client");
const fs = require("fs").promises;
const path = require("path");
const dotenv = require("dotenv");

// https://developers.notion.com/reference/block#bulleted-list-item

dotenv.config();

const NOTION_API_KEY = process.env.NOTION_API_KEY;
const NOTION_DATABASE_ID = process.env.NOTION_DATABASE_ID;

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
	return richText
		.map((text) => {
			const { annotations } = text;

			let res = text.plain_text;

			if (annotations.bold) {
				res = `**${res}**`;
			}

			if (annotations.italic) {
				res = `*${res}*`;
			}

			if (annotations.strikethrough) {
				res = `~~${res}~~`;
			}

			return res;
		})
		.join("");
}

async function notionBlocksToMarkdown(blocks, indent = 0) {
	let numberdListCount = 0;

	const markdownPromises = blocks.map(async (block) => {
		let childrenContent = null;
		if (block.has_children) {
			console.log("has children");
			childrenContent = await getPageContent(block.id, indent + 1);
		}
		const spaces = "  ".repeat(indent);

		if (block.type !== "numbered_list_item") {
			numberdListCount = 0;
		}

		switch (block.type) {
			case "quote":
				return `> ${richTextToMarkdown(block.quote.rich_text)}\n`;
			case "bulleted_list_item":
				// console.log(
				// 	`${block.bulleted_list_item.rich_text[0].plain_text}`,
				// 	block
				// );
				return `${spaces}- ${richTextToMarkdown(
					block.bulleted_list_item.rich_text
				)}\n${childrenContent || ""}`;
			case "numbered_list_item":
				numberdListCount += 1;
				return `${
					numberdListCount === 1 ? "\n" : ""
				}${spaces}${numberdListCount}. ${richTextToMarkdown(
					block.numbered_list_item.rich_text
				)}\n${childrenContent || ""}`;
			case "divider":
				return `<hr />\n`;
			case "paragraph":
				return `\n${richTextToMarkdown(block.paragraph.rich_text)}\n`;
			case "heading_2":
				return `\n## ${richTextToMarkdown(
					block.heading_2.rich_text
				)}\n`;
			case "heading_1":
				return `\n# ${richTextToMarkdown(block.heading_1.rich_text)}\n`;
			case "code":
				return `\n\`\`\`${block.code.language}\n${richTextToMarkdown(
					block.code.rich_text
				)}\n\`\`\`\n`;
			case "equation":
				return `\n$$\n${block.equation.expression}\n$$\n`;
			case "to_do":
				return `\n- [${
					block.to_do.checked ? "x" : " "
				}] ${richTextToMarkdown(block.to_do.rich_text)}\n`;
			case "image":
				let imageURL =
					block.image.type == "external"
						? block.image.external.url
						: block.image.file.url;
				return `\n![Image](${imageURL})\n`;
			case "video":
				// TODO Parse Notion's video block
				return `\n![Video](${block.video.url})\n`;
			default:
				return "";
		}
	});

	const resolvedMarkdowns = await Promise.all(markdownPromises);
	return resolvedMarkdowns.join("");
}

async function getPageContent(pageId, indent = 0) {
	const content = await notion.blocks.children.list({ block_id: pageId });

	return notionBlocksToMarkdown(content.results, indent);
}

async function getBlogPosts() {
	const results = await notion.databases.query({
		database_id: NOTION_DATABASE_ID,
	});

	const posts = await Promise.all(
		results.results.map(async (post) => {
			// console.log(post.properties.Slug);
			if (post.properties.Published.checkbox) {
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

(async function main() {
	const posts = await getBlogPosts();

	posts.forEach(async (post) => {
		const postContent = await getPageContent(post.id);
		const rawMarkdown = `---
title: ${post.title}
date: ${post.date}
${post.cover ? `cover: ${post.cover}` : ""}
---

${postContent}`;

		const fileName = `${post.slug
			.replace(/[^a-zA-Z0-9]/g, "-")
			.toLowerCase()}.md`;

		post.locale.forEach(async (locale) => {
			post.tags.forEach(async (tag) => {
				await fs.writeFile(
					path.join(`./posts/${locale.name}/${tag.name}`, fileName),
					rawMarkdown
				);
				console.log(`Synced post: ${fileName}`);
			});
		});
	});
})();
