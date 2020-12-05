import React from "react";
import Layout from "../layout/index";

export async function getStaticProps() {
	return {
		props: {},
	};
}

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			channel: "all",
			page: 1,
		};
	}
	render() {
		const { allPosts, siteConfig, lang } = this.props;
		return (
			<Layout
				currentPage={{
					text: "欢喜",
					path: "/special",
				}}
				allPosts={allPosts}
				config={siteConfig}
			></Layout>
		);
	}
}

export default HomePage;
