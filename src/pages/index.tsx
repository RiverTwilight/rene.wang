import React from "react";
import Link from "next/link";
import Tab from "../components/Tab";
import {
	Button,
	ListItem,
	ListItemIcon,
	ListItemText,
	EllipsisVerticalIcon,
	Card,
	CardContent,
	CardTitle,
} from "kindle-ui";
import Text from "../utils/i18n";
import { postList } from "../i18n.json";
import getAllPosts from "../utils/getAllPosts";
import getPostId from "../utils/getPostId";
import getCategories, { ICategory } from "../utils/getCategories";

const MAX_POST_COUNT = 12;
const ENABLE_SORT_BY_DATE = true;

export async function getStaticProps({ locale, locales }) {
	const allPosts = getAllPosts(
		{
			markdownBody: (content) =>
				`${content.substr(0, 200)}${
					content.length >= 200 ? "..." : ""
				}`,
			id: getPostId,
		},
		require.context("../../posts", true, /[\.md|(\.js)]$/),
		true,
		false,
		locale
	);

	const allCategories = getCategories(
		require.context("../../posts/", true, /\.js$/),
		locale
	);

	return {
		props: {
			allPosts,
			allCategories,
			currentPage: {
				title: "首页",
				path: "/",
			},
			// postNumber: sortedPosts.length,
			locale,
		},
	};
}

interface IProps {
	allPosts: any;
	allCategories: ICategory[];
}

interface IState {
	activeCategory: string;
}

class HomePage extends React.Component<IProps, IState> {
	constructor(props) {
		super(props);
		this.state = {
			activeCategory: "All",
		};
	}
	render() {
		const { allPosts, locale, allCategories } = this.props;
		const { activeCategory } = this.state;

		const falttedPosts = allPosts.map((item) => item.children).flat();

		console.log("count", falttedPosts.length);

		const classfiedPosts =
			activeCategory !== "All"
				? allPosts.find((cata) => cata.name === activeCategory).children
				: falttedPosts;

		const sortedPosts = classfiedPosts
			.sort((a, b) => {
				// console.log("sorting", a);
				let dayA = a.frontmatter.date.split("/")[2],
					dayB = b.frontmatter.date.split("/")[2];
				return dayB - dayA;
			})
			.sort((a, b) => {
				let monthA = a.frontmatter.date.split("/")[1],
					monthB = b.frontmatter.date.split("/")[1];
				return monthB - monthA;
			})
			.sort((a, b) => {
				let yearA = a.frontmatter.date.split("/")[0],
					yearB = b.frontmatter.date.split("/")[0];
				return yearB - yearA;
			});

		const tabs = [{ name: "All", text: "全部" }].concat(
			allCategories.map((item) => {
				return { name: item.slug, text: item.config.name };
			})
		);

		console.log(tabs);

		return (
			<>
				<div className="P(10px)">
					<Card>
						<CardContent>
							<CardTitle>精选栏目</CardTitle>
						</CardContent>
					</Card>
				</div>
				<Tab
					lang={locale}
					tabs={tabs}
					activeIndex={activeCategory}
					onChange={(index) => {
						console.log(index);
						this.setState({
							activeCategory: index,
						});
					}}
				/>
				<div>
					{sortedPosts.slice(0, MAX_POST_COUNT).map((post) => (
						<Link passHref href={"/p/" + post.id}>
							<ListItem
								style={{
									cursor: "pointer",
								}}
							>
								<ListItemText
									primary={
										post.frontmatter
											? post.frontmatter.title
											: post.slug
									}
									second={
										post.frontmatter
											? post.frontmatter.date
											: "1970/01/01"
									}
								/>
								<ListItemIcon onClick={() => {}}>
									<EllipsisVerticalIcon />
								</ListItemIcon>
							</ListItem>
						</Link>
					))}
					<br />
					<div className="Dis(flex) JC(center)">
						<Text dictionary={postList} language={locale}>
							<Link passHref href="/all">
								<Button variant="outline" className="center">
									<Text allPosts={[falttedPosts.length]} />
								</Button>
							</Link>
						</Text>
					</div>
				</div>
			</>
		);
	}
}

export default HomePage;
