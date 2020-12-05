import React from "react";
import Layout from "../layout/index";

export async function getStaticProps({ locale }) {
	return {
		props: {
			locale,
		},
	};
}

class SpecialPage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			channel: "all",
			page: 1,
		};
	}
	render() {
		const { allPosts, siteConfig } = this.props;
		return (
			<Layout
				currentPage={{
					text: "欢喜",
					path: "/special",
				}}
				locale={locale}
				allPosts={allPosts}
				config={siteConfig}
			></Layout>
		);
	}
}

export default SpecialPage;
