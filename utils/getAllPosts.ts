import matter from "gray-matter";
import getPostId from "./getPostId";

export default function getAllPosts(
	pocessRes: {
		/**文档内容处理函数 */
		markdownBody?: (content: string) => string;
	} = {}
) {
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
				id: getPostId(slug),
				defaultTitle: slug,
				frontmatter: document.data,
				markdownBody: pocessRes.hasOwnProperty("markdownBody")
					? pocessRes.markdownBody(document.content)
					: document.content,
				slug: slug,
				locale: key.split("/")[1],
			};
		});
		return data;
		//@ts-expect-error
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

	return sortedPosts;
}
