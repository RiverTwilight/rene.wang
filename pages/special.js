import React from "react";
import PeopleItem from "../components/PeopleItem";
import getAllPosts from "../utils/getAllPosts";

export async function getStaticProps({ locale }) {
	const allPeoples = getAllPosts(
		{},
		require.context("../peoples", true, /\.md$/)
	);
	return {
		props: {
			locale,
			allPeoples,
			currentPage: {
				title: "寂静地",
				path: "/special",
			},
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
		const { allPeoples, locale } = this.props;
		return (
			<>
				<div className="P(10px) Bgc(white) card Br(30px)">
					<h2>朋友们</h2>
					<div className="Dis(flex) people-list">
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
				</div>
			</>
		);
	}
}

export default SpecialPage;
