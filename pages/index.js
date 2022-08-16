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

const MAX_POST_COUNT = 12;

export async function getStaticProps({ locale, locales }) {
	// const sortedPosts = [];
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
			allPosts: sortedPosts.slice(0, MAX_POST_COUNT),
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

		console.log(locale);

		return (
			<>
				{allPosts.length && (
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
				)}

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
							<Link passHref href={"/blog/" + post.id}>
								<ListItem
									style={{
										cursor: "pointer",
									}}
								>
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
						<Link passHref href="/all">
							<Button variant="outline" className="center">
								<Text allPosts={[postNumber]} />
							</Button>
						</Link>
					</Text>
				</div>
			</>
		);
	}
}

// TODO 友链
export default HomePage;
