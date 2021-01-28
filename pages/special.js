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
				<div class="p-a-2 card br-all passage-list">
					<h3>全部文章</h3>
					<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width="330" height="86" src="//music.163.com/outchain/player?type=2&id=1413585838&auto=1&height=66"></iframe>
				</div>
			</Layout>
		);
	}
}

export default SpecialPage;
