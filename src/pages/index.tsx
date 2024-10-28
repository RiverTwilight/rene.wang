import { TLocale, IPost } from "@/types/index";
import getAllPosts from "@/utils/getAllPosts";
import getCategories, { ICategory } from "@/utils/getCategories";
import generateRssFeed from "@/utils/generateRssFeed";
import themeConfig from "../../theme.config.jsx";

export async function getStaticProps({ locale, locales }) {
	const allPosts = getAllPosts(
		require.context("../../posts", true, /[\.md|(\.js)]$/),
		{
			pocessRes: {
				markdownBody: (content) =>
					`${content.substr(0, 200)}${
						content.length >= 200 ? "..." : ""
					}`,
				id: (text) => text,
			},
			enableFlat: true,
			enableSort: true,
			locale,
		}
	).filter((post) => !post.frontmatter.hidden);

	generateRssFeed();

	const allCategories = getCategories(
		require.context("../../posts", true, /^(\.)(.+)config\.js$/),
		{
			locale,
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

export default (props: HomePageProps) => {
	console.log(themeConfig);
	const HomePage = themeConfig.homePage;

	return <HomePage {...props} />;
};
