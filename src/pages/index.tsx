import React, { useMemo, useState } from "react";
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
	Grid,
	GridItem,
} from "@kindle-ui/core";
import Text from "../utils/i18n";
import { postList } from "../i18n.json";
import getAllPosts from "@/utils/getAllPosts";
import getPostId from "@/utils/getPostId";
import getCategories, { ICategory } from "../utils/getCategories";

const MAX_POST_COUNT = 12;
const FLAG_ENABLE_SORT_BY_DATE = true;

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

	// TODO use locale as a parameter

	const allCategories = getCategories(
		require.context("../../posts/zh-CN", true, /config\.js$/),
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

function PostList({ allPosts, falttedPosts, activeCategory }) {
	const classfiedPosts =
		activeCategory !== "All"
			? allPosts.find((cata) => cata.name === activeCategory).children
			: falttedPosts;

	const sortedPosts = useMemo(
		() =>
			classfiedPosts
				.filter((post) => "date" in post.frontmatter)
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
				}),
		[classfiedPosts]
	);

	return sortedPosts.slice(0, MAX_POST_COUNT).map((post) => (
		<Link passHref href={"/p/" + post.id}>
			<ListItem
				style={{
					cursor: "pointer",
				}}
			>
				<ListItemText
					primary={
						post.frontmatter ? post.frontmatter.title : post.slug
					}
					second={
						post.frontmatter ? post.frontmatter.date : "1970/01/01"
					}
				/>
				<ListItemIcon onClick={() => {}}>
					<EllipsisVerticalIcon />
				</ListItemIcon>
			</ListItem>
		</Link>
	));
}

export function frontmatterValidator(postData) {
	return frontmatter.draft !== true;
}

interface HomePageProps {
	allPosts: any;
	allCategories: ICategory[];
}

const HomePage = (props: HomePageProps) => {
	const { allPosts, locale, allCategories } = props;
	const [activeCategory, setActiveCategory] = useState("All");

	const falttedPosts = useMemo(() => {
		return allPosts.map((item) => item.children).flat();
	}, [allPosts]);

	// console.log("count", falttedPosts.length);

	const tabs = useMemo(
		() =>
			[{ name: "All", text: "全部" }].concat(
				allCategories.map((item) => {
					return { name: item.slug, text: item.config.name };
				})
			),
		[allCategories]
	);

	console.log(allCategories);

	return (
		<>
			<div className="P(10px)">
				<Card>
					<CardTitle>精选栏目</CardTitle>
					<CardContent>
						<Grid>
							<GridItem src="https://cdn.sspai.com/2022/09/14/323d5392b32276f64959c20977cbe81a.png?imageMogr2/auto-orient/quality/95/thumbnail/!800x400r/gravity/Center/crop/800x400/interlace/1" />
						</Grid>
					</CardContent>
				</Card>
			</div>
			<Tab
				lang={locale}
				tabs={tabs}
				activeIndex={activeCategory}
				onChange={(index) => {
					console.log(index);
					setActiveCategory(index);
				}}
			/>
			<div>
				<PostList
					activeCategory={activeCategory}
					allPosts={allPosts}
					falttedPosts={falttedPosts}
				/>
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
};

export default HomePage;
