import React from "react";
import getAllPosts from "@/utils/getAllPosts";
import type { IPost, TLocale } from "@/types/index";
import ThemedPage from "@/themes/pages/archive";

export async function getStaticProps({ locale, locales }) {
	const allPosts = getAllPosts(
		require.context("../../posts", true, /[\.md|(\.js)]$/),
		{
			enableFlat: true,
			locale,
		}
	);

	return {
		props: {
			allPosts,
			flattedPosts: allPosts,
			currentPage: {
				title: "全部文章",
				path: "/archive",
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
