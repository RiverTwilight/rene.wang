import type { IPost } from "../types";

function sortByDate(flattenPosts: IPost[]): IPost[] {
	return flattenPosts
		.filter((post) => "date" in post.frontmatter)
		.sort((a, b) => {
			// console.log("sorting", a);
			let dayA = a.frontmatter.date.split("/")[2],
				dayB = b.frontmatter.date.split("/")[2];
			return dayB - dayA;
		})
		.sort((a, b) => {
			let monthA = a.frontmatter.date.split("/")[1],
				monthB = b.frontmatter.date.split("/")[1];
			return monthB - monthA;
		})
		.sort((a, b) => {
			let yearA = a.frontmatter.date.split("/")[0],
				yearB = b.frontmatter.date.split("/")[0];
			return yearB - yearA;
		});
}

export { sortByDate };
