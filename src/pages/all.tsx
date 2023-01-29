import React from "react";
import getAllPosts, { flatPost } from "@/utils/getAllPosts";
import getPostId from "@/utils/getPostId";
import type { IPost, TLocale } from "@/types/index";
import ThemedPage from "@/themes/pages/all";

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
			flattedPosts: flatPost(allPosts),
			currentPage: {
				title: "全部文章",
				path: "/all",
			},
			locale,
		},
	};
}

export interface AllPostsProps {
	locale: TLocale;
	allPosts: any;
	flattedPosts: any;
}

const AllPost: React.FC<AllPostsProps> = (props) => {
	return (
		<>
			<ThemedPage {...props} />
		</>
	);
};

export default AllPost;
