import React from "react";
import Link from "next/link";
import { Typography } from "kindle-ui";
import getAllPosts from "../utils/getAllPosts";
import getPostId from "../utils/getPostId";

export async function getStaticProps({ locale, locales }) {
	// require.context doesn't support dynamic import'
	const allPosts = getAllPosts(
		{
			markdownBody: (content) =>
				`${content.substr(0, 200)}${
					content.length >= 200 ? "..." : ""
				}`,
			id: getPostId,
		},
		require.context("../../posts", true, /[\.md|(\.js)]$/),
		true,
		false,
		locale
	);

	return {
		props: {
			allPosts,
			currentPage: {
				title: "全部文章",
				path: "/all",
			},
			locale,
		},
	};
}

const AllPost = ({ allPosts, locale }) => {
	const falttedPosts = allPosts.map((item) => item.children).flat();

	console.log(falttedPosts);

	const sortedPosts = falttedPosts
		.sort((a, b) => {
			console.log("sorting", a);
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

	return (
		<>
			<Typography>
				<h1>全部文章</h1>
				<ul>
					{sortedPosts.map((post) => {
						return (
							<Link
								href={"/p/" + post.id}
								locale={locale}
								key={post.id}
							>
								<li>{post.frontmatter.title || post.slug}</li>
							</Link>
						);
					})}
				</ul>
			</Typography>
		</>
	);
};

export default AllPost;
