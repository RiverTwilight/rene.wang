import React, { useMemo } from "react";
import Link from "next/link";
import { Typography } from "@kindle-ui/core";
import getAllPosts from "@/utils/getAllPosts";
import getPostId from "@/utils/getPostId";
import { sortByDate } from "@/utils/sortPosts";

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
	const flattedPosts = useMemo(
		() => allPosts.map((item) => item.children).flat(),
		[allPosts]
	);

	// console.log(flattedPosts);

	const sortedPosts = useMemo(() => sortByDate(flattedPosts), [allPosts]);

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
								legacyBehavior
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
