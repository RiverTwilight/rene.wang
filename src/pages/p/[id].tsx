import React from "react";
import getPaths from "@/utils/getPaths";
import getFilename from "@/utils/getFilename";
import { paths, giscus as giscusConfig } from "../../site.config";
import matter from "gray-matter";
import { GetStaticPaths } from "next";
import themeConfig from "theme.config";

interface IPostProps {
	title: string;
	date: string;
	author: string;
	cover?: string;
}

interface ICurrentPage {
	title: string;
	path: string;
	description: string;
}

interface IPost {
	id: string;
	frontmatter: IPostProps;
	markdownBody: string;
	slug: string;
}

interface IProps {
	recommendPost: IPost[];
	postContent: string;
	postProps: IPostProps;
	currentPage: ICurrentPage;
	id: string;
	locale: string;
}

export async function getStaticProps({ locale, locales, ...ctx }) {
	const { id: currentId } = ctx.params;

	const currentPost = matter(
		((context) => {
			const keys = context
				.keys()
				.find(
					(path) =>
						path.includes(locale) && getFilename(path) === currentId
				);
			return context(keys).default;
		})(require.context("../../../posts", true, /\.md$/))
	);

	return {
		props: {
			// recommendPost: getRecommendPost(
			// 	posts,
			// 	currentPost.frontmatter.categories || ["Unfiled"],
			// 	currentId
			// ),
			// https://stackoverflow.com/questions/70449092/reason-object-object-date-cannot-be-serialized-as-json-please-only-ret
			postContent: JSON.parse(JSON.stringify(currentPost.content)),
			postProps: JSON.parse(JSON.stringify(currentPost.data)),
			currentPage: {
				title: currentPost.data.title || currentPost.data.slug,
				path: "/" + paths.blog + currentId,
				description:
					currentPost.data.summary ||
					currentPost.content.slice(0, 100),
				image: currentPost.data.cover || "",
			},
			id: currentId,
			locale,
		},
	};
}

export async function getStaticPaths(props: GetStaticPaths) {
	return {
		paths: ["zh-CN", "en-US"]
			.map((locale: string) => {
				return getPaths(locale);
			})
			.flat(),
		fallback: true,
	};
}

export default (props) => {
	const ArticlePage = themeConfig.articlePage;
	return <ArticlePage {...props} />;
};
