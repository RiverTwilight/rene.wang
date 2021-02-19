import React from "react";
import Layout from "../components/Layout";
import PeopleItem from "../components/PeopleItem";
import getAllPosts from "../utils/getAllPosts";

export async function getStaticProps({ locale }) {
	const config = await import(`../data/config.json`);
	const allPeoples = getAllPosts(
		{},
		require.context("../peoples", true, /\.md$/)
	);
	return {
		props: {
			locale,
			allPeoples,
			siteConfig: config.default,
		},
	};
}

// TODO 特别页面
class SpecialPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			channel: "all",
			page: 1,
		};
	}
	render() {
		const { allPeoples, siteConfig, locale } = this.props;
		return (
			<Layout
				currentPage={{
					text: "寂静地",
					path: "/special",
				}}
				locale={locale}
				allPosts={allPeoples}
				config={siteConfig}
			>
				<div class="p-a-2 card br-all passage-list">
					{allPeoples.map((people, i) => (
						<PeopleItem
							key={i}
							lang={locale}
							id={people.id}
							frontmatter={people.frontmatter}
							body={people.markdownBody}
						/>
					))}
				</div>
			</Layout>
		);
	}
}

export default SpecialPage;
