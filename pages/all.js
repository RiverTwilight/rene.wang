import React from "react";
import Layout from "../components/Layout";
import Link from "next/link";
import getAllPosts from "../utils/getAllPosts";

export async function getStaticProps({ locale, locales }) {
	const config = await import(`../data/config.json`);

	return {
		props: {
			allPosts: getAllPosts({ locale, locales }),
			locale,
			siteConfig: config.default,
		},
	};
}

export default SpecialPage = ({ allPosts, siteConfig, locale }) => (
	<Layout
		currentPage={{
			text: "全部文章",
			path: "/all",
		}}
		locale={locale}
		allPosts={allPosts}
		config={siteConfig}
	>
		<div class="p-a-2 card passage-list">
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
	</Layout>
);
