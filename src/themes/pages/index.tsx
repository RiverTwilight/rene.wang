import React, { useMemo, useState } from "react";
import Link from "next/link";
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
import Tab from "@/themes/components/Tab";
import Text from "@/utils/i18n";
import { postList } from "../i18n.json";
import { sortByDate } from "@/utils/sortPosts";
import type { TLocale, IPost } from "@/types/index";

const MAX_POST_COUNT = 12;
const FLAG_ENABLE_SORT_BY_DATE = true;

function PostList({
	allPosts,
	falttedPosts,
	activeCategory,
}: {
	activeCategory: string;
	allPosts: any;
	falttedPosts: IPost[];
}) {
	const classfiedPosts =
		activeCategory !== "All"
			? allPosts.find((cata) => cata.name === activeCategory).children
			: falttedPosts;

	const sortedPosts = useMemo(
		() => sortByDate(classfiedPosts),
		[classfiedPosts]
	);

	return sortedPosts.slice(0, MAX_POST_COUNT).map((post) => (
		<Link key={post.id} passHref href={"/p/" + post.id}>
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
				<ListItemIcon
					onClick={() => {
						console.log("Clicked");
					}}
				>
					<EllipsisVerticalIcon />
				</ListItemIcon>
			</ListItem>
		</Link>
	));
}

const HomePage = (props: any) => {
	const { allPosts, falttedPosts, locale, allCategories } = props;
	const [activeCategory, setActiveCategory] = useState("All");

	const tabs = useMemo<{ name: string; text: string }[]>(
		() =>
			[{ name: "All", text: "全部" }].concat(
				allCategories.map((item) => {
					return { name: item.slug, text: item.config.name };
				})
			),
		[allCategories]
	);

	// console.log(allCategories);

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
