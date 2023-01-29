import getAllPosts, { flatPost } from "@/utils/getAllPosts";
import getPostId from "@/utils/getPostId";
import getCategories, { ICategory } from "@/utils/getCategories";
import type { TLocale, IPost } from "@/types/index";
import generateRssFeed from "@/utils/generateRssFeed";
import ThemedIndex from "@/themes/pages/index";

export async function getStaticProps({ locale, locales }) {
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

	generateRssFeed();

	// TODO use locale as a parameter

	const allCategories = getCategories(
		require.context("../../posts/zh-CN", true, /config\.js$/),
		locale
	);

	return {
		props: {
			allPosts,
			falttedPosts: flatPost(allPosts),
			allCategories,
			currentPage: {
				title: "首页",
				path: "/",
			},
			// postNumber: sortedPosts.length,
			locale,
		},
	};
}

interface HomePageProps {
	locale: TLocale;
	allPosts: any;
	falttedPosts: any;
	allCategories: ICategory[];
}

const HomePage = (props: HomePageProps) => {
	return (
		<>
			<ThemedIndex {...props} />
		</>
	);
};

export default HomePage;
