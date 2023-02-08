import getAllPosts from "@/utils/getAllPosts";
import getPostId from "@/utils/getPostId";
import getCategories, { ICategory } from "@/utils/getCategories";
import type { TLocale, IPost } from "@/types/index";
import generateRssFeed from "@/utils/generateRssFeed";
import ThemedIndex from "@/themes/pages/index";
import glob from "glob";

export async function getStaticProps({ locale, locales }) {
	const allPosts = getAllPosts(
		require.context("../../posts", true, /[\.md|(\.js)]$/),
		{
			pocessRes: {
				markdownBody: (content) =>
					`${content.substr(0, 200)}${
						content.length >= 200 ? "..." : ""
					}`,
				id: getPostId,
			},
			enableFlat: true,
			enableSort: true,
			locale,
		}
	);

	generateRssFeed();

	// TODO use locale as a parameter

	const allCategories = getCategories(
		require.context("../../posts", true, /^(\.)(.+)config\.js$/),
		{
			locale
		}
	);

	return {
		props: {
			allPosts,
			falttedPosts: allPosts,
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
