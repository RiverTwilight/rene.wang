import React from "react";
import Link from "next/link";
import Image from "next/image";
import Tab from "../components/Tab";
import {
	Button,
	ListItem,
	ListItemIcon,
	ListItemText,
	EllipsisVerticalIcon,
	Card,
	CardContent,
	CardAction,
	CardMedia,
	CardTitle,
} from "kindle-ui";
import Text from "../utils/i18n";
import { postList, postItem } from "../i18n.json";
import getAllPosts from "../utils/getAllPosts";
import getPostId from "../utils/getPostId";
import getCategories from "../utils/getCategories";
import siteConfig from "../site.config";

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
		locale
	);

	const allCategories = getCategories(
		require.context("../../posts", true, /\.js$/)
	);

	return {
		props: {
			allPosts,
			catagories: allCategories,
			currentPage: {
				title: "首页",
				path: "/",
			},
			// postNumber: sortedPosts.length,
			locale,
		},
	};
}

class HomePage extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeCatagories: "All",
			page: 1,
		};
	}
	render() {
		const { allPosts, locale, postNumber, catagories } = this.props;
		const { activeCatagories } = this.state;

		const falttedPosts =
			activeCatagories !== "All"
				? allPosts.find((cata) => cata.name === activeCatagories)[0]
						.children
				: allPosts.map((item) => item.children).flat();

		const sortedPosts = falttedPosts
			.sort((a, b) => {
				console.log("sorting", a);
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

		console.log("list", sortedPosts);

		return (
			<>
				{/* {allPosts.length && (
					<div className="P(10px)">
						<Card>
							<CardMedia>
								{allPosts[0].frontmatter.cover && (
									<Image
										alt="Cover"
										layout="fill"
										src="/earth.jpg"
									></Image>
								)}
							</CardMedia>
							<CardContent>
								<CardTitle>
									{allPosts[0].frontmatter.title || post.slug}
								</CardTitle>
								{allPosts[0].frontmatter.summary}
								<CardAction>
									<Link href={"/blog/" + allPosts[0].id}>
										<Button variant="outline">
											<Text
												dictionary={postItem}
												language={locale}
											>
												<Text readMore />
											</Text>
										</Button>
									</Link>
								</CardAction>
							</CardContent>
						</Card>
					</div>
				)} */}

				<Tab
					lang={locale}
					tabs={catagories}
					activeIndex={activeCatagories}
					onChange={(index) => {
						this.setState({
							catagories: index,
						});
					}}
				/>

				<div>
					{falttedPosts.map((post) => (
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
									<Text allPosts={[postNumber]} />
								</Button>
							</Link>
						</Text>
					</div>
				</div>
			</>
		);
	}
}

// TODO 友链
export default HomePage;
