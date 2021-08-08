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
	CardMedia,
	CardTitle,
} from "kindyle";
import Text from "../utils/i18n";
import { postList } from "../data/i18n.json";
import getAllPosts from "../utils/getAllPosts";
import getPostId from "../utils/getPostId";

export async function getStaticProps({ locale, locales }) {
	const sortedPosts = getAllPosts(
		{
			markdownBody: (content) =>
				`${content.substr(0, 200)}${
					content.length >= 200 ? "..." : ""
				}`,
			id: getPostId,
		},
		require.context("../posts", true, /\.md$/),
		true
	);

	return {
		props: {
			allPosts: sortedPosts.slice(0, 10),
			currentPage: {
				title: "首页",
				path: "/",
			},
			postNumber: sortedPosts.length,
			locale,
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
		const { allPosts, siteConfig, locale, postNumber } = this.props;
		const { channel } = this.state;
		return (
			<>
				<div className="P(10px)">
					<Card>
						<CardMedia>
							<img src="/earth.jpg"></img>
						</CardMedia>
						<CardContent>
							<CardTitle>
								{allPosts[0].frontmatter.title || post.slug}
							</CardTitle>
							{allPosts[0].frontmatter.summary}
						</CardContent>
					</Card>
				</div>

				<Tab
					lang={locale}
					tabs={siteConfig.categories}
					activeIndex={channel}
					onChange={(index) => {
						this.setState({
							channel: index,
						});
					}}
				/>
				
				<div>
					{allPosts
						.slice(1) // 剔除已经置顶的最新文章
						.filter((post) => {
							return (
								[
									...Object.values(
										post.frontmatter.categories || []
									),
									"all",
								].includes(channel) && post.locale === locale
							);
						})
						.map((post) => (
							<Link href={"/blog/" + post.id}>
								<ListItem>
									<ListItemText
										primary={
											post.frontmatter.title || post.slug
										}
										second={post.frontmatter.date}
									/>
									<ListItemIcon onClick={() => {}}>
										<EllipsisVerticalIcon />
									</ListItemIcon>
								</ListItem>
							</Link>
						))}
					<br />
					<Text dictionary={postList} language={locale}>
						<Link href="/all">
							<Button className="center">
								<Text allPosts={[postNumber]} />
							</Button>
						</Link>
					</Text>
				</div>
			</>
		);
	}
}

export default HomePage;
