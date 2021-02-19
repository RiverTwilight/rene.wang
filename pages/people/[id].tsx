import React from "react";
import getPaths from "../../utils/getPaths";
import getAllPosts from "../../utils/getAllPosts";

export async function getStaticPaths({ locale }) {
	return {
		paths: getPaths(locale, (id) => id, "peoples/**/*.md"),
		fallback: false,
	};
}

export async function getStaticProps({ locale, locales, ...ctx }) {
	const { id: currentId } = ctx.params;
	const posts = getAllPosts(
		{},
		//@ts-expect-error
		require.context("../../peoples", true, /\.md$/)
	);
	const config = await import(`../../data/config.json`);
	const currentPost = posts.filter((post: any) => post.id === currentId)[0];
	return {
		props: {
			currentPost,
			id: currentId,
			siteConfig: config.default,
			locale,
		},
	};
}

export default function People({ currentPost, id }) {
	console.log(currentPost);
	return <></>;
}
