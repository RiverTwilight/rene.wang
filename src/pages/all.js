import React from "react";
import Link from "next/link";
import { Typography } from "kindle-ui";
import getAllPosts from "../utils/getAllPosts";
import getPostId from "../utils/getPostId";

export async function getStaticProps({ locale, locales }) {
	// require.context doesn't support dynamic import'
	const requireFunc = {
		"en-US": require.context("../posts/en-US", true, /\.md$/),
		"zh-CN": require.context("../posts/zh-CN", true, /\.md$/),
	}[locale];
	return {
		props: {
			allPosts: getAllPosts(
				{
					id: getPostId,
				},
				requireFunc,
				true
			),
			currentPage: {
				title: "全部文章",
				path: "/all",
			},
			locale,
		},
	};
}

const AllPost = ({ allPosts, locale }) => (
	<>
		<Typography>
			<h1>全部文章</h1>
			<ul>
				{allPosts.map((post) => (
					<li>
						<Link
							href={"/blog/" + post.id}
							locale={locale}
							key={post.id}
						>
							{post.frontmatter.title || post.slug}
						</Link>
					</li>
				))}
			</ul>
		</Typography>
	</>
);

export default AllPost;
