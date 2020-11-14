import React from "react";
import matter from "gray-matter";
import PassageItem from "../components/PassageLine";
import Marquee from "../components/Marquee";
import Tab from "../components/Tab";
import Layout from "../layout/index";
import { v5 as uuidv5 } from "uuid";

export async function getStaticProps() {
	//get posts & context from folder
	const posts = ((context) => {
		const keys = context.keys();
		const values = keys.map(context);
		const data = keys.map((key, index) => {
			// Create slug from filename
			const slug = key
				.replace(/^.*[\\\/]/, "")
				.split(".")
				.slice(0, -1)
				.join(".");
			const value = values[index];
			// Parse yaml metadata & markdownbody in document
			const document = matter(value.default);
			return {
				id: uuidv5(slug, "1b671a64-40d5-491e-99b0-da01ff1f3341").substr(
					0,
					8
				),
				defaultTitle: slug,
				frontmatter: document.data,
				markdownBody: document.content,
				slug: slug,
			};
		});
		return data;
	})(require.context("../posts", true, /\.md$/));

	const sortedPosts = posts
		.sort((a, b) => {
			let yearA = a.frontmatter.date.split("/")[0],
				yearB = b.frontmatter.date.split("/")[0];
			return yearA - yearB;
		})
		.sort((a, b) => {
			let dayA = a.frontmatter.date.split("/")[2],
				dayB = b.frontmatter.date.split("/")[2];
			return dayB - dayA;
		})
		.sort((a, b) => {
			let monthA = a.frontmatter.date.split("/")[1],
				monthB = b.frontmatter.date.split("/")[1];
			return monthB - monthA;
		});

	const config = await import(`../data/config.json`);
	return {
		props: {
			allPosts: sortedPosts,
			siteConfig: config.default,
		},
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
		const { channel } = this.state;
		return (
			<Layout
				currentPage={{
					text: "首页",
					path: "/",
				}}
				allPosts={allPosts}
				config={siteConfig}
			></Layout>
		);
	}
}

export default HomePage;
