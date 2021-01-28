import React from "react";
import Layout from "../components/Layout";

export async function getStaticProps({ locale }) {
	const config = await import(`../data/config.json`);

	return {
		props: {
			locale,
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
		const { allPosts, siteConfig, locale } = this.props;
		return (
			<Layout
				currentPage={{
					text: "寂静地",
					path: "/special",
				}}
				locale={locale}
				allPosts={allPosts}
				config={siteConfig}
			>
				<div class="p-a-2 card passage-list">
					<h3>全部文章</h3>
				</div>
			</Layout>
		);
	}
}

export default SpecialPage;
