import React from "react";
import getPaths from "../../utils/getPaths";
import getAllPosts from "../../utils/getAllPosts";
import Layout from "../../components/Layout";
import ReactMarkdown from "react-markdown";
import "../../scss/typo.scss"

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

export default function People({ currentPost, id, locale, siteConfig }) {
	console.log(currentPost);
	const { frontmatter } = currentPost;
	return (
		<Layout
			allPosts={[]}
			currentPage={{
				text: frontmatter.title || id,
				path: "/blog/" + id,
			}}
			locale={locale}
			config={siteConfig}
		>
			<div className="P() card Br(30px) Bgc(white)">
				<ReactMarkdown
					source={currentPost.markdownBody}
				></ReactMarkdown>
			</div>
		</Layout>
	);
}
