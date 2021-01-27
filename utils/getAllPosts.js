import { v5 as uuidv5 } from "uuid";
import matter from "gray-matter";

export default function getAllPosts({ locale, locales }) {
	//get posts & context from folder
	const posts = ((context) => {
		const keys = context.keys();
		const values = keys.map(context);
		const data = keys.splice(0, 15).map((key, index) => {
			// Create slug from filename
			const slug = key
				.replace(/^.*[\\\/]/, "")
				.split(".")
				.slice(0, -1)
				.join(".");
			const value = values[index];
			// Parse yaml metadata & markdownbody in document
			const document = matter(value.default);
			return {
				id: uuidv5(slug, "1b671a64-40d5-491e-99b0-da01ff1f3341").substr(
					0,
					8
				),
				defaultTitle: slug,
				frontmatter: document.data,
				markdownBody: `${document.content.substr(0, 200)}${
					document.content.length >= 200 ? "..." : ""
				}`,
				slug: slug,
				locale: key.split("/")[1],
			};
		});
		return data;
	})(require.context("../posts", true, /\.md$/));

	const sortedPosts = posts
		.sort((a, b) => {
			let dayA = a.frontmatter.date.split("/")[2],
				dayB = b.frontmatter.date.split("/")[2];
			return dayB - dayA;
		})
		.sort((a, b) => {
			let monthA = a.frontmatter.date.split("/")[1],
				monthB = b.frontmatter.date.split("/")[1];
			console.log(monthA, monthB);
			return monthB - monthA;
		})
		.sort((a, b) => {
			let yearA = a.frontmatter.date.split("/")[0],
				yearB = b.frontmatter.date.split("/")[0];
			return yearB - yearA;
		});

	return sortedPosts
}
