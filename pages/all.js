import React from "react";
import Link from "next/link";
import getAllPosts from "../utils/getAllPosts";
import getPostId from "../utils/getPostId";

export async function getStaticProps({ locale, locales }) {
	const config = await import(`../data/config.json`);

	return {
		props: {
			allPosts: getAllPosts(
				{
					id: getPostId,
				},
				require.context("../posts", true, /\.md$/),
				true
			),
			currentPage: {
				title: "全部文章",
				path: "/all",
			},
			locale,
			siteConfig: config.default,
		},
	};
}

const AllPost = ({ allPosts, siteConfig, locale }) => (
	<>
		<div class="P(20px) card Br(30px) Bgc(white) passage-list">
			<h3>全部文章</h3>
			<div className="typo">
				{allPosts.map((post) => (
					<>
						<Link
							href={"/blog/" + post.id}
							locale={locale}
							key={post.id}
						>
							<a>{post.frontmatter.title || post.slug}</a>
						</Link>
						<br></br>
					</>
				))}
			</div>
		</div>
	</>
);

export default AllPost;
